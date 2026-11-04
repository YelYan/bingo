-- The core loop: shop, product, order, payment receipt, shipment.
-- Money is whole kyat in integer columns. Every shop-owned table carries
-- shop_id and a row-level rule, so a forgotten WHERE cannot leak another shop.

CREATE FUNCTION current_shop() RETURNS uuid LANGUAGE sql STABLE AS
$$ SELECT NULLIF(current_setting('app.shop_id', true), '')::uuid $$;

CREATE TABLE shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  delivery_fee_mmk integer NOT NULL DEFAULT 0 CHECK (delivery_fee_mmk >= 0),
  payment_accounts jsonb NOT NULL DEFAULT '[]',
  next_order_number integer NOT NULL DEFAULT 1001,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- users and sessions have no row rule: sign-in happens before a shop is known.
-- Only the IAM module reads them.
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  phone text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  failed_logins integer NOT NULL DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id),
  shop_id uuid NOT NULL REFERENCES shops(id),
  expires_at timestamptz NOT NULL
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  name text NOT NULL,
  price_mmk integer NOT NULL CHECK (price_mmk > 0),
  cost_mmk integer NOT NULL DEFAULT 0 CHECK (cost_mmk >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX products_shop ON products (shop_id, created_at DESC);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  number integer NOT NULL,
  idempotency_key text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  region text NOT NULL,
  township text NOT NULL,
  address text NOT NULL,
  subtotal_mmk integer NOT NULL,
  delivery_fee_mmk integer NOT NULL,
  total_mmk integer NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('cod', 'transfer')),
  payment_status text NOT NULL CHECK (payment_status IN
    ('cod_due', 'cod_collected', 'awaiting_slip', 'in_review', 'approved', 'rejected')),
  payment_reject_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (shop_id, number),
  UNIQUE (shop_id, idempotency_key)
);
CREATE INDEX orders_shop ON orders (shop_id, created_at DESC);

CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  order_id uuid NOT NULL REFERENCES orders(id),
  product_id uuid NOT NULL REFERENCES products(id),
  name text NOT NULL,
  unit_price_mmk integer NOT NULL,
  unit_cost_mmk integer NOT NULL,
  qty integer NOT NULL CHECK (qty > 0)
);
CREATE INDEX order_items_order ON order_items (order_id);

CREATE TABLE payment_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  order_id uuid NOT NULL REFERENCES orders(id),
  image bytea NOT NULL,
  content_type text NOT NULL,
  sha256 text NOT NULL,
  duplicate_of_order_id uuid REFERENCES orders(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX payment_receipts_order ON payment_receipts (order_id, created_at DESC);
CREATE INDEX payment_receipts_sha ON payment_receipts (shop_id, sha256);

CREATE TABLE shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid NOT NULL REFERENCES shops(id),
  order_id uuid NOT NULL UNIQUE REFERENCES orders(id),
  public_token text NOT NULL UNIQUE,
  status text NOT NULL,
  carrier text,
  eta_low date,
  eta_high date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Append-only history: the app role gets no UPDATE or DELETE here (see below).
CREATE TABLE tracking_events (
  event_id text NOT NULL,
  shop_id uuid NOT NULL REFERENCES shops(id),
  shipment_id uuid NOT NULL REFERENCES shipments(id),
  type text NOT NULL,
  seq integer NOT NULL,
  actor text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (shop_id, event_id),
  UNIQUE (shipment_id, seq)
);

-- The tracking link carries only a token, so a shop must be found before its
-- row rule can apply. SECURITY DEFINER keeps this one lookup from opening the table.
CREATE FUNCTION shop_for_tracking_token(token text) RETURNS uuid
  LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS
$$ SELECT shop_id FROM shipments WHERE public_token = token $$;

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops FORCE ROW LEVEL SECURITY;
CREATE POLICY shops_read ON shops FOR SELECT USING (true);
CREATE POLICY shops_create ON shops FOR INSERT WITH CHECK (true);
CREATE POLICY shops_update ON shops FOR UPDATE USING (id = current_shop());

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['products','orders','order_items','payment_receipts','shipments','tracking_events']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY tenant ON %I USING (shop_id = current_shop()) WITH CHECK (shop_id = current_shop())', t);
  END LOOP;
END $$;

GRANT SELECT, INSERT, UPDATE ON shops, users, products, orders, shipments TO bingomart_app;
GRANT SELECT, INSERT, DELETE ON sessions TO bingomart_app;
GRANT SELECT, INSERT ON order_items, payment_receipts, tracking_events TO bingomart_app;
GRANT EXECUTE ON FUNCTION shop_for_tracking_token(text) TO bingomart_app;

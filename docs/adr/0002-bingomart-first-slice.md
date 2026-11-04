# ADR 0002: BingoMart's first slice is a real app, not a mock

Status: accepted (user's choice, 2026-11-04)

## Context
The 2026-11-01 plan (`docs/superpowers/plans/2026-11-01-bingomart-frontend-architecture.md`) scoped a frontend on a mock API. A mock cannot take a real order, so the first slice follows the System Design Document's stack instead: NestJS, PostgreSQL and a web app. That plan's tasks 2 to 12 are not being followed for now.

## Decision
Build the core loop end to end: order, payment check, delivery steps, public tracking.

- Modular monolith, one folder per module. `orders` uses `catalog` and `shipping`; `payments` uses `orders`.
- PostgreSQL with plain SQL and a row-level rule per shop, connected as a non-superuser role. A forgotten `WHERE` cannot leak another shop's data.
- `tracking_events` is append-only: the app role has no `UPDATE` or `DELETE`. A client-made `event_id` makes retries harmless.
- Money is whole kyat in integers. Prices are read from the database, never from the client.
- A receipt photo is only evidence. The app flags a repeated image; the seller decides from their own wallet record.
- Sign-in is by phone and password, because OTP needs an SMS or Telegram provider.

## Rejected
- Mock API first: nothing real to pilot, and a second implementation to throw away.
- An ORM: row-level rules need plain SQL anyway (SDD 12.3).
- JWTs: a session table needs no signing secret, and a session can be revoked.

## Left out on purpose
Each is in the requirements, and none is built yet:

- AI chat, Telegram and other channels, notifications (`outbox`), SuzyDesk.
- Automatic receipt reading. POS, offline mode and the rider app.
- Product photos and categories, township-based delivery fees, search, staff roles, reports.
- OTP sign-in, password reset, Zawgyi conversion, English UI.
- Shop subdomains: shops live at `/s/<slug>` for now.

## Known limits
- Receipts are stored in PostgreSQL (`bytea`). The SDD plans object storage with 60-day deletion; move them before a free-tier database fills up.
- Public order and upload endpoints have no rate limit, so fake orders could tie up a shop's stock. Add one before real shops use it.
- The delivery estimate is typed by the seller. The SDD's lane-based window needs real delivery history first.
- The Burmese wording has not been reviewed by a native speaker.
- Hosting is undecided: tests Z1 and Z2 in the SDD still need running on candidate hosts.

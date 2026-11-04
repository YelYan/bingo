import { ImageResponse } from "next/og";

/** Same static-at-build behaviour as the root image; no Workers cost. */
export const alt = "BingoMart: sell, get paid and deliver from one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0f3d38",
          color: "#f7f4ec",
          padding: "88px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 22,
              backgroundColor: "#f2b531",
              color: "#0f3d38",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            Bm
          </div>
          <span style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2 }}>
            BingoMart
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.08,
          }}
        >
          Sell, get paid and deliver from one place.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#b9d2cc" }}>
          The online shop for Myanmar sellers · A Bingo product
        </div>
      </div>
    ),
    { ...size },
  );
}

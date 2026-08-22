import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Renders once at build time -- this route has no dynamic segment, so Next
 * emits a static PNG into the build output. Nothing runs on Workers at
 * request time; it's served like any other static asset.
 */
export const alt = `${site.name} — ${site.tagline}`;
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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#f7f2ea",
          padding: "88px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              width: 84,
              height: 84,
              borderRadius: 22,
              border: "9px solid #24272c",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "46%",
                height: "58%",
                backgroundColor: "#e2622b",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: 76,
                fontWeight: 800,
                letterSpacing: -3,
                color: "#24272c",
              }}
            >
              Bingo
            </span>
            <div
              style={{
                display: "flex",
                width: 16,
                height: 40,
                marginLeft: 10,
                backgroundColor: "#e2622b",
                transform: "skewX(-18deg)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.08,
            color: "#24272c",
          }}
        >
          Websites that end in an aha.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6e5c4c",
          }}
        >
          Web Design Studio · Code · Brand · SEO
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Sophy Mengkorng, Frontend Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#fffaff",
          background: "#09080c",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px), radial-gradient(circle at 75% 42%, rgba(192,0,255,.48), transparent 34%)",
            backgroundSize: "72px 72px, 72px 72px, auto",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            right: 70,
            top: 95,
            display: "flex",
            border: "2px solid #dc43ff",
            borderRadius: "50%",
            transform: "rotate(-18deg)",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 82px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 800, letterSpacing: 5 }}>
            <span>KORNG</span>
            <span style={{ color: "#dc43ff" }}>PORTFOLIO · 2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#dc43ff", fontSize: 20, fontWeight: 700, letterSpacing: 6 }}>FRONTEND DEVELOPER · PHNOM PENH</span>
            <span style={{ marginTop: 20, fontSize: 92, fontWeight: 900, lineHeight: 0.88, letterSpacing: -6 }}>SOPHY</span>
            <span style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.88, letterSpacing: -6 }}>MENGKORNG</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 18, letterSpacing: 3 }}>
            <span style={{ width: 10, height: 10, display: "flex", borderRadius: "50%", background: "#b7ff5a" }} />
            DESIGN · DEVELOP · CREATE
          </div>
        </div>
      </div>
    ),
    size,
  );
}

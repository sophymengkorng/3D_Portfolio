import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.author} — ${site.jobTitle} portfolio`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09080c",
          color: "#fffaff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* violet depth glow, echoing the hero scene */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,67,255,0.42), rgba(91,0,120,0.12) 55%, rgba(9,8,12,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 520,
            top: 150,
            width: 330,
            height: 330,
            borderRadius: "50%",
            border: "1px solid rgba(220,67,255,0.55)",
            transform: "rotate(-18deg)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 900, letterSpacing: 6 }}>
            KORN<span style={{ color: "#dc43ff" }}>G</span>
          </div>
          <div style={{ display: "flex", fontSize: 19, letterSpacing: 5, color: "#aaa2af" }}>
            PORTFOLIO · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 7,
              color: "#dc43ff",
              marginBottom: 20,
            }}
          >
            {site.author.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 116, fontWeight: 900, lineHeight: 0.92 }}>
            CREATIVE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 900,
              lineHeight: 0.92,
              fontStyle: "italic",
              color: "#dc43ff",
            }}
          >
            DEVELOPER
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 25, color: "#aaa2af", maxWidth: 720 }}>
            Frontend engineering & UI design — {site.city}, {site.country}
          </div>
          <div
            style={{
              display: "flex",
              width: 108,
              height: 3,
              background: "linear-gradient(90deg, #dc43ff, rgba(220,67,255,0))",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}

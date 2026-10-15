import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const tints: Record<string, string> = {
  commerce: "rgba(220,67,255,0.40)",
  portfolio: "rgba(150,70,255,0.38)",
  api: "rgba(100,30,220,0.40)",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);

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
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${
              tints[project?.className ?? "portfolio"]
            }, rgba(9,8,12,0) 70%)`,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 900, letterSpacing: 6 }}>
            KORN<span style={{ color: "#dc43ff" }}>G</span>
          </div>
          <div style={{ display: "flex", fontSize: 19, letterSpacing: 5, color: "#aaa2af" }}>
            {project ? `${project.number} / CASE STUDY` : "CASE STUDY"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#dc43ff",
              marginBottom: 22,
            }}
          >
            {project?.type ?? "SELECTED WORK"}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
            }}
          >
            {(project?.title ?? "Selected\nWork").split("\n").map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {(project?.technologies ?? []).map((technology) => (
              <div
                key={technology}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  border: "1px solid rgba(255,255,255,0.26)",
                  borderRadius: 999,
                  fontSize: 21,
                  color: "#d8d2dc",
                }}
              >
                {technology}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 21, color: "#aaa2af" }}>{site.author}</div>
        </div>
      </div>
    ),
    size,
  );
}

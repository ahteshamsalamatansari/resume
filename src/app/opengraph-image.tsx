import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}, ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const results = [
  { value: "7,000", label: "prospects, AI outreach drafts" },
  { value: "1.5M", label: "Q&A from a generative pipeline" },
  { value: "78% → 94%", label: "dataset accuracy" },
];

// Latin subset of Google Sans (the site font), bundled so the build needs no network.
const font = (weight: 400 | 700) => readFile(join(process.cwd(), "src/app/_fonts", `GoogleSans-${weight}.ttf`));

export default async function Image() {
  const [regular, bold] = await Promise.all([font(400), font(700)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "64px 72px",
          borderTop: "14px solid #14a800",
          color: "#222222",
          fontFamily: "Google Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#0b6b00", fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.08, marginTop: 22, maxWidth: 940, letterSpacing: -1.5 }}>
            Building AI systems that solve real business problems
          </div>
          <div style={{ fontSize: 28, color: "#5e6d55", marginTop: 22 }}>
            LLM Applications · RAG · AI Agents · Python Automation
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {results.map((r) => (
            <div
              key={r.value}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #e4e7e1",
                borderRadius: 16,
                padding: "18px 24px",
                background: "#f7f8f6",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0b6b00" }}>{r.value}</div>
              <div style={{ fontSize: 20, color: "#5e6d55", marginTop: 4 }}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Google Sans", data: regular, weight: 400, style: "normal" },
        { name: "Google Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

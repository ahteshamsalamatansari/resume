import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Metric } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };

// Latin subset of Google Sans (the site font) with layout tables removed,
// bundled so the build needs no network. See docs/SEO.md before regenerating.
// Cached so the file read is not treated as uncached I/O, which would make
// every image route render on demand instead of at build time.
async function loadFonts() {
  "use cache";
  const read = (weight: 400 | 700) => readFile(join(process.cwd(), "src/app/_fonts", `GoogleSans-${weight}.ttf`));
  const [regular, bold] = await Promise.all([read(400), read(700)]);
  return { regular: new Uint8Array(regular), bold: new Uint8Array(bold) };
}

/** Shared 1200×630 social card used by the home page and every case study. */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  results,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  results: Metric[];
}) {
  const { regular, bold } = await loadFonts();
  // A typed array can be a view into a larger buffer; pass only its own bytes.
  const bytes = (a: Uint8Array) => a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength) as ArrayBuffer;
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
          <div style={{ fontSize: 30, color: "#0b6b00", fontWeight: 700 }}>{eyebrow}</div>
          <div
            style={{
              fontSize: title.length > 48 ? 58 : 66,
              fontWeight: 700,
              lineHeight: 1.08,
              marginTop: 22,
              maxWidth: 1000,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#5e6d55", marginTop: 22 }}>{subtitle}</div>
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
      ...ogSize,
      fonts: [
        { name: "Google Sans", data: bytes(regular), weight: 400, style: "normal" },
        { name: "Google Sans", data: bytes(bold), weight: 700, style: "normal" },
      ],
    },
  );
}

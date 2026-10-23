import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// PNG twin of icon.svg for iOS home screens, which ignore SVG icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#108a00",
          color: "#ffffff",
          fontSize: 112,
          fontWeight: 700,
          fontStyle: "italic",
          fontFamily: "serif",
        }}
      >
        A
      </div>
    ),
    size,
  );
}

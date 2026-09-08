import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

/** Generated at build time — no binary asset to keep in sync. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          borderRadius: 96,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 340,
            height: 340,
            borderRadius: '50%',
            border: '24px solid #1F6F5F',
            color: '#6FCF97',
            fontSize: 220,
            fontWeight: 800,
            letterSpacing: -12,
          }}
        >
          A
        </div>
      </div>
    ),
    size
  );
}

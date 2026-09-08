import { ImageResponse } from 'next/og';
import { CONTACT, METRICS } from '@/lib/data';
import { PROFILE_DATA_URI } from '@/lib/profile-image';

export const runtime = 'edge';
export const alt = 'Ahtesham Salamat Ansari — AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The card every LinkedIn, WhatsApp, Slack and X share renders. Generated at
 * build time from the same data as the site, so it can never drift.
 *
 * Widths are fixed rather than left to flex: satori will not wrap or shrink
 * the headline on its own, so the text column and the portrait each get an
 * explicit width that fits inside the 1056px of space within the padding.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: 810 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: '#6FCF97',
                fontSize: 25,
                letterSpacing: 6,
                textTransform: 'uppercase',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: '#6FCF97',
                }}
              />
              {CONTACT.role}
            </div>

            <div
              style={{
                display: 'flex',
                color: '#EEEEEE',
                fontSize: 68,
                fontWeight: 800,
                letterSpacing: -2.5,
                marginTop: 26,
                lineHeight: 1.05,
              }}
            >
              {CONTACT.name}
            </div>

            <div
              style={{
                display: 'flex',
                color: '#2FA084',
                fontSize: 34,
                fontWeight: 600,
                marginTop: 16,
                letterSpacing: -0.5,
              }}
            >
              Production GenAI, RAG systems &amp; data at scale.
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROFILE_DATA_URI}
            alt=""
            width={196}
            height={196}
            style={{
              width: 196,
              height: 196,
              flexShrink: 0,
              borderRadius: '50%',
              border: '4px solid #1F6F5F',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* metrics rail */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 2,
              background: '#1F6F5F',
              marginBottom: 30,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {METRICS.map((m) => (
              <div
                key={m.label}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    display: 'flex',
                    color: '#6FCF97',
                    fontSize: 46,
                    fontWeight: 700,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    display: 'flex',
                    color: '#8A9A95',
                    fontSize: 21,
                    marginTop: 6,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}

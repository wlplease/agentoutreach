import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AgentOutreach — AI Sales Agents for Any Business';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #08080f 0%, #0e0e1a 50%, #151525 100%)',
          color: '#e8e8f0',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -3,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          <span>Agent</span>
          <span style={{ color: '#00d4ff' }}>Outreach</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#7a7a96',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          AI Sales Agents for Any Business
        </div>
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 40,
            fontSize: 18,
            color: '#7a7a96',
          }}
        >
          <span>LinkedIn</span>
          <span style={{ color: '#2a2a3d' }}>·</span>
          <span>X</span>
          <span style={{ color: '#2a2a3d' }}>·</span>
          <span>Reddit</span>
          <span style={{ color: '#2a2a3d' }}>·</span>
          <span>Discord</span>
          <span style={{ color: '#2a2a3d' }}>·</span>
          <span>From $199/mo</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

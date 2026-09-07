import { ImageResponse } from "next/og";

export const alt =
  "Land Tenure Field Study — Uganda. A field study behind a proposed land-verification and property platform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card in the deed-plan idiom: sheet ground, cadastral grid, the surveyed
 *  parcel with its beacons. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F7F6F1",
          color: "#1A1A17",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#D3D0C4 1px, transparent 1px), linear-gradient(90deg, #D3D0C4 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.45,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderBottom: "16px solid #1F3D2B",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 64px",
            width: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#4A473E",
              borderLeft: "5px solid #9C4A2E",
              paddingLeft: 16,
              marginBottom: 34,
            }}
          >
            Filing ref. LT/2026 · four instruments
          </div>

          <div style={{ display: "flex", fontSize: 62, lineHeight: 1.1, letterSpacing: -1 }}>
            Land Tenure Field Study
          </div>

          <div style={{ display: "flex", fontSize: 34, color: "#1F3D2B", marginTop: 18 }}>
            Uganda · tenure, titling &amp; land fraud
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#4A473E",
              marginTop: 30,
              maxWidth: 560,
              lineHeight: 1.4,
            }}
          >
            Landholders, surveyors, agents and land officials — answering the questions
            behind a proposed land-verification platform.
          </div>
        </div>

        {/* Satori has no <text> support, so the plate's labels are laid out
            around the SVG rather than inside it. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 500,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#FCFBF7",
              border: "2px solid #1F3D2B",
              padding: "26px 26px 18px",
              boxShadow: "6px 8px 0 rgba(31,61,43,0.10)",
            }}
          >
            <div style={{ display: "flex", position: "relative" }}>
              <svg width="300" height="290" viewBox="0 0 300 300">
                <polygon
                  points="60,60 220,44 250,150 200,270 90,255 48,150"
                  fill="rgba(156,74,46,0.10)"
                  stroke="#1F3D2B"
                  strokeWidth="2.5"
                />
                <circle cx="60" cy="60" r="6" fill="#9C4A2E" />
                <circle cx="220" cy="44" r="6" fill="#9C4A2E" />
                <circle cx="250" cy="150" r="6" fill="#9C4A2E" />
                <circle cx="200" cy="270" r="6" fill="#9C4A2E" />
                <circle cx="90" cy="255" r="6" fill="#9C4A2E" />
                <circle cx="48" cy="150" r="6" fill="#9C4A2E" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 128,
                  left: 0,
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", fontSize: 22, color: "#1F3D2B" }}>Plot 14</div>
                <div style={{ display: "flex", fontSize: 14, color: "#4A473E", marginTop: 4 }}>
                  Block 27 · 0.71 ha
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                borderTop: "1px solid #D3D0C4",
                paddingTop: 12,
                marginTop: 6,
                width: 300,
                justifyContent: "center",
                fontSize: 13,
                color: "#4A473E",
              }}
            >
              SCALE 1:2500 · ARC 1960 / UTM 36N
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

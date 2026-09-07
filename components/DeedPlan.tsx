/** Illustrative deed plan of a surveyed parcel — the hero's figure.
 *  Text inside the SVG picks up the Archivo / Spectral faces through the
 *  next/font CSS variables rather than a hardcoded family name. */
export default function DeedPlan() {
  return (
    <figure
      className="m-0 border border-rule-2 bg-paper px-4 pt-4 pb-3 shadow-[2px_3px_0_rgba(31,61,43,0.08)] max-[820px]:max-w-[360px]"
      aria-label="Illustrative deed plan of a surveyed parcel"
    >
      <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full">
        <defs>
          <pattern
            id="hatch"
            width="7"
            height="7"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke="#9C4A2E" strokeWidth="0.5" opacity="0.35" />
          </pattern>
        </defs>

        <rect x="0.5" y="0.5" width="299" height="339" fill="none" stroke="#1F3D2B" strokeWidth="1" />
        <polygon
          points="60,60 220,44 250,150 200,270 90,255 48,150"
          fill="url(#hatch)"
          stroke="#1F3D2B"
          strokeWidth="1.5"
        />

        <g style={{ fontFamily: "var(--font-archivo)" }} fontSize="8" fill="#1A1A17">
          <text x="128" y="38">124.6 m</text>
          <text x="240" y="105">98.2 m</text>
          <text x="228" y="220">142.0 m</text>
          <text x="130" y="272">150.4 m</text>
          <text x="52" y="205">118.7 m</text>
          <text x="36" y="105">96.1 m</text>
        </g>

        <g fill="#9C4A2E">
          <circle cx="60" cy="60" r="2.6" />
          <circle cx="220" cy="44" r="2.6" />
          <circle cx="250" cy="150" r="2.6" />
          <circle cx="200" cy="270" r="2.6" />
          <circle cx="90" cy="255" r="2.6" />
          <circle cx="48" cy="150" r="2.6" />
        </g>

        <g style={{ fontFamily: "var(--font-archivo)" }} fontSize="9" fontWeight="600" fill="#1F3D2B">
          <text x="46" y="54">A</text>
          <text x="224" y="40">B</text>
          <text x="255" y="152">C</text>
          <text x="205" y="282">D</text>
          <text x="78" y="268">E</text>
          <text x="34" y="150">F</text>
        </g>

        <text
          x="150"
          y="158"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-spectral)" }}
          fontSize="13"
          fill="#1F3D2B"
        >
          Plot 14
        </text>
        <text
          x="150"
          y="174"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-archivo)" }}
          fontSize="8"
          fill="#4A473E"
        >
          Block 27 · 0.71 ha
        </text>

        <line x1="20" y1="300" x2="280" y2="300" stroke="#D3D0C4" />
        <text x="20" y="318" style={{ fontFamily: "var(--font-archivo)" }} fontSize="7.5" fill="#4A473E">
          SCALE 1:2500 · GRID: ARC 1960 / UTM 36N
        </text>
        <text x="20" y="330" style={{ fontFamily: "var(--font-archivo)" }} fontSize="7.5" fill="#4A473E">
          DERIVED · NOT FOR CONVEYANCE
        </text>
      </svg>

      <figcaption className="mt-[10px] border-t border-rule pt-2 text-[11.5px] text-ink-2">
        Illustrative parcel. Bearings and beacons shown as on a deed plan.
      </figcaption>
    </figure>
  );
}

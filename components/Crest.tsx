/** The six-beacon parcel mark used in the masthead and the colophon. */
export default function Crest({ size = 34, dot = 1.8 }: { size?: number; dot?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <polygon
        points="6,34 4,14 20,4 34,10 36,30 22,37"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="6" cy="34" r={dot} fill="currentColor" />
      <circle cx="4" cy="14" r={dot} fill="currentColor" />
      <circle cx="20" cy="4" r={dot} fill="currentColor" />
      <circle cx="34" cy="10" r={dot} fill="currentColor" />
      <circle cx="36" cy="30" r={dot} fill="currentColor" />
      <circle cx="22" cy="37" r={dot} fill="currentColor" />
    </svg>
  );
}

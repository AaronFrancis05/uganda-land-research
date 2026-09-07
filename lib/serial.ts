/** Filing serial for a response, e.g. LT/2026/K4821.
 *  Cosmetic only — it is shown on the form plate and the thanks stamp, and is
 *  not stored. Generate it client-side so server and client HTML agree. */
export function makeSerial(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  const l = "ABCDEFGHJKMNPQRSTUVWXYZ";
  return "LT/2026/" + l[Math.floor(Math.random() * l.length)] + n;
}

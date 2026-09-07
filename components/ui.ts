/* Class strings for the handful of patterns that repeat across pages.
   Values are lifted straight from the original styles.css so the rendered
   result is identical. */

/** .shell — the 1040px measure with 30px gutters. */
export const SHELL = "mx-auto w-full max-w-[1040px] px-[30px]";

/** .shell.narrow — the 660px measure used by the form, thanks and method pages. */
export const SHELL_NARROW = "mx-auto w-full max-w-[660px] px-[30px]";

/** .btn */
const BTN_BASE =
  "inline-flex items-center rounded-[1px] border-[1.5px] border-green px-5 py-[11px] text-[14.5px] font-semibold cursor-pointer";

/** .btn.primary */
export const BTN_PRIMARY = `${BTN_BASE} bg-green text-paper hover:bg-green-2 disabled:opacity-50 disabled:cursor-not-allowed`;

/** .btn.line */
export const BTN_LINE = `${BTN_BASE} bg-transparent text-green hover:bg-sheet-2`;

/** .sec-head */
export const SEC_HEAD = "mb-[26px] pb-[14px] border-b border-rule";
export const SEC_HEAD_TITLE = "text-[26px] text-ink";
export const SEC_HEAD_SUB = "mt-[6px] text-[15px] text-ink-2";

/** .hero-actions */
export const HERO_ACTIONS = "flex flex-wrap gap-3";

/** .emptyq */
export const EMPTY_Q = "text-[13.5px] text-ink-2";

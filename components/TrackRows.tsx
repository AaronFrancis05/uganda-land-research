import Link from "next/link";
import { TRACK_ORDER, TRACKS } from "@/lib/tracks";
import type { TrackKey } from "@/lib/types";

/** Row copy for the four instruments, as shown on the tracks list. */
const ROW_DESC: Record<TrackKey, string> = {
  native:
    "Anyone who owns, rents, farms, or has tried to buy land, including diaspora families buying from abroad.",
  surveyor:
    "Licensed and articled surveyors and mapping professionals working on demarcation and cadastre.",
  realtor:
    "Anyone who lists, sells, manages, or develops property, independent or with an agency.",
  official:
    "Staff of MLHUD, the Land Information Centre, Zonal Offices, District Land Boards, the Land Commission, or NIRA.",
};

const TAG_BG: Record<TrackKey, string> = {
  native: "bg-native",
  surveyor: "bg-surveyor",
  realtor: "bg-realtor",
  official: "bg-official",
};

export default function TrackRows() {
  return (
    <div className="flex flex-col border-t border-rule-2">
      {TRACK_ORDER.map((key, i) => (
        <Link
          key={key}
          href={`/survey/${key}`}
          className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-[22px] border-b border-rule-2 px-2 py-[22px] text-left transition-[background-color,padding-left] duration-[140ms] hover:bg-paper hover:pl-4 max-[520px]:grid-cols-[auto_1fr] max-[520px]:gap-y-[10px]"
        >
          <span className="font-serif text-[22px] font-semibold text-rule-2">
            {String(i + 1).padStart(2, "0")}
          </span>

          <span>
            <span className="block font-serif text-[20px] font-semibold text-ink">
              {TRACKS[key].title}
            </span>
            <span className="mt-1 block max-w-[60ch] text-[14px] text-ink-2">
              {ROW_DESC[key]}
            </span>
          </span>

          <span className="flex flex-col items-end gap-[9px] whitespace-nowrap max-[520px]:col-span-2 max-[520px]:flex-row max-[520px]:items-center max-[520px]:justify-between">
            <span
              className={`rounded-[1px] px-[9px] py-[3px] text-[11px] font-semibold text-paper ${TAG_BG[key]}`}
            >
              {TRACKS[key].label}
            </span>
            <span className="text-[13px] font-semibold text-green">Open &rarr;</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

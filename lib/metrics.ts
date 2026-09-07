import { unstable_cache } from "next/cache";
import { getSupabase } from "./supabase";
import type { OptionCount, TrackTotal } from "./types";

/* Reads against the public read-only aggregate views. Individual rows are not
   readable under RLS; only these pooled counts are exposed.

   Both reads are cached for a minute. /findings is dynamic on ?track, but every
   track is drawn from the same two result sets, so switching tracks costs no
   extra database work. */

const REVALIDATE = 60;

export const getTrackTotals = unstable_cache(
  async (): Promise<TrackTotal[] | null> => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data, error } = await sb.from("metrics_track_totals").select("*");
    if (error) return null;
    return (data as TrackTotal[]) ?? [];
  },
  ["metrics_track_totals"],
  { revalidate: REVALIDATE, tags: ["metrics"] },
);

export const getOptionCounts = unstable_cache(
  async (): Promise<OptionCount[] | null> => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data, error } = await sb.from("metrics_option_counts").select("*");
    if (error) return null;
    return (data as OptionCount[]) ?? [];
  },
  ["metrics_option_counts"],
  { revalidate: REVALIDATE, tags: ["metrics"] },
);

export function sumResponses(totals: TrackTotal[] | null): number | null {
  if (!totals) return null;
  return totals.reduce((a, r) => a + (r.total_responses || 0), 0);
}

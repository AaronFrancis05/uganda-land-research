/* Supabase connection — the publishable (anon) key is designed to be public.
   Write access is limited by Row Level Security: the browser may INSERT survey
   responses but cannot read individual rows. Aggregate counts are served through
   the metrics_* views only. */
window.LT_CONFIG = {
  SUPABASE_URL: "https://llxxcnrdrkshqddxkyxr.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_-UknHWPFMltEzEHU6-u7mw_rj3IQI_o"
};

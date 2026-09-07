"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** The site previously routed on the hash (#/findings, #/about). Links shared
 *  before the move still carry them, so translate them to the real paths once
 *  on load. */
const MAP: Record<string, string> = {
  "#/findings": "/findings",
  "#/about": "/about",
  "#/": "/",
};

export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const target = MAP[window.location.hash];
    if (target && window.location.pathname === "/" && target !== "/") {
      router.replace(target);
    } else if (window.location.hash === "#/") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [router]);

  return null;
}

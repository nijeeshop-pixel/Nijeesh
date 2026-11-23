"use client";
import { useEffect, useState } from "react";

/** true once the preloader has finished (used to start the hero intro) */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.__siteLoaded) {
      setLoaded(true);
      return;
    }
    const on = () => setLoaded(true);
    window.addEventListener("site:loaded", on);
    return () => window.removeEventListener("site:loaded", on);
  }, []);
  return loaded;
}

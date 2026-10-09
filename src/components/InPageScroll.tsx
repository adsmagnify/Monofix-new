"use client";

import { useEffect } from "react";

export function InPageScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!link || !href || !href.includes("#")) return;

      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.replace(/^#/, ""));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (url.hash !== window.location.hash) {
        history.pushState(null, "", url.hash);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

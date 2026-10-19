"use client";

import { useEffect } from "react";

function scrollToSection(id: string, behavior: ScrollBehavior) {
  if (!id || id === "hero") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector("header");
  const bar = header?.firstElementChild;
  const headerBottom =
    bar instanceof HTMLElement
      ? bar.getBoundingClientRect().bottom +
        (header instanceof HTMLElement ? parseFloat(getComputedStyle(header).borderBottomWidth) || 0 : 0)
      : header instanceof HTMLElement
        ? header.getBoundingClientRect().bottom
        : 0;

  const delta = Math.round(el.getBoundingClientRect().top - headerBottom);
  if (delta !== 0) {
    window.scrollBy({ top: delta, behavior });
  }
}

export function InPageScroll() {
  useEffect(() => {
    const go = (id: string, behavior: ScrollBehavior) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(id, behavior));
      });
    };

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
      if (!document.getElementById(id) && id !== "hero") return;

      event.preventDefault();
      go(id, "smooth");
      if (url.hash !== window.location.hash) {
        history.pushState(null, "", url.hash);
      }
    };

    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (id) go(id, "auto");
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);

    if (window.location.hash) {
      window.scrollTo(0, 0);
      go(decodeURIComponent(window.location.hash.replace(/^#/, "")), "auto");
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  return null;
}

import React from "react";
import { cookies } from "next/headers";
import { TECH_LOGO_PRELOAD_URLS } from "@/ui/shared/constants/tech-logo-urls";

/**
 * Inline theme script - runs before React hydrates to prevent theme flash.
 * Reads theme from localStorage, then cookie, then system preference.
 * Applies class="dark" on html when dark theme; CSS vars in globals.css react to .dark.
 */
export default async function Head() {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore?.get?.("theme")?.value ?? null;

  // Script: 1) try localStorage, 2) try cookie, 3) system preference
  const script = `(function() {
    try {
      var root = document.documentElement;
      var theme = localStorage.getItem('theme');
      if (!theme || theme === 'keo') theme = 'system';
      if (theme === 'system') {
        var cookieMatch = document.cookie.match(/theme=([^;]+)/);
        if (cookieMatch) {
          var c = cookieMatch[1];
          if (c === 'light' || c === 'dark') theme = c;
        }
        if (theme === 'system') {
          theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
      }
      var isDark = theme === 'dark';
      root.classList.toggle('dark', isDark);
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } catch (e) {}
  })();`;

  return (
    <>
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
      {TECH_LOGO_PRELOAD_URLS.map((href) => (
        <link key={href} rel="preload" as="image" href={href} />
      ))}
      <script
        id="klab-theme-init"
        dangerouslySetInnerHTML={{ __html: script }}
      />
    </>
  );
}

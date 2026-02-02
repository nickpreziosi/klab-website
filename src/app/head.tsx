import React from "react";
import { cookies } from "next/headers";

function rgbForTheme(theme: string | null) {
  if (!theme) return { main: "250, 250, 250", white: "20, 20, 20" };
  if (theme === "dark") return { main: "23, 25, 32", white: "250, 250, 250" };
  if (theme === "light") return { main: "250, 250, 250", white: "20, 20, 20" };
  if (theme === "keo") return { main: "0, 23, 45", white: "250, 250, 250" };
  return { main: "250, 250, 250", white: "20, 20, 20" };
}

export default async function Head() {
  // read server-side cookie if present
  // cookies() typing can vary across Next versions; cast to any to be defensive
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const cookieStore: any = await cookies();
  const cookieTheme = cookieStore?.get?.("theme")?.value ?? null;

  // If we have a concrete cookie theme (not 'system'), render a server-side
  // <style> tag with the CSS variables so the browser computes the correct
  // colors on first paint without any client-side JS.
  if (cookieTheme && cookieTheme !== "system") {
    const { main, white } = rgbForTheme(cookieTheme);
    const css = `:root{--main-color-rgb:${main};--secondary-color-rgb:${white};}`;
    return <style id="keo-theme-inline">{css}</style>;
  }

  // Otherwise fall back to a small inline script that reads localStorage or
  // system preference on the client and sets inline styles before paint.
  const script = `(() => {
    try {
      var theme = null;
      try { theme = localStorage.getItem('theme'); } catch (e) { theme = null; }
      if (!theme) theme = 'keo';
      if (theme === 'system') {
        try { theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { theme = 'light'; }
      }
      var main = '250, 250, 250';
      var white = '20, 20, 20';
      if (theme === 'dark') { main = '23, 25, 32'; white = '250, 250, 250'; }
      else if (theme === 'light') { main = '250, 250, 250'; white = '20, 20, 20'; }
      else if (theme === 'keo') { main = '0, 23, 45'; white = '250, 250, 250'; }
      try { var r = document.documentElement; r.style.setProperty('--main-color-rgb', main); r.style.setProperty('--secondary-color-rgb', white); r.setAttribute('data-theme', theme); } catch (e) {}
    } catch (err) {}
  })();`;

  return (
    <script id="keo-theme-init" dangerouslySetInnerHTML={{ __html: script }} />
  );
}

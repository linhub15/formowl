/**
 * Credit: https://github.com/rfoel/use-prefers-color-scheme
 *
 * Customized for this project.
 */

import { useEffect, useState } from "react";

type SchemeOptions = "dark" | "light" | "no-preference";

export function usePrefersColorScheme() {
  const [preferredColorSchema, setPreferredColorSchema] = useState<
    SchemeOptions
  >(() => {
    if (typeof window === "undefined") return "no-preference";

    // since window.matchMedia is synchronous we can initialize the state with the right value
    // preventing a flash of wrong theme on first render
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isLight = window.matchMedia("(prefers-color-scheme: light)");

    return isDark.matches
      ? "dark"
      : isLight.matches
      ? "light"
      : "no-preference";
  });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    // 1. define MediaQueryList observables
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isLight = window.matchMedia("(prefers-color-scheme: light)");

    // 2. subscribe on changes
    //
    // Is modern "matchMedia" implementation ???
    if (typeof isLight.addEventListener === "function") {
      // In modern browsers MediaQueryList should subclass EventTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
      const darkListener = ({ matches }: MediaQueryListEvent) => {
        matches && setPreferredColorSchema("dark");
      };
      const lightListener = ({ matches }: MediaQueryListEvent) => {
        matches && setPreferredColorSchema("light");
      };
      isDark.addEventListener("change", darkListener);
      isLight.addEventListener("change", lightListener);
      return () => {
        isDark.removeEventListener("change", darkListener);
        isLight.removeEventListener("change", lightListener);
      };
    }

    if (typeof isLight.addListener === "function") {
      // In some early implementations MediaQueryList existed, but did not
      // subclass EventTarget
      const listener = () =>
        setPreferredColorSchema(
          isDark.matches ? "dark" : isLight.matches ? "light" : "no-preference",
        );
      // This is two state updates if a user changes from dark to light, but
      // both state updates will be consistent and should be batched by React,
      // resulting in only one re-render
      isDark.addListener(listener);
      isLight.addListener(listener);
      return () => {
        isDark.removeListener(listener);
        isLight.removeListener(listener);
      };
    }

    return;
  }, []);

  return preferredColorSchema;
}

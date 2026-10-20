import { useEffect, useState } from "react";

// Tiny History API router: "/" is home; other named routes are pages.
// Add a name + path here for each new page.
export type Route = "home" | "projects" | "music" | "social";

const PATHS: Record<Route, string> = {
  home: "/",
  projects: "/projects",
  music: "/music",
  social: "/social",
};

export function pathFor(route: Route): string {
  return PATHS[route];
}

function parse(): Route {
  const p = window.location.pathname.replace(/\/+$/, "") || "/";
  const hit = (Object.keys(PATHS) as Route[]).find((r) => PATHS[r] === p);
  return hit ?? "home"; // unknown paths fall back to home
}

export function navigate(to: Route) {
  const path = PATHS[to];
  if (window.location.pathname !== path) window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return route;
}
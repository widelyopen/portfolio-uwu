import type { ComponentType, MouseEvent, SVGProps } from "react";
import { navigate, pathFor, type Route } from "../hooks/useRoute";
import { FolderIcon, HomeIcon, MusicIcon, SocialIcon } from "./icons";
import "./nav.css";

type Item = {
  id: Route;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// To add a page: add it to Route + PATHS in useRoute.ts, an icon in icons.tsx, and an entry here.
const ITEMS: Item[] = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "projects", label: "Projects", Icon: FolderIcon },
  { id: "music", label: "Music", Icon: MusicIcon },
  { id: "social", label: "Social", Icon: SocialIcon },
];

function go(e: MouseEvent<HTMLAnchorElement>, to: Route) {
  // let ctrl/cmd/shift-click and middle-click open a new tab as usual
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(to);
}

export function Nav({ route }: { route: Route }) {
  return (
    <nav className="nav" aria-label="Main">
      {ITEMS.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={pathFor(id)}
          onClick={(e) => go(e, id)}
          data-label={label}
          aria-label={label}
          aria-current={route === id ? "page" : undefined}
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
}
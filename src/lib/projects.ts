export interface Project {
  name: string;
  description: string;
  url: string; // website
  invite: string; // Discord invite (https:// is added if missing)
  image?: string; // preview shown at the top of the card
  icon?: string; // small logo next to the name (a file in public/, e.g. "/projects/x.png")
}

// Edit this list to add or change projects.
export const projects: Project[] = [
  {
    name: "stains",
    description: "my project. take a look at the site, or hop into the server.",
    url: "https://stains.rocks/",
    invite: "discord.gg/skilled",
    icon: "/projects/stains-icon.png",
    // Live screenshot of the site. To use your own, put a file in public/projects/
    // and point this at it, e.g. "/projects/stains.png".
    image: "/projects/preview.png",
  },
];

export function withProtocol(link: string): string {
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}
export type SocialLink = {
  name: string;
  handle: string;
  url: string;
  description: string;
  /** Static banner URL (used as-is, e.g. wsp OG image). */
  image?: string;
  /** Fetch a live banner/icon at runtime via the /api proxies. */
  fetch?: "discord" | "telegram";
  /** Invite code (discord) or @username without @ (telegram). */
  fetchId?: string;
  accent?: "wsp" | "telegram" | "discord";
};

export const socials: SocialLink[] = [
  {
    name: "wsp",
    handle: "@21",
    url: "https://wsp.baby/21",
    description: "bright dreams on wsp.baby",
    image: "https://wsp.baby/embeds/og/21",
    accent: "wsp",
  },
  {
    name: "Telegram",
    handle: "@evictionletter",
    url: "https://t.me/evictionletter",
    description: "channel & updates",
    fetch: "telegram",
    fetchId: "evictionletter",
    accent: "telegram",
  },
  {
    name: "Discord",
    handle: "vacations",
    url: "https://discord.gg/vacations",
    description: "join the server",
    fetch: "discord",
    fetchId: "vacations",
    accent: "discord",
  },
];

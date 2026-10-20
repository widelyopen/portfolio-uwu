export type SocialLink = {
  name: string;
  handle: string;
  url: string;
  description: string;
  image?: string; // banner at the top of the card
  accent?: "wsp" | "telegram" | "discord"; // tint when no image / as fallback
};

export const socials: SocialLink[] = [
  {
    name: "wsp",
    handle: "@21",
    url: "https://wsp.baby/21",
    description: "bright dreams on wsp.baby",
    // Live OG banner; falls back to /social/wsp.svg if it fails to load.
    image: "https://wsp.baby/embeds/og/21",
    accent: "wsp",
  },
  {
    name: "Telegram",
    handle: "@evictionletter",
    url: "https://t.me/evictionletter",
    description: "channel & updates",
    image: "/social/telegram.svg",
    accent: "telegram",
  },
  {
    name: "Discord",
    handle: "vacations",
    url: "https://discord.gg/vacations",
    description: "join the server",
    image: "/social/discord.svg",
    accent: "discord",
  },
];

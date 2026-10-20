import type { LanyardData } from "./lanyard";

// Open the site with ?demo to preview the layout without Lanyard.
const art =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#5b3df5'/><stop offset='.55' stop-color='#c2417a'/><stop offset='1' stop-color='#f0a35e'/></linearGradient></defs><rect width='300' height='300' fill='url(#g)'/></svg>`,
  );

export const demoData: LanyardData = {
  discord_user: { id: "0", username: "qio", avatar: null, global_name: "Qio", public_flags: (1 << 6) | (1 << 17) | (1 << 22) },
  discord_status: "dnd",
  activities: [
    { id: "c", name: "Custom Status", type: 4, state: "fixing one more thing", emoji: { name: "🌑" } },
    {
      id: "g",
      name: "Visual Studio Code",
      type: 0,
      details: "Editing cogs/miami.py",
      state: "Workspace: miami",
      timestamps: { start: Date.now() - 1000 * 60 * 47 },
    },
  ],
  listening_to_spotify: true,
  spotify: {
    track_id: "demo",
    song: "Hurt Me",
    artist: "Juice WRLD",
    album: "Demo",
    album_art_url: art,
    timestamps: { start: Date.now() - 62000, end: Date.now() + 118000 },
  },
  active_on_discord_desktop: true,
  active_on_discord_mobile: false,
  active_on_discord_web: false,
};

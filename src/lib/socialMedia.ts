export type Banner = {
  url: string;
  /** "cover" for real banners/photos; "icon" when we only have a square logo */
  fit: "cover" | "icon";
};

type DiscordInvite = {
  guild?: {
    id: string;
    banner: string | null;
    splash: string | null;
    icon: string | null;
  };
};

function discordAsset(
  kind: "banners" | "splashes" | "icons",
  guildId: string,
  hash: string,
  size: number,
): string {
  const animated = hash.startsWith("a_");
  const ext = kind === "splashes" ? "jpg" : animated ? "gif" : "png";
  return `https://cdn.discordapp.com/${kind}/${guildId}/${hash}.${ext}?size=${size}`;
}

/** Resolve a Discord invite code to a banner (preferred) or server icon. */
export async function fetchDiscordBanner(inviteCode: string): Promise<Banner | null> {
  const res = await fetch(`/api/discord/invites/${encodeURIComponent(inviteCode)}?with_counts=true`);
  if (!res.ok) return null;
  const data = (await res.json()) as DiscordInvite;
  const g = data.guild;
  if (!g) return null;

  if (g.banner) return { url: discordAsset("banners", g.id, g.banner, 1024), fit: "cover" };
  if (g.splash) return { url: discordAsset("splashes", g.id, g.splash, 1024), fit: "cover" };
  if (g.icon) return { url: discordAsset("icons", g.id, g.icon, 512), fit: "icon" };
  return null;
}

/** Scrape the public t.me page for the channel/user photo. */
export async function fetchTelegramIcon(username: string): Promise<Banner | null> {
  const res = await fetch(`/api/telegram/${encodeURIComponent(username)}`);
  if (!res.ok) return null;
  const html = await res.text();
  const match =
    html.match(/property="og:image"\s+content="([^"]+)"/i) ??
    html.match(/content="([^"]+)"\s+property="og:image"/i) ??
    html.match(/class="tgme_page_photo_image"[^>]*src="([^"]+)"/i);
  const url = match?.[1];
  return url ? { url, fit: "icon" } : null;
}

import { useEffect, useState } from "react";

export interface Badge {
  icon: string;
  label: string;
}
export interface ProfileExtras {
  banner: string | null;
  badges: Badge[];
}

// Best-effort: banner + badges aren't part of Lanyard, so this asks a public
// profile proxy. If it's down or the shape changes, the page just skips them.
export function useProfile(userId: string, bannerOverride: string): ProfileExtras {
  const [extras, setExtras] = useState<ProfileExtras>({ banner: null, badges: [] });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://dcdn.dstn.to/profile/${userId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        const hash: string | undefined = json.user?.banner;
        const banner = hash
          ? `https://cdn.discordapp.com/banners/${userId}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}?size=1024`
          : null;
        const badges: Badge[] = Array.isArray(json.badges)
          ? json.badges
              .filter((b: { icon?: string }) => b.icon)
              .map((b: { icon: string; description?: string }) => ({
                icon: `https://cdn.discordapp.com/badge-icons/${b.icon}.png`,
                label: b.description ?? "",
              }))
          : [];
        setExtras({ banner, badges });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { ...extras, banner: bannerOverride || extras.banner };
}

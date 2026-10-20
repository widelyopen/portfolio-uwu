import { useEffect, useState } from "react";

export interface Badge {
  icon: string;
  label: string;
}

// Best-effort: badges aren't part of Lanyard, so this asks a public profile proxy.
// If it's down or the shape changes, the page just skips them.
export function useBadges(userId: string): Badge[] {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://dcdn.dstn.to/profile/${userId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled || !json || !Array.isArray(json.badges)) return;
        setBadges(
          json.badges
            .filter((b: { icon?: string }) => b.icon)
            .map((b: { icon: string; description?: string }) => ({
              icon: `https://cdn.discordapp.com/badge-icons/${b.icon}.png`,
              label: b.description ?? "",
            })),
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return badges;
}

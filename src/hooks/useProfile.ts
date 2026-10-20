import { useEffect, useState } from "react";
import { badgeIcon, type Badge } from "../lib/badges";

// Best-effort: a public profile proxy knows the badges that aren't flags (Nitro,
// Server Booster, ...). If it's down or the shape changes, the page falls back to flag badges.
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
              icon: badgeIcon(b.icon),
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

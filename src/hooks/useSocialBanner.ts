import { useEffect, useState } from "react";
import { fetchDiscordBanner, fetchTelegramIcon, type Banner } from "../lib/socialMedia";
import type { SocialLink } from "../lib/social";

export function useSocialBanner(s: SocialLink): Banner | null {
  const [banner, setBanner] = useState<Banner | null>(
    s.image ? { url: s.image, fit: "cover" } : null,
  );

  useEffect(() => {
    if (s.image) {
      setBanner({ url: s.image, fit: "cover" });
      return;
    }
    if (!s.fetch || !s.fetchId) {
      setBanner(null);
      return;
    }

    let cancelled = false;
    const load =
      s.fetch === "discord"
        ? fetchDiscordBanner(s.fetchId)
        : fetchTelegramIcon(s.fetchId);

    load
      .then((b) => {
        if (!cancelled) setBanner(b);
      })
      .catch(() => {
        if (!cancelled) setBanner(null);
      });

    return () => {
      cancelled = true;
    };
  }, [s.image, s.fetch, s.fetchId]);

  return banner;
}

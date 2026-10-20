import { useEffect, useState } from "react";

// The page's ambient light: album art while music plays, otherwise the profile banner.
export function Backdrop({ banner, art }: { banner: string | null; art: string | null }) {
  const [lastArt, setLastArt] = useState<string | null>(null);
  useEffect(() => {
    if (art) setLastArt(art);
  }, [art]);

  return (
    <div className="backdrop" aria-hidden="true">
      {banner && (
        <div
          className={`backdrop-layer banner${art ? "" : " on"}`}
          style={{ backgroundImage: `url("${banner}")` }}
        />
      )}
      {lastArt && (
        <div
          className={`backdrop-layer${art ? " on" : ""}`}
          style={{ backgroundImage: `url("${lastArt}")` }}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { artistImage, trackCover } from "../lib/art";

type Props = {
  artist: string;
  track?: string; // set for a track cover; leave out for an artist photo
  image?: string | null; // use this directly if Last.fm already gave a real image
  round?: boolean;
};

export function Thumb({ artist, track, image, round }: Props) {
  const [src, setSrc] = useState<string | null>(image ?? null);

  useEffect(() => {
    if (image) {
      setSrc(image);
      return;
    }
    let off = false;
    const p = track ? trackCover(artist, track) : artistImage(artist);
    p.then((url) => {
      if (!off) setSrc(url);
    });
    return () => {
      off = true;
    };
  }, [artist, track, image]);

  return (
    <span className={round ? "thumb round" : "thumb"}>
      {src ? <img src={src} alt="" loading="lazy" /> : <span>{(track ?? artist).charAt(0)}</span>}
    </span>
  );
}

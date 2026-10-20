import {
  ACTIVITY_VERB,
  activityImage,
  formatClock,
  type Activity,
  type SpotifyData,
} from "../lib/lanyard";
import { useNow } from "../hooks/useLanyard";

export function SpotifyBlock({ spotify }: { spotify: SpotifyData }) {
  const now = useNow(500);
  const { start, end } = spotify.timestamps;
  const total = end - start;
  const elapsed = Math.min(Math.max(now - start, 0), total);

  return (
    <div className="spotify">
      {spotify.album_art_url ? (
        <img className="spotify-art" src={spotify.album_art_url} alt="" />
      ) : (
        <div className="spotify-art" />
      )}
      <div className="spotify-text">
        <p className="muted small">Listening on Spotify</p>
        <a
          className="spotify-song"
          href={`https://open.spotify.com/track/${spotify.track_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {spotify.song}
        </a>
        <p>{spotify.artist}</p>
        <div className="progress" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${(elapsed / total) * 100}%` }} />
        </div>
        <p className="progress-times muted small">
          <span>{formatClock(elapsed)}</span>
          <span>{formatClock(total)}</span>
        </p>
      </div>
    </div>
  );
}

export function ActivityRow({ activity }: { activity: Activity }) {
  const now = useNow(1000);
  const image = activityImage(activity);
  const start = activity.timestamps?.start;
  const end = activity.timestamps?.end;

  return (
    <div className="activity">
      {image ? <img className="activity-art" src={image} alt="" /> : <div className="activity-art" />}
      <div>
        <p className="muted small">{ACTIVITY_VERB[activity.type] ?? "Playing"}</p>
        <p className="activity-name">{activity.name}</p>
        {activity.details && <p>{activity.details}</p>}
        {activity.state && <p>{activity.state}</p>}
        {start && !end && <p className="muted small">{formatClock(now - start)} elapsed</p>}
        {end && <p className="muted small">{formatClock(end - now)} left</p>}
      </div>
    </div>
  );
}

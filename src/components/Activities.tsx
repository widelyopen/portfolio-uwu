import {
  ACTIVITY_VERB,
  activityImage,
  formatClock,
  type Activity,
  type SpotifyData,
} from "../lib/lanyard";
import { useNow } from "../hooks/useLanyard";

export function SpotifyCard({ spotify }: { spotify: SpotifyData }) {
  const now = useNow(500);
  const { start, end } = spotify.timestamps;
  const total = end - start;
  const elapsed = Math.min(Math.max(now - start, 0), total);

  return (
    <div className="activity spotify">
      {spotify.album_art_url ? (
        <img className="activity-art" src={spotify.album_art_url} alt="" />
      ) : (
        <div className="activity-art" />
      )}
      <div className="activity-text">
        <p className="activity-verb">Listening to Spotify</p>
        <a
          className="activity-title"
          href={`https://open.spotify.com/track/${spotify.track_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {spotify.song}
        </a>
        <p className="activity-line">{spotify.artist}</p>
        <div className="progress" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${(elapsed / total) * 100}%` }} />
        </div>
        <p className="progress-times">
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
      {image ? (
        <img className="activity-art" src={image} alt="" />
      ) : (
        <div className="activity-art" />
      )}
      <div className="activity-text">
        <p className="activity-verb">{ACTIVITY_VERB[activity.type] ?? "Playing"}</p>
        <p className="activity-title">{activity.name}</p>
        {activity.details && <p className="activity-line">{activity.details}</p>}
        {activity.state && <p className="activity-line">{activity.state}</p>}
        {start && !end && (
          <p className="activity-line muted">{formatClock(now - start)} elapsed</p>
        )}
        {end && <p className="activity-line muted">{formatClock(end - now)} left</p>}
      </div>
    </div>
  );
}

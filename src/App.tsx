import { useEffect } from "react";
import { config } from "./config";
import { useLanyard } from "./hooks/useLanyard";
import { useBadges } from "./hooks/useProfile";
import { useRoute } from "./hooks/useRoute";
import { flagBadges } from "./lib/badges";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Music } from "./pages/Music";

export default function App() {
  const route = useRoute();
  const { data, state } = useLanyard(config.discordId);
  const profileBadges = useBadges(config.discordId);
  const badges = profileBadges.length
    ? profileBadges
    : flagBadges(data?.discord_user.public_flags ?? 0);

  // kept here (not in Home) so the status theme stays on every page
  useEffect(() => {
    document.documentElement.dataset.status = data?.discord_status ?? "offline";
  }, [data?.discord_status]);

  return (
    <>
      <Nav route={route} />
      {route === "music" ? <Music /> : <Home data={data} state={state} badges={badges} />}
    </>
  );
}

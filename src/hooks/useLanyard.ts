import { useEffect, useState } from "react";
import type { LanyardData } from "../lib/lanyard";
import { demoData } from "../lib/demo";

const DEMO = typeof location !== "undefined" && new URLSearchParams(location.search).has("demo");

export type ConnectionState = "connecting" | "live" | "missing";

const SOCKET_URL = "wss://api.lanyard.rest/socket";
const REST_URL = "https://api.lanyard.rest/v1/users";

// Live presence over Lanyard's WebSocket, with a REST fetch for a fast first paint
// and exponential-backoff reconnects.
export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(DEMO ? demoData : null);
  const [state, setState] = useState<ConnectionState>(DEMO ? "live" : "connecting");

  useEffect(() => {
    if (DEMO) return;
    let ws: WebSocket | null = null;
    let heartbeat: number | undefined;
    let retry: number | undefined;
    let closed = false;
    let attempts = 0;

    const connect = () => {
      ws = new WebSocket(SOCKET_URL);

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.op === 1) {
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
          heartbeat = window.setInterval(
            () => ws?.send(JSON.stringify({ op: 3 })),
            msg.d.heartbeat_interval,
          );
        } else if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          if (msg.d?.discord_user) {
            setData(msg.d as LanyardData);
            setState("live");
            attempts = 0;
          }
        }
      };

      ws.onclose = () => {
        window.clearInterval(heartbeat);
        if (closed) return;
        attempts += 1;
        retry = window.setTimeout(connect, Math.min(1000 * 2 ** attempts, 30000));
      };

      ws.onerror = () => ws?.close();
    };

    fetch(`${REST_URL}/${userId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setData((prev) => prev ?? (json.data as LanyardData));
          setState("live");
        } else {
          setState((s) => (s === "live" ? s : "missing"));
        }
      })
      .catch(() => {});

    connect();

    return () => {
      closed = true;
      window.clearInterval(heartbeat);
      window.clearTimeout(retry);
      ws?.close();
    };
  }, [userId]);

  return { data, state };
}

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

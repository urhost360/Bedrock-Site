import { useEffect, useState } from "react";
import { isRestaurantOpen } from "@/lib/hours";

export function useRestaurantOpen() {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setOpen(isRestaurantOpen());
    tick();
    setReady(true);

    const interval = window.setInterval(tick, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return ready ? open : true;
}

const TIMEZONE = "America/Chicago";

/** Minutes from midnight for each day (0 = Sunday). */
const SCHEDULE: Record<number, { open: number; close: number }> = {
  0: { open: 7 * 60, close: 15 * 60 },
  1: { open: 6 * 60, close: 21 * 60 },
  2: { open: 6 * 60, close: 21 * 60 },
  3: { open: 6 * 60, close: 21 * 60 },
  4: { open: 6 * 60, close: 21 * 60 },
  5: { open: 6 * 60, close: 21 * 60 },
  6: { open: 7 * 60, close: 21 * 60 },
};

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getLocalMinutes(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const day = DAY_INDEX[value("weekday")];
  const minutes = Number(value("hour")) * 60 + Number(value("minute"));

  return { day, minutes };
}

export function isRestaurantOpen(date: Date = new Date()) {
  const { day, minutes } = getLocalMinutes(date);
  const hours = SCHEDULE[day];
  if (!hours || Number.isNaN(minutes)) return false;
  return minutes >= hours.open && minutes < hours.close;
}

export function getSundayBannerText(date: Date = new Date()) {
  const status = isRestaurantOpen(date) ? "NOW OPEN" : "CLOSED";
  return `${status} SUNDAYS · 7AM–3PM`;
}

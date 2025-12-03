// file: utils/time.ts

export function formatTimeDisplay(time: string): string {
  // input: "HH:mm"
  if (!time) return "-";
  const [hh, mm] = time.split(":");
  return `${hh}.${mm} WIB`;
}

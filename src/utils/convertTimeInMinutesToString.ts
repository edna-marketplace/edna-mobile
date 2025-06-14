export function convertTimeInMinutesToString(timeInMinutes: number): string {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

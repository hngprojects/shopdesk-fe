export function getDateStartRange(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysSinceMonday = (dayOfWeek + 6) % 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday - 10);

  return lastMonday.toISOString().split("T")[0];
}

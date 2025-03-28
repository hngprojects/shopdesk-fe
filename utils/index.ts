export function getDateStartRange(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysSinceMonday = (dayOfWeek + 6) % 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday - 10);

  return lastMonday.toISOString().split("T")[0];
}

export const formatDate = (
  isoString: string
): { date: string; time: string } => {
  const dateObj = new Date(isoString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[dateObj.getDay()];
  const date = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12-hour format

  return {
    date: `${day} ${date} ${month} ${year}`, // Example: "Thu 27 Mar 2025"
    time: `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`, // Example: "02:19 PM"
  };
};

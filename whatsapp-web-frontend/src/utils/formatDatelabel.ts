export const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  const diffDays =
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 7) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
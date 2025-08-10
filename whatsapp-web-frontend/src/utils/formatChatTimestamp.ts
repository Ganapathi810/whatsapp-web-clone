export const formatChatTimestamp = (dateString?: string) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  if (date >= startOfWeek) {
    return date.toLocaleDateString([], { weekday: 'short' }); 
  }

  return date.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' });
}

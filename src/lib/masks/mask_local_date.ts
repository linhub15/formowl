export function maskLocalDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const masked = new Intl.DateTimeFormat("en-US", options).format(date);
  return masked;
}

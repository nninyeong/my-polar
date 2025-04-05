export const convertDateForUltraShortForecast = (date: Date): string => {
  const newDate = new Date(date);
  const minute = newDate.getMinutes();

  if (newDate.getHours() === 0 && minute <= 45) {
    newDate.setDate(newDate.getDate() - 1);
  }

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const convertTimeForUltraShortForecast = (date: Date): string => {
  let hour = date.getHours();
  const minute = date.getMinutes();

  if (minute <= 45) hour = (hour - 1 + 24) % 24;

  const formattedHour = String(hour).padStart(2, '0');

  return `${formattedHour}30`;
};

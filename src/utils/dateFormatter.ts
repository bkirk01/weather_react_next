export const utilFormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return `${days[date.getDay()]} ${date.getDate()}`;
};

export const utilIsNightTime = (): boolean => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  // Night time is typically from 7 PM to 6 AM
  return hours >= 19 || hours < 6;
};

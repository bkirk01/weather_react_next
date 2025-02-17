export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return `${days[date.getDay()]} ${date.getDate()}`;
};

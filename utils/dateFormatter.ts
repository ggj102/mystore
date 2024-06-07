export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear().toString().slice(-2);
  const month = (date.getUTCMonth() + 1).toString();
  const day = date.getUTCDate().toString();
  const hours = (date.getUTCHours() + 9).toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

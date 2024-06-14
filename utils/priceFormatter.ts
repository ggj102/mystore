export const priceFormatter = (price: number) => {
  const toString = String(price);
  return toString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

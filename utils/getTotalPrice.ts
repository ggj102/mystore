export const getTotalPrice = (data: any) => {
  const totalPriceReduce = data.reduce(
    (acc: any, val: any) => {
      const { option_price } = val.product_option;
      const { delivery_price } = val.product_detail;

      const count = val.cart_info.count;
      const dPrice = delivery_price === "무료" ? 0 : delivery_price;
      const price = (val.price + option_price) * count;

      return {
        ...acc,
        price: acc.price + price,
        delivery: acc.delivery + dPrice,
      };
    },
    {
      price: 0,
      delivery: 0,
    }
  );

  return totalPriceReduce;
};

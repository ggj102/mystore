import { ProductType } from "./product";

export type CartItemType = {
  product: ProductType;
  count: number;
};

// export type CartType = {
//   cartList: CartItemType[];
// };

export default class Cart {
  cartList: CartItemType[] = [];

  updateCart(list: CartItemType[]) {
    this.cartList = [...list];
  }

  addCart(item: CartItemType) {
    const filterItem = this.cartList.filter(
      (val) => val.product.id !== item.product.id
    );

    filterItem.push(item);
    this.cartList = [...filterItem];

    console.log(this.cartList, "카트에 추가했습니다.");
  }

  removeCart(id: number) {
    const filter = this.cartList.filter((val) => val.product.id !== id);

    this.cartList = [...filter];

    console.log(this.cartList, "카트에서 제거했습니다.");
  }
}

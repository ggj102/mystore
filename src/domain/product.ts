export type ProductType = {
  id: number;
  category: number;
  name: string;
  price: number;
  image: string;
};

export default class Product {
  id = 0;
  category = 0;
  name = "";
  price = 0;
  image = "";

  constructor(productData: ProductType) {
    const { id, category, name, price, image } = productData;

    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  getProductData() {
    return {
      id: this.id,
      category: this.category,
      name: this.name,
      price: this.price,
      image: this.image,
    };
  }

  setProductData(data: ProductType) {
    const { id, category, name, price, image } = data;

    this.id = id;
    this.category = category;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

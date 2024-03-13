import productItemStyle from "@styles/components/productItem.module.scss";

export default function ProductItem({ data }: any) {
  return (
    <div className={productItemStyle.product_item_container}>
      <div className={productItemStyle.item_img}>
        <img width="100%" src="/images/test/testitem1.jpg" alt="item" />
      </div>
      <div className={productItemStyle.item_info}>
        <span className={productItemStyle.item_name}>{data.name}</span>
        <span className={productItemStyle.item_discription}>
          {data.discription}
        </span>
        <span className={productItemStyle.item_price}>{`${data.price}원`}</span>
        <div>
          <span className={productItemStyle.item_sale}>{`${data.sale}%`}</span>
          <span className={productItemStyle.item_saleprice}>
            {`${data.saleprice}원`}
          </span>
        </div>
      </div>
    </div>
  );
}

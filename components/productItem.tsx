import productItemStyle from "@styles/components/productItem.module.scss";
import Link from "next/link";

export default function ProductItem({ data }: any) {
  return (
    <div className={productItemStyle.product_item_container}>
      <Link href={`/productDetail/${data.id}`}>
        <div className={productItemStyle.item_img}>
          <img width="100%" src={data.image_path} alt="item" />
        </div>
      </Link>
      <div className={productItemStyle.item_info}>
        <Link href="/productDetail">
          <span className={productItemStyle.item_name}>{data.name}</span>
        </Link>
        <span className={productItemStyle.item_description}>
          {data.description}
        </span>
        <span
          className={productItemStyle.item_price}
        >{`${data.defaultPrice}원`}</span>
        <div>
          <span
            className={productItemStyle.item_sale}
          >{`${data.discount}%`}</span>
          <span className={productItemStyle.item_saleprice}>
            {`${data.price}원`}
          </span>
        </div>
      </div>
    </div>
  );
}

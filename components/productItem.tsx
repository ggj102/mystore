import Link from "next/link";
import { priceFormatter } from "@/utils/priceFormatter";
import productItemStyle from "@styles/components/productItem.module.scss";
import SkeletonImage from "./skeletonImage";

export default function ProductItem({ data }: { data: ProductType }) {
  return (
    <div className={productItemStyle.product_item_container}>
      <Link href={`/productDetail/${data.id}`}>
        <div className={productItemStyle.item_img}>
          <SkeletonImage src={data.image_path} alt="item" />
        </div>
      </Link>
      <div className={productItemStyle.item_info}>
        <Link href="/productDetail">
          <span className={productItemStyle.item_name}>{data.name}</span>
        </Link>
        <span className={productItemStyle.item_description}>
          {data.description}
        </span>
        {data.discount > 0 && (
          <span className={productItemStyle.item_price}>{`${priceFormatter(
            data.defaultPrice
          )}원`}</span>
        )}
        <div>
          {data.discount > 0 && (
            <span
              className={productItemStyle.item_sale}
            >{`${data.discount}%`}</span>
          )}
          <span className={productItemStyle.item_saleprice}>
            {`${priceFormatter(data.price)}원`}
          </span>
        </div>
      </div>
    </div>
  );
}

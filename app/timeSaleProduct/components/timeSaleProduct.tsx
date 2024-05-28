import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Timer from "@/components/timer";
import Pagination from "@/components/pagination";

import timeSaleProductStyle from "@styles/pages/timeSaleProduct.module.scss";

export default function TimeSaleProduct({
  timeSaleData,
  page,
}: {
  timeSaleData: any;
  page: number;
}) {
  const { data, totalPages, totalCount } = timeSaleData;

  return (
    <div className={timeSaleProductStyle.time_sale_product_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>타임특가</h3>
        </ViewInUp>
      </div>
      <div className="site_wrap">
        <div className={timeSaleProductStyle.time_sale_product_list}>
          <div className={timeSaleProductStyle.time_sale_product_count}>
            전체
            <strong> {totalCount}</strong>개
          </div>
          <ul>
            {data.map((val: any, idx: number) => {
              return (
                <li key={idx}>
                  <div className={timeSaleProductStyle.timer}>
                    <Timer limitDate={val.time_sale} />
                  </div>
                  <ProductItem data={val} />
                </li>
              );
            })}
          </ul>
        </div>
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={page} />
        )}
      </div>
    </div>
  );
}

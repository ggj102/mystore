import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import clsx from "clsx";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function FoldContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isFold, setIsFold] = useState<boolean>(false);

  return (
    <div className={orderStyle.fold_container}>
      <div className={clsx({ is_fold: isFold })}>
        <div className="title_bar">
          <button type="button" onClick={() => setIsFold(!isFold)}>
            <h3>{title}</h3>
            <IoIosArrowUp
              className={orderStyle.arrow_up_icon}
              size={33}
              color="#bcbcbc"
            />
          </button>
        </div>
        <div className={orderStyle.contents}>{children}</div>
      </div>
    </div>
  );
}

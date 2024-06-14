import { Dispatch } from "react";
import Select from "react-select";
import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import { priceFormatter } from "@/utils/priceFormatter";
import { SelectedOptionsType } from "./topContents";

import OptionItem from "./optionItem";

import topContentsStyles from "@styles/pages/productDetail/topContents.module.scss";

interface FixedBarProps {
  isFixedBarOpen: boolean;
  prdName: string;
  options: SelectOptionType[];
  selectedOptions: SelectedOptionsType[];
  currentOption: SelectOptionType;
  totalPrice: number;
  totalCount: number;
  setIsFixedBarOpen: Dispatch<React.SetStateAction<boolean>>;
  onChangeOption: (newValue: SelectOptionType) => void;
  updateOption: (id: number, count: number) => void;
  onClickDeleteOption: (id: number) => void;
  onClickAddCart: () => void;
  onClickCreateOrder: () => void;
}

export default function FixedBar({
  isFixedBarOpen,
  prdName,
  options,
  selectedOptions,
  currentOption,
  totalPrice,
  totalCount,
  setIsFixedBarOpen,
  onChangeOption,
  updateOption,
  onClickDeleteOption,
  onClickAddCart,
  onClickCreateOrder,
}: FixedBarProps) {
  return (
    <div className={topContentsStyles.fixed_bar}>
      <button onClick={() => setIsFixedBarOpen(!isFixedBarOpen)}>
        <IoIosArrowUp className={isFixedBarOpen ? "bar_open" : ""} size={25} />
      </button>
      {isFixedBarOpen && (
        <div className={topContentsStyles.product_option_select}>
          <div className="option_select">
            <p>옵션</p>
            <Select
              isSearchable={false}
              value={currentOption}
              onChange={onChangeOption}
              maxMenuHeight={100}
              options={options}
            />
          </div>
          <ul>
            {selectedOptions.map((val: SelectedOptionsType) => {
              return (
                <OptionItem
                  key={val.option_id}
                  prdName={prdName}
                  data={val}
                  updateOption={updateOption}
                  onClickDeleteOption={onClickDeleteOption}
                />
              );
            })}
          </ul>
        </div>
      )}
      <div className="bar_controller">
        <div>
          <p>{prdName}</p>
          <div className="total_price">
            총 상품금액
            <strong>{` ${priceFormatter(totalPrice)}`}원</strong>
            <span>{`(${totalCount}개)`}</span>
          </div>
        </div>
        <div className={topContentsStyles.cart_order_btn}>
          <button onClick={onClickAddCart}>
            <BsCart2 size={22} />
            장바구니
          </button>
          <button onClick={onClickCreateOrder}>
            <FaCheck />
            바로 구매
          </button>
        </div>
      </div>
    </div>
  );
}

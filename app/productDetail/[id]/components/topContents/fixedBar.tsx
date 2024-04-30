import Select from "react-select";

import { ImCross } from "react-icons/im";
import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import topContentsStyles from "@styles/pages/productDetail/topContents.module.scss";

export default function FixedBar({
  isFixedBarOpen,
  options,
  optionList,
  onChangeOption,
  setIsFixedBarOpen,
}: any) {
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
              defaultValue={options[0]}
              onChange={onChangeOption}
              maxMenuHeight={100}
              options={options}
            />
          </div>
          <ul>
            {optionList.map((val: any) => {
              const { id, option, price, count } = val;

              return (
                <li key={id}>
                  <div className="prd_name">
                    <p>페이셜 클렌징폼</p>
                    <div>{`- ${option}`}</div>
                  </div>
                  <div>
                    <div className="count_btn">
                      <button>-</button>
                      <input defaultValue={count} />
                      <button>+</button>
                    </div>
                    <div>
                      <span>{`${price}원`}</span>
                      <button className="remove_btn">
                        <ImCross />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="bar_controller">
        <div>
          <p>페이셜 클렌징폼</p>
          <div className="total_price">
            총 상품금액
            <strong>43,430원</strong>
            <span>{`(${optionList.length}개)`}</span>
          </div>
        </div>
        <div className={topContentsStyles.cart_order_btn}>
          <button>
            <BsCart2 size={22} />
            장바구니
          </button>
          <button>
            <FaCheck />
            바로 구매
          </button>
        </div>
      </div>
    </div>
  );
}

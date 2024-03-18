import { FaCircleCheck } from "react-icons/fa6";

import listCheckBoxStyle from "@styles/pages/cart/listCheckBox.module.scss";

export default function ListCheckBox({
  id,
  isChecked,
  onChangeChecked,
  ...props
}: {
  id: number;
  isChecked: boolean;
  onChangeChecked: (id: number) => void;
}) {
  return (
    <div className={listCheckBoxStyle.list_check_box_container}>
      {isChecked ? (
        <label className="check" htmlFor={`list_check_${id}`}>
          <FaCircleCheck />
        </label>
      ) : (
        <label htmlFor={`list_check_${id}`} />
      )}
      <input
        id={`list_check_${id}`}
        type="checkbox"
        checked={isChecked}
        onChange={() => onChangeChecked(id)}
        //   {...props}
      />
    </div>
  );
}

import { navData } from "../navData";

import FoldList from "./foldList";

import { ImCross } from "react-icons/im";
import verticalOpenBarStyle from "@styles/components/header/navOpenBar/verticalOpenBar.module.scss";

function SubNav({ data }: any) {
  if (data) {
    return (
      <ul>
        {data.map((val: any) => {
          return (
            <FoldList data={val} key={val.id}>
              <SubNav data={val.children} />
            </FoldList>
          );
        })}
      </ul>
    );
  } else return;
}

export default function VerticalOpenBar({ onClickBarClose }: any) {
  return (
    <div className={verticalOpenBarStyle.vertical_open_bar}>
      <button onClick={onClickBarClose}>
        <ImCross size={22} color="#000" />
      </button>
      <div>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <SubNav data={navData} />
    </div>
  );
}

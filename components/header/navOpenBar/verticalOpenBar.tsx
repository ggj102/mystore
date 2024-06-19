import { navData } from "../navData";

import FoldList from "./foldList";

import { ImCross } from "react-icons/im";
import verticalOpenBarStyle from "@styles/components/header/navOpenBar/verticalOpenBar.module.scss";

function SubNav({ data }: { data?: NavLinkData[] }) {
  if (data) {
    return (
      <ul>
        {data.map((val: NavLinkData) => {
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

export default function VerticalOpenBar({
  onClickBarClose,
}: {
  onClickBarClose: () => void;
}) {
  return (
    <div className={verticalOpenBarStyle.vertical_open_bar}>
      <button title="닫기" onClick={onClickBarClose}>
        <ImCross size={22} color="#000" />
      </button>
      <div>
        <img src="/images/logo.png" alt="logo" />
      </div>
      <SubNav data={navData} />
    </div>
  );
}

import Link from "next/link";
import { useMediaQuery } from "@uidotdev/usehooks";

import NavOpenBarTable from "./navOpenBarTable";

import navigationStyles from "@styles/components/navigation.module.scss";

import FoldList from "./foldList";

function CreateCategory({ data }: any) {
  if (data) {
    return (
      <ul>
        {data.map((val: any) => {
          return (
            <FoldList data={val} key={val.id}>
              <CreateCategory data={val.children} />
            </FoldList>
          );
        })}
      </ul>
    );
  } else return;
}

export default function NavOpenBar({ categoryData }: any) {
  const isMedium = useMediaQuery("only screen and (max-width : 1000px)");

  return isMedium ? (
    <div className={navigationStyles.nav_open_column_bar}>
      <div>
        <Link href="">Log in</Link>
      </div>
      <CreateCategory data={categoryData} />
    </div>
  ) : (
    <div className={navigationStyles.nav_open_bar}>
      <NavOpenBarTable />
      <div className="user_nav">
        <Link href="">
          <strong>마이페이지</strong>
        </Link>
        <div>
          <Link href="">회원정보 수정</Link>
          <Link href="">관심상품</Link>
          <Link href="">최근 본 상품</Link>
          <Link href="">배송 주소록 관리</Link>
        </div>
      </div>
    </div>
  );
}

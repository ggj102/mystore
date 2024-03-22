import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";

import navItemStyle from "@styles/components/header/navItem.module.scss";

function SubNav({ data }: any) {
  return (
    <ul>
      {data.map((val: any) => {
        return (
          <li key={val.id} className={navItemStyle.sub_nav}>
            <Link href="">
              {val.name}
              {val.children && <IoIosArrowForward />}
            </Link>
            {val.children && (
              <div className="sub">
                <SubNav data={val.children} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function NavItem({ isAddBarOpen, data, ...props }: any) {
  return isAddBarOpen ? (
    <Link href={data.link} {...props}>
      {data.name}
    </Link>
  ) : (
    <Link
      className={navItemStyle.nav_item_container}
      href={data.link}
      {...props}
    >
      {data.name}
      {data.children && (
        <div>
          <SubNav data={data.children} />
        </div>
      )}
    </Link>
  );
}

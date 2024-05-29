"use client";

import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";

import navItemStyle from "@styles/components/header/navItem.module.scss";

function SubNav({ data }: any) {
  return (
    <ul>
      {data.map((val: any) => {
        return (
          <li key={val.id} className={navItemStyle.sub_nav}>
            <Link href={val.link}>
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

export default function NavItem({ isBarOpen, data, ...props }: any) {
  return isBarOpen ? (
    <Link href={data.link} {...props}>
      {data.name}
    </Link>
  ) : (
    <div className={navItemStyle.nav_item_container}>
      <Link href={data.link} {...props}>
        {data.name}
      </Link>
      {data.children && (
        <div>
          <SubNav data={data.children} />
        </div>
      )}
    </div>
  );
}

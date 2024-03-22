import { useState } from "react";
import Link from "next/link";

import { IoIosArrowDown } from "react-icons/io";

import foldListStyle from "@styles/components/header/foldList.module.scss";

export default function FoldList({
  data,
  children,
  ...props
}: {
  data: any;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li
      className={`${foldListStyle.fold_list_container} ${
        isOpen ? foldListStyle.fold_list_open : foldListStyle.fold_list_close
      }`}
      {...props}
    >
      {data.children && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <IoIosArrowDown size={33} />
        </button>
      )}
      <Link href={data.link || ""}>{data.name}</Link>
      <div>{children}</div>
    </li>
  );
}

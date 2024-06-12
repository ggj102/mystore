import { useState } from "react";
import Link from "next/link";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import navOpenBarTableStyle from "@styles/components/header/navOpenBarTable.module.scss";

export default function NavOpenBarTable() {
  const defaultData: any = [
    {
      allProduct: "토너",
    },
    {
      allProduct: "크림",
    },
    {
      allProduct: "선케어",
    },
    {
      allProduct: "마스크",
    },
    {
      allProduct: "클렌징",
    },
    {
      allProduct: "바디",
    },
  ];

  const [data, _setData] = useState(() => [...defaultData]);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("home", {
      header: () => <Link href="/">홈</Link>,
    }),
    columnHelper.accessor("allProduct", {
      header: () => <Link href="/allProduct">전체 상품</Link>,
      cell: (info) => <Link href="">{info.renderValue()}</Link>,
    }),
    columnHelper.accessor("timeSale", {
      header: () => <Link href="/timeSaleProduct">타임특가</Link>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={navOpenBarTableStyle.nav_open_bar_table_container}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

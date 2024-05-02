"use client";

import paginationStyle from "@styles/components/pagination.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import {} from "next/router";
import { useEffect, useState } from "react";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickPagination = (num: number) => {
    const path = window.location.href;
    const split = path.split("page=");

    if (Number(split[1]) === num) return;

    router.push(`${split[0]}page=${num}`);
  };

  const onClickPrePage = () => {
    if (currentPage === 1) return;

    const page = currentPage - 1;
    onClickPagination(page);
  };

  const onClickNextPage = () => {
    if (currentPage === totalPages) return;

    const page = currentPage + 1;
    onClickPagination(page);
  };

  const getPageNumbers = (page: number) => {
    const remainder = (page - 1) % 5;
    const start = page - remainder;
    const end = start + 4;
    const max = totalPages <= end ? totalPages : end;

    const numArr = [];

    for (let i = start; i <= max; i++) {
      numArr.push(i);
    }

    setPageNumbers(numArr);
  };

  useEffect(() => {
    const page = searchParams.get("page");

    setCurrentPage(Number(page));
    getPageNumbers(Number(page));
  }, [searchParams, totalPages]);

  return (
    <div className={paginationStyle.pagination_container}>
      <div className={paginationStyle.button_wrapper}>
        <button onClick={() => onClickPagination(1)}>
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button onClick={onClickPrePage}>
          <MdKeyboardArrowLeft />
        </button>
        <ul>
          {pageNumbers.map((val, idx) => {
            return (
              <li key={idx}>
                <button
                  className={
                    currentPage === val ? paginationStyle.current_page : ""
                  }
                  onClick={() => onClickPagination(val)}
                >
                  {val}
                  <div />
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={onClickNextPage}>
          <MdKeyboardArrowRight />
        </button>
        <button onClick={() => onClickPagination(totalPages)}>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}

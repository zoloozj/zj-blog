import Link from "next/link";
import React, { FunctionComponent } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
const Pagination: FunctionComponent<PaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        <Link
          href={
            currentPage - 1 === 1 ? `/posts` : `/posts?page=${currentPage - 1}`
          }
        >
          <button
            disabled={!prevPage}
            rel="previous"
            className="disabled:opacity-50 disabled:hover:font-normal disabled:cursor-text cursor-pointer hover:font-semibold"
          >
            Өмнөх
          </button>
        </Link>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Link href={`/posts?page=${currentPage + 1}`}>
          <button
            disabled={!nextPage}
            className="disabled:opacity-50 disabled:hover:font-normal disabled:cursor-text cursor-pointer hover:font-semibold"
            rel="next"
          >
            Дараах
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;

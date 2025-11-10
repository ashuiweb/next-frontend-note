"use client";
import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
  darkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  darkMode,
}) => {
  // 只有在总页数大于1时才显示分页控件
  if (totalCount <= itemsPerPage) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <ReactPaginate
        previousLabel={"上一页"}
        nextLabel={"下一页"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalCount / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={({ selected }) => onPageChange(selected)}
        containerClassName={"flex items-center space-x-1"}
        pageClassName={"px-3 py-1 rounded"}
        pageLinkClassName={`${
          darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
        }`}
        previousClassName={`px-3 py-1 rounded ${
          darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
        }`}
        nextClassName={`px-3 py-1 rounded ${
          darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
        }`}
        breakClassName={"px-3 py-1"}
        breakLinkClassName={`${
          darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
        }`}
        activeClassName={`${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination;
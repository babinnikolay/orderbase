import React from "react";
import Pagination from "@/app/_components/Pagination";
import { ITEMS_PER_PAGE } from "@/app/_helpers/appConstants";

function PaginationBlock({ totalPages, totalCount, currentPage, skip }) {
  if (totalPages < 2 || !totalCount) return null;

  return (
    <div className="absolute bottom-6 right-6 w-50  rounded-xl shadow-lg border border-primary-600 z-10 p-2">
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <div className="text-center mt-2 text-sm text-gray-600">
        {skip + 1}-{Math.min(skip + ITEMS_PER_PAGE, totalCount)} of {totalCount}
      </div>
    </div>
  );
}

export default PaginationBlock;

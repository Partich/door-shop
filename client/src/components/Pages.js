import React from "react";

export function Pages({ totalPages, currentPage, onPageButtonClick }) {
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return (
      <button key={pageNumber} onClick={() => onPageButtonClick(pageNumber)}>
        {pageNumber}
      </button>
    );
  });

  return (
    <div>
      {pageButtons}
      <p>Selected page: {currentPage}</p>
    </div>
  );
}

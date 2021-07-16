import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import GridView from "./GridView";
import ListView from "./ListView";
const Pagination = ({ allFile }) => {
  const { toggleView } = useStoreState((state) => state);
  const { setInsertedNull } = useStoreActions((action) => action);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [pages, setpages] = useState([]);
  const [showPagination, setShowPagination] = useState(false);
  let pageNumber = Math.ceil(allFile.length / itemsPerPage);
  // make pages to map on it
  const handleMakePages = () => {
    const myPage = Array.from({ length: pageNumber }, (_, i) => i + 1);
    setpages(myPage);
    if (pages.length > 1) setShowPagination(true);
  };
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentPageItems = allFile.slice(indexOfFirstItem, indexOfLastItem);
  //  handle selected page
  const handleChangePage = (page, ele) => {
    setCurrentPage(page);
    const parent = ele.target.parentElement.children;
    for (const el of parent) {
      el.classList.remove("activeNumber");
    }
    ele.target.classList.add("activeNumber");
  };
  //  handle prePage
  const handlePre = () => {
    if (currentPage > 1) setCurrentPage((e) => e - 1);
  };
  //  handle nextPage
  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage((e) => e + 1);
  };
  useEffect(() => {
    handleMakePages();
  }, [pageNumber]);
  useEffect(() => {
    setInsertedNull();
  }, [toggleView]);
  useEffect(() => {
    if (pages.length > 1) setShowPagination(true);
  }, [pages]);

  return (
    <div className="flex flex-col justify-between h-4/6 ">
      <div className="flex-grow ">
        <ContextMenu>
          {toggleView && <ListView currentPageItems={currentPageItems} />}
          {!toggleView && <GridView currentPageItems={currentPageItems} />}
        </ContextMenu>
      </div>
      {/* Pagination */}
      {/* <div className="flex space-x-1 z-10 justify-center mt-8 "> */}
      {showPagination && (
        <div className="flex space-x-1 z-10 justify-center pt-8 pb-6 ">
          {currentPage !== 1 && (
            <button
              onClick={() => handlePre()}
              className="border rounded-md px-2 border-blue-600 text-blue-600 hover:bg-blue-600  hover:text-white"
            >
              Pre
            </button>
          )}
          {pages &&
            pages.map((i) =>
              i === currentPage ? (
                <button
                  className="list-none border border-blue-200 text-blue-600 px-2 rounded-md activeNumber"
                  onClick={(ele) => handleChangePage(i, ele)}
                  key={i}
                >
                  {i}
                </button>
              ) : (
                <button
                  className="list-none border border-blue-200 text-blue-600 px-2 rounded-md"
                  onClick={(ele) => handleChangePage(i, ele)}
                  key={i}
                >
                  {i}
                </button>
              )
            )}
          {currentPage !== pageNumber && (
            <button
              onClick={() => handleNext()}
              className="border rounded-md px-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;

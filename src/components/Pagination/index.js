import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const {
    currentDataLength,
    handlePageClick,
    pages,
    page = 1,
    limit = 0,
    total,
  } = props;
  const startDataPage = limit * (page - 1) + 1;
  const endDataPage =
    pages === page && currentDataLength < limit ? total : limit * page;

  return (
    <>
      <p className="float-start">{`Showing ${startDataPage} to ${endDataPage} of ${total} entries`}</p>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={
          <span role="button" className="page-link">
            ...
          </span>
        }
        breakClassName={"page-item"}
        pageCount={pages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination float-end"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        activeClassName={"active"}
        forcePage={page - 1}
      />
    </>
  );
};

export default Pagination;

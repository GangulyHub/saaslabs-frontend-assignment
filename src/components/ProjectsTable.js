import React, {  useState } from "react";

import "../App.css";

const ProjectsTable = ({projects}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = (projects || []).slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil((projects || []).length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 const getPageNumbers = () => {
    let pages = [];

   let isPageHiddenFromStart=false
   let isPageHiddenFromEnd=false
      // If total pages are less than or equal to 5, show all pages
      for (let i = 1; i <= totalPages; i++) {
        if ((i<=2) || i >= totalPages-1 || i===currentPage || i===currentPage-1 || i===currentPage+1)
        {pages.push(i);}
        else if (!isPageHiddenFromStart && currentPage>4 ){
          pages.push('...');
          isPageHiddenFromStart=true;
        }else if(currentPage+1<totalPages-1 && i>currentPage && !isPageHiddenFromEnd) {
          pages.push('...');
          isPageHiddenFromEnd=true;
        }
      }
    

    return pages;
  };

  return (
    <div className="container">
      <h2>Projects List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project, index) => (
            <tr key={index}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>${project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
       
        <button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        ←
      </button>
      <ul className="pagination">
          {getPageNumbers().map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="ellipsis">...</span>
              ) : (
                <button
                  className={currentPage === page ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          →
        </button>
        
      </div>
    </div>
  );
};

export default ProjectsTable;


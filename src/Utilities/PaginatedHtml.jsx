import React, { useState, useEffect } from 'react';

const PaginatedHtml = ({file_path}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`${file_path}`)
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data);
        paginateHtmlContent(data);
      });
  }, []);

  const paginateHtmlContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const allElements = Array.from(doc.body.childNodes);
    const pageSize = 2; // Adjust this value to change the number of elements per page
    const pagesArray = [];

    for (let i = 0; i < allElements.length; i += pageSize) {
      pagesArray.push(allElements.slice(i, i + pageSize));
    }

    setPages(pagesArray);
  };

  const renderPage = (pageContent) => {
    return pageContent.map((node, index) => (
      <div key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
    ));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  return (
    <div style={{
      // width: 'fit-content',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'red',
      // objectFit:"cover",
    overflow:"auto",
    // alignItems:"center"
    }}>
      <h2 style={{ textAlign: 'center' }}>Paginated HTML Content</h2>
      {pages.length > 0 ? (
        <div>
          {renderPage(pages[currentPage])}
          <div style={{ textAlign: 'center', marginTop: '20px', alignContent:"center" }}>
            <button onClick={handlePrevPage} disabled={currentPage === 0} 
            style={{ marginRight: '10px', backgroundColor:"#004545", color:"white", borderRadius:"10px", padding:"8px"}}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}
            style={{ marginRight: '10px', backgroundColor:"#004545", color:"white", borderRadius:"10px", padding:"8px"}}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaginatedHtml;

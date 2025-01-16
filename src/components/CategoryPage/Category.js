import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import NavBar from "../NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Category() {
  var date = new Date().toLocaleDateString();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Read the page number from the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if no "page" query param
    setCurrentPage(page);
  }, [location]);

  useEffect(() => {
    const url = "api/category"; // Replace with your API URL

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log(response.json());
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data); // Save the fetched data to state
        setFilteredData(data.data); // Initialize filtered data to the full data initially
        setLoading(false); // Set loading to false once data is fetched
        console.log(data);
      })
      .catch((error) => {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures it runs once

  useEffect(() => {
    // Filter the data based on the search query
    if (searchQuery) {
      const filtered = data.filter(
        (item) =>
          item.id.toString().includes(searchQuery) ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      // If no search query, show all data
      setFilteredData(data);
    }
  }, [searchQuery, data]); // Re-run the filter when searchQuery or data changes

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Update the URL with the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/category?page=${pageNumber}`); // Update URL with the new page number
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`/category?page=${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`/category?page=${newPage}`);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <>
      <NavBar />
      <div className="container my-5 bg-light p-4 rounded shadow-lg">
        <h2 className="text-center mb-4 text-primary">Category List</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control p-3"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "1px solid #007bff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Table */}
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/ProductList/${item.id}`}
                    className="text-decoration-none text-primary"
                  >
                    {item.id}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/ProductList/${item.id}`}
                    className="text-decoration-none text-success"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="text-muted">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center text-dark">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Category;

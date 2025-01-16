import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";

function ProductList() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  useEffect(() => {
    let url = `/api/products?id=${id}`; // Use the id to fetch product data from the API

    if (!id) {
      url = `/api/products`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.data); // Save the product data to state
        setFilteredProducts(data.data); // Initialize the filteredProducts state with all products
        setLoading(false); // Set loading to false once data is fetched
        console.log(data.data);
      })
      .catch((error) => {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      });
  }, [id]); // The useEffect hook will run whenever the id changes

  useEffect(() => {
    // Full-text search across multiple fields: name, description, and id
    if (product) {
      const filtered = product.filter((item) => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        return (
          item.name.toLowerCase().includes(lowerCaseQuery) || // Match product name
          item.id.toString().includes(searchQuery) || // Match product ID
          (item.price.toString() && item.price.toString().toLowerCase().includes(lowerCaseQuery)) // Match product description (if exists)
        );
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, product]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`); // Change URL to reflect current page
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Change URL to reflect previous page
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Change URL to reflect next page
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavBar />

      <div className="container my-5 bg-light p-4 rounded shadow-lg">
        <h2 className="text-center mb-4 text-primary">Product List</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control p-3"
            placeholder="Search by Name, Description, or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "1px solid #007bff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>No. of Items</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>Rs.{item.price}</td>
                <td>{item.items}</td>
                <td>{item.discount}</td>
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
            style={{
              borderRadius: "5px",
              padding: "8px 16px",
            }}
          >
            <i className="bi bi-arrow-left-circle"></i> Previous
          </button>
          <span className="align-self-center text-dark">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              borderRadius: "5px",
              padding: "8px 16px",
            }}
          >
            Next <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;

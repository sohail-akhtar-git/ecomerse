import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import NavBar from "../NavBar/NavBar";

function Search() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  useEffect(() => {
    var query = convertToSolrQuery(id, "description", "");

    let url = `http://localhost:8983/solr/productCore/select?indent=true&q.op=OR&q=${query}`; // Use the id to fetch product data from the API
    console.log(url);
    console.log(query);
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
          (item.price.toString() &&
            item.price.toString().toLowerCase().includes(lowerCaseQuery)) // Match product description (if exists)
        );
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, product]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  function convertToSolrQuery(query, defaultField, boost) {
    if (!query) {
      return defaultField ? "" : "*:*";
    }

    query = query.trim(); // Remove leading/trailing whitespace

    // Handle phrase queries
    if (query.startsWith('"') && query.endsWith('"')) {
      return `${defaultField}:${query}${boost ? `^${boost}` : ""}`;
    }

    // Handle explicit field searches
    if (query.includes(":")) {
      return `${query}${boost ? `^${boost}` : ""}`;
    }

    // Handle range queries (e.g., "under 300", "between 100 and 200")
    const underMatch = query.match(/under (\d+)/i);
    if (underMatch) {
      const upperLimit = underMatch[1];
      const searchTerm = query.replace(underMatch[0], "").trim();
      var part1 = searchTerm[0].toUpperCase();
      var part2 = searchTerm.substring(1);
      return `${defaultField}:*${
        part1 + part2
      }* AND price:[* TO ${upperLimit}]`;
    }

    const betweenMatch = query.match(/between (\d+) and (\d+)/i);
    if (betweenMatch) {
      const lowerLimit = betweenMatch[1];
      const upperLimit = betweenMatch[2];
      const searchTerm = query.replace(betweenMatch[0], "").trim();
      var part1 = searchTerm[0].toUpperCase();
      var part2 = searchTerm.substring(1);

      return `${defaultField}:*${
        part1 + part2
      }* AND price:[${lowerLimit} TO ${upperLimit}]`;
    }

    // // Handle boolean operators
    // query = query.toUpperCase();
    // query = query.replace(/ AND /g, " AND ");
    // query = query.replace(/ OR /g, " OR ");
    // query = query.replace(/ NOT /g, " NOT ");

    // // Handle wildcards
    // if (query.includes("*") || query.includes("?")) {
    //   return `${defaultField}:${query}${boost ? `^${boost}` : ""}`;
    // }


    var part1 = query[0].toUpperCase();
    var part2 = query.substring(1).toLowerCase();
    return `description:*${part1+part2}*${boost ? `^${boost}` : ""}`
 

    
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavBar />

      <div className="container my-5 bg-light p-4 rounded shadow-lg">
        <h2 className="text-center mb-4 text-primary">Search Result</h2>

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
                <td>{item.price}</td>
                <td>{item.items}</td>
                <td>{item.discount}%</td>
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

export default Search;

import { NavLink, useNavigate } from "react-router-dom"; // Use react-router-dom instead of react-router
import { useState } from "react";

function NavBar() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [searchQuery, setSearchQuery] = useState(""); // State to manage the search query

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    navigate("/login"); // Redirect to home page after logging out
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`); // Navigate to search page with query parameter
    }
  };

  return (
    <nav id="header" className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/category">
                Category
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/productList">
                Products
              </NavLink>
            </li>
          </ul>
        </div>

        <div id="search" className="d-flex">
          <input
            type="text"
            id="query"
            className="form-control me-2"
            placeholder="Search"
            value={searchQuery} // Bind the input value to the state
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on change
          />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <button className="btn btn-danger ms-3" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

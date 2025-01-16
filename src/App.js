import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // For redirection
import NavBar from "./components/NavBar/NavBar"; // Assuming you have a NavBar component

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState([]);

  useEffect(() => {
    // Check if the JWT token is present in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to the login page if the token is not found
      navigate('/login');
    } else {
      var data = localStorage.getItem('name');
      console.log(data);
      setName(data);
    }
  }, [navigate]); // Add navigate as a dependency to run this effect once on component mount

  return (
    <div className="App">
      <NavBar />

      {/* Welcome Section */}
      <div className="container mt-5 bg-dark text-white text-center py-5">
        <h1>Welcome to My Web Project</h1>
        <p>You have been logged in as <strong>{name}</strong></p>
      </div>

      {/* Information Section */}
      <div className="container mt-5">
        <div className="row">
          {/* Profile Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg" style={{ width: '18rem' }}>
              <img
                src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1328.jpg"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="User Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="col-md-6">
            <h2>About This Website</h2>
            <p>This website is developed as a task to learn front-end and back-end technologies.</p>
            <h4>Technologies Used:</h4>
            <ul>
              <li><strong>SQLite</strong> for the database</li>
              <li><strong>React</strong> for the front-end</li>
              <li><strong>Node with Express</strong> for the back-end</li>
              <li><strong>Solr</strong> for full-text search</li>
              <li><strong>JWT</strong> for authentication</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center py-4 bg-dark text-white mt-5">
        <p>
          Created as part of a learning task to master frontend and backend
          technologies.
        </p>
      </footer>
    </div>
  );
}

export default App;

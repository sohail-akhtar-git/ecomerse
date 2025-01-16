// src/Login.js
import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router'; // Updated to use 'react-router-dom' instead of 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import {useNavigate} from 'react-router-dom';



function Login  () {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token is present in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to the login page if the token is not found
      navigate('/login');
    }
  }, [navigate]); //


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();

    var value = {
      "email":email,
      "password":password
    }
    var url = 'api/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    }).then(
      (res)=>{
        if(!res.ok){
           alert("invalid user or password")
          
        }
        return res.json();
      }
    ).then(
      (data)=>{
        if (data.token) {
          // Save the JWT token in localStorage or sessionStorage
          localStorage.setItem('authToken', data.token); // Or use sessionStorage
          localStorage.setItem('name',data.name);
          // Navigate to the homepage upon successful login
          navigate('/');
        } else {
        }

      }
    )
  };

  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <p>Don't have an account?</p>
          <Link to="/signup" className="btn btn-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

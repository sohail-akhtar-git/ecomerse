import React, { useState } from 'react';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // Simple validation
    if (!name || !email || !password) {
      setError('All fields are required!');
      setSuccess(false);
      return;
    }

    var url = 'http://localhost:5000/api/signup';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(
      (res)=>{
        if(!res.ok){
          alert("Something wrong");
          console.error(res);
        }
        return res.json();
      }
    ).then(
      (data)=>{
        navigate('/login');
        console.log(data);
      }
    )

    setError(null);
    setSuccess(true);
    console.log('Form submitted', formData);

    // Here you can handle the form submission, like calling an API to sign up the user
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Create an Account</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">You have successfully signed up!</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    id="formName"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formEmail" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    id="formEmail"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    id="formPassword"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

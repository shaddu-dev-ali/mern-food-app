import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  let navigate = useNavigate();
  const [signupDetails, setsignupDetails] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/createuser',
        signupDetails
      );
      if (!res.data.success) {
        throw res.data.errorMessage.errors;
      }

      // alert(`${res.data.success}`);
      navigate('/login');
    } catch (err) {
      if (Object.keys(err).length === 1) {
        if (err.email) {
          alert(`${err.email.message}`);
        }
        if (err.password) {
          alert(`${err.password.message}`);
        }
      }
      if (Object.keys(err).length === 2) {
        alert(
          `${err.password.message} ${err.email.message}`
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="container">
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputName"
              className="htmlForm-label"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={signupDetails.name}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={handleChange}
              value={signupDetails.email}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={handleChange}
              value={signupDetails.password}
              name="password"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
            >
              Location
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={signupDetails.location}
              name="location"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link
            to="/login"
            className=" btn btn-primary text-white ms-3"
          >
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}

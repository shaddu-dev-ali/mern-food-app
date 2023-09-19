import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  let navigate = useNavigate();
  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        'http://localhost:5000/api/loginuser',
        loginDetails
      );
      if (!res.data.success) {
        throw res.data.failure;
      } else {
        // alert(`${res.data.success}`);

        localStorage.setItem(
          'authToken',
          res.data.authToken
        );
        localStorage.setItem('userEmail', res.data.email);

        navigate('/');
      }
    } catch (err) {
      alert(`${err}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginDetails((prevDetails) => {
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
              htmlFor="exampleInputEmail1"
              className="form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={handleChange}
              value={loginDetails.email}
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
              value={loginDetails.password}
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link
            to="/signup"
            className="btn btn-primary text-white ms-3"
          >
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
  );
}

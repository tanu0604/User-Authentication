import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/addUser",
        formData
      );

      alert("User registered successfully!!!");
      navigate("/login");
      setFormData({
        username: "",
        email: "",
        role: "",
        password: "",
      });
    } catch (error) {
      console.log(
        "Error in registering the user: ",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  id="username"
                  name="username"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              {/* Role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>

          <div className="flex mx-4">
            <p>Don't have an account?</p>
            <a href="/login"> Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(
      `http://localhost:8080/user/forgotPass?email=${formData.email}`,
      { password: formData.password }, // Body data
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate("/login");
    alert(response.data); // Server response
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    alert("Failed to update password");
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Set new Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                />
                <div className="form-text">We'll never share your email with anyone else.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Update Details</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

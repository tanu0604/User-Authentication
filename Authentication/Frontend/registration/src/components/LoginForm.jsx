import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/authenticate",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        console.log("User logged in");
        localStorage.setItem("email", formData.email); 
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Some error occurred");
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Login Page</h3>
            <form onSubmit={handleSubmit}>
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
              </div>

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

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
          <div className="mx-4">
            <p>
              Already have an account? <a href="/signup">Signup</a>
            </p>
            <a href="/forgotpassword">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

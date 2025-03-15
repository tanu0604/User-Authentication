import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/user/getUser?email=${userEmail}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Updating user with email:", formData.email);
    console.log("New name:", formData.name);
  
    try {
      const response = await axios.put(
        `http://localhost:8080/user/update?email=${formData.email}`,
        { name: formData.name },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data);
      alert("User updated successfully.");
      navigate("/dashboard", { state: { updated: true } });
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      alert("Failed to update user.");
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Update Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;

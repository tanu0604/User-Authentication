import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/user/getUser?email=${userEmail}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [navigate, location.state?.updated]); // ✅ Update trigger added

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleUpdate = () => {
    navigate("/update");
  };

  const handleDelete = () => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      console.error("No user email found in local storage.");
      return;
    }

    axios
      .delete(`http://localhost:8080/user/deleteUser?email=${userEmail}`)
      .then(() => {
        alert("User deleted successfully.");
        localStorage.removeItem("email");
        navigate("/signup");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">User Dashboard</h3>
            {user ? (
              <>
                <p>
                  <strong>Name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <div className="d-flex justify-content-between gap-3">
                  <button className="btn btn-danger w-30" onClick={handleLogout}>
                    Logout
                  </button>

                  <button className="btn btn-primary w-30" onClick={handleUpdate}>
                    Edit Details
                  </button>

                  <button className="btn btn-danger w-30" onClick={handleDelete}>
                    Delete your Account
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center">Loading user details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

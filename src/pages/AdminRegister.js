import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        username,
        password,
      });
      setMessage(response.data.message);
        // Success Toast
        toast.success("Register Successful!", {
            position: "top-right",
            autoClose: 3000,
          });
      navigate("/admin/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Register</h2>
      <form onSubmit={handleRegister} className="card p-4 shadow">
        <input className="form-control mb-3" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
      {message && <p className="text-danger mt-2">{message}</p>}
    </div>
  );
};

export default AdminRegister;

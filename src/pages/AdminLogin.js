import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config";

const AdminLogin = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
        localStorage.setItem("adminToken", res.data.token);
        setAuth(true);
         // Success Toast
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
        navigate("/admin/dashboard")
      } catch (err) {
        setMessage(err.response?.data?.message || "Login failed");
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="card p-4 shadow">
          <input className="form-control mb-3" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        {message && <p className="text-danger mt-2">{message}</p>}
      </div>
    );
  };

  export default AdminLogin;
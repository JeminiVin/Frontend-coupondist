import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer} from "react-toastify"
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Home from "./components/Home";
import AdminRegister from "./pages/AdminRegister";

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem("adminToken"));

  return (
    <Router>
       <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Coupon System</Link>
          <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/admin/login">Admin Login</Link>
            <Link className="nav-link" to="/admin/register">Register</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin setAuth={setAuth} />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard auth={auth} setAuth={setAuth} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

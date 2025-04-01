import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config";

const Home = () => {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState(null);

  const claimCoupon = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/claim`, { withCredentials: true });
      setCoupon(res.data.coupon);
      toast.success(res.data.message);  // ✅ Show success message
    } catch (err) {
      toast.error(err.response?.data?.message || "Error claiming coupon");  // ✅ Show error message
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Coupon Claim System</h1>
      <button className="btn btn-warning mt-3" onClick={claimCoupon}>Claim Coupon</button>
      {message && <p className="mt-3 text-primary">{message}</p>}
      {coupon && <p className="mt-3 text-success">Your Coupon: {coupon}</p>}
    </div>
  );
};
export default Home;
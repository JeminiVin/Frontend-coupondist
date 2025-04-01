import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const AdminDashboard = ({ auth, setAuth }) => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState("");
  
    useEffect(() => {
      axios.get(`${API_BASE_URL}/api/admin/coupons`, { headers: { Authorization: localStorage.getItem("adminToken") } })
        .then(res => setCoupons(res.data))
        .catch(err => console.error(err));
    }, []);
  
    const addCoupon = async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/admin/coupons`, { code: newCoupon }, { headers: { Authorization: localStorage.getItem("adminToken") } });
        setNewCoupon("");
        window.location.reload();
      } catch (err) {
        console.error("Error adding coupon");
      }
    };
  
    return auth ? (
        <div className="container mt-5">
          <h1 className="text-center text-primary">Admin Dashboard</h1>
    
          <div className="d-flex justify-content-between align-items-center my-4">
            <h2>Manage Coupons</h2>
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("adminToken");
                setAuth(false);
              }}
            >
              Logout
            </button>
          </div>
    
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={newCoupon}
              onChange={(e) => setNewCoupon(e.target.value)}
              placeholder="Enter new coupon"
            />
            <button className="btn btn-success mt-2" onClick={addCoupon}>
              Add Coupon
            </button>
          </div>
    
          <h3 className="mt-4">Existing Coupons</h3>
          <ul className="list-group">
            {coupons.map((c) => (
              <li key={c._id} className="list-group-item">
                {c.code} <span className="badge bg-info">{c.status}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Navigate to="/admin/login" />
      );
    };

  export default AdminDashboard;
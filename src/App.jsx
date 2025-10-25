import React, { useState } from "react";
// import "./App.css";
import Home from "./Component/Home";
import Login from "./Component/Login";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./Component/ResetPassword";
import Dashboard from "./Component/Dashboard";
import ForgotPassword from "./Component/ForgotPassword";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;

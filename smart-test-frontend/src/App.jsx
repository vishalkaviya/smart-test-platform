import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/Forgotpassword";
import EditProfile from "./pages/Profile/EditProfile";
import ViewProfile from "./pages/Profile/ViewProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/tests" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/analytics" element={<ViewQuestionAnalytics />} />
        <Route path="/admin/update-status" element={<UpdateStatus />} />
      </Routes>
    </Router>
  );
}

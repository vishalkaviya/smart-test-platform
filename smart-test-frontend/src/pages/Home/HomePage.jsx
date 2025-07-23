// src/pages/Home/HomePage.jsx
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/HomePage.css";
import axios from "axios";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.image) {
            setProfileImage(`http://localhost:8000${res.data.image}`);
          }
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <button className="hamburger" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="site-title">Online Test Platform</h1>
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <>
              {profileImage && (
                <img src={profileImage} alt="Profile" className="nav-profile" />
              )}
              <button className="auth-btn logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn">Login</Link>
              <Link to="/register" className="auth-btn signup">Sign Up</Link>
            </>
          )}
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li><FaUserGraduate className="icon" /> Dashboard</li>
            <li><FaBook className="icon" /> Tests</li>
            <li><FaChalkboardTeacher className="icon" /> Courses</li>
            <li><FaUserGraduate className="icon" /> Profile</li>
          </ul>
        </nav>
      </aside>

      <main className="home-main">
        <section className="hero">
          <h2>Welcome to the Future of Learning</h2>
          <p>Take online tests, improve your skills, and achieve your goals!</p>
        </section>

        <section className="features">
          <div className="feature-box">
            <FaBook className="feature-icon" />
            <h3>Variety of Questions</h3>
            <p>Practice easy, medium, and hard level questions to boost your confidence.</p>
          </div>
          <div className="feature-box">
            <FaUserGraduate className="feature-icon" />
            <h3>Track Your Progress</h3>
            <p>Monitor your improvement with real-time analytics and reports.</p>
          </div>
          <div className="feature-box">
            <FaChalkboardTeacher className="feature-icon" />
            <h3>Expert Support</h3>
            <p>Get guidance from top mentors and resolve doubts anytime.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

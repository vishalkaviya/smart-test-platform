// src/pages/profile/EditProfile.jsx
import React, { useEffect, useState } from "react";
import "../../styles/EditProfile.css";
import { FaPen } from "react-icons/fa";
import axios from "axios";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(res.data);
      if (res.data.image) setPreview(`http://localhost:8000${res.data.image}`);
    } catch (err) {
      console.error("Fetch profile error", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(profile).forEach((key) => {
        form.append(key, profile[key]);
      });

      await axios.put("http://localhost:8000/api/profile/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <div className="edit-form-section">
          <div className="profile-image-wrapper">
            <img
              src={preview || "/default-profile.png"}
              alt="Profile"
              className="profile-image"
            />
            <label htmlFor="profileUpload" className="edit-icon">
              <FaPen />
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="name-group">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={profile.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={profile.last_name}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="username"
              value={profile.username}
              readOnly
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={profile.mobile}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
            />
            <div className="gender-group">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={profile.gender === g}
                    onChange={handleChange}
                  />{" "}
                  {g}
                </label>
              ))}
            </div>
            <button type="submit" className="save-btn">
              Update Profile
            </button>
          </form>
        </div>

        <div className="edit-image-section">
          <img
            src="/profile-side-img.png"
            alt="Decor"
            className="side-image"
          />
          <p className="quote-text">
            "Your profile is your identity. Keep it fresh!"
          </p>
        </div>
      </div>
    </div>
  );
}

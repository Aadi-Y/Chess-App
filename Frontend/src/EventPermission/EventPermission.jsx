import React from "react";
import PermissionImage from "../assets/PermissionImage.jpg";
import "./EventPermission.css"
import { Link } from "react-router-dom";

function EventPermission() {
  return (
    <>
      <div className="eventPermission-container">
        <img src={PermissionImage} alt="Permission Image" />
        <h3>Before going to create a event please </h3>
        <h3>SignIn or Login</h3>
        <div className="controls">
          <button><Link to="/signup">Signup</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      </div>
    </>
  );
}

export default EventPermission;

import React from "react";
import Permission from "../assets/PermissionImage.jpg";
import "./playerPermission.css";
import { Link } from "react-router-dom";

function PlayerPermission() {
  return (
    <>
      <div className="playerPermission-container">
        <img src={Permission} alt="Permission Image" />
        <h2>Before going to register for events</h2>
        <h2>Please verify your autherity through</h2>
        <h2>SignIn or Login</h2>
        <div className="controls">
          <button>
            <Link to="/signup">Signup</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerPermission;

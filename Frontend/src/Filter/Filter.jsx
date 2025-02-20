import React from "react";
import "./Filter.css";
function Filter() {
  return (
    <>
      <div className="filter-form-container">
        <form className="filter-form">
          <h2>Chess Event Filter</h2>

          <div className="form-group">
            <label for="player-age">Age Group:</label>
            <select id="player-age" name="player-age" required>
              <option value="">Select Age Group</option>
              <option value="Under 10">Under 10</option>
              <option value="Under 14">Under 14</option>
              <option value="Under 18">Under 18</option>
              <option value="Open">Open</option>
            </select>
          </div>

          <div className="form-group">
            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label for="location">Preferred Location:</label>
            <select id="location" name="location" required>
              <option value="">Select Location</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Salem">Salem</option>
            </select>
          </div>

          <div className="form-group">
            <label for="mode">Event Mode:</label>
            <select id="mode" name="mode" required>
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="form-group">
            <label for="price-range">Price Range:</label>
            <input
              type="range"
              id="price-range"
              name="price-range"
              min="0"
              max="2000"
              step="100"
            />
            <span id="price-value">₹0 - ₹2000</span>
          </div>

          <div className="form-group">
            <label for="rating">Minimum FIDE Rating (optional):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter FIDE rating"
            />
          </div>

          <div className="form-group">
            <label for="event-status">Event Status:</label>
            <select id="event-status" name="event-status" required>
              <option value="">Select Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <label for="event-type">Event Type:</label>
          <select id="event-type" name="event-type">
            <option value="">Select</option>
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>

          <label for="deadline">Registration Deadline:</label>
          <input type="date" id="deadline" name="deadline" />

          <label for="language">Language:</label>
          <select id="language" name="language">
            <option value="">Select</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="other">Other</option>
          </select>

          <div className="form-group">
            <button type="submit" className="filter-submit-btn">
              Filter Events
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Filter;

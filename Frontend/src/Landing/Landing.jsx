import "./Landing.css";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "../About/About";
import moment from "moment";

function Landing() {
  const [selectedValue,setSelectedValue] = useState("row");
  const [event,setEvent] = useState([]);
  async function getAllEvents() {

    try {
      const response = await axiosInstance.get("/get-all-events");
    //   console.log(response.data);
      setEvent(response.data.events)
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSelectChange(event){
    setSelectedValue(event.target.value);
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <div className="landing-container">
        <header>
          <div class="title-detail-container">
            <div class="title">
              <h1>Chess World</h1>
            </div>
            <div class="user-profile">
              <div class="profile-controls">
                <button class="account-btn">Account</button>
                {/* <button class="logOut-btn">Log Out</button> */}
                <button class="logOut-btn">
                  <Link to="/eventpermission">Create Event</Link>
                </button>
              </div>
            </div>
          </div>
          <div class="motivation-container">
            <h2>Progress is Progress</h2>
            <h2>no matter how small it is</h2>
          </div>
          <div class="nav-container">
            <nav class="navigation">
              <ul class="nav-links">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#tournaments">Tournaments</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="title-search-filter-container">
            <div class="filter-container">
              <button class="filter-btn">
                <a href="filter.html">Filter</a>
              </button>
            </div>
            <div class="search-container">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div class="title-view" id="title-view-id">
            <div class="landing-title-container">
              <h1>Ongoing</h1>
              <h1>Tournament</h1>
            </div>
            <div class="view-container">
              <select name="" id="view" onChange={handleSelectChange}>
                <option value="row">Horizontal</option>
                <option value="column">Vertical</option>
              </select>
            </div>
          </div>
        </header>
        <main>
          {/* <div className={`items-container ${selectedValue === "column"} ? row : column`}> */}
          <div className="landing-items-container row">
            {
                event.map((eventItem,index)=>(
            <div className="item-container" key={index}>
              <div className="item-informations">
                <div className="item-title">
                  <h1>
                    {eventItem?.eventName}
                  </h1>
                </div>

                <div className="time-container">
                  <div className="boxes organizer-container1">
                    <h4>Organized by.</h4>
                    <p>Star Chess Foundation</p>
                  </div>
                  <div className="boxes date-container">
                    <p>Start Date : {moment(eventItem?.eventDateStart).format("Do MM YYYY")}</p>
                    <p>End Date : {moment(eventItem?.eventDateEnd).format("Do MM YYYY")}</p>
                  </div>
                </div>

                <div class="price-fee-cash-container">
                  <div class="boxes price-container">
                    <p>
                      Winning Price : <span class="price">₹{eventItem?.eventWinningPrice}</span>
                    </p>
                    <p>
                      Registration Fee : <span class="price">₹{eventItem?.eventFee}</span>
                    </p>
                  </div>
                </div>

                <div className="location-mode-control">
                  <div className="location-mode-container">
                    <p>Location : {eventItem?.eventLocation}</p>
                    <p>Mode : {eventItem?.eventMode}</p>
                  </div>
                  <div className="itemMore-container">
                    <button className="more-btn">
                      {/* <a href="about.html">View More</a> */}
                      <Link to="/about" state={{event: eventItem}}>View More</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
                ))
            }
            {/* <div className="item-container">
              <div className="item-informations">
                <div className="item-title">
                  <h1>
                    Genius Chess Academy 1st TN State Level Chess Tournament
                    2025
                  </h1>
                </div>

                <div className="time-container">
                  <div className="boxes organizer-container1">
                    <h4>Organized by.</h4>
                    <p>Star Chess Foundation</p>
                  </div>
                  <div className="boxes date-container">
                    <p>Start Date : 20th Jan 25</p>
                    <p>End Date : 20th Jan 25</p>
                  </div>
                </div>

                <div class="price-fee-cash-container">
                  <div class="boxes price-container">
                    <p>
                      Price : <span class="price">₹500</span>
                    </p>
                    <p>
                      Fee : <span class="price">₹100</span>
                    </p>
                  </div>
                </div>

                <div className="location-mode-control">
                  <div className="location-mode-container">
                    <p>Location : Coimatore</p>
                    <p>Mode : Offline</p>
                  </div>
                  <div className="itemMore-container">
                    <button className="more-btn">
                      <a href="about.html">View More</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>  
          */}
          </div>
          {/* </div> */}
        </main>
        <footer>
          <p>Chess word @2025 copy rights reversed</p>
        </footer>
      </div>
    </>
  );
}

export default Landing;

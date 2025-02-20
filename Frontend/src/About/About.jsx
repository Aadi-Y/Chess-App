import "./About.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import chessImage from "../assets/chessBg.jpg";
import { useLocation } from "react-router-dom";
import moment from "moment";

function About() {
  const [option, setOption] = useState(true);
  const [registered, setRegistered] = useState(false);
  // const [events, setEvents] = useState("");
  const location = useLocation();
  const event = location.state?.event;
  function handleToggle() {
    setOption((prev) => !prev);
    setRegistered((prev) => !prev);
  }

  // async function handleEvents() {
  //   try {
  //     const response = await axios.get("/get-event");
  //     console.log(response);
  //     console.log(response.data.event);

  //     if (response && response.data) {
  //       setEvents(response.data.events);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   handleEvents();
  // }, []);

  return (
    <>
      <div className="about-main-container">
        <main>
          <div className="title-container">
            <h1>{event?.eventName}</h1>
          </div>

          <div className="title-image">
            <a href="Images/chessBg.jpg">
              <img src={chessImage} alt="Chess Event Background" />
            </a>
          </div>

          <div className="box about-event">
            <h2>About this Event</h2>
            <p>{event?.eventSummary}</p>
          </div>

          <div className="column" id="columns">
            <div className="boxes date-container">
              <h3>
                Start Date :{" "}
                {event?.eventDateStart
                  ? moment(event?.eventDateStart).format("Do MM YYYY")
                  : "No Date"}
              </h3>
              <h3>
                Event Date :{" "}
                {event?.eventDateEnd
                  ? moment(event?.eventDateEnd).format("Do MM YYYY")
                  : "No Date"}
              </h3>
            </div>
            <div className="boxes fee-container1">
              <h3>Registration Fee</h3>
              <h4>{event?.eventFee}</h4>
            </div>
          </div>

          <div className="registration-deadline">
            <h3>Registration Deadline</h3>
            <p>
              The registration deadline for the tournament is{" "}
              <strong>
                {event?.eventRegistrationDeadline
                  ? moment(event?.eventRegistrationDeadline).format(
                      "Do MM YYYY"
                    )
                  : "No registration date"}
              </strong>
              . Be sure to sign up before this date!
            </p>
          </div>

          <div className="price-details">
            <h3>Price Details</h3>
            <p>First Prize : {event?.eventWinningPrice}</p>
            <p>Second Prize : 40,000 INR</p>
          </div>

          <div className="contact-details">
            <h3>Contact Details</h3>
            {/* <p>Annai Arul Public School</p>
            <p>Contact: 9500912898</p> */}
            <p>{event?.eventContact}</p>
          </div>

          <div className="event-venue">
            <h3>Event Venue</h3>
            <p>{event?.eventVenue}</p>
          </div>

          <div className="column" id="columns">
            <div className="box location-container">
              <h3>Mode </h3>
              <p>{event?.eventMode}</p>
              <h3>Location</h3>
              <p>{event?.eventLocation}</p>
            </div>

            {registered ? (
              <div className="box cancel-btn-container">
                <p>Use aldready registered</p>
                <button className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <div className="box register-container">
                <p>Get Your Chance</p>
                <button className="register-btn">
                  <Link to="/playerPermission">Register Now</Link>
                </button>
              </div>
            )}
          </div>

          <div className="box controls-container">
            <p>In order to know about the event Download the Brochure</p>
            <button className="download-btn">Download Brochure</button>
          </div>
          <div className="organizer-information">
            <div className={`box about-organizer ${option ? "hide" : ""}`}>
              <h2>About Organizer</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora enim dolorem natus, alias eaque expedita quaerat ipsam
                eum veritatis. Vel debitis blanditiis sunt non, perspiciatis
                labore temporibus excepturi aperiam porro!
              </p>
            </div>

            <div className={`event-testimonials ${option ? "hide" : ""}`}>
              <h3>Event Testimonials or Reviews</h3>
              <p>
                "It was a well-organized event with excellent competition. I
                look forward to participating again!" -{" "}
                <em>John Doe, 2024 Participant</em>
              </p>
              <p>
                "The atmosphere was electric! A must-join event for every chess
                enthusiast!" - <em>Jane Smith, 2024 Winner</em>
              </p>
            </div>

            <div
              className={`box about-btn-container ${option ? "" : "active"}`}
            >
              <p>In order to know about the organizer Click below</p>
              {option ? (
                <button className="hide-btn" onClick={handleToggle}>
                  Wrap out
                </button>
              ) : (
                <button className="hide-btn" onClick={handleToggle}>
                  Wrap in
                </button>
              )}
            </div>
          </div>
        </main>
        <footer>
          <p>Chess word @2025 copy rights reversed</p>
        </footer>
      </div>
    </>
  );
}

export default About;
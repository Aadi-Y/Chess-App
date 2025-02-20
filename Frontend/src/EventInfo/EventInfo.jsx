import "./EventInfo.css";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import OrgRegistration from "../OrgRegistration/OrgRegistration";
import moment from "moment";
import EmptyEvent from "../EmptyEvent/EmptyEvent";
import { Link,useNavigate } from "react-router-dom";

function EventInfo({ onOpen }) {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState({
    isShown: false,
    data: null,
    type: "add",
  });
  
  const navigate = useNavigate();
  const componentStyle = {
    content: {
      width: "36rem",
      height: "36rem",
      overflowY: "auto",
      padding: "1rem",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    },
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1000,
    },
  };

  async function handleGetEvents() {
    try {
      const response = await axiosInstance.get("/get-events");
      if (response && response.data) {
        setEvents(response.data.events);
      }

      // console.log(response.data.events);
      // console.log(response.data.events[0].eventDateStart);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function handleClose() {
    setOpenModal({
      isShown: false,
      data: null,
      type: "close",
    });
  }

  function handleOpen() {
    setOpenModal({
      isShown: true,
      data: null,
      type: "add",
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/eventPermission");
  }

  useEffect(() => {
    handleGetEvents();
  }, []);

  function handleEdit(event) {
    setOpenModal({
      isShown: true,
      data: event,
      type: "edit",
    });
  }

  async function handleEditValue(event) {
    onOpen(); // Ensure `onOpen` is properly defined

    try {
      await axiosInstance.put("/update-event", {
        // Add request payload
      });
    } catch (err) {
      console.error("Error updating event:", err);
    }
  }

  async function handleDelete(event) {
    try {
      const eventId = event._id;
      const response = await axiosInstance.delete("/delete-event/" + eventId);
      handleGetEvents();
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  return (
    <>
      <div className="eventInfo-header">
        <h2>Event Card</h2>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div className="event-container-one">
        <div className="event-container-two">
          {/* Modal is placed outside the conditional check so it works properly */}
          <Modal
            isOpen={openModal.isShown}
            style={componentStyle}
            className="custom-modal-content"
          >
            <OrgRegistration
              onClose={handleClose}
              handleGetEvents={handleGetEvents}
              eventData={openModal.data}
              type={openModal.type}
            />
          </Modal>

          {events.length === 0 ? (
            <EmptyEvent />
          ) : (
            events.map((event, index) => (
              <div className="event" key={index}>
                <div className="image-container"></div>
                <div className="title">
                  <h3>Title</h3>
                  <p>{event?.eventName || "No title"}</p>
                </div>

                <div className="about">
                  <h3>About this event</h3>
                  <p>{event?.eventSummary || "No description available."}</p>
                </div>

                <div className="date">
                  <h3>Start Date</h3>
                  <p>
                    {event?.eventDateStart
                      ? moment(event.eventDateStart).format("Do MM YYYY")
                      : "N/A"}
                  </p>

                  <h3>End Date</h3>
                  <p>
                    {event?.eventDateEnd
                      ? moment(event.eventDateEnd).format("Do MM YYYY")
                      : "N/A"}
                  </p>
                </div>

                <div className="registrationDeadline">
                  <h3>Registration Deadline</h3>
                  <p>
                    {event?.eventRegistrationDeadline
                      ? moment(event.eventRegistrationDeadline).format(
                          "Do MMM YYYY"
                        )
                      : "N/A"}
                  </p>
                </div>

                <div className="fee">
                  <h3>Registration Fee</h3>
                  <p>{event?.eventFee || 0} Rupees</p>
                </div>

                <div className="price">
                  <h3>Price Details</h3>
                  <p>
                    First Prize:{" "}
                    <span>{event?.eventWinningPrice || "0"} INR</span>
                  </p>
                  <p>
                    Second Prize: <span>{event.secondPrize || "0"} INR</span>
                  </p>
                </div>

                <div className="venue">
                  <h3>Event Venue</h3>
                  <p>{event?.eventVenue || "Venue not available"}</p>
                </div>

                <div className="contact">
                  <h3>Contact Details</h3>
                  <p>Contact: {event?.eventContact || "N/A"}</p>
                </div>

                <div className="mode">
                  <h3>Mode</h3>
                  <p>{event?.eventMode || "N/A"}</p>
                </div>

                <div className="location">
                  <h3>Location</h3>
                  <p>{event?.eventLocation || "N/A"}</p>
                </div>

                <div className="brochure">
                  <h3>Brochure</h3>
                  <div>{event?.eventBrochure || "N/A"}</div>
                </div>

                <div className="controls">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(event)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="eventInfo-controls">
          <button className="add-btn" onClick={handleOpen}>
            Add
          </button>
          <button className="back-btn" onClick={handleOpen}>
            <Link to="/">Back</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default EventInfo;

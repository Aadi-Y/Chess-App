import React, { useState } from "react";
import "./OrgRegistration.css";
import axiosInstance from "../../utils/axiosInstance";

function OrgRegistration({ onClose,handleGetEvents,eventData ,type}) {
    const [formData, setFormData] = useState({
        eventName: eventData?.eventName || "",
        eventLocation: eventData?.eventLocation || "",
        eventDateStart: eventData?.eventDateStart|| "",
        eventDateEnd: eventData?.eventDateEnd || "",
        eventMode: eventData?.eventMode || "",
        eventContact : eventData?.eventContact || "",
        eventVenue:eventData?.eventVenue || "",
        eventFee: eventData?.eventFee ||  "",
        eventWinningPrice: eventData?.eventWinningPrice || "",
        eventSummary: eventData?.eventSummary || "",
        eventRegistrationDeadline : eventData?.eventRegistrationDeadline || "",
        eventBrochure: eventData?.eventBrochure || "", // Store file object
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    

    // function handleFileChange(e) {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         eventBrochure: e.target.files[0], // Store file object
    //     }));
    // }

    // async function handleGetEvent(){
    //     try{
    //         const response = axiosInstance.get("/get-events");
    //         if(response.data && response.data.message){
    //             console.log(response.data.message);
    //             }
    //         }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const formDataToSend = new FormData();

        formDataToSend.append("eventName", formData.eventName);
        formDataToSend.append("eventLocation", formData.eventLocation);
        formDataToSend.append("eventDateStart", formData.eventDateStart);
        formDataToSend.append("eventDateEnd", formData.eventDateEnd);
        formDataToSend.append("eventMode", formData.eventMode);
        formDataToSend.append("eventContact",formData.eventContact);
        formDataToSend.append("eventVenue",formData.eventVenue);
        formDataToSend.append("eventFee", formData.eventFee);
        formDataToSend.append("eventWinningPrice", formData.eventWinningPrice);
        formDataToSend.append("eventRegistrationDeadline",formData.eventRegistrationDeadline);
        formDataToSend.append("eventSummary", formData.eventSummary);
        formDataToSend.append("eventBrochure", "will be uploaded soon"); // Attach file

        try {
            const response = await axiosInstance.post("/add-event", formDataToSend, {
                // headers: { "Content-Type": "multipart/form-data" }
            });
            
            if(response.data){
                onClose();
                handleGetEvents();
                alert(response.data.message)
            }
        }catch (error) {
            // console.error("Upload failed:", error.data.message);
            console.log(error.response)
        }
        // console.log(formData);
    }

    async function handleUpdate(){
        const formDataToSend = new FormData();

        formDataToSend.append("eventName", formData.eventName);
        formDataToSend.append("eventLocation", formData.eventLocation);
        formDataToSend.append("eventDateStart", formData.eventDateStart);
        formDataToSend.append("eventDateEnd", formData.eventDateEnd);
        formDataToSend.append("eventMode", formData.eventMode);
        formDataToSend.append("eventContact",formData.eventContact);
        formDataToSend.append("eventVenue",formData.eventVenue);
        formDataToSend.append("eventFee", formData.eventFee);
        formDataToSend.append("eventWinningPrice", formData.eventWinningPrice);
        formDataToSend.append("eventRegistrationDeadline",formData.eventRegistrationDeadline);
        formDataToSend.append("eventSummary", formData.eventSummary);
        formDataToSend.append("eventBrochure", "will be uploaded soon"); // Attach file

        try{
            const eventId = eventData._id;
            const response = await axiosInstance.put("/update-event/" + eventId , formDataToSend);

            if(response && response.data){
                onClose();
                handleGetEvents();
                alert(response.data.message);
                
            }
        }
        catch(error){
            if(error){
                console.log(error.response);
            }
        }

    }

    

    return (
        <div className="orgReg-main-container">
            <main>
                <div className="orgReg-title">
                    <h2>Organization Registration</h2>
                </div>

                <div className="input-title">
                    <label htmlFor="eventName">Name of the Event</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} placeholder="Event Name" />
                </div>

                <div className="input-location">
                    <label htmlFor="eventLocation">Location of the Event</label>
                    <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} placeholder="Event Location" />
                </div>

                <div className="input-date">
                    <label htmlFor="eventDateStart">Starting Date of the Event</label>
                    <input type="date" name="eventDateStart" value={formData.eventDateStart} onChange={handleInputChange} />
                </div>

                <div className="input-date">
                    <label htmlFor="eventDateEnd">Ending Date of the Event</label>
                    <input type="date" name="eventDateEnd" value={formData.eventDateEnd} onChange={handleInputChange} />
                </div>

                <div className="input-registration-deadline">
                    <label htmlFor="eventRegistrationDeadline">Registration Deadline</label>
                    <input type="date" name="eventRegistrationDeadline" value={formData.eventRegistrationDeadline} onChange={handleInputChange} />
                </div>

                <div className="input-mode">
                    <label htmlFor="eventMode">Mode of the Event (Online or Offline)</label>
                    <input type="text" name="eventMode" value={formData.eventMode} onChange={handleInputChange} placeholder="Enter Mode" />
                </div>

                <div className="price-details">
                    <div className="event-fee">
                        <label htmlFor="eventFee">Event Fee (Enter 0 if free)</label>
                        <input type="text" name="eventFee" value={formData.eventFee} onChange={handleInputChange} placeholder="Enter Fee" />
                    </div>

                    <div className="event-winning-price">
                        <label htmlFor="eventWinningPrice">Winning Prize (Enter 0 if no cash prize)</label>
                        <input type="text" name="eventWinningPrice" value={formData.eventWinningPrice} onChange={handleInputChange} placeholder="Enter Prize" />
                    </div>
                </div>

                <div className="image-container">
                    <label htmlFor="eventBrochure">Event Brochure</label>
                    <input type="file" name="eventBrochure" className="input-image" onChange={handleInputChange} />
                </div>
                
                <div className="input-venue">
                    <label htmlFor="eventVenue">Event Venue</label>
                    <textarea name="eventVenue" value={formData.eventVenue} onChange={handleInputChange}></textarea>
                </div>

                <div className="input-about">
                    <label htmlFor="eventSummary">Summary of the Event</label>
                    <textarea name="eventSummary" value={formData.eventSummary} onChange={handleInputChange}></textarea>
                </div>

                <div className="input-contact">
                    <label htmlFor="eventContact">Contact details</label>
                    <textarea name="eventContact" value={formData.eventContact} onChange={handleInputChange}></textarea>
                </div>

                <div className="controls">
                    {
                        type === "add" ? (
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        ) : (
                            <button className="submit-btn" onClick={handleUpdate}>Update</button>
                        )
                    }

                    
                    <button className="submit-btn" onClick={onClose}>Close</button>
                </div>
            </main>
        </div>
    );
}

export default OrgRegistration;

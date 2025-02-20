const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config.json");
const dotenv = require("dotenv");
const upload = require("./middleware/multerMiddleware");
dotenv.config();
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const uploadImageRoutes = require("./routes/imageRoute");
const authRoute = require("./routes/authRoutes");
const {authenticateToken} = require("./utils/utilities");
const Event = require("./models/eventModel");
const Player = require("./models/playerModel");
const ImageModal = require("./models/StoreImage");


const port =  7000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/image",authenticateToken,uploadImageRoutes);
app.use("/api/auth",authRoute);

// Getting all the events
app.get("/get-events",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const events = await Event.find({userId:user.id});

    return res.status(200).json({ 
      message: "Getting all the events",
      error: false,
      events
    });
  } catch (err) {
    return res.status(500).json({message: `${err.message}` });
  }
});

app.get("/get-all-events",async (req,res)=>{
  try{
    const events = await Event.find({});

    return res.status(200).json({
      error:false,
      message:"Getting all the events",
      events
    });

  }catch(error){
    return res.status(500).json({
      error:false,
      message:`${error.message}`
    });
  }
})

// Getting all the players
app.get("/get-all-players",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const players = await Player.find({userId:user.id});
    return res.status(200).json({
      message: "Getting all the players",
      error: false,
      players,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}` });
  }
});

// Posting events
app.post("/add-event",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const event = new Event({...req.body,userId:user.id});
    await event.save();

    return res.status(201).json({
      message: "Event added successfully",
      error: false,
      eventDetails: event,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});

// Posting players
app.post("/add-player",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const player = new Player({...req.body,userId:user.id});
    await player.save();

    return res.status(201).json({
      message: "Player registered successfully",
      error: false,
      playerDetails: player,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});

// Updating events
app.put("/update-event/:eventId",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const {eventId} = req.params;
    const updatedEvent = await Event.findByIdAndUpdate({userId:user.id, _id:eventId}, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      error: false,
      updatedEvent,
    });

  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});

// Updating players
app.put("/update-player/:playerId",authenticateToken,async (req, res) => {
  try {
    const {playerId} = req.params;
    const {user} = req;
    const updatedPlayer = await Player.findByIdAndUpdate({_id:playerId,userId:user.id}, req.body, {
      new: true,
    });

    if (!updatedPlayer) {
      return res.status(404).json({
        message: "Player not found",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Player updated successfully",
      error: false,
      updatedPlayer,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});

// Deleting events
app.delete("/delete-event/:eventId",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const {eventId} = req.params;
    const deletedEvent = await Event.findByIdAndDelete({_id:eventId,userId:user._id});

    if (!deletedEvent) {
      return res.status(404).json({
        error: true,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event deleted successfully",
      error: false,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});

// Deleting players
app.delete("/delete-player/:playerId",authenticateToken,async (req, res) => {
  try {
    const {user} = req;
    const {playerId} = req.params;
    const deletedPlayer = await Player.findByIdAndDelete({_id:playerId,userId:user._id});

    if (!deletedPlayer) {
      return res.status(404).json({
        error: true,
        message: "Player not found",
      });
    }

    return res.status(200).json({
      message: "Player deleted successfully",
      error: false,
    });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}`, error: true });
  }
});


app.listen(port, () => {
  console.log("The server is running at port:", port);
});


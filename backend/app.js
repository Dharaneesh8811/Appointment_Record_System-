const express = require("express");
const cors = require("cors");

require("./config/db");

const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Appointment API is running",
  });
});


app.use("/api/appointments", appointmentRoutes);

module.exports = app;
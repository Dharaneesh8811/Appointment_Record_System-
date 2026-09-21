const express = require("express");

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// READ ALL
router.get("/", getAppointments);

// READ ONE
router.get("/:id", getAppointmentById);

// UPDATE
router.put("/:id", updateAppointment);

// DELETE
router.delete("/:id", deleteAppointment);

// UPDATE STATUS
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;
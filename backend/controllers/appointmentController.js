const db = require("../config/db");


const createAppointment = (req, res) => {
  const {
    name,
    email,
    phone,
    appointment_date,
    reason,
  } = req.body;

  if (!name || !email || !phone || !appointment_date || !reason) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO appointments
    (name, email, phone, appointment_date, reason, status)
    VALUES (?, ?, ?, ?, ?, 'PENDING')
  `;

  const values = [
    name,
    email,
    phone,
    appointment_date,
    reason,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating appointment:", err);

      return res.status(500).json({
        message: "Failed to create appointment",
      });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointmentId: result.insertId,
    });
  });
};



// GET ALL APPOINTMENTS

const getAppointments = (req, res) => {
  const sql = `
    SELECT *
    FROM appointments
    ORDER BY appointment_date ASC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);

      return res.status(500).json({
        message: "Failed to fetch appointments",
      });
    }

    res.status(200).json(results);
  });
};


// GET SINGLE APPOINTMENT

const getAppointmentById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM appointments
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching appointment:", err);

      return res.status(500).json({
        message: "Failed to fetch appointment",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json(results[0]);
  });
};


// UPDATE APPOINTMENT

const updateAppointment = (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    phone,
    appointment_date,
    reason,
  } = req.body;

  if (!name || !email || !phone || !appointment_date || !reason) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql = `
    UPDATE appointments
    SET
      name = ?,
      email = ?,
      phone = ?,
      appointment_date = ?,
      reason = ?
    WHERE id = ?
  `;

  const values = [
    name,
    email,
    phone,
    appointment_date,
    reason,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating appointment:", err);

      return res.status(500).json({
        message: "Failed to update appointment",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
    });
  });
};

// DELETE APPOINTMENT

const deleteAppointment = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM appointments
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting appointment:", err);

      return res.status(500).json({
        message: "Failed to delete appointment",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  });
};


// CHANGE APPOINTMENT STATUS

const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["PENDING", "CONFIRMED"].includes(status)) {
    return res.status(400).json({
      message: "Status must be PENDING or CONFIRMED",
    });
  }

  const sql = `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);

      return res.status(500).json({
        message: "Failed to update appointment status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
    });
  });
};


module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
};
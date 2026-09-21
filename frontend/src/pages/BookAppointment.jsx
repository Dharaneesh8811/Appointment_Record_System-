import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

import { createAppointment } from "../services/appointmentApi";

function BookAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointment_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if ( !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.appointment_date ||
      !formData.reason
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.appointment_date < getTodayDate()) {
      setError("Please select today or a future date.");
      return;
    }

    try {
      setLoading(true);

      await createAppointment(formData);

      setMessage("Appointment booked successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        appointment_date: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <section className="booking-page">
      <div className="booking-container">
        <div className="page-heading">
          <span className="eyebrow">APPOINTMENT</span>

          <h1>Book an appointment</h1>

          <p>
            Enter the details below to schedule a new appointment.
          </p>
        </div>

        <div className="booking-card">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="section-title">
                <h2>Personal details</h2>
                <p>Provide the basic information for the appointment.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full name</label>

                  <div className="input-wrapper">
                    <FiUser />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>

                  <div className="input-wrapper">
                    <FiMail />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>

                  <div className="input-wrapper">
                    <FiPhone />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="appointment_date">
                    Appointment date
                  </label>

                  <div className="input-wrapper">
                    <FiCalendar />

                    <input
                      id="appointment_date"
                      type="date"
                      name="appointment_date"
                      min={getTodayDate()}
                      value={formData.appointment_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <h2>Appointment details</h2>
                <p>Tell us briefly about the reason for your visit.</p>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for appointment</label>

                <div className="textarea-wrapper">
                  <FiFileText />

                  <textarea
                    id="reason"
                    name="reason"
                    placeholder="Enter the reason for your appointment"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="5"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className="form-message success">
                {message}
              </div>
            )}

            {error && (
              <div className="form-message error">
                {error}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/appointments")}
              >
                View appointments
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Booking...
                  </>
                ) : (
                  <>
                    Book appointment
                    {/* <FiArrowRight /> */}
                  </>
                )}

                {!loading && <FiArrowRight />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookAppointment;
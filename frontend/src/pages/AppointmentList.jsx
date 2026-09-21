import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiFileText,
  FiTrash2,
  FiCheck,
  FiClock,
  FiSearch,
  FiX,
} from "react-icons/fi";

import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "../services/appointmentApi";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAppointments();

      setAppointments(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "PENDING" ? "CONFIRMED" : "PENDING";

    try {
      await updateAppointmentStatus(id, newStatus);

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to update appointment status.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(id);

      setAppointments((previous) =>
        previous.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Unable to delete appointment.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDING"
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "CONFIRMED"
  ).length;

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        !search ||
        appointment.name?.toLowerCase().includes(search) ||
        appointment.email?.toLowerCase().includes(search) ||
        appointment.phone?.toLowerCase().includes(search);

      const matchesFilter =
        activeFilter === "ALL" ||
        appointment.status === activeFilter;

      return matchesSearch && matchesFilter;
    }
  );

  return (
    <section className="list-page">
      <div className="list-container">

        {/* Header */}
        <div className="list-header">
          <div>
            <span className="eyebrow">RECORDS</span>

            <h1>All appointments</h1>

            <p>
              View and manage all scheduled appointments.
            </p>
          </div>

          <Link to="/" className="book-button">
            + Book appointment
          </Link>
        </div>

        {/* Summary */}
        <div className="appointment-summary">

          <div className="summary-card">
            <span className="summary-label">
              Total appointments
            </span>

            <strong>{totalAppointments}</strong>
          </div>

          <div className="summary-card">
            <span className="summary-label">
              Pending
            </span>

            <strong>{pendingAppointments}</strong>
          </div>

          <div className="summary-card">
            <span className="summary-label">
              Confirmed
            </span>

            <strong>{confirmedAppointments}</strong>
          </div>
        </div>

        <div className="appointment-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="clear-search"
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}

        </div>
        
        <div className="appointment-filters">

          <button
            type="button"
            className={
              activeFilter === "ALL"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setActiveFilter("ALL")}
          >
            All
            <span>{totalAppointments}</span>
          </button>

          <button
            type="button"
            className={
              activeFilter === "PENDING"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setActiveFilter("PENDING")}
          >
            Pending
            <span>{pendingAppointments}</span>
          </button>

          <button
            type="button"
            className={
              activeFilter === "CONFIRMED"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setActiveFilter("CONFIRMED")}
          >
            Confirmed
            <span>{confirmedAppointments}</span>
          </button>

        </div>

        {/* Content */}
        <div className="appointments-card">

          {loading && (
            <div className="list-message">

              <span className="loading-spinner"></span>

              <span>
                Loading appointments...
              </span>

            </div>
          )}

          {!loading && error && (
            <div className="list-message error-list">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            appointments.length === 0 && (
              <div className="empty-appointments">
                <div className="empty-icon">
                  <FiCalendar />
                </div>

                <h3>No appointments yet</h3>

                <p>
                  Book your first appointment to see it here.
                </p>

                <Link to="/" className="book-button">
                  Book appointment
                </Link>
              </div>
            )}

          {!loading &&
            !error &&
            appointments.length > 0 && (
              <div className="appointment-list">

                {filteredAppointments.map((appointment) => (
                  <div
                    className="appointment-item"
                    key={appointment.id}
                  >
                    {/* Person */}
                    <div className="appointment-person">
                      <div className="person-icon">
                        <FiUser />
                      </div>

                      <div>
                        <h3>{appointment.name}</h3>

                        <span>
                          Appointment #{appointment.id}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="appointment-details">

                      <div className="detail-item">
                        <FiMail />

                        <span>
                          {appointment.email}
                        </span>
                      </div>

                      <div className="detail-item">
                        <FiPhone />

                        <span>
                          {appointment.phone}
                        </span>
                      </div>

                      <div className="detail-item">
                        <FiCalendar />

                        <span>
                          {formatDate(
                            appointment.appointment_date
                          )}
                        </span>
                      </div>

                      <div className="detail-item reason-item">
                        <FiFileText />

                        <span>
                          {appointment.reason}
                        </span>
                      </div>

                    </div>

                    {/* Status + actions */}
                    <div className="appointment-actions">

                      <button
                        className={`status-button ${
                          appointment.status === "CONFIRMED"
                            ? "confirmed"
                            : "pending"
                        }`}
                        onClick={() =>
                          handleStatusChange(
                            appointment.id,
                            appointment.status
                          )
                        }
                      >
                        {appointment.status === "CONFIRMED" ? (
                          <>
                            <FiCheck />
                            Confirmed
                          </>
                        ) : (
                          <>
                            <FiClock />
                            Pending
                          </>
                        )}
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(appointment.id)
                        }
                        title="Delete appointment"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}

        </div>
      </div>
    </section>
  );
}

export default AppointmentList;
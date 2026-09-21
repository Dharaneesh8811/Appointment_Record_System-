import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiFileText,
  FiTrash2,
  FiCheck,
  FiClock,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  // Number of appointment cards per page
  const appointmentsPerPage = 6;

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

  // --------------------------------------------------
  // STATUS
  // --------------------------------------------------

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "PENDING"
        ? "CONFIRMED"
        : "PENDING";

    try {
      await updateAppointmentStatus(id, newStatus);

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                status: newStatus,
              }
            : appointment
        )
      );
    } catch (err) {
      console.error(err);

      alert("Unable to update appointment status.");
    }
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    try {
      await deleteAppointment(id);

      setAppointments((previous) =>
        previous.filter(
          (appointment) => appointment.id !== id
        )
      );
    } catch (err) {
      console.error(err);

      alert("Unable to delete appointment.");
    }
  };

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // SEARCH + FILTER
  // --------------------------------------------------

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        appointment.name
          ?.toLowerCase()
          .includes(searchValue) ||
        appointment.email
          ?.toLowerCase()
          .includes(searchValue) ||
        appointment.phone
          ?.toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "ALL" ||
        appointment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [appointments, search, filter]);

  // --------------------------------------------------
  // PAGINATION
  // --------------------------------------------------

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const startIndex =
    (currentPage - 1) * appointmentsPerPage;

  const currentAppointments =
    filteredAppointments.slice(
      startIndex,
      startIndex + appointmentsPerPage
    );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((previous) => previous - 1);
    }
  };

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "PENDING"
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "CONFIRMED"
  ).length;

  return (
    <section className="list-page">
      <div className="list-container">

        {/* HEADER */}
        <div className="list-header">
          <div>
            <span className="eyebrow">RECORDS</span>

            <h1>Appointments</h1>

            <p>
              View and manage all scheduled appointments.
            </p>
          </div>

          <Link
            to="/book"
            className="book-button"
          >
            + New appointment
          </Link>
        </div>

        {/* SUMMARY */}
        <div className="appointment-summary">

          <div className="summary-card">
            <span className="summary-label">
              Total appointments
            </span>

            <strong>
              {totalAppointments}
            </strong>
          </div>

          <div className="summary-card">
            <span className="summary-label">
              Pending
            </span>

            <strong>
              {pendingAppointments}
            </strong>
          </div>

          <div className="summary-card">
            <span className="summary-label">
              Confirmed
            </span>

            <strong>
              {confirmedAppointments}
            </strong>
          </div>

        </div>

        {/* SEARCH */}
        <div className="appointment-toolbar">

          <div className="appointment-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

        </div>

        {/* FILTERS */}
        <div className="appointment-filters">

          <button
            className={
              filter === "ALL"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("ALL")}
          >
            All
          </button>

          <button
            className={
              filter === "PENDING"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setFilter("PENDING")}
          >
            Pending
          </button>

          <button
            className={
              filter === "CONFIRMED"
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() =>
              setFilter("CONFIRMED")
            }
          >
            Confirmed
          </button>

        </div>

        {/* CONTENT */}
        {loading && (
          <div className="list-message">
            Loading appointments...
          </div>
        )}

        {!loading && error && (
          <div className="list-message error-list">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredAppointments.length === 0 && (
            <div className="empty-appointments">

              <div className="empty-icon">
                <FiCalendar />
              </div>

              <h3>
                No appointments found
              </h3>

              <p>
                There are no appointments matching
                your search or filter.
              </p>

            </div>
          )}

        {/* APPOINTMENT GRID */}
        {!loading &&
          !error &&
          currentAppointments.length > 0 && (
            <div className="appointment-grid">

              {currentAppointments.map(
                (appointment) => (
                  <div
                    className="appointment-card"
                    key={appointment.id}
                  >

                    {/* CARD HEADER */}
                    <div className="appointment-card-header">

                      <div className="appointment-person">

                        <div className="person-icon">
                          <FiUser />
                        </div>

                        <div>
                          <h3>
                            {appointment.name}
                          </h3>

                          <span>
                            Appointment #
                            {appointment.id}
                          </span>
                        </div>

                      </div>

                      <span
                        className={`appointment-status ${
                          appointment.status ===
                          "CONFIRMED"
                            ? "confirmed"
                            : "pending"
                        }`}
                      >
                        {appointment.status ===
                        "CONFIRMED" ? (
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
                      </span>

                    </div>

                    {/* DETAILS */}
                    <div className="appointment-card-details">

                      <div className="card-detail">
                        <FiMail />
                        <span>
                          {appointment.email}
                        </span>
                      </div>

                      <div className="card-detail">
                        <FiPhone />
                        <span>
                          {appointment.phone}
                        </span>
                      </div>

                      <div className="card-detail">
                        <FiCalendar />
                        <span>
                          {formatDate(
                            appointment.appointment_date
                          )}
                        </span>
                      </div>

                      <div className="card-detail reason">
                        <FiFileText />
                        <span>
                          {appointment.reason}
                        </span>
                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="appointment-card-actions">

                      <button
                        className={`status-button ${
                          appointment.status ===
                          "CONFIRMED"
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
                        {appointment.status ===
                        "CONFIRMED"
                          ? "Set Pending"
                          : "Confirm"}
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            appointment.id
                          )
                        }
                        title="Delete appointment"
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        {/* PAGINATION */}
        {!loading &&
          !error &&
          filteredAppointments.length > 0 && (
            <div className="appointment-pagination">

              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <FiChevronLeft />
                Prev
              </button>

              <div className="pagination-info">
                Page{" "}
                <strong>{currentPage}</strong>{" "}
                of{" "}
                <strong>
                  {totalPages || 1}
                </strong>
              </div>

              <button
                className="pagination-button"
                disabled={
                  currentPage === totalPages
                }
                onClick={goToNextPage}
              >
                Next
                <FiChevronRight />
              </button>

            </div>
          )}

      </div>
    </section>
  );
}

export default AppointmentList;
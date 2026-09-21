import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FiCalendar,
  FiClipboard,
  FiPlus,
  FiUser,
  FiLogOut,
  FiChevronUp,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const userEmail = loggedInUser?.email || "";

  const userName = userEmail
    ? userEmail
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-content">

        {/* Brand */}
        <div className="sidebar-brand">

          <div className="brand-icon">
            <FiCalendar />
          </div>

          <div>
            <h2>Appointments</h2>
            <span>Record System</span>
          </div>

        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <span className="nav-label">
            MENU
          </span>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FiPlus />

            <span>
              Book Appointment
            </span>
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <FiClipboard />

            <span>
              All Appointments
            </span>
          </NavLink>

        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">

          {/* Profile Wrapper */}
          <div className="profile-wrapper">

            {profileOpen && (
              <div className="profile-menu">

                <div className="profile-menu-header">

                  <div className="profile-menu-avatar">
                    <FiUser />
                  </div>

                  <div>
                    <strong>
                      {userName}
                    </strong>

                    <span>
                      {userEmail}
                    </span>
                  </div>

                </div>

                <div className="profile-menu-divider" />

                <button
                  type="button"
                  className="profile-menu-item logout-menu-item"
                  onClick={handleLogout}
                >
                  <FiLogOut />

                  <span>
                    Logout
                  </span>
                </button>

              </div>
            )}

            {/* Profile Button */}
            <button
              type="button"
              className="sidebar-profile"
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
            >

              <div className="profile-avatar">
                <FiUser />
              </div>

              <div className="profile-info">

                <strong>
                  {userName}
                </strong>

                <span>
                  {userEmail}
                </span>

              </div>

              <FiChevronUp
                className={`profile-chevron ${
                  profileOpen ? "open" : ""
                }`}
              />

            </button>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
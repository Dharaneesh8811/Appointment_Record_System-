import { NavLink, useNavigate } from "react-router-dom";

import {
  FiCalendar,
  FiClipboard,
  FiPlus,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

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

        {/* Bottom section */}
        <div className="sidebar-bottom">

          {/* Profile */}
          <div className="sidebar-profile">

            <div className="profile-avatar">
              <FiUser />
            </div>

            <div className="profile-info">
              <strong>
                Admin
              </strong>

              <span>
                admin@gmail.com
              </span>
            </div>

          </div>

          {/* Logout */}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <FiLogOut />

            <span>
              Logout
            </span>
          </button>

        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
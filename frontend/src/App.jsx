import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointment";
import AppointmentList from "./pages/AppointmentList";

function ProtectedLayout() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="app-content">

        <Routes>
          <Route
            path="/"
            element={<BookAppointment />}
          />

          <Route
            path="/appointments"
            element={<AppointmentList />}
          />
        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/*"
        element={<ProtectedLayout />}
      />

    </Routes>
  );
}

export default App;
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import BookAppointment from "./pages/BookAppointment";
import AppointmentList from "./pages/AppointmentList";

function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function HandlerLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* Public customer page */}
      <Route path="/book" element={<BookAppointment />} />

      {/* Handler login */}
      <Route path="/login" element={<Login />} />

      {/* Handler protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<HandlerLayout />}>
          <Route path="/appointments" element={<AppointmentList />} />
        </Route>
      </Route>

      {/* Default page */}
      <Route
        path="/"
        element={<Navigate to="/book" replace />}
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/book" replace />}
      />

    </Routes>
  );
}

export default App;
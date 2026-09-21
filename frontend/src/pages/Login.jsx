import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Temporary demo login
    if (
      email === "dass@gmail.com" &&
      password === "code101112"
    ) {
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email: email,
      })
    );
    
      navigate("/");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <main className="login-page">

      <div className="login-card">

        {/* Logo */}
        {/* <div className="login-logo">
          <FiCalendar />
        </div> */}

        {/* Heading */}
        <div className="login-heading">

          <span className="eyebrow">
            APPOINTMENT SYSTEM
          </span>

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to manage your appointment records.
          </p>

        </div>

        {/* Form */}
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email address
            </label>

            <div className="login-input-wrapper">

              <FiMail />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>

          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="login-input-wrapper password-wrapper">
              <FiLock />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="login-button"
          >
            <span>
              Sign in
            </span>

            <FiArrowRight />
          </button>

        </form>

        {/* Footer */}
        <div className="login-footer">
          <span>
            Appointment Record System
          </span>
        </div>

      </div>

    </main>
  );
}

export default Login;
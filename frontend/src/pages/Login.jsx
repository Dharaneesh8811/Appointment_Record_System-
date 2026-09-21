import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiUser,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("customer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError("");
  };

  const handleCustomerContinue = () => {
    navigate("/book");
  };

  const handleHandlerLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

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

      navigate("/appointments");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <main className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-icon">
          <FiCalendar />
        </div>

        {/* Heading */}
        <div className="login-heading">
          <span className="eyebrow">APPOINTMENT SYSTEM</span>

          <h1>Welcome</h1>

          <p>
            Choose how you want to continue.
          </p>
        </div>

        {/* User Type Switch */}
        <div className="login-type-switch">

          <button
            type="button"
            className={
              userType === "customer"
                ? "type-button active"
                : "type-button"
            }
            onClick={() => handleUserTypeChange("customer")}
          >
            <FiUser />
            <span>Customer</span>
          </button>

          <button
            type="button"
            className={
              userType === "handler"
                ? "type-button active"
                : "type-button"
            }
            onClick={() => handleUserTypeChange("handler")}
          >
            <FiLock />
            <span>Handler</span>
          </button>

        </div>

        {/* Customer */}
        {userType === "customer" && (
          <div className="login-option-content">

            <div className="login-option-icon">
              <FiCalendar />
            </div>

            <h2>Book an appointment</h2>

            <p>
              Continue as a customer to book your
              appointment without signing in.
            </p>

            <button
              type="button"
              className="login-button"
              onClick={handleCustomerContinue}
            >
              <span>Continue to booking</span>
              <FiArrowRight />
            </button>

          </div>
        )}

        {/* Handler */}
        {userType === "handler" && (
          <form
            className="login-form"
            onSubmit={handleHandlerLogin}
          >

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

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper password-wrapper">
                <FiLock />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              <span>Sign in</span>
              <FiArrowRight />
            </button>

          </form>
        )}

        {/* Footer */}
        <div className="login-footer">
          <span>Appointment Record System</span>
        </div>

      </div>
    </main>
  );
}

export default Login;
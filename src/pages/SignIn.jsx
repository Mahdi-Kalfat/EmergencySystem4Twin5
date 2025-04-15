import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSun, FaMoon, FaTimes } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

const SignIn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(""); // State to store reCAPTCHA token
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/home");
  }, [navigate]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token); // Store the reCAPTCHA token
  };

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setError(""); // Reset error state

      // Check if reCAPTCHA token is present
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, recaptchaToken }), // Include reCAPTCHA token
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Invalid email or password");

        // Store user & token
        localStorage.setItem("user", JSON.stringify(data.user));
        Cookies.set("token", data.auth_token, { secure: true, sameSite: "Strict" });
        navigate("/home");
      } catch (err) {
        setError(err.message || "An error occurred. Please try again.");
      }
    },
    [email, password, recaptchaToken, navigate]
  );

  // Handle forgot password submission
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail || !forgotPasswordEmail.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    try {
      const response = await fetch("http://localhost:3001/users/forgetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      setResetLinkSent(true);
      setError("");
      setForgotPasswordEmail("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Section - Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6">
          <div className="w-full max-w-md">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-2xl dark:text-white/90">Sign In</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in!</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                    Email<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="info@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                  {error && error.includes("email") && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 w-full rounded-lg border border-gray-300 bg-transparent pl-10 pr-11 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-blue-500 transition-all duration-200"
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {error && <p className="mt-1 text-sm text-red-600">Invalid email or password</p>}
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey="6Ldcs-UqAAAAAFQmKnsBd78Ik7yjs1hMoFURi6Fu" // Replace with your reCAPTCHA site key
                  onChange={handleRecaptchaChange}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center text-sm">
              <p>
                Forgot your password?{" "}
                <button
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Click here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Welcome Message */}
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="text-center">
            <div className="mb-6">
              <img
                src="public\logoEms.png"
                alt="EMS Image"
                className="w-100 h-100 rounded-full mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark/Light Mode Toggle Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400 w-6 h-6" />
          ) : (
            <FaMoon className="text-gray-800 w-6 h-6" />
          )}
        </button>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800 relative">
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                setResetLinkSent(false);
                setEmailError("");
              }}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address, and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            {resetLinkSent && (
              <p className="mt-2 text-sm text-green-600">
                If your email matches any account, a mail will be sent to the address.
              </p>
            )}
            <div className="mt-6">
              <button
                onClick={handleForgotPassword}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
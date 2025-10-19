import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 IMPORT AXIOS
import "./../styles/landing.css";

// Define the base URL for your Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [authError, setAuthError] = useState(""); // State for displaying API errors

  // --- LOGIN FUNCTION (Django API Integration) ---
  const onLogin = async (data) => {
    setAuthError(""); // Clear previous errors

    try {
      // 1. Send POST request to the Django login endpoint (token endpoint)
      // NOTE: You must set up djangorestframework-simplejwt for this endpoint to work!
      const response = await axios.post(`${API_BASE_URL}/token/`, {
        username: data.email, // Django usually expects 'username', but we'll try 'email' first
        // If your Django uses username for login: username: data.username,
        password: data.password,
      });

      // 2. Handle successful response
      const { access, refresh } = response.data; // Expect tokens back
      
      // Store tokens and user state
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("loggedIn", "true");
      // You may need another API call to fetch the actual username/email
      
      window.dispatchEvent(new Event("auth:updated"));
      console.log("Logged in successfully! Tokens received.");
      navigate("/dashboard");

    } catch (error) {
      // 3. Handle login errors (e.g., Invalid credentials)
      console.error("Login failed:", error.response);
      setAuthError("Invalid email or password.");

      // You can get more specific errors from Django:
      // if (error.response?.data.detail) {
      //   setAuthError(error.response.data.detail);
      // }
    }
  };

  // --- REGISTER FUNCTION (Django API Integration) ---
  const onRegister = async (data) => {
    setAuthError(""); // Clear previous errors

    try {
      // 1. Send POST request to the Django registration endpoint
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // 2. Handle successful response (Status 201 Created)
      console.log("Registration successful:", response.data);
      alert("Registered successfully! You can now log in.");

      // Switch to the login view after successful registration
      setShowRegister(false);

    } catch (error) {
      // 3. Handle registration errors (e.g., email or username already exists)
      console.error("Registration failed:", error.response);
      
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        // Check for specific Django validation errors
        if (errorData.username) {
          setAuthError(`Username: ${errorData.username[0]}`);
        } else if (errorData.email) {
          setAuthError(`Email: ${errorData.email[0]}`);
        } else {
          setAuthError("Registration failed. Please check your inputs.");
        }
      } else {
        setAuthError("Network error. Could not connect to the server.");
      }
    }
  };

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Tariff Impact Simulator</h1>
        <p>
          A real-time dashboard to visualize how trade tariffs affect market prices,
          imports, and exports. Compare scenarios and make data-driven decisions.
        </p>
        <a href="#auth" className="scroll-btn">Get Started</a>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>Why it matters</h2>
        <p>
          Tariffs shape the global economy - our simulator helps policymakers,
          economists, and students understand their impact with instant visual insights.
        </p>
      </section>

      {/* LOGIN/REGISTER SECTION */}
      <section id="auth" className="auth-section">
        <h2>{showRegister ? "Register" : "Login"}</h2>
        {authError && <p className="error" style={{color: 'red'}}>{authError}</p>} 

        <form
          className="auth-form"
          onSubmit={handleSubmit(showRegister ? onRegister : onLogin)}
        >
          {showRegister && (
            <input
              type="text"
              placeholder="Username"
              // Username is required only for registration
              {...register("username", { required: showRegister && "Username is required" })}
            />
          )}
          {showRegister && errors.username && <p className="error">{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">{showRegister ? "Register" : "Login"}</button>
        </form>

        <p className="switch-mode">
          {showRegister ? (
            <>
              Already have an account?{" "}
              <span onClick={() => { setShowRegister(false); setAuthError(""); }}>Login here</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => { setShowRegister(true); setAuthError(""); }}>Register here</span>
            </>
          )}
        </p>
      </section>
    </div>
  );
}
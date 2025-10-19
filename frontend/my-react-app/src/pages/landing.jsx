import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import "./../styles/landing.css";

export default function Login() {
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showRegister, setShowRegister] = useState(false);

  // When user submits form
  const onLogin = (data) => {
    const user = login(data.email, data.password);
    if (user) {
      console.log(`${user.username} logged in successfully!`);
      navigate("/dashboard");
    } else alert("Invalid email or password");
  };

  const onRegister = (data) => {
    const success = registerUser(data);
    alert(success ? "Registered successfully! You can now log in." : "Email already registered");
    if (success) setShowRegister(false);
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
        <form
          className="auth-form"
          onSubmit={handleSubmit(showRegister ? onRegister : onLogin)}
        >
          {showRegister && (
            <input type="text" placeholder="Username" {...register("username", { required: showRegister })} />
          )}
          <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
          <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
          
          {errors.password && <p className="error">{errors.password.message}</p>}
          <button type="submit">{showRegister ? "Register" : "Login"}</button>
        </form>

        <p className="switch-mode">
          {showRegister ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setShowRegister(false)}>Login here</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setShowRegister(true)}>Register here</span>
            </>
          )}
        </p>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import "./LoginSignup.css";
import { API_BASE } from "../api";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);

  // Signup states
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ---------------- SIGNUP HANDLER ----------------
  const handleSignup = async () => {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: signupEmail,
        password: signupPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup Successful! You can now login.");
      setIsLogin(true); // switch to login page
    } else {
      alert(data.detail || "Signup failed");
    }
  };

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      alert("Login Successful!");
      // redirect to home page
      window.location.href = "/home";
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="loginsignup2">
      <div className="container">
        <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>

        <div className="fields">
          {/* SIGNUP FORM */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="email address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </>
          )}

          {/* LOGIN FORM */}
          {isLogin && (
            <>
              <input
                type="email"
                placeholder="email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </>
          )}
        </div>

        {/* BUTTON */}
        {!isLogin ? (
          <button className="continue" onClick={handleSignup}>
            Continue
          </button>
        ) : (
          <button className="continue" onClick={handleLogin}>
            Login
          </button>
        )}

        {/* Terms only for signup */}
        {!isLogin && (
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By continuing I agree to <span>terms and conditions</span>
            </label>
          </div>
        )}

        {/* SWITCH LOGIN ↔ SIGNUP */}
        <p className="abc">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Signup here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;

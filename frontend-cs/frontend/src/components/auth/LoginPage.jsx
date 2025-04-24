import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../service/UserService";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const prefilledEmail = query.get("email");
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        window.location.reload();
        navigate("/");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
    const decoded = jwtDecode(credentialResponse.credential);
    const googleEmail = decoded.email;
    console.log("Google email:", googleEmail);
    setEmail(googleEmail); // prefill email
    } catch (err) {
    console.error("Failed to decode Google token:", err);
    setError("Google login failed");
    }
    };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: "1rem" }}> <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => setError("Google login failed")} /> </div>
    </div>
  );
}

export default LoginPage;

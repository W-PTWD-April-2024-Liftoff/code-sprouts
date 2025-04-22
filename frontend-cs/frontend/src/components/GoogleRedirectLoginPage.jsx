import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Google login page that uses Google OAuth 2.0 to authenticate users and then redirects them to a login route with their email

function GoogleRedirectLoginPage() {
const navigate = useNavigate();

const handleGoogleLoginSuccess = (credentialResponse) => { //Receives the credentialResponse from Google when login succeeds
try {
const decoded = jwtDecode(credentialResponse.credential); //Extracts and decodes the JWT to get user details like email
const email = decoded.email;
console.log("Google Email:", email); //Logs the email to the console.

navigate(`/login?email=${encodeURIComponent(email)}`); //redirect to login
} catch (error) {
console.error("Failed to decode token", error);
}
};
 //login button
return (
<div className="auth-container">
<h2>Sign in with Google</h2>
<GoogleLogin
onSuccess={handleGoogleLoginSuccess}
onError={() => alert("Login Failed")}
/>
</div>
);
}

export default GoogleRedirectLoginPage;
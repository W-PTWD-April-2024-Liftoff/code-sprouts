import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function GoogleRedirectLoginPage() {
const navigate = useNavigate();

const handleGoogleLoginSuccess = (credentialResponse) => {
try {
const decoded = jwtDecode(credentialResponse.credential); 
const email = decoded.email;
console.log("Google Email:", email);

navigate(`/login?email=${encodeURIComponent(email)}`);
} catch (error) {
console.error("Failed to decode token", error);
}
};

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
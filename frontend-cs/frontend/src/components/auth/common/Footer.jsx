import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <footer
        className="footer"
        style={{
          padding: "8px 0",
          fontSize: "0.85rem",
          backgroundColor: "#f8f9fa", // Optional
          textAlign: "center"
        }}
      >
        <span>Code Sprouts &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default FooterComponent;

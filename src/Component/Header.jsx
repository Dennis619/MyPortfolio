import React from "react";

function Header() {
  return (
    <div className="Header">
      <div className="grid-item content">
        <div>
          <h1>
            Hi, I'm <br /> <big>Patrick Oyula,</big>
          </h1>
          <h3>a Finance Analyst.</h3>
        </div>

        <div className="social-media-icons">
          <a href="#">
            <img src="/linked.png" alt="linked link to profile" />
          </a>
          <a href="#">
            <img src="/fb.png" alt="facebook link to profile" />
          </a>
          <a href="#">
            <img src="/x_logo.png" alt="X link to profile" />
          </a>
        </div>
        <button className="Button">Contact Me</button>
      </div>
      <div className="grid-item image">
        <div style={{ position: "relative" }}>
          <img
            className="background-image"
            src="/blob.png"
            alt="Profile picture"
          />
          <img
            className="overlay-image"
            src="/Profile-Transparent.png"
            alt="Profile picture"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

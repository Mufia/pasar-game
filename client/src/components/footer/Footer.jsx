import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="bottom">
          <div className="left">
            <h2>Pasar Game</h2>
            <span>© Pasar Game 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React from "react";
import logo from "../../../images/logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="contain">
          <div className="col">
            <img style={{ backgroundColor: "white" }} src={logo} alt="" />
            <ul>
              <li>About</li>
              <li>Mission</li>
              <li>Services</li>
              <li>Social</li>
              <li>Get in touch</li>
            </ul>
          </div>

          <div className="col">
            <h1>Accounts</h1>
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Get in touch</li>
            </ul>
          </div>

          <div className="col">
            <h1>Support</h1>
            <ul>
              <li>Contact us</li>
              <li>Web chat</li>
              <li>Open ticket</li>
            </ul>
          </div>
          <div className="col social">
            <h1>Social</h1>
            <ul>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5fq.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5eA.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
              <li>
                <img
                  alt="fb"
                  src="https://svgshare.com/i/5f_.svg"
                  width="32"
                  style={{ width: "32px" }}
                />
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      {/* <!-- END OF FOOTER --> */}
    </div>
  );
};
export default Footer;

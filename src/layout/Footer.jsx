//Refer to the Notes at the bottom of page for explanations to the code
import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const navigate = useNavigate();
  //capitalized F in footer
  return (
    <footer>
      <div className="footContent">
        <h2>DJStreams</h2>
        <nav>
          <ul className="footerLinks">
            <li>
              <button onClick={() => navigate("/help")}>Help</button>
            </li>
            <li>
              <button onClick={() => navigate("/social-media")}>
                Social Media
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/support")}>Support</button>
            </li>
            <li>
              <button onClick={() => navigate("/faqs")}>FAQs</button>
            </li>
            <li>
              <button onClick={() => navigate("/about-us")}>About Us</button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

//-------------- Notes -----------------
// Created an import for Link (Line 3) inorder to navigate to other pages (if necessary)
// import css file(Line 4) in order to apply styling
//created an unordered list of links (<nav> tag is used to wrap the list of links.)
//each link is contained in a <li> element

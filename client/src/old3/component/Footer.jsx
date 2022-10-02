import React from "react";

import "../App.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3 text-center p-3">
              <h2>Social accounts</h2>
              <hr />
              <a
                href="https://wwww.facebook.com/"
                className="fa fa-facebook mr-1"
              ></a>
              <a
                href="https://www.twitter.com/"
                className="fa fa-twitter mr-1"
              ></a>
              <a
                href="https://www.instagram.com/"
                className="fa fa-instagram mr-1"
              ></a>
              <a
                href="https://www.youtube.com/"
                className="fa fa-youtube-play mr-1"
              ></a>
              <a
                href="https://www.whatsapp.com/"
                className="fa fa-whatsapp mr-1"
              ></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

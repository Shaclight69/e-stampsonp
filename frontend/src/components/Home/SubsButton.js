import React, { Fragment } from "react";
import "./SbsButton.scss";
import { Link } from "react-router-dom";
// import { FRONTEND_URI } from "../../App";

// const SUBS_URL = `${FRONTEND_URI}/subscriptions`;
const SubsButton = () => {
  return (
    <Fragment>
      <Link to="/products">
        <div class="buttons">
          <button class="blob-btn">
            Subscribe Now
            <span class="blob-btn__inner">
              <span class="blob-btn__blobs">
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
              </span>
            </span>
          </button>
          <br />
        </div>
      </Link>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </Fragment>
  );
};

export default SubsButton;

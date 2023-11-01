import React, { Fragment } from "react";
import "./Subscard.scss";
import SubsButton from "./SubsButton";

const SubsCard = () => {
  return (
    <Fragment>
      <div>
        <div className="subscribeContain">
          <div className="left">
            <span className="title">
              DON'T FORGET TO SUBSCRIBE TO US !!! <br />
            </span>
            <span className="description">
              The subscription relationship provides a new level of trust and
              connection between the brand and the consumer.
            </span>
          </div>
          <div className="right">
            <SubsButton />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SubsCard;

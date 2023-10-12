import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "../Cart/orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "../layouts/Header/Navbar";
import Announcements from "../layouts/Event/Announcements";
import MetaData from "../layouts/MetaData";

const SubscriptionSucess = () => {
  return (
    <Fragment>
      <MetaData title={`Successful Subscription`} />
      <Announcements />
      <Navbar />
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Subscription has been Payed successfully </Typography>
        <Link to="/">Go back to Home</Link>
      </div>
    </Fragment>
  );
};

export default SubscriptionSucess;

import React, { Fragment } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Announcements from "../Event/Announcements";
import MetaData from "../MetaData";

const NotFound = () => {
  return (
    <Fragment>
      <MetaData title={`Not Found -- eStamps ONP`} />
      <Announcements />
      <Navbar />
      <div className="PageNotFound">
        <ErrorIcon />

        <Typography>Page Not Found </Typography>
        <Link to="/">Home</Link>
      </div>
    </Fragment>
  );
};

export default NotFound;

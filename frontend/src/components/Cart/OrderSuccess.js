import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../../actions/cartAction";
import Navbar from "../layouts/Header/Navbar";
import { Fragment } from "react";
import Announcements from "../layouts/Event/Announcements";
import MetaData from "../layouts/MetaData";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartItems());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={`Successful Order`} />
      <Announcements />
      <Navbar />
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;

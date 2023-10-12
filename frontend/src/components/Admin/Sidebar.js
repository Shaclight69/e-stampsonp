import React from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";

import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from "@material-ui/icons/Storefront";

import EventIcon from "@material-ui/icons/Event";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <div className="top">
          <span className="dashTitle">
            <DashboardIcon /> ESTAMPS DASHBOARD
          </span>
        </div>
      </Link>
      <hr />
      <Link to="/admin/products">
        <p>
          <StorefrontIcon className="icon" />
          <h6>Products</h6>
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon className="icon" />
          <h6>Orders </h6>
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon className="icon" /> <h6>Users</h6>
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon className="icon" />
          <h6>Reviews</h6>
        </p>
      </Link>
      <Link to="/admin/events">
        <p>
          <EventIcon className="icon" />
          <h6>Events</h6>
        </p>
      </Link>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://dashboard.stripe.com/test/subscriptions"
      >
        <p>
          <CardMembershipIcon className="icon" />
          <h6> Subscriptions</h6>
        </p>
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://dashboard.stripe.com/test/payments"
      >
        <p>
          <AccountBalanceWalletIcon className="icon" />
          <h6>Transactions</h6>
        </p>
      </a>
      <Link to="/">
        <p>
          <HomeIcon className="icon" />
          <h6> Exit</h6>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;

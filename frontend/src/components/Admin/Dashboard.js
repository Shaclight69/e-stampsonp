import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import "./Widget.scss";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { getAdminEvent } from "../../actions/eventAction.js";
import MetaData from "../layouts/MetaData.js";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventIcon from "@material-ui/icons/Event";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const { events } = useSelector((state) => state.events);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminEvent());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  totalAmount = (Math.round(totalAmount * 100) / 100).toFixed(2);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#4B61D1"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#ffd966", "#4B61D1"],
        hoverBackgroundColor: ["#4B5000", "#0c2b69"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
      <div className="dashboardContainer">
        <div className="widgets">
          <div className="widget">
            <div className="left">
              <span className="title">Total Amount </span>
              <span className="counter">{totalAmount} €</span>
              <a
                className="payments"
                target="_blank"
                rel="noreferrer"
                href="https://dashboard.stripe.com/test/payments"
              >
                <span classname="seelink">See All Payments</span>{" "}
              </a>
            </div>
            <div className="right">
              <div className="percentage positive"></div>
              <AccountBalanceIcon
                className="icon"
                style={{
                  color: "white",
                  backgroundColor: "rgba(12, 43, 105, 1)",
                }}
              />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Products</span>
              <span className="counter">{products && products.length}</span>
              <Link className="payments" to="/admin/products">
                <span classname="seelink">See All Products</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive"></div>
              <LocalOfferIcon
                className="icon"
                style={{
                  color: "white",
                  backgroundColor: "rgba(12, 43, 105, 1)",
                }}
              />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Orders</span>
              <span className="counter">{orders && orders.length}</span>
              <Link className="payments" to="/admin/orders">
                <span classname="seelink">See All Orders</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive"></div>
              <ShoppingBasketIcon
                className="icon"
                style={{
                  color: "white",
                  backgroundColor: "rgba(12, 43, 105, 1)",
                }}
              />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Users</span>
              <span className="counter">{users && users.length}</span>
              <Link className="payments" to="/admin/users">
                <span classname="seelink">See All Users</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive"></div>
              <AccountBoxIcon
                className="icon"
                style={{
                  color: "white",
                  backgroundColor: "rgba(12, 43, 105, 1)",
                }}
              />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Events</span>
              <span className="counter">{events && events.length}</span>
              <Link className="payments" to="/admin/events">
                <span classname="seelink">See All Events</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive"></div>
              <EventIcon
                className="icon"
                style={{
                  color: "white",
                  backgroundColor: "rgba(12, 43, 105, 1)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="graphContainer">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

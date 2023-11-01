import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const RenderNavbar = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setShowNavbar(false);
        break;
      case "/shipping":
        setShowNavbar(false);
        break;
      case "/order/confirm":
        setShowNavbar(false);
        break;
      case "/process/payment":
        setShowNavbar(false);
        break;
      case "/admin/dashboard":
        setShowNavbar(false);
        break;
      case "/admin/products":
        setShowNavbar(false);
        break;
      case "/admin/product/:id":
        setShowNavbar(false);
        break;
      case "/admin/product":
        setShowNavbar(false);
        break;
      case "/admin/orders":
        setShowNavbar(false);
        break;
      case "/admin/order/:id":
        setShowNavbar(false);
        break;
      case "/admin/users":
        setShowNavbar(false);
        break;
      case "/admin/user/:id":
        setShowNavbar(false);
        break;
      case "/admin/reviews":
        setShowNavbar(false);
        break;
      case "/admin/events":
        setShowNavbar(false);
        break;
      case "/admin/event":
        setShowNavbar(false);
        break;
      case "/admin/event/:id":
        setShowNavbar(false);
        break;
      case "/search":
        setShowNavbar(false);
        break;
      default:
        setShowNavbar(true);
    }
  }, [location, id]);

  return <div>{showNavbar && children && id}</div>;
};

export default RenderNavbar;

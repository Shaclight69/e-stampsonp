import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/layouts/Header/Navbar";
import RenderNavbar from "./components/RenderNavbar/RenderNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layouts/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Cart/Wishlist.js";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import NotFound from "./components/layouts/Not Found/NotFound";
import Subscribe from "./components/User/Subscribe.js";
import Support from "./components/User/Support";
import EventList from "./components/Admin/EventList.js";
import NewEvent from "./components/Admin/NewEvent.js";
import UpdateEvent from "./components/Admin/UpdateEvent.js";
import Events from "./components/Event/Events.js";
import ChatBot from "./components/ChatBot";
import SubsCard from "./components/Home/SubsCard";
import SubscriptionSuccess from "./components/User/SubscriptionSuccess";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v3/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot />
        <Router>
          <RenderNavbar>
            <Navbar />
          </RenderNavbar>

          {isAuthenticated && <UserOptions user={user} />}
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute
                exact
                path="/process/payment"
                component={Payment}
              />
            </Elements>
          )}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route path="/subscription" component={SubsCard} />

            <Route exact path="/search" component={Search} />

            <Route exact path="/events" component={Events} />

            <ProtectedRoute exact path="/account" component={Profile} />

            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

            <ProtectedRoute
              exact
              path="/password/update"
              component={UpdatePassword}
            />

            <Route exact path="/password/forgot" component={ForgotPassword} />

            <Route
              exact
              path="/password/reset/:token"
              component={ResetPassword}
            />

            <Route exact path="/login" component={LoginSignUp} />

            <Route exact path="/cart" component={Cart} />

            <Route exact path="/wishlist" component={Wishlist} />

            <ProtectedRoute exact path="/shipping" component={Shipping} />

            <ProtectedRoute exact path="/success" component={OrderSuccess} />

            <ProtectedRoute exact path="/orders" component={MyOrders} />

            <ProtectedRoute
              exact
              path="/order/confirm"
              component={ConfirmOrder}
            />

            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

            <ProtectedRoute exact path="/subscriptions" component={Subscribe} />

            <ProtectedRoute
              exact
              path="/subscriptionssuccess"
              component={SubscriptionSuccess}
            />

            <ProtectedRoute exact path="/support" component={Support} />

            <ProtectedRoute
              isAdmin={true}
              exact
              path="/admin/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/admin/products"
              isAdmin={true}
              component={ProductList}
            />
            <ProtectedRoute
              exact
              path="/admin/product"
              isAdmin={true}
              component={NewProduct}
            />

            <ProtectedRoute
              exact
              path="/admin/product/:id"
              isAdmin={true}
              component={UpdateProduct}
            />

            <ProtectedRoute
              exact
              path="/admin/orders"
              isAdmin={true}
              component={OrderList}
            />

            <ProtectedRoute
              exact
              path="/admin/order/:id"
              isAdmin={true}
              component={ProcessOrder}
            />
            <ProtectedRoute
              exact
              path="/admin/users"
              isAdmin={true}
              component={UsersList}
            />

            <ProtectedRoute
              exact
              path="/admin/user/:id"
              isAdmin={true}
              component={UpdateUser}
            />

            <ProtectedRoute
              exact
              path="/admin/reviews"
              isAdmin={true}
              component={ProductReviews}
            />
            <ProtectedRoute
              exact
              path="/admin/events"
              isAdmin={true}
              component={EventList}
            />
            <ProtectedRoute
              exact
              path="/admin/event"
              isAdmin={true}
              component={NewEvent}
            />

            <ProtectedRoute
              exact
              path="/admin/event/:id"
              isAdmin={true}
              component={UpdateEvent}
            />
            <Route
              component={
                window.location.pathname === "/process/payment"
                  ? null
                  : NotFound
              }
            />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

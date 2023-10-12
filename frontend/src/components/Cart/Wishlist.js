import React, { Fragment } from "react";
import "./Wishlist.css";
import WishlistItemCard from "./WishlistItemCard";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromWishlist } from "../../actions/wishlistAction";
import { Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { Link } from "react-router-dom";
import Navbar from "../layouts/Header/Navbar";
import Announcements from "../layouts/Event/Announcements";
import MetaData from "../layouts/MetaData";

const Wishlist = ({ history }) => {
  const dispatch = useDispatch();
  const { favouriteItems } = useSelector((state) => state.wishlist);

  const deletefavouriteItems = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };

  return (
    <Fragment>
      <MetaData title={`Your Wishlist`} />
      <Announcements />
      <Navbar />
      {favouriteItems.length === 0 ? (
        <div className="emptyCart">
          <HighlightOffIcon />

          <Typography>No Product in Your Wishlist</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Your Wishlist</p>
            </div>

            {favouriteItems &&
              favouriteItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <WishlistItemCard item={item} />
                  <div className="cartInput">
                    <span>{`Price :${item.price} €`}</span>
                  </div>
                  <p className="cartSubtotal">
                    <div className="checkOutBtn">
                      <button
                        onClick={() => deletefavouriteItems(item.product)}
                      >
                        Remove
                      </button>
                    </div>
                  </p>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Wishlist;

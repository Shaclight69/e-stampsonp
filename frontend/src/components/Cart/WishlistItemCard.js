import React from "react";
import "./WishlistItemCard.css";
import { Link } from "react-router-dom";

const WishlistItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Description ${item.description}`}</span>
      </div>
    </div>
  );
};

export default WishlistItemCard;

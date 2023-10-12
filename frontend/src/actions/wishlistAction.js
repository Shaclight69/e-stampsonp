import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/wishlistConstants";
import axios from "axios";

// Add to Wishlist
export const addItemsToWishlist =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v3/product/${id}`);

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        description: data.product.description,
        quantity,
      },
    });

    localStorage.setItem(
      "favouriteItems",
      JSON.stringify(getState().wishlist.favouriteItems)
    );
  };

// REMOVE FROM WISHLIST
export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });

  localStorage.setItem(
    "favouriteItems",
    JSON.stringify(getState().wishlist.favouriteItems)
  );
};

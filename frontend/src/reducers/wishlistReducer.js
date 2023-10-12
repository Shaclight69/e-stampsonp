import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { favouriteItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.favouriteItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

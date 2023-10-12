import axios from "axios";
import {
  ALL_EVENT_FAIL,
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  ADMIN_EVENT_REQUEST,
  ADMIN_EVENT_SUCCESS,
  ADMIN_EVENT_FAIL,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/eventConstants";

// Get All Events
export const getEvent =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_EVENT_REQUEST });

      let link = `/api/v3/events?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v3/events?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_EVENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// Get All events For Admin
export const getAdminEvent = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v3/admin/events");

    dispatch({
      type: ADMIN_EVENT_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v3/admin/event/new`,
      eventData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Event
export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v3/admin/event/${id}`,
      eventData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(`/api/v3/admin/event/${id}`);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Events Details
export const getEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v3/event/${id}`);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

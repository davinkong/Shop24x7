
import {
    PRODS_CREATE_FAIL,
    PRODS_CREATE_REQUEST,
    PRODS_CREATE_SUCCESS,
    PRODS_DELETE_FAIL,
    PRODS_DELETE_REQUEST,
    PRODS_DELETE_SUCCESS,
    PRODS_LIST_FAIL,
    PRODS_LIST_REQUEST,
    PRODS_LIST_SUCCESS,
    PRODS_UPDATE_FAIL,
    PRODS_UPDATE_REQUEST,
    PRODS_UPDATE_SUCCESS,
  } from "../constants/adminConstants";
  import axios from "axios";
  
  export const listProds = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/products`, config);
  
      dispatch({
        type: PRODS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createNoteAction = (name, qty, price, pic) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/products/create`,
        { name, qty, price, pic },
        config
      );
  
      dispatch({
        type: PRODS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteNoteAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/products/${id}`, config);
  
      dispatch({
        type: PRODS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateNoteAction = (id, name, qty, price) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/products/${id}`,
        { name, qty, price },
        config
      );
  
      dispatch({
        type: PRODS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  
  
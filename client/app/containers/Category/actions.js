/*
 *
 * Category actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { FETCH_CATEGORIES, CATEGORY_CHANGE, RESET_CATEGORY } from './constants';
import handleError from '../../utils/error';

export const categoryChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_CHANGE,
    payload: formData
  };
};

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`api/category/list`);
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const category = getState().category.categoryFormData;

      const response = await axios.post(`/api/category/add`, category);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({ type: RESET_CATEGORY });
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

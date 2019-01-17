import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE,
  CREATE_LOCATIONS_REQUEST,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILURE,
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE
} = constants;

export const loadOfficeLocations = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOAD_LOCATIONS_REQUEST });

  return axios
    .get(`andela-centres/?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loadOfficeLocationsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadOfficeLocationsFailure(error));
    });
};

export const createOfficeLocation = data => (dispatch) => {
  dispatch({ type: CREATE_LOCATIONS_REQUEST });
  return axios
    .post('andela-centres', data)
    .then((response) => {
      dispatch({ type: CREATE_LOCATIONS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: CREATE_LOCATIONS_FAILURE, payload: error.message });
    });
};

export const loadCountries = () => (dispatch) => {
  dispatch({ type: LOAD_COUNTRIES_REQUEST });

  return axios
    .get('countries')
    .then((response) => {
      dispatch({ type: LOAD_COUNTRIES_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: LOAD_COUNTRIES_FAILURE, payload: error.message });
    });
};

export const loadOfficeLocationsSuccess = centres => ({
  type: LOAD_LOCATIONS_SUCCESS,
  payload: centres
});

export const loadOfficeLocationsFailure = error => ({
  type: LOAD_LOCATIONS_FAILURE,
  payload: error
});

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });

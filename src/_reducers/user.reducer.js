import constants from '../_constants';
import initialState from './initialState';

const {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_LOADING,
  RESET_STATUS_MESSAGE
} = constants;

export default (state = initialState.user, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
        isLoading: action.isLoading
      };

    case LOAD_USER_FAILURE:
      return {
        isLoading: action.isLoading,
        hasError: true,
        errorMessage: action.payload
      };

    case RESET_STATUS_MESSAGE:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
        hasError: false
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
        isLoading: action.isLoading,
        successMessage: 'Record updated succesfully'
      };

    case UPDATE_USER_LOADING:
      return {
        ...state,
        isLoading: action.updateUserLoading
      };

    case UPDATE_USER_FAILURE:
      return {
        isLoading: action.isLoading,
        hasError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};

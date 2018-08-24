import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ASSET_MAKES_SUCCESS,
  LOAD_ASSET_MAKES_FAILURE,
  LOADING_ASSET_MAKES,
  ADD_ASSET_MAKE_SUCCESS,
  DROPDOWN_ASSET_MAKES_SUCCESS
} = constants;

export default (state = initialState.assetMakes, action) => {
  switch (action.type) {
    case LOAD_ASSET_MAKES_SUCCESS:
      return {
        ...state,
        assetMakes: action.payload.results,
        assetMakesCount: action.payload.count
      };
    case DROPDOWN_ASSET_MAKES_SUCCESS:
      return {
        ...state,
        assetMakes: action.payload
      };
    case LOAD_ASSET_MAKES_FAILURE:
      return state;
    case LOADING_ASSET_MAKES:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ADD_ASSET_MAKE_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

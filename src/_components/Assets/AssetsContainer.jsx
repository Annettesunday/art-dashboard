import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  getAssetsAction,
  setActivePage,
  resetAssets,
  loading,
  exportAssetsAction
} from '../../_actions/assets.action';
import { loadAllAssetModels } from '../../_actions/assetModels.action';
import { loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';
import filterSelection from '../../_actions/checkedFilters.actions';
import formatOption from '../../_utils/filters';

import Assets from '../../components/AssetsComponent';

export const createFilterData = (assetTypes, assetModels) => {
  if (isEmpty(assetTypes) && isEmpty(assetModels)) {
    return [];
  }

  const formattedAssetTypes = assetTypes.map(assetType => formatOption(assetType, 'name'));
  const formattedAssetModels = assetModels.map(assetModel => formatOption(assetModel, 'name'));
  return [
    {
      title: 'Asset Types',
      content: formattedAssetTypes
    },
    {
      title: 'Model Numbers',
      content: formattedAssetModels
    },
    {
      title: 'Verification Status',
      content: [{ id: 1, option: 'Verified' }, { id: 2, option: 'UnVerified' }]
    }
  ];
};

export const mapStateToProps = (state, ownProps) => {
  const { assets, assetTypesList, assetModelsList, selected } = state;
  const { params } = ownProps.match;
  const {
    assetsList,
    assetsCount,
    exportAsset,
    errorMessage,
    hasError,
    isLoading,
    activePage,
    status,
    filters
  } = assets;
  const { assetModels } = assetModelsList;
  const { assetTypes } = assetTypesList;

  const assetAdjective = params.status || '';
  const assetAdjectiveAfterSearch = params.filters || '';
  const reloadAfterSearch = assetAdjectiveAfterSearch !== filters;
  const shouldReload = assetAdjective !== status;

  return {
    assetsList,
    assetsCount,
    errorMessage,
    exportAsset,
    hasError,
    isLoading,
    filterData: createFilterData(assetTypes, assetModels),
    activePage,
    selected,
    status,
    shouldReload,
    filters,
    reloadAfterSearch
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
  loadAllAssetModels,
  loadDropdownAssetTypes,
  setActivePage,
  filterSelection,
  resetAssets,
  loading,
  exportAssetsAction
})(Assets);

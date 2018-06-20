import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TableRowComponent from './TableRowComponent';
import SideMenuComponent from '../_components/SideMenuComponent';

import { getAssetsAction } from '../_actions/assets.action';

export class AssetsComponent extends Component {
  state = {
    activePage: 1,
    limit: 10,
  }
  componentDidMount() {
    this.props.getAssetsAction();
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.getAssetsAction(activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit)

  emptyAssetTypeCheck = () => (this.props.assets.length === 0)

  loadTableContent = () => {
    if (this.emptyAssetTypeCheck()) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">No Data found</Table.Cell>
        </Table.Row>
      );
    }
    return (this.props.assets.map(asset => (
      <TableRowComponent
        key={asset.id}
        data={asset}
        headings={['category',
            'sub_category',
            'asset_type',
            'make',
            'model_number',
            'asset_code']}
      />
    )));
  }

  render() {
    return (
      <SideMenuComponent>
        <Header className="landing-heading" content="All Assets" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Sub-category</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Make</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Item</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.loadTableContent()
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                {
                  (this.emptyAssetTypeCheck()) ? '' :
                  <Pagination
                    totalPages={this.handlePageTotal()}
                    onPageChange={this.handlePaginationChange}
                    activePage={this.state.activePage}
                  />
                }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </SideMenuComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assets: PropTypes.arrayOf(PropTypes.object),
  getAssetsAction: PropTypes.func.isRequired,
};

AssetsComponent.defaultProps = {
  assets: [],
};

const mapStateToProps = ({ viewAssets }) => {
  const { assets, assetsCount } = viewAssets;
  return {
    assets,
    assetsCount,
  };
};

export default connect(mapStateToProps, {
  getAssetsAction,
})(AssetsComponent);
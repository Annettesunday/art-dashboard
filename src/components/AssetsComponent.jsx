import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import SideMenuComponent from '../_components/SideMenuComponent';
import AssetsTableContent from './AssetsTableContent';

import '../_css/AssetsComponent.css';
import { getAssetsAction } from '../_actions/assets.action';

export class AssetsComponent extends Component {
  state = {
    activePage: 1,
    activePageAssets: [],
    limit: 8,
    offset: 0
  }

  componentDidMount() {
    this.props.getAssetsAction();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasError &&
      (this.props.errorMessage === nextProps.errorMessage)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.assetsList !== prevProps.assetsList) {
      this.handlePageContent();
    }
  }

  handlePageContent = () => {
    const { activePage, limit, offset } = this.state;
    const endIndex = (limit * activePage) - 1;
    const assets = this.props.assetsList.slice(offset, endIndex);
    this.setState({
      activePageAssets: assets
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    const newPageOffset = (activePage - 1) * this.state.limit;
    this.setState({ activePage, offset: newPageOffset }, () => {
      this.handlePageContent();
    });
  }

  handlePageTotal = () => Math.ceil(this.props.assetsCount / this.state.limit)

  emptyAssetsCheck = () => (isEmpty(this.props.assetsList))

  render() {
    return (
      <SideMenuComponent title="Assets">
        <Container>
          <Header className="assets-heading" content="My Assets" />
          <AssetsTableContent
            activePage={this.state.activePage}
            activePageAssets={this.state.activePageAssets}
            emptyAssetsCheck={this.emptyAssetsCheck}
            errorMessage={this.props.errorMessage}
            handlePageTotal={this.handlePageTotal}
            handlePaginationChange={this.handlePaginationChange}
            hasError={this.props.hasError}
            isLoading={this.props.isLoading}
          />
        </Container>
      </SideMenuComponent>
    );
  }
}

AssetsComponent.propTypes = {
  assetsCount: PropTypes.number.isRequired,
  assetsList: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  getAssetsAction: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

AssetsComponent.defaultProps = {
  assetsList: [],
  errorMessage: ''
};

const mapStateToProps = ({ assets }) => {
  const { assetsList, assetsCount, errorMessage, hasError, isLoading } = assets;
  return {
    assetsList,
    assetsCount,
    errorMessage,
    hasError,
    isLoading
  };
};

export default connect(mapStateToProps, {
  getAssetsAction
})(AssetsComponent);

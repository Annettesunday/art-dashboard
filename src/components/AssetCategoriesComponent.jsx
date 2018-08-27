import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Pagination, Table, Header, Segment, Divider } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent';
import NavbarComponent from './NavBarComponent';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import LoaderComponent from './LoaderComponent';

import '../_css/AssetsComponent.css';
import { loadAssetCategories } from '../_actions/assetCategories.actions';

export class AssetCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.loadAssetCategories(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetCategories(activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetCategories(this.state.activePage, data.value);
  }

  handlePageTotal = () => Math.ceil(this.props.assetCategoriesCount / this.state.limit)

  emptyCategoriesCheck = () => (_.isEmpty(this.props.categories))

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavbarComponent>
          <div className="assets-list">
            <h1>
              An Error Occurred While Trying To Display The Asset Categories
            </h1>
            <Button onClick={() => { this.props.loadAssetCategories(this.state.activePage); }}>
              Try Again
            </Button>
          </div>
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.emptyCategoriesCheck()) {
      return (
        <NavbarComponent>
          <div className="assets-list">
            <h1>
              No Asset Categories Found.
            </h1>
          </div>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Categories" />
            <Divider id="assets-divider" />
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.categories.map(category => (
                  <TableRowComponent
                    key={category.id}
                    data={category}
                    headings={['category_name']}
                  />
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {
                    !this.emptyCategoriesCheck() && (
                    <Table.HeaderCell colSpan="3" id="pagination-header">
                      <Segment.Group horizontal id="art-pagination-section">
                        <Segment>
                          <Pagination
                            totalPages={this.handlePageTotal()}
                            onPageChange={this.handlePaginationChange}
                            activePage={this.state.activePage}
                          />
                        </Segment>
                        <Segment>
                          <DropdownComponent
                            customClass="page-limit"
                            placeHolder="Show Rows"
                            options={rowOptions}
                            onChange={this.handleRowChange}
                            value={this.state.limit}
                            upward
                          />
                        </Segment>
                      </Segment.Group>
                    </Table.HeaderCell>
                    )
                  }
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
    );
  }
}

AssetCategoriesComponent.propTypes = {
  categories: PropTypes.array.isRequired,
  assetCategoriesCount: PropTypes.number.isRequired,
  loadAssetCategories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

const mapStateToProps = ({ assetCategories }) => {
  const { categories, assetCategoriesCount, isLoading, hasError } = assetCategories;
  return {
    categories,
    assetCategoriesCount,
    isLoading,
    hasError
  };
};

export default connect(mapStateToProps, { loadAssetCategories })(AssetCategoriesComponent);

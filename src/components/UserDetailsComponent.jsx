import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header, Pagination, Segment } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import TableRowComponent from './TableRowComponent';
import LoaderComponent from './LoaderComponent';
import { ToastMessage } from '../_utils/ToastMessage';

const UserDetailsComponent = (props) => {
  if (props.isLoading) {
    return <LoaderComponent size="large" dimmerStyle={{ height: '100vh' }} />;
  }

  if (props.hasError && props.errorMessage) {
    setTimeout(() => {
      ToastMessage.error({ message: props.errorMessage });
    }, 500);
    return <SemanticToastContainer />;
  }
  if (props.emptyUsersList()) {
    return (
      <Header as="h3" id="empty-usersList" content="No Users Found" />
    );
  }
  return (
    <div>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
                Name
            </Table.HeaderCell>
            <Table.HeaderCell>
                Email Address
            </Table.HeaderCell>
            <Table.HeaderCell>
                Cohort
            </Table.HeaderCell>
            <Table.HeaderCell>
                Assets Assigned
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.activePageUsers.map((user) => {
              user.assets_assigned = 1;
              return (
                <TableRowComponent
                  key={user.id}
                  data={user}
                  headings={[
                    'full_name',
                    'email',
                    'cohort',
                    'assets_assigned'
                  ]}
                />
              );
            })
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            {!props.emptyUsersList() && (
            <Table.HeaderCell colSpan="4" id="pagination-header">
              <Segment.Group horizontal id="art-pagination-section">
                <Segment>
                  <Pagination
                    id="art-pagination-component"
                    totalPages={props.handlePageTotal()}
                    onPageChange={props.handlePaginationChange}
                    activePage={props.activePage}
                  />
                </Segment>
                <Segment>
                  <DropdownComponent
                    id="page-limit"
                    placeHolder="Show Rows"
                    options={rowOptions}
                    upward
                  />
                </Segment>
              </Segment.Group>
            </Table.HeaderCell>
              )}
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

UserDetailsComponent.propTypes = {
  activePage: PropTypes.number,
  activePageUsers: PropTypes.arrayOf(PropTypes.object),
  emptyUsersList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handlePageTotal: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};

UserDetailsComponent.defaultProps = {
  activePage: 1,
  errorMessage: ''
};

export default UserDetailsComponent;

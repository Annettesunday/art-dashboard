import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ArtModal from '../../components/common/ModalComponent';

export default class Authorize extends React.Component {
  state = { modalOpen: true };

  handleLogout = () => {
    this.props.history.push('/');
  };

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const { isAuthenticated, AuthComponent } = this.props;

    if (isAuthenticated) {
      return <AuthComponent {...this.props} />;
    }

    return (
      <div className="app background">
        <ArtModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.handleToggleModal}
          onClose
          modalTitle="Unauthorized Access"
          closeIcon={false}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <div>
            <p>
              Only users with admin privileges can access this site.
            </p>
            <Button onClick={this.handleLogout}>OK</Button>
          </div>
        </ArtModal>
      </div>
    );
  }
}

Authorize.propTypes = {
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  AuthComponent: PropTypes.func
};

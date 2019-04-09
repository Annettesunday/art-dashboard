import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../_css/StatusComponent.css';

class StatusMessageComponent extends React.Component {
  state = {
    isOpen: true
  }

  handleDismiss = () => {
    this.setState({
      isOpen: false
    });
    this.props.reset();
  }

  render() {
    const { isOpen } = this.state;
    const hideClass = !isOpen ? 'hide-status' : '';
    const message = (this.props.message === 'The fields name, location must make a unique set.') ?
      'Block name must be unique' : this.props.message;
    return (
      <Message
        onDismiss={this.handleDismiss}
        content={message}
        className={`${this.props.className} ${hideClass}`}
      />
    );
  }
}

StatusMessageComponent.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  reset: PropTypes.func
};

StatusMessageComponent.defaultProps = {
  message: 'An error occured!',
  reset: () => {}
};

export default StatusMessageComponent;

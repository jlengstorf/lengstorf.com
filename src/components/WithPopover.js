import React from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';

const getPopoverImage = (group, images) =>
  images.find(({ node }) => node.id.match(group.toLowerCase())).node;

class WithPopover extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    imageArr: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.any,
      }),
    ).isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
    button: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  };

  state = {
    showPopover: false,
  };

  openPopover = () => {
    if (window && typeof window.logEvent === 'function') {
      window.logEvent('open popover', {
        group: this.props.group,
        source: this.props.source,
      });
    }

    this.setState({ showPopover: true });
  };

  closePopover = () => {
    if (window && typeof window.logEvent === 'function') {
      window.logEvent('close popover', {
        group: this.props.group,
        source: this.props.source,
      });
    }

    this.setState({ showPopover: false });
  };

  handleClick = event => {
    if (event.target.classList.contains('js--open-popover')) {
      event.preventDefault();
      this.openPopover();
    }
  };

  render() {
    return [
      // This is event delegation, so keyboard events are already caught.
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div key="withpopover-body" onClick={this.handleClick}>
        {this.props.render(this.openPopover, this.closePopover)}
      </div>,
      <Popover
        key="withpopover-popover"
        visible={this.state.showPopover}
        closeFn={this.closePopover}
        heading={this.props.heading}
        image={getPopoverImage(this.props.group, this.props.imageArr)}
        benefits={this.props.benefits}
        button={this.props.button}
        group={this.props.group}
        source={this.props.source}
      />,
    ];
  }
}

export default WithPopover;

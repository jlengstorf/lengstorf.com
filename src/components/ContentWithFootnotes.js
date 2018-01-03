import React from 'react';
import PropTypes from 'prop-types';
import Footnotes from './Footnotes';

class ContentWithFootnotes extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    footnoteNumber: 1,
    footnoteContent: '',
    footnoteActive: false,
  };

  footnoteClose = () => {
    this.setState({
      footnoteActive: false,
      footnoteNumber: 0,
      footnoteContent: '',
    });
  };

  handleFootnoteClose = event => {
    event.preventDefault();
    this.footnoteClose();
  };

  handleLinkClicks = event => {
    if (!event.target.classList.contains('footnote-ref')) {
      return;
    }

    event.preventDefault();

    if (this.state.footnoteActive) {
      this.footnoteClose();
      return;
    }

    const footnoteLink = event.target;
    const targetID = new URL(footnoteLink.href).hash;

    // Remove any non-numeric characters and force to a number value with `+`.
    const footnoteNumber = +targetID.replace(/\D*/, '');
    const footnoteContent = document.querySelector(targetID).innerHTML;

    this.setState({
      footnoteActive: true,
      footnoteNumber,
      footnoteContent,
    });
  };

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={this.handleLinkClicks} className={this.props.className}>
        {this.props.render()}
        <Footnotes
          isActive={this.state.footnoteActive}
          number={this.state.footnoteNumber}
          content={this.state.footnoteContent}
          handleClose={this.handleFootnoteClose}
        />
      </div>
    );
  }
}

export default ContentWithFootnotes;

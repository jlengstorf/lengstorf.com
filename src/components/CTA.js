/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

export default class CTA extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      scope: PropTypes.string,
      body: PropTypes.string,
    }).isRequired,
    className: PropTypes.string.isRequired,
    heading: PropTypes.string,
    link: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  };

  static defaultProps = {
    heading: 'What to do next.',
  };

  handleClick = handler => event => {
    if (event.target.classList.contains('js--open-popover')) {
      event.preventDefault();
      handler();
    }
  };

  render() {
    const { className, heading, link, content, button } = this.props;

    return (
      <div className={className}>
        <h2>{heading}</h2>
        <MDXRenderer scope={content.scope}>{content.body}</MDXRenderer>
        <p>
          <a className="js--open-popover" href={link}>
            {button}
          </a>
        </p>
      </div>
    );
  }
}

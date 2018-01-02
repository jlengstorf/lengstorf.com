import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from '../styles/cta.module.css';

export default class CTA extends React.Component {
  static propTypes = {
    group: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    heading: PropTypes.string,
    link: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    heading: 'What to do next.',
  };

  handleClick = handler => event => {
    if (event.target.classList.contains('js--open-popover')) {
      console.log('it matches!');
      event.preventDefault();
      handler();
    }
  };

  render() {
    const {
      className,
      heading,
      link,
      content,
      clickHandler,
      button,
    } = this.props;

    return (
      <div className={className} onClick={this.handleClick(clickHandler)}>
        <h2>{heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <a className={`${styles.button} js--open-popover`} href={link}>
          {button}
        </a>
      </div>
    );
  }
}

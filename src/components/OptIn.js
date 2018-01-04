import React from 'react';
import PropTypes from 'prop-types';
import { API_ENDPOINT } from '../config';
import styles from '../styles/opt-in.module.css';

class OptIn extends React.Component {
  static propTypes = {
    button: PropTypes.string,
    source: PropTypes.string,
    group: PropTypes.string,
  };

  static defaultProps = {
    button: 'Get It Now',
    source:
      typeof window !== 'undefined'
        ? window.location.pathname.replace(/\//g, '')
        : '',
    group: null,
  };

  state = {
    fname: '',
    email: '',
  };

  updateValue = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  trackSubmit = () => {
    if (window && typeof window.logEvent === 'function') {
      window.logEvent('submit form', {
        group: this.props.group,
        source: this.props.source,
      });
      console.log('form submitted!');
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          action={`${API_ENDPOINT}/user`}
          method="post"
          onSubmit={this.trackSubmit}
        >
          <label htmlFor="fname" className={styles.group}>
            <input
              className={styles.input}
              type="text"
              id="fname"
              name="FNAME"
              onChange={this.updateValue}
              value={this.state.fname}
              required
            />
            <span className={styles.label}>First Name</span>
          </label>
          <label htmlFor="email" className={styles.group}>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="EMAIL"
              onChange={this.updateValue}
              value={this.state.email}
              required
            />
            <span className={styles.label}>Email Address</span>
          </label>
          <button className={styles.button} type="submit" name="subscribe">
            {this.props.button}
          </button>
          <input type="hidden" name="SOURCE" value={this.props.source} />
          <input type="hidden" name="status" value="pending" />
          <input
            type="hidden"
            name="redirect"
            value="https://lengstorf.com/confirm/"
          />
          {this.props.group && (
            <input type="hidden" name={this.props.group} value="1" />
          )}
        </form>
      </div>
    );
  }
}

export default OptIn;

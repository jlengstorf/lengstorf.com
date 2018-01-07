import 'whatwg-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import { API_ENDPOINT, CONFIRM_PAGE } from '../config';
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
    isSubmitting: false,
  };

  updateValue = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    if (typeof window !== 'undefined') {
      event.preventDefault();

      // Log the submit event.
      if (typeof window.logEvent === 'function') {
        window.logEvent('submit form', {
          group: this.props.group,
          source: this.props.source,
        });
      }

      const formData = {
        FNAME: this.state.fname,
        EMAIL: this.state.email,
        SOURCE: this.props.source,
        [this.props.group || 'DEFAULT']: '1',
        redirect: CONFIRM_PAGE,
      };

      this.setState({ isSubmitting: true });

      // Actually submit the data.
      fetch(`${API_ENDPOINT}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      })
        .then(res => res.json())
        .then(({ redirect }) => {
          window.location.href = redirect;
        });
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <form
          className={`${styles.form} ${this.state.isSubmitting &&
            styles.formSubmitting}`}
          action={`${API_ENDPOINT}/user`}
          method="post"
          onSubmit={this.handleSubmit}
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
              disabled={this.state.isSubmitting}
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
              disabled={this.state.isSubmitting}
            />
            <span className={styles.label}>Email Address</span>
          </label>
          <button
            className={styles.button}
            type="submit"
            name="subscribe"
            disabled={this.state.isSubmitting}
          >
            {this.props.button}
          </button>
          <input type="hidden" name="SOURCE" value={this.props.source} />
          <input type="hidden" name="status" value="pending" />
          <input type="hidden" name="redirect" value={CONFIRM_PAGE} />
          {this.props.group && (
            <input type="hidden" name={this.props.group} value="1" />
          )}
        </form>
      </div>
    );
  }
}

export default OptIn;

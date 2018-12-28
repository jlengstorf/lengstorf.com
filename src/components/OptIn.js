import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { css } from 'emotion';
import styled from 'react-emotion';
import Button from './Button';
import { animation, colors, media } from '../config/styles';

const Form = styled('form')`
  position: relative;

  @supports (display: grid) {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media ${media.medium} {
      grid-template-columns: repeat(2, auto) 140px;
    }
  }
`;

const formSubmitting = css`
  ::before,
  ::after {
    content: '';
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: calc(50% - 0.5rem);
    left: calc(50% - 1rem);
    background-color: var(--color-purple);
    border-radius: 50%;
    transform: scale(0.1);
    animation-name: radar;
    animation-duration: 1200ms;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  ::after {
    animation-delay: 600ms;
  }
`;

const Label = styled('label')`
  position: relative;
  margin: 0.5rem 0 0;

  @supports (display: grid) {
    grid-column: span 2;

    @media ${media.small} {
      grid-column: span 1;
    }
  }
`;

const LabelText = styled('span')`
  color: ${colors.gray};
  display: block;
  font-size: 0.5rem;
  left: 0.5rem;
  letter-spacing: 0.1em;
  line-height: 1.7;
  margin: 0;
  pointer-events: none;
  position: absolute;
  top: 0.125rem;
  transition: all 300ms ease-out;
`;

const Input = styled('input')`
  background-color: ${colors.lightest};
  border: 0;
  border-bottom: 2px solid ${colors.gray};
  display: block;
  font-size: 1rem;
  margin: 0;
  padding: 1rem 0.5rem 0.5rem;
  transition: all ${animation.transitionTime} linear;
  width: 100%;

  &[value=''] + span {
    color: ${colors.textLight};
    font-size: 1rem;
    letter-spacing: 0;
    top: 0.75rem;
  }

  :focus {
    background-color: ${colors.grayLightest};
    border-color: ${colors.purple};
    outline: none;
  }

  :disabled {
    opacity: 0.25;
  }

  :disabled + span {
    opacity: 0.5;
  }
`;

const FormButton = styled(Button)`
  /* border-radius: 0.25rem; */
  margin-top: 1rem;
  max-width: 300px;
  padding: 0.25rem 0.5rem 0.125rem;

  @supports (display: grid) {
    grid-column: span 2;

    @media ${media.medium} {
      font-size: 1rem;
      grid-column: span 1;
      width: 100%;
    }
  }
`;

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
        redirect: 'https://lengstorf.com/confirm',
      };

      this.setState({ isSubmitting: true });

      // Actually submit the data.
      axios
        .post('https://api-lengstorf.now.sh/user', formData, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          crossDomain: true,
        })
        .then(response => {
          const { redirect } = response;

          if (redirect) {
            window.location.href = redirect;
          } else {
            console.log(response);
            window.location.href = 'https://lengstorf.com/confirm';
          }
        });
    }
  };

  render() {
    const Btn = FormButton.withComponent('button');

    return (
      <Form
        className={`${this.state.isSubmitting && formSubmitting}`}
        action="https://api-lengstorf.now.sh/user"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <Label htmlFor="fname">
          <Input
            type="text"
            id="fname"
            name="FNAME"
            onChange={this.updateValue}
            value={this.state.fname}
            required
            disabled={this.state.isSubmitting}
          />
          <LabelText>First Name</LabelText>
        </Label>
        <Label htmlFor="email">
          <Input
            type="email"
            id="email"
            name="EMAIL"
            onChange={this.updateValue}
            value={this.state.email}
            required
            disabled={this.state.isSubmitting}
          />
          <LabelText>Email Address</LabelText>
        </Label>
        <Btn type="submit" name="subscribe" disabled={this.state.isSubmitting}>
          {this.props.button}
        </Btn>
        <input type="hidden" name="SOURCE" value={this.props.source} />
        <input type="hidden" name="status" value="pending" />
        <input
          type="hidden"
          name="redirect"
          value="https://lengstorf.com/confirm"
        />
        {this.props.group && (
          <input type="hidden" name={this.props.group} value="1" />
        )}
      </Form>
    );
  }
}

export default OptIn;

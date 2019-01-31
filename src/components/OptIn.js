import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Button from './Button';
import { animation, colors, media } from '../config/styles';

const API_URL = 'https://api-lengstorf.now.sh/user';
const API_REDIRECT = 'https://lengstorf.com/confirm';

const Form = styled('form')`
  position: relative;

  &.submitting {
    ::before,
    ::after {
      content: '';
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: calc(50% - 0.5rem);
      left: calc(50% - 1rem);
      background-color: var(${colors.purple});
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
  }

  @supports (display: grid) {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @media ${media.medium} {
      grid-template-columns: repeat(2, auto) 140px;
    }
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
  margin-top: 1rem;
  max-width: 300px;
  padding: 0.25rem 0.5rem 0.125rem;

  :disabled {
    background-color: ${colors.gray};
    opacity: 0.5;
  }

  @supports (display: grid) {
    grid-column: span 2;

    @media ${media.medium} {
      font-size: 1rem;
      grid-column: span 1;
      width: 100%;
    }
  }
`;

const useForm = ({ source, group = 'DEFAULT' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setFormValues] = useState({ FNAME: '', EMAIL: '' });

  const updateValue = event => {
    const { id, value } = event.target;

    setFormValues(state => ({ ...state, [id]: value }));
  };

  const handleSubmit = event => {
    if (typeof window === 'undefined') {
      return;
    }

    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      ...values,
      [group]: '1',
      SOURCE: source,
      redirect: API_REDIRECT,
    };

    axios
      .post(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        crossDomain: true,
      })
      .then(() => {
        // Redirect to the confirmation page.
        window.location.href = API_REDIRECT;
      });
  };

  return [{ values, isSubmitting }, { updateValue, handleSubmit }];
};

const OptIn = ({ source, button = 'Get It Now', group = 'DEFAULT' }) => {
  const [{ values, isSubmitting }, { updateValue, handleSubmit }] = useForm({
    source,
    group,
  });

  const Btn = FormButton.withComponent('button');

  return (
    <Form
      className={isSubmitting ? 'submitting' : ''}
      action={API_URL}
      method="post"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="FNAME">
        <Input
          id="FNAME"
          name="FNAME"
          type="text"
          value={values.FNAME}
          onChange={updateValue}
          disabled={isSubmitting}
          required
        />
        <LabelText>First Name</LabelText>
      </Label>
      <Label htmlFor="EMAIL">
        <Input
          id="EMAIL"
          name="EMAIL"
          type="email"
          value={values.EMAIL}
          onChange={updateValue}
          disabled={isSubmitting}
          required
        />
        <LabelText>Email</LabelText>
      </Label>
      <Btn type="submit" name="subscribe" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : button}
      </Btn>
      <input type="hidden" name="SOURCE" value={source} />
      <input type="hidden" name="status" value="pending" />
      <input type="hidden" name="redirect" value={API_REDIRECT} />
      <input type="hidden" name={group} value="1" />
    </Form>
  );
};

export default OptIn;

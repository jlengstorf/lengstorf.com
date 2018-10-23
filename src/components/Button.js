import styled from 'react-emotion';
import { animation, colors, fonts } from '../config/styles';

const Button = styled('button')`
  background: ${colors.purple};
  border: 1px solid ${colors.lightest};
  box-shadow: 2px 2px 0 ${colors.grayAlphaExtra};
  border-radius: 4px;
  color: ${colors.lightest};
  cursor: pointer;
  display: block;
  font-family: ${fonts.heading};
  font-size: 1.5625rem;
  font-weight: 900;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 320px;
  padding: 0.25rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color ${animation.transitionTime} linear;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &--small {
    display: inline-block;
    font-size: 1rem;
    margin-left: 0;
    max-width: 100%;
    padding: 0.5rem 1.5rem 0.325rem;
  }

  :hover,
  :active,
  :focus {
    background-color: ${colors.darkest};
    outline: none;
  }
`;

export const SmallButton = styled(Button)`
  display: inline-block;
  font-size: 1rem;
  margin-left: 0;
  max-width: 100%;
  padding: 0.5rem 1.5rem 0.325rem;
`;

export default Button;

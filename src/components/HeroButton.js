import styled from 'react-emotion';
import { animation, colors, fonts } from '../config/styles';

export default styled('button')`
  background-color: ${colors.purple};
  border: 1px solid ${colors.lightest};
  border-radius: 0.25rem;
  box-shadow: 2px 2px 0 ${colors.grayAlphaExtra};
  color: ${colors.lightest};
  cursor: pointer;
  display: block;
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  padding: 0.25rem 0.5rem 0.125rem;
  text-transform: uppercase;
  transition: background-color ${animation.transitionTime} linear;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover,
  :focus,
  :active {
    background-color: ${colors.darkest};
    outline: none;
  }
`;

import styled from '@emotion/styled';
import { animation, colors, fonts } from '../config/styles';

export default styled('a')`
  background: ${colors.purple};
  border: 1px solid ${colors.lightest};
  box-shadow: 2px 2px 0 ${colors.grayAlphaExtra};
  border-radius: 4px;
  color: ${colors.lightest};
  cursor: pointer;
  display: ${({ small }) => (small ? `inline-block` : `block`)};
  font-family: ${fonts.heading};
  font-size: ${({ small }) => (small ? `1rem` : `1.5625rem`)};
  font-weight: 900;
  margin: 1rem auto 0 ${({ small }) => (small ? 0 : `auto`)};
  max-width: ${({ small }) => (small ? `100%` : `320px`)};
  padding: ${({ small }) => (small ? `0.5rem 1.5rem 0.325rem` : `0.25rem`)};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color ${animation.transitionTime} linear;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover,
  :active,
  :focus {
    background-color: ${colors.darkest};
    outline: none;
  }
`;

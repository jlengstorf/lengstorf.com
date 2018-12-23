import styled from 'react-emotion';
import { media } from '../config/styles';

export default styled('ul')`
  display: none;
  margin: 0 0 0.5rem;
  max-width: 320px;

  @media ${media.large} {
    @supports (display: grid) {
      display: block;
    }
  }
`;

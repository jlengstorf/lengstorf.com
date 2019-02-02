import styled from '@emotion/styled';
import { media } from '../config/styles';

export default styled('ul')`
  display: none;
  margin: 0 0 0.5rem;
  max-width: 320px;
  text-align: left;

  @media ${media.large} {
    @supports (display: grid) {
      display: block;
    }
  }
`;

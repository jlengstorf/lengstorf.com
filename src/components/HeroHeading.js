import styled from '@emotion/styled';
import { media } from '../config/styles';

export default styled('h1')`
  font-size: 7.825vw;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  text-align: center;

  @media ${media.small} {
    font-size: 2.375rem;
  }

  @media ${media.vertSmall} {
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
  }

  @media ${media.medium} {
    font-size: 2rem;
  }
`;

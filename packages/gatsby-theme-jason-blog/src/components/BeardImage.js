import styled from '@emotion/styled';
import { media } from '../config/styles';

export default styled('img')`
  display: block;
  margin: 5rem auto 1.5rem;

  @media ${media.vertSmall} {
    margin-top: 15vh;
  }

  @media ${media.large} {
    margin-top: 8rem;
  }
`;

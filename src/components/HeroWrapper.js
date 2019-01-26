import styled from '@emotion/styled';
import { media } from '../config/styles';
import Layout from './Layout';

export default styled(Layout)`
  margin: 3rem auto 6rem;

  @media ${media.medium} {
    margin-top: 4rem;
    width: 57ch;
  }

  @media ${media.large} {
    @supports (display: grid) {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: 2rem;
      grid-template: repeat(2, auto) / 1fr repeat(2, calc(27.5ch - 1rem)) 1fr;
      max-width: 100%;
      width: 960px;
    }
  }
`;

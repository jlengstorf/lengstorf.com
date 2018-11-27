import styled from 'react-emotion';
import { media } from '../config/styles';

export default styled('div')`
  text-align: center;

  @media ${media.large} {
    @supports (display: grid) {
      align-items: center;
      display: flex;
      flex-direction: column;
      grid-column: 3 / span 2;
      justify-content: center;
      margin: 0;
      min-height: 85vh;
      padding-bottom: 2rem;
    }
  }
`;

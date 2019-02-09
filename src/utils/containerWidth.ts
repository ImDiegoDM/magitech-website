import { css } from 'styled-components';
import { media } from './media';

export const containerWidth = css`
  ${media.tablet`max-width: 512px;`}
  ${media.desktop`max-width: 662px;`}
  ${media.lagerDesktop`max-width: 800px;`}
  ${media.extraLargeDesktop`max-width: 960px;`}
`;

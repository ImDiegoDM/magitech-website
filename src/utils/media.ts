import { css } from 'styled-components';

interface MediaSizes {
  [key: string]: number;
}

const sizes: MediaSizes = {
  extraLargeDesktop: 1440,
  lagerDesktop: 1200,
  desktop: 992,
  tablet: 768,
  phone: 576,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc: any, label: string) => {
  acc[label] = (...args: any) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(args)}
    }
  `;
  return acc;
}, {});

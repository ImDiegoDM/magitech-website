import styled from 'styled-components';

type AlignItems = 'stretch'|'center'|'flex-start'|'flex-end'|'baseline'|'initial'|'inherit';

type AlignContet = 'stretch'|'center'|'flex-start'|'flex-end'|'space-between'|'space-around'|'initial'|'inherit';

type FlexDirecton =  'row'|'row-reverse'|'column'|'column-reverse'|'initial'|'inherit';

type JustifyContent =  'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'initial'|'inherit';

export interface FlexBoxProps {
  alignItems?: AlignContet;
  alignContent?: AlignContet;
  directiom?: FlexDirecton;
  justifyContent?: JustifyContent;
  height?: string;
  width?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  align-items: ${(props) => props.alignItems || 'stretch'}
  align-content: ${(props) => props.alignContent || 'stretch'}
  justify-content: ${(props) => props.justifyContent || 'flex-start'}
  flex-direction: ${(props) => props.justifyContent || 'row'}
  height: ${(props) => props.height || 'auto'}
  width: ${(props) => props.width || 'auto'}
`;

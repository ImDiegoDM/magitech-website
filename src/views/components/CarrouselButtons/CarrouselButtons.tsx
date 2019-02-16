import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface CarrouselButtonsProps {
  color: string;
  quantity: number;
  dotsOffsetY?: string;
  customCss?: string|FlattenSimpleInterpolation;
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  pointer-events: none;
`;

const Custom = styled.div<{customCss?: string|FlattenSimpleInterpolation}>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  ${(props) => props.customCss}
`;

const IconsContainer = styled.div<{bottom: string}>`
  margin: auto;
  position: absolute;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${(props) => props.bottom}
`;

const SelectedIcon = styled.div<{color: string}>`
  width: 10px;
  height: 10px;
  margin: 0 10px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  position: relative;
  padding: 1px;
  & .inner{
    height: 80%;
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 100%;
  }
`;

const Button = styled.button<{left: boolean, color: string}>`
  position: absolute;
  pointer-events: auto;
  color: ${(props) => props.color}
  ${(props) => props.left ? 'left: 0' : 'right: 0'};
  svg{
    height: 20px;
  }
`;

export function CarrouselButtons(props: CarrouselButtonsProps) {
  const dots = [];

  for (let i = 0; i < props.quantity; i++) {
    dots.push(
      <SelectedIcon key={i} color={props.color}>
        <span data-color={props.color} className="inner"></span>
      </SelectedIcon>);
  }

  return <Container>
    <Custom customCss={props.customCss}>
      <Button color={props.color} left={true}>
        <FontAwesomeIcon icon={faChevronLeft}/>
      </Button>
      <Button color={props.color} left={false}>
        <FontAwesomeIcon icon={faChevronRight}/>
      </Button>
      <IconsContainer bottom={props.dotsOffsetY || '0%'} >
        {dots}
      </IconsContainer>
    </Custom>
</Container>;
}

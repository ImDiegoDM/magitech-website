import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface CarrouselButtonsProps {
  color: string;
  quantity: number;
  dotsOffsetY?: string;
  customClass?: string;
}

export function CarrouselButtons(props: CarrouselButtonsProps) {
  const dots = [];

  for (let i = 0; i < props.quantity; i++) {
    dots.push(
      <span key={i} style={{border: `1px solid ${props.color}`}} className="selected-icon">
        <span data-color={props.color} className="inner"></span>
      </span>);
  }

  return <div className="carrousel-buttons-container">
  <div className={props.customClass}>
    <button style={{color: props.color}} className="left">
      <FontAwesomeIcon icon={faChevronLeft}/>
    </button>
    <button style={{color: props.color}} className="right">
      <FontAwesomeIcon icon={faChevronRight}/>
    </button>
    <div style={{bottom: props.dotsOffsetY || '0%'}} className="carrousel-icons-container">
      {dots}
    </div>
  </div>
</div>;
}

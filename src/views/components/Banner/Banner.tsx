import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Project } from '../../../Interfaces/projects';
import { projects } from '../../../Mocks/projects';
import { CarrouselButtons } from '../CarrouselButtons/CarrouselButtons';

interface BannerProps {
  highlights: Project[];
}

interface BennerItemProps {
  item: Project;
}
function BennerItem(porps: BennerItemProps) {
  return <div className="banner-item">
  <div className="banner-content">
    <h3>{porps.item.name.toLocaleUpperCase()}</h3>
    <div className="banner-description">
      {porps.item.description}
      {porps.item.steam_link ? <div>
        <a href={porps.item.steam_link}>
          <img src="public/images/Logo_Steam.png" />
        </a> 
      </div> : null}
    </div>
  </div>
  <div className="banner-image" style={{backgroundImage: `url(${porps.item.images[0]})`}} />
</div>;
}

export function Banner(props: BannerProps) {
  return <div className="banner-container">
    <div className="banner-item-wrap" style={{width: `calc(100vw * ${projects.length + 1})`}}>
      {props.highlights.map((item, index) => {
        return <BennerItem key={index} item={item} />;
      })}
      <BennerItem item={props.highlights[0]} />;
    </div>
    <CarrouselButtons dotsOffsetY="12%" customClass="container-width" quantity={props.highlights.length} color="white"/>
  </div>;
}

import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Project } from '../../../Interfaces/projects';
import { highlights } from '../../../Mocks/highlights';

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
    <div className="banner-item-wrap" style={{width: `calc(100vw * ${highlights.length + 1})`}}>
      {props.highlights.map((item, index) => {
        return <BennerItem item={item} />;
      })}
      <BennerItem item={props.highlights[0]} />;
    </div>
    <div className="banner-buttons">
      <div>
        <button className="left">
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        <button className="right">
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
        <div className="banner-icons-container">
          <span className="selected-icon"></span>
          <span className="selected-icon"></span>
        </div>
      </div>
    </div>
  </div>;
}

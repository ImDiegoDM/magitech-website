import * as React from 'react';
import { Project } from '../../../Interfaces/projects';
import { highlights } from '../../../Mocks/highlights';

interface BannerProps {
  highlights: Project[];
}

export function Banner(props: BannerProps) {
  return <div className="banner-container">
    <div className="banner-item-wrap" style={{width: `calc(100vw * ${highlights.length + 1})`}}>
      {props.highlights.map((item, index) => {
        return <div className="banner-item" style={{backgroundImage: `url(${item.images[0]})`}}></div>;
      })}
      <div className="banner-item" style={{backgroundImage: `url(${props.highlights[0].images[0]})`}}></div>;
    </div>
  </div>;
}

import * as React from 'react';
import { SectionDescription } from '../../../Interfaces/description';
import { Project } from '../../../Interfaces/projects';
import { Title } from '../Title/Title';

interface PortfolioProps {
  projects: Project[];
  description: SectionDescription;
}

interface PortfolioItemProps {
  item: Project;
}

export function Portfolio(props: PortfolioProps) {
  return <>
    <section id="portfolio" className="portfolio">
      <Title 
        title={props.description.title} 
        subtitle={props.description.subtitle} 
        section={props.description.section} />
      <div className="carrousel">
        <div className="carrousel-content" style={{width: `calc(100% * ${props.projects.length})` }}>
          {props.projects.map((item, index) => {
            return <div className="carrousel-iten">
              <div className="carrousel-iten-display">
                <div className="image" style={{backgroundImage: `url(${item.images[0]})`}}/>
              </div>
            </div>;
          })}
        </div>
      </div>
    </section>
    <hr/>
  </>;
}

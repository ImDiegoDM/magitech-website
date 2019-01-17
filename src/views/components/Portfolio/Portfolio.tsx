import * as React from 'react';
import { SectionDescription } from '../../../Interfaces/description';
import { Project } from '../../../Interfaces/projects';
import { CarrouselButtons } from '../CarrouselButtons/CarrouselButtons';
import { Title } from '../Title/Title';

interface PortfolioProps {
  projects: Project[];
  description: SectionDescription;
}

interface PortfolioItemProps {
  item: Project;
}

interface PortfolioProjectProps {
  project: Project;
}

export function PortfolioProject(props: PortfolioProjectProps) {
  return <div className="carrousel-iten">
    <div className="carrousel-iten-display">
      <div className="image" style={{backgroundImage: `url(${props.project.images[0]})`}}/>
    </div>
  </div>;
}

export function Portfolio(props: PortfolioProps) {
  return <>
    <section id="portfolio" className="portfolio">
      <Title 
        title={props.description.title} 
        subtitle={props.description.subtitle} 
        section={props.description.section} />
      <div className="carrousel">
        <div className="carrousel-scroller">
          <div className="carrousel-content" style={{width: `calc(100% * ${props.projects.length + 1})` }}>
            {props.projects.map((item, index) => {
              return <PortfolioProject project={item}/>;
            })}
            <PortfolioProject project={props.projects[0]}/>
          </div>
        </div>
        <CarrouselButtons quantity={props.projects.length} color="#662d91"/>
      </div>
    </section>
    <hr/>
  </>;
}

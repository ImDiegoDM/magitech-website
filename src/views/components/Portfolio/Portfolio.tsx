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
      <div className="carrousel-iten-content">
        <div className="d-flex flex-column justify-between h-100">
          <div className="d-flex justify-between">
            <div>
              <h3>{props.project.name}</h3>
              <p className="subtitle">{props.project.subtitle}</p>
            </div>
            <span className="year">{props.project.created_at.years()}</span>
          </div>
          <p className="description">{props.project.description}</p>
          <div className="play">
            <p>jogue agora</p>
            {props.project.steam_link ? <div>
              <a href={props.project.steam_link}>
                <img src="public/images/Logo_Steam.png" />
              </a> 
            </div> : null}
          </div>
        </div>
      </div>
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

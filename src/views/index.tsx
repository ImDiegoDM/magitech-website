import * as React from 'react';
import { SectionDescription } from '../Interfaces/description';
import { Project } from '../Interfaces/projects';
import { About, AboutProps } from './components/About/About';
import { Portfolio } from './components/Portfolio/Portfolio';
import { WhatWeDo, WhatWeDoProps } from './components/WhatWeDo/WhatWeDo';
import DefaultLayout from './layouts/default';

export interface HelloProps {
  projects: Project[];
  about: AboutProps;
  whatWeDo: WhatWeDoProps;
  portfolio: SectionDescription;
}

export default function(props: HelloProps) {
  return  <DefaultLayout highlights={props.projects.slice(0, 4)} title="Magitech">
    <About {...props.about}/>
    <WhatWeDo {...props.whatWeDo}/>
    <Portfolio description={props.portfolio} projects={props.projects}/>
  </DefaultLayout>;
}

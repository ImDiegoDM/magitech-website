import * as React from 'react';
import { SectionDescription } from '../Interfaces/description';
import { Project } from '../Interfaces/projects';
import { About, AboutProps } from './components/About/About';
import { Contact, ContactProps} from './components/Contact/Contact';
import { Portfolio } from './components/Portfolio/Portfolio';
import { WhatWeDo, WhatWeDoProps } from './components/WhatWeDo/WhatWeDo';
import DefaultLayout from './layouts/default';

export interface HelloProps {
  projects: Project[];
  about: AboutProps;
  whatWeDo: WhatWeDoProps;
  portfolio: SectionDescription;
  contact: ContactProps; 
}

export default function(props: HelloProps) {
  const scripts = [
    'https://code.jquery.com/jquery-3.3.1.min.js',
    'public/js/banner.js',
    'public/js/portfolio.js',
    'public/js/contact.js',
  ];

  return  <DefaultLayout 
  scripts={scripts} 
  highlights={props.projects.slice(0, 4)} 
  title="Magitech" 
  description="We are Game Developers">
    <About {...props.about}/>
    <WhatWeDo {...props.whatWeDo}/>
    <Portfolio description={props.portfolio} projects={props.projects}/>
    <Contact {...props.contact}/>
  </DefaultLayout>;
}

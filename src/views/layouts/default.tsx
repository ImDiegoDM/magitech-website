import * as React from 'react';
import { Project } from '../../Interfaces/projects';
import { Banner } from '../components/Banner';
import { Nav } from '../components/Nav/Nav';

export interface DefaultLayout {
  title: string;
  children: JSX.Element | JSX.Element[];
  bodyClass?: any;
  highlights: Project[];
  description: string;
  scripts?: string[];
}

const links = [
    {
      label: 'about',
      href: '#about',
    },
    {
      label: 'services',
      href: '#services',
    },
    {
      label: 'portfolio',
      href: '#portfolio',
    },
    {
      label: 'contact',
      href: '#contact',
    },
];

export default function DefaultLayout(props: DefaultLayout) {
  return <>
    <Nav links={links}/>
      <Banner highlights={props.highlights}/>
      <div className="magitech-container container-up">
        <div className="magitech-content">
          {props.children}
        </div>
      </div>
      {props.scripts.map((item, index) => {
        return <script key={index} src={item}/>;
      })}
  </>;
}

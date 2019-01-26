import * as React from 'react';
import { SectionDescription } from '../../../Interfaces/description';
import { about } from '../../../Mocks/about';
import { Title } from '../Title/Title';

export interface AboutProps extends SectionDescription {
  content: string;
}

export function About(props: AboutProps) {

  return <>
    <section id="about" className="about">
      <div>
        <Title section={props.title} title={props.title} subtitle={props.subtitle}/>
        <p className="about-content">{props.content}</p>
      </div>
      <div>
        <img src="public/images/Illustration_Mago.png" alt="wizard"/>
      </div>
    </section>
    <hr/>
  </>;
}

import * as React from 'react';
import { about } from '../../../Mocks/about';
import { Title } from '../Title/Title';

export function About() {

  return <>
    <section id="about" className="about">
      <div>
        <Title section={about.title} title={about.title} subtitle={about.subtitle}/>
        <p className="about-content">{about.content}</p>
      </div>
      <div>
        <img src="public/images/illustration_Mago.png" alt="wizard"/>
      </div>
    </section>
    <hr/>
  </>;
}

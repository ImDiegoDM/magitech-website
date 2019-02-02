import * as React from 'react';
import { SectionDescription } from '../../../Interfaces/description';
import { whatWeDo } from '../../../Mocks/what-we-do';
import { Title } from '../Title/Title';

export interface WhatWeDoProps extends SectionDescription {
  content: Array<{
    imgLink: string;
    title: string;
    subtitle: string;
  }>;
}

export function WhatWeDo(props: WhatWeDoProps) {
  return <>
    <section id="services" className="what-we-do">
      <Title title={whatWeDo.title} subtitle={whatWeDo.subtitle} section={whatWeDo.section}/>
      <div className="content">
        {whatWeDo.content.map((item, index) => {
          return <div key={index}>
            <img src={item.imgLink} alt="what we do img"/>
            <h6>{item.title}</h6>
            <p>{item.subtitle}</p>
          </div>;
        })}
      </div>
    </section>
    <hr/>
  </>;
}

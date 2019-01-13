import * as React from 'react';
import { whatWeDo } from '../../../Mocks/what-we-do';
import { Title } from '../Title/Title';

export function WhatWeDo() {
  return <section className="what-we-do">
    <Title title={whatWeDo.title} subtitle={whatWeDo.subtitle} section={whatWeDo.section}/>
    <div className="content">
      {whatWeDo.content.map((item, index) => {
        return <div>
          <img src={item.imgLink} alt="what we do img"/>
          <h6>{item.title}</h6>
          <p>{item.subtitle}</p>
        </div>;
      })}
    </div>
  </section>;
}

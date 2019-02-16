import * as React from 'react';
import styled from 'styled-components';
import { SectionDescription } from '../../../Interfaces/description';
import { about } from '../../../Mocks/about';
import { FlexBox } from '../FlexBox/FlexBox';
import { Title } from '../Title/Title';

export interface AboutProps extends SectionDescription {
  content: string;
}

const Img = styled.img`
  width: 250px;
  margin: 0 25px;
  height: auto;
`;

const Content = styled.p`
  font-size: .9em;
  margin-top: 40px;
  color: #7145a3;
`;

export function About(props: AboutProps) {

  return <>
    <FlexBox as="section">
      <div>
        <Title section={props.title} title={props.title} subtitle={props.subtitle}/>
        <Content>{props.content}</Content>
      </div>
      <div>
        <Img src="public/images/Illustration_Mago.png" alt="wizard"/>
      </div>
    </FlexBox>
    <hr/>
  </>;
}

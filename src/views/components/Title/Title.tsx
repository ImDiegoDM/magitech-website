import * as React from 'react';

export interface TitleProps {
  title: string;
  subtitle: string;
  section: string;
}

export function Title(props: TitleProps) {
  return <div className="title">
    <p className="title-section">{props.section}</p>
    <h3 className="title-title">{props.title}</h3>
    <p className="title-subtitle">{props.subtitle}</p>
  </div>;
}

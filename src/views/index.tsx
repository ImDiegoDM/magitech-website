import * as React from 'react';
import { Project } from '../Interfaces/projects';
import DefaultLayout from './layouts/default';

export interface HelloProps {
  name: string;
  highlights: Project[];
}

export default function(props: HelloProps) {
  return  <DefaultLayout highlights={props.highlights} title="Magitech">
    <h1>{props.name}</h1>
  </DefaultLayout>;
}

import * as React from 'react';
import { Project } from '../Interfaces/projects';
import { About } from './components/About/About';
import { WhatWeDo } from './components/WhatWeDo/WhatWeDo';
import DefaultLayout from './layouts/default';

export interface HelloProps {
  name: string;
  highlights: Project[];
}

export default function(props: HelloProps) {
  return  <DefaultLayout highlights={props.highlights} title="Magitech">
    <About/>
    <WhatWeDo/>
  </DefaultLayout>;
}

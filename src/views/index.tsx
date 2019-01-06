import * as React from 'react';
import DefaultLayout from './layouts/default';

export interface HelloProps {
  name: string;
}

export default function(props: HelloProps) {
  return  <DefaultLayout title="Magitech">
    <h1>{props.name}</h1>
  </DefaultLayout>;
}

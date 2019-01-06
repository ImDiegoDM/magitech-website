import * as React from 'react';

export interface DefaultLayout {
  title: string;
  children: JSX.Element;
}

export default function DefaultLayout(props: DefaultLayout) {
  return <html>
    <head>
      <title>{props.title}</title>
    </head>
    <body>
      {props.children}
    </body>
  </html>;
}

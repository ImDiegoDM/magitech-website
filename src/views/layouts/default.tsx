import * as React from 'react';
import { Nav } from '../components/Nav/Nav';

export interface DefaultLayout {
  title: string;
  children: JSX.Element | JSX.Element[];
  bodyClass?: any;
}

const links = [
  {
    label: 'about',
    href: './about',
  },
];

export default function DefaultLayout(props: DefaultLayout) {
  return <html>
    <head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="public/main.css"/>
    </head>
    <body className="gradient-bg">
      <div className="magitech-container">
        <Nav links={links}/>
        <div className="magitech-content">
          {props.children}
        </div>
      </div>
    </body>
  </html>;
}

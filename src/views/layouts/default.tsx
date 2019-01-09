import * as React from 'react';
import { Banner } from '../components/Banner';
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
    {
      label: 'services',
      href: './services',
    },
    {
      label: 'portfolio',
      href: './portfolio',
    },
    {
      label: 'contact',
      href: './contact',
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
      <Nav links={links}/>
      <Banner />
      <div className="magitech-container container-up">
        <div className="magitech-content">
          {props.children}
        </div>
      </div>
    </body>
  </html>;
}

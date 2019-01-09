import * as React from 'react';

interface Link {
  label: string;
  href: string;
}

interface NavProps {
  links: Link[];
}

export function Nav(props: NavProps) {
  return <div className="nav">
    <div className="nav-container">
      <div className="nav-content">
        <img className="logo" src="./public/white_logo.png" alt="logo"/>
        <nav>
          {props.links.map((item, index) => {
            return <a className="nav-item" key={index} href={item.href}>
              <span className="label">{item.label}</span>
            </a>;
          })}
        </nav>
      </div>
    </div>
  </div>;
}

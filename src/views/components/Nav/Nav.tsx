import * as React from 'react';

interface Link {
  label: string;
  href: string;
}

interface NavProps {
  links: Link[];
}

export function Nav(props: NavProps) {
  return <nav className="nav-container">
    {props.links.map((item, index) => {
      return <a className="nav-item" key={index} href={item.href}>{item.label}</a>;
    })}
  </nav>;
}

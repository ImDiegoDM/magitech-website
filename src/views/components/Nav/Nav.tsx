import * as React from 'react';
import styled from 'styled-components';
import { containerWidth } from '../../../utils/containerWidth';

interface Link {
  label: string;
  href: string;
}

interface NavProps {
  links: Link[];
}

const BaseNav = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  width: 100%;
`;

const NavContainer = styled.div`
  width: 100%;
  margin: auto;
  ${containerWidth}
`;

const NavContent = styled.div`
`;

const Logo = styled.img`
`;

const NavItem = styled.a`
`;

const Label = styled.span`

`;

export function Nav(props: NavProps) {
  return <BaseNav>
    <NavContainer>
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
    </NavContainer>
  </BaseNav>;
}

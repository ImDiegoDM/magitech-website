import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Project } from '../../../Interfaces/projects';
import { projects } from '../../../Mocks/projects';
import { containerWidth } from '../../../utils/containerWidth';
import { CarrouselButtons } from '../CarrouselButtons/CarrouselButtons';

interface BannerProps {
  highlights: Project[];
}

interface BennerItemProps {
  item: Project;
}

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const Wrap = styled.div<{width: string}> `
  display: flex;
  height: 100%;
  width: ${(props) => props.width}
`;

const Item = styled.div`
  display: block;
  width: 100vw;
  height: 100%;
  position: relative;
`;

const Content = styled.div`
  height: 100%;
  margin: auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  position: relative;
  ${containerWidth}
`;

const Name = styled.h3`
  font-family: "MotionControl";
  height: 46%;
  font-size: 4.5em;
  width: 300px;
  margin: 0;
  line-height: .8em;
`;

const Description = styled.div`
  font-size: .9em;
  line-height: 1.3;
  margin-top: 80px;
  width: 300px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  div{
    margin-top: 15px;
    a{
      img{
        display: block;
        float: right;
        height: 40px; 
      }
    }
  }
`;

const Image = styled.div<{bgUrl: string}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 70%;
  background-image: url(${(props) => props.bgUrl});
  opacity: .3;
  z-index: -1;
  top: 0;
  -webkit-mask-image: linear-gradient(to bottom,#000 75%,rgba(0,0,0,0));
  mask-image: linear-gradient(to bottom,#000 75%,rgba(0,0,0,0));
`;

function BennerItem(porps: BennerItemProps) {
  return <Item>
  <Content >
    <Name>{porps.item.name.toLocaleUpperCase()}</Name>
    <Description>
      {porps.item.description}
      {porps.item.steam_link ? <div>
        <a href={porps.item.steam_link}>
          <img src="public/images/Logo_Steam.png" />
        </a> 
      </div> : null}
    </Description>
  </Content>
  <Image bgUrl={porps.item.images[0]} />
</Item>;
}

export function Banner(props: BannerProps) {
  return <Container>
    <Wrap width={`calc(100vw * ${projects.length + 1})`}>
      {props.highlights.map((item, index) => {
        return <BennerItem key={index} item={item} />;
      })}
      <BennerItem item={props.highlights[0]} />;
    </Wrap>
    <CarrouselButtons dotsOffsetY="12%" 
    customCss={css`
      margin: auto;
      ${containerWidth}
    `} 
    quantity={props.highlights.length
    } color="white"/>
  </Container>;
}

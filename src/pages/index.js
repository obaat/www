import React from 'react'
import Link from 'gatsby-link'
import Lorem from 'react-lorem-component'
import { space, color, fontSize } from 'styled-system'
import Button from '../components/Button'
import g from 'glamorous'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import image1 from '../images/front_1.jpg';
import image2 from '../images/front_2.jpg';
import image3 from '../images/front_3.jpg';
import image4 from '../images/front_4.jpg';
import image5 from '../images/front_5.jpg';

const AutoPlaySwipeableViews = autoPlay(g(SwipeableViews)({
  width: "100%",
  height: "100%",
}));

const Banner = g.div({
  textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
},fontSize)

const Mission = g.div(
  {
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: '600px',
  },
  space
)

const Panel = g.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100VH',
  },
  color,
  space
)

const backgroundImage = ({image}) => ({
  backgroundImage: `url("${image}")`,
  backgroundSize: 'cover',
});

const ImagePanel = g.div({
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100VH',
}, space, backgroundImage);

const slideConfig = {
  duration: '0.5s',
  easeFunction: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  delay: '0s'
};

const IndexPage = () =>
  <div>
    <Panel>
      <AutoPlaySwipeableViews enableMouseEvents  duration={ 5000 } springConfig={slideConfig}>
        <ImagePanel image={ image1 }>
          <Banner fontSize={8}>Make an Impact</Banner>
          <Banner fontSize={5}>One Brick at a time</Banner>
        </ImagePanel>
        <ImagePanel image={ image2 }>
          <Banner fontSize={8}>Make an Impact</Banner>
          <Banner fontSize={5}>One Brick at a time</Banner>
        </ImagePanel>
        <ImagePanel image={ image3 }>
          <Banner fontSize={8}>Make an Impact</Banner>
          <Banner fontSize={5}>One Brick at a time</Banner>
        </ImagePanel>
        <ImagePanel image={ image4 }>
          <Banner fontSize={8}>Make an Impact</Banner>
          <Banner fontSize={5}>One Brick at a time</Banner>
        </ImagePanel>
        <ImagePanel image={ image5 }>
          <Banner fontSize={8}>Make an Impact</Banner>
          <Banner fontSize={5}>One Brick at a time</Banner>
        </ImagePanel>
      </AutoPlaySwipeableViews>
    </Panel>
    <Panel p={4}>
      <Banner fontSize={8}>ONE BRICK AT A TIME</Banner>
      <Banner fontSize={5}>
        Skills Exchange and Building Schools in Uganda
      </Banner>
      <Mission my={4}>
        <p>
          We believe that by building and refurbishing, we are building brighter
          future. From schools to medical facilities, One Brick at a Time is
          dedicated to alleviating poverty in marginalised areas in Uganda.
        </p>
        <p>
          We partner up with community-based NGOs to develop network of mutual
          support and we recruit volunteers to maintain these projects. This is
          allowing for social investment in the regional economy in the Rwenzori
          Region and beyond.
        </p>
        <p>
          We provide project and programme management, well-trained local
          builders and all the equipment which result in strong, sustainable and
          important facilities helping to break the cycle of poverty.
        </p>
      </Mission>
      <Button context="info">Learn More</Button>
    </Panel>
    <Panel bg="blue.0">
      Our Impact since 2005
    </Panel>
  </div>

export default IndexPage

import { space, color, fontSize } from 'styled-system'
import {withLayout} from '../components/Layout'
import Button from '../components/Button'
import Helmet from 'react-helmet'
import g from 'glamorous'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import {getSingleton, types} from '../utils/api'
import {backgroundImageCover} from '../styleHelpers'

const AutoPlaySwipeableViews = autoPlay(g(SwipeableViews)({
  width: "100%",
  height: "100%",
}));

const Banner = g.h1({
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

const ImagePanel = g.div({
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100VH',
}, space, backgroundImageCover);

const slideConfig = {
  duration: '0.5s',
  easeFunction: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  delay: '0s'
};

const IndexPage = ({content}) => {
  const {hero, mission, mission_title} = content
  return (
    <div>
      <Helmet title="One Brick at a Time" />
      <Panel>
        <AutoPlaySwipeableViews enableMouseEvents duration={ 5000 } springConfig={slideConfig}>
          { hero.map(({image, lead, strapline}) =>
            <ImagePanel image={ image.url }>
              <Banner fontSize={8}>{ lead[0].text }</Banner>
              <Banner fontSize={5}>{ strapline[0].text }</Banner>
            </ImagePanel>
          )}
        </AutoPlaySwipeableViews>
      </Panel>
      <Panel p={4}>
        <Banner fontSize={8}>{ mission_title[0].text }</Banner>
        <Mission my={4}>
        </Mission>
        <Button context="info">Learn More</Button>
      </Panel>
    </div>
  )
}

IndexPage.getInitialProps = async ({query}) => {
  const uid = query.id
  const res = await getSingleton(types.HOME)
  return { content: res.data, meta: res }
}

export default withLayout(IndexPage)

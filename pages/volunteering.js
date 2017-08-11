import React from 'react'
import Button from '../components/Button'
import g from 'glamorous'
import {mapValues} from 'lodash/fp'
import Helmet from 'react-helmet'
import {getByUID} from '../utils/api'
import {withLayout} from '../components/Layout'
import PrismicRichText from '../components/PrismicRichText'
import SlideShow from '../components/SlideShow'
import { Flex, Box } from 'grid-styled'
import {backgroundImageCover} from '../styleHelpers'
import get from 'lodash/get'

const Title = g.h3()
const Section = ({title, ...props}) => (
  <div>
    { title && <Title>{ title }</Title> }
    <PrismicRichText { ...props } />
  </div>
)

const PageTitle = g(Flex)({
  minHeight: "250px",
}, backgroundImageCover).withProps({
  flex: 1,
  justify: "center",
  align: "center",
  direction: "column",
})

const Volunteering = ({content}) => {
  const image = get(
    content, ['header_image', 'url'],
    get(content, ['image_gallery', 0, 'image', 'url'])
  )
  return (
    <div>
      <Helmet title={ content.title && content.title[0].text } />
      <PageTitle image={ image }>
        <PrismicRichText color="#fff" fontSize={ 7 } source={ content.title } />
      </PageTitle>
      <SlideShow source={ content.image_gallery } />
      <Section source={ content.description } />
      <Section title="Costs" source={ content.costs } />
      <Section title="Living" source={ content.living } />
      <Section title="FAQ" source={ content.faq } />
    </div>
  )
}

Volunteering.getInitialProps = async ({query}) => {
  const uid = query.id
  const res = await getByUID('volunteer_opportunity')(uid)
  return { content: res.data, meta: res }
}

export default withLayout(Volunteering)

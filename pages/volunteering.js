import React from 'react'
import Button from '../components/Button'
import g from 'glamorous'
import {mapValues} from 'lodash/fp'
import Helmet from 'react-helmet'
import {getByUID} from '../utils/api'
import {withLayout} from '../components/Layout'

const styling = {
  h1: g.div({}),
  h2: g.div({}),
  h3: g.div({}),
  unknown: g.div({backgroundColor: 'red'})
}

const StructuredTextWrapper = g.div()

const StructuredText = ({source}) => {
  const content = source.map((s,i) => {
    const Container = styling[s.type] || styling.unknown;
    return <Container key={ i }>{ s.text }</Container>
  })

  return (
    <StructuredTextWrapper>
      { content }
    </StructuredTextWrapper>
  )
}

const Title = g.div()
const Section = ({source, title}) => (
  <div>
    <Title>{ title }</Title>
    <StructuredText source={ source } />
  </div>
)

const Volunteering = ({content}) =>
  <div>
    <Helmet title={ content.title && content.title[0].text } >
    </Helmet>
    <Section source={ content.title } />
    <Section source={ content.description } />
    <Section title="Costs" source={ content.costs } />
    <Section title="Living" source={ content.living } />
    <Section title="FAQ" source={ content.faq } />
  </div>

Volunteering.getInitialProps = async ({query}) => {
  const uid = query.id
  const res = await getByUID('volunteer_opportunity')(uid)
  return { content: res.data, meta: res }
}

export default withLayout(Volunteering)

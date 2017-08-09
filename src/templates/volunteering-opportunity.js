import React from 'react'
import Link from 'gatsby-link'
import Button from '../components/Button'
import g from 'glamorous'
import {mapValues} from 'lodash/fp'
import Helmet from 'react-helmet'

const styling = {
  h1: g.div({}),
  h2: g.div({}),
  h3: g.div({}),
  unknown: g.div({backgroundColor: 'red'})
}

const StructuredTextWrapper = g.div()

const StructuredText = ({source}) => {
  const content = source.map(s => {
    const Container = styling[s.type] || styling.unknown;
    return <Container>{ s.text }</Container>
  })

  return (
    <StructuredTextWrapper>
      { content }
    </StructuredTextWrapper>
  )
}

const convert = mapValues(v => v[0].text);

const Title = g.div()
const Section = ({source, title}) => (
  <div>
    <Title>{ title }</Title>
    <StructuredText source={ source } />
  </div>
)

const VolunteeringOpportunity = ({data: {prismicDocument: {data: content}}}) => {
  console.log({content});
  return (
    <div>
      <Helmet title={ content.title && content.title[0].text } >
      </Helmet>
      <Section source={ content.title } />
      <Section source={ content.description } />
      <Section title="Costs" source={ content.costs } />
      <Section title="Living" source={ content.living } />
      <Section title="FAQ" source={ content.faq } />
    </div>
  )
}

export default VolunteeringOpportunity

export const pageQuery = graphql`
  query volunteerQuery($id: String!) {
    prismicDocument(uid: { eq: $id }) {
      data {
        title {
          type
          text
        }
        description {
          type
          text
        }
        date_start
        date_end
        costs {
          type
          text
        }
        living {
          type
          text
        }
        faq {
          type
          text
        }
      }
    }
  }
`

        // image_gallery
        // start_date
        // end_date
        // location
        // skills_qualifications
        // costs
        // living
        // faq

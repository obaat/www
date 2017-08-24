import React from "react"
import Button from "../components/Button"
import g from "glamorous"
import { mapValues } from "lodash/fp"
import XLink from "next/link"
import Helmet from "react-helmet"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import {
  Card,
  BackgroundImage,
  Flex,
  Box,
  Border,
  Tabs,
  TabItem,
  Panel,
  PanelHeader,
} from "../ui"
import { backgroundImageCover } from "../styleHelpers"
import get from "lodash/get"
import { branch } from "recompose"
import Error from "next/error"

const Title = g.div({
  textTransform: "uppercase",
})

const MenuItemLink = g(Border)({
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(0,0,0,0.3)",
})

const MenuItem = ({ href, ...props }) =>
  <XLink href={href}>
    <Border borderColor="greyLighter" {...props} />
  </XLink>

const Section = ({ title, id, ...props }) =>
  props.source &&
  <div>
    <a id={id} />
    {title &&
      <Title>
        {title}
      </Title>}
    <PrismicRichText {...props} />
  </div>

const Accordion = g.div()

const AccordionSection = ({ slice_type, items, primary }) => {
  return (
    <Panel palette="blue" mb={3}>
      <PanelHeader palette="blue">
        {primary.title && <PrismicRichText source={primary.title} />}
      </PanelHeader>
      <Box p={3}>
        {primary.description &&
          <PrismicRichText source={primary.description} />}
      </Box>
    </Panel>
  )
}

const Opportunity = ({ uid, data }) =>
  <Card mb={2}>
    <BackgroundImage ratio={1 / 2} src={get(data, "header_image.url")} />
    <Box p={2}>
      <PrismicRichText forceType="heading6" source={data.title} />
      <PrismicRichText forceType="paragraph" source={data.programme_review} />
      <Button
        href={`/volunteering/${uid}`}
        palette="info"
        invert
        icon="info"
        w={1}
        py={1}
      >
        More Information
      </Button>
    </Box>
  </Card>

const Volunteering = ({ content, opportunities }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <Flex>
          <Box w={2 / 3} pr={3}>
            <Section id="description" source={content.description} />
            <Accordion>
              {content.body.map(props => <AccordionSection {...props} />)}
            </Accordion>
          </Box>
          <Box w={1 / 3} px={3}>
            Current openings
            {opportunities.results &&
              opportunities.results.map(props => <Opportunity {...props} />)}
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

const Location = ({ uid, data }) =>
  <Card mb={2}>
    <BackgroundImage ratio={1 / 4} src={get(data, "header_image.url")} />
    <Box p={2}>
      <PrismicRichText forceType="heading6" source={data.title} />
      <Button
        href={`/location/${uid}`}
        palette="info"
        invert
        icon="info"
        w={1}
        py={1}
      >
        Apply now
      </Button>
    </Box>
  </Card>

const VolunteeringOpportunity = ({ content, locations }) => {
  console.log({ locations })
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <Flex>
          <Box w={2 / 3} pr={3}>
            <Section
              id="about"
              title="About the Programme"
              source={content.description}
            />
          </Box>
          <Box w={1 / 3} px={2}>
            Available Locations
            {locations.results.map(props => <Location {...props} />)}
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

const Page = ({ opportunity, ...props }) =>
  opportunity
    ? <VolunteeringOpportunity {...props} />
    : <Volunteering {...props} />

Page.getInitialProps = async ({ query }) => {
  const opportunities = await getByType(types.VOLUNTEERING)
  if (query.id) {
    const uid = query.id
    const res = await getByUID(types.VOLUNTEERING)(uid)
    const locations = await getByIDs(res.data.locations.map(l => l.location.id))
    return {
      content: res.data,
      meta: res,
      opportunities,
      locations,
      opportunity: true,
    }
  } else {
    const res = await getSingleton(types.VOLUNTEERING_PAGE_CONTENT)
    return {
      content: res.data,
      opportunities,
      meta: res,
    }
  }
}

export default withLayout(Page)

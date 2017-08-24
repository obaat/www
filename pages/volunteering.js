import React from "react"
import Button from "../components/Button"
import g from "glamorous"
import { mapValues } from "lodash/fp"
import Helmet from "react-helmet"
import Link from "next/link"
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
  Absolute,
  Relative,
  BackgroundImage,
  Flex,
  Box,
  Border,
  Tabs,
  TabItem,
  ButtonOutline,
  Panel,
  PanelHeader,
  Heading,
} from "../ui"
import { backgroundImageCover } from "../styleHelpers"
import get from "lodash/get"
import { branch } from "recompose"
import Error from "next/error"

const Section = ({ title, id, ...props }) =>
  props.source &&
  <div>
    <a id={id} />
    {title &&
      <Heading>
        {title}
      </Heading>}
    <PrismicRichText {...props} />
  </div>

const Accordion = g.div()

const AccordionSection = ({ slice_type, items, primary }) => {
  return (
    <Panel palette="blue" mb={3}>
      <PanelHeader palette="blue">
        {primary.title &&
          <PrismicRichText forceType="heading5" source={primary.title} />}
      </PanelHeader>
      <Box p={3}>
        {primary.description &&
          <PrismicRichText source={primary.description} />}
      </Box>
    </Panel>
  )
}

const Opportunity = ({ uid, data }) =>
  <Relative mb={2}>
    <BackgroundImage
      bg="#000"
      ratio={1 / 2}
      src={get(data, "header_image.url")}
    >
      <Absolute top left right p={1} bg="rgba(0,0,0,0.3)">
        {data.title &&
          <PrismicRichText
            forceType="heading4"
            color="#fff"
            source={data.title}
          />}
      </Absolute>
      <Absolute bottom right p={1}>
        <Link href={`/volunteering/?id=${uid}`} as={`/volunteering/${uid}`}>
          <Button
            palette="normal"
            bg="rgba(0,0,0,0.3)"
            invert
            icon="chevron-right"
            w={1}
            py={1}
            as={ButtonOutline}
          >
            More
          </Button>
        </Link>
      </Absolute>
    </BackgroundImage>
  </Relative>

const Location = ({ uid, data }) =>
  <Relative mb={2}>
    <SlideShow hidePaging controlSize={18}>
      {data.image_gallery.map(({ image, description }, i) =>
        <BackgroundImage src={image.url} key={i} />,
      )}
    </SlideShow>
    <Absolute top left right p={1} bg="rgba(0,0,0,0.3)">
      {data.title &&
        <PrismicRichText
          forceType="heading3"
          color="#fff"
          source={data.title}
        />}
    </Absolute>
    <Absolute bottom right p={1}>
      <Link href={`/location/?id=${uid}`} as={`/location/${uid}`}>
        <Button
          palette="normal"
          bg="rgba(0,0,0,0.3)"
          invert
          icon="chevron-right"
          w={1}
          py={1}
          as={ButtonOutline}
        >
          More
        </Button>
      </Link>
    </Absolute>
  </Relative>

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
            <Heading>Current openings</Heading>
            {opportunities &&
              opportunities.results &&
              opportunities.results.map(props => <Opportunity {...props} />)}
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

const VolunteeringOpportunity = ({ content, locations }) => {
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
            <Heading>Available Locations</Heading>
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

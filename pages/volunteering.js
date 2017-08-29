import React from "react"
import Button from "../components/Button"
import g from "glamorous"
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
import Accordion, { AccordionSection } from "../components/Accordion"
import {
  Absolute,
  Relative,
  BackgroundImage,
  Flex,
  Box,
  ButtonOutline,
  Panel,
  PanelHeader,
  Heading,
  Text,
} from "../ui"
import get from "lodash/get"
import { withProps } from "recompose"
// import Error from "next/error"

const SidebarHeader = withProps({
  color: "red",
  f: 3,
})(Text)

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

const renderers = {
  text_only: ({ primary, items }) =>
    primary.description && <PrismicRichText source={primary.description} />,
  faq: ({ items = [] }) =>
    <Box>
      {items.map(({ question, answer }, i) =>
        <Box key={i} w={1}>
          <PrismicRichText w={1} forceType="heading6" source={question} />
          <PrismicRichText w={1} source={answer} />
        </Box>,
      )}
    </Box>,

  table: ({ items = [] }) =>
    <table width="100%">
      <tbody>
        {items.map(({ column_1, column_2 }, i) =>
          <tr key={i}>
            <td>
              <PrismicRichText source={column_1} />
            </td>
            <td>
              <PrismicRichText source={column_2} />
            </td>
          </tr>,
        )}
      </tbody>
    </table>,
}

const renderPrismicSlice = ({ slice_type, items, primary }, i) => {
  const title =
    primary.title &&
    <PrismicRichText forceType="heading5" source={primary.title} />
  const Component = renderers[slice_type]
  return {
    title,
    description: <Component primary={primary} items={items} />,
  }
}

const Volunteering = ({ content, opportunities }) => {
  const accordionItems = content.body.map(renderPrismicSlice)

  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <Flex>
          <Box w={2 / 3} pr={3}>
            <Section id="description" source={content.description} mb={3} />
            <Accordion items={accordionItems} />
          </Box>
          <Box w={1 / 3} px={3}>
            {opportunities &&
              opportunities.results &&
              opportunities.results.map((props, i) =>
                <Opportunity key={i} {...props} />,
              )}
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
            <SidebarHeader>Available Locations</SidebarHeader>
            {locations.results.map((props, i) =>
              <Location key={i} {...props} />,
            )}
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

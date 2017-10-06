import React from "react"
import Button from "../components/Button"
import ApplyNow from "../components/ApplyNow"
import g from "glamorous"
import Link from "../components/Link"
import { ArrowRight } from "../components/SvgIcons"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"

import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import Accordion, { AccordionSection } from "../components/Accordion"
import SidebarHeader from "../components/SidebarHeader"
import BreadCrumbs from "../components/Breadcrumbs"
import Quotes from "../components/SidebarQuote"
import PrismicSlice, {
  renderers as sliceRenderers,
} from "../components/PrismicSlice"
import {
  Absolute,
  Relative,
  BackgroundImage,
  Flex,
  Box,
  ButtonOutline,
  ButtonTransparent,
  Heading,
  Subhead,
  Border,
  H6,
} from "../ui"

const Overlay = g(Absolute)({
  pointerEvents: "none",
  background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5))",
}).withProps({
  top: true,
  bottom: true,
  left: true,
  right: true,
  p: 2,
})

const Section = ({ title, id, ...props }) =>
  props.source && (
    <div>
      <a id={id} />
      {title && <Subhead>{title}</Subhead>}
      <PrismicRichText {...props} />
    </div>
  )

const Opportunity = ({ uid, data }) => (
  <Box>
    <Link href={`/volunteering/?id=${uid}`} as={`/volunteering/${uid}`}>
      <Flex>
        <Box>
          <PrismicRichText forceType="unformatted" source={data.title} />
        </Box>
        <Box pl={1}>
          <ArrowRight color="#000" size={12} />
        </Box>
      </Flex>
    </Link>
  </Box>
)

const Location = ({ uid, data }) => (
  <Relative mb={2}>
    <SlideShow hidePaging controlSize={18}>
      {data.image_gallery.map(({ image, description }, i) => (
        <BackgroundImage src={image.url} key={i} />
      ))}
    </SlideShow>
    <Overlay>
      {data.title && (
        <PrismicRichText
          forceType="heading5"
          color="#fff"
          source={data.title}
        />
      )}
    </Overlay>
    <Absolute bottom right p={1}>
      <Link href={`/location/?id=${uid}`} as={`/location/${uid}`}>
        <Button
          palette="normal"
          color="#fff"
          bg="rgba(0,0,0,0.3)"
          invert
          icon="ArrowRight"
          iconSize={12}
          w={1}
          py={1}
          as={ButtonOutline}
        >
          More
        </Button>
      </Link>
    </Absolute>
  </Relative>
)

const renderSliceToAccordion = ({ slice_type, items, primary }, i) => {
  const title = primary.title && (
    <PrismicRichText
      mb={2}
      forceType="heading6"
      bold={300}
      source={primary.title}
    />
  )
  const Component = sliceRenderers[slice_type] || Unknown
  return {
    id: `s-${i}`,
    title,
    description: (
      <Component primary={primary} items={items} slice_type={slice_type} />
    ),
  }
}

const Volunteering = ({ content, opportunities, additionalData }) => {
  const quotes = content.body.find(s => s.slice_type === "quotes")
  const accordionItems = content.body
    .filter(s => s.slice_type !== "quotes")
    .map(renderSliceToAccordion)

  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
        <Section id="description" source={content.description} mb={3} />
        <Accordion
          items={accordionItems}
          initialOpen={accordionItems.length - 1}
        />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} px={[0, 0, 0, 3]}>
        <SidebarHeader>Available Placements</SidebarHeader>
        {opportunities &&
          opportunities.results &&
          opportunities.results.map((props, i) => (
            <Opportunity key={i} {...props} />
          ))}
        <H6 mt={2}>Volunteer Experiences</H6>
        {quotes && <Quotes items={quotes.items} data={additionalData} />}
      </Box>
    </Flex>
  )
}

const sidebarTypes = { image_gallery: true }

const VolunteeringOpportunity = ({ content, locations }) => {
  const body = content.body || []
  const sidebarSlices = body
    .filter(b => sidebarTypes[b.slice_type])
    .map((props, i) => <PrismicSlice key={i} {...props} />)
  const mainSlices = body
    .filter(b => !sidebarTypes[b.slice_type])
    .map((props, i) => <PrismicSlice key={i} {...props} />)
  return (
    <Flex>
      <Box w={[1, 1, 1, 2 / 3]} pr={3}>
        <Section
          id="about"
          title="About the Programme"
          source={content.description}
        />
        {mainSlices}
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} px={2} pt={2}>
        {locations.results &&
          locations.results.length > 0 && (
            <SidebarHeader>Available Locations</SidebarHeader>
          )}
        {locations.results.map((props, i) => <Location key={i} {...props} />)}
        {sidebarSlices}
      </Box>
    </Flex>
  )
}

const Page = ({ opportunity, ...props }) =>
  opportunity ? (
    <VolunteeringOpportunity {...props} />
  ) : (
    <Volunteering {...props} />
  )

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
    const quotes = res.data.body.find(s => s.slice_type === "quotes")
    const ids = (quotes && quotes.items.map(l => l.quote.id)) || []
    const additionalData = ids.length ? await getByIDs(ids) : { results: [] }
    return {
      content: res.data,
      additionalData,
      opportunities,
      meta: res,
    }
  }
}

export default pageWithTitle({
  route: [{ title: "Volunteering", href: "/volunteering" }],
  withApply: true,
})(Page)

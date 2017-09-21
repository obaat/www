import React from "react"
import Button from "../components/Button"
import ApplyNow from "../components/ApplyNow"
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
import Statement from "../components/Statement"
import Accordion, { AccordionSection } from "../components/Accordion"
import SidebarHeader from "../components/SidebarHeader"
import BreadCrumbs from "../components/Breadcrumbs"
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
  <Border p={2} mb={2} borderColor="greyLighter" top left bottom right>
    <PrismicRichText forceType="heading6" source={data.title} />
    <Link href={`/volunteering/?id=${uid}`} as={`/volunteering/${uid}`}>
      <Button
        w={1}
        py={1}
        palette="brick"
        invert
        icon="chevron-right"
        iconSize={0}
        iconPosition="right"
      >
        More info
      </Button>
    </Link>
  </Border>
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
)

const renderSliceToAccordion = ({ slice_type, items, primary }, i) => {
  const title = primary.title && (
    <PrismicRichText mb={2} forceType="heading6" source={primary.title} />
  )
  const Component = sliceRenderers[slice_type] || Unknown
  return {
    title,
    description: (
      <Component primary={primary} items={items} slice_type={slice_type} />
    ),
  }
}

const Quotes = ({ data, items = [] }) => {
  const filled = items.map(({ quote: { id } }) =>
    data.results.find(r => r.id === id),
  )

  return (
    <Border borderColor="greyLighter" top left bottom right>
      <SlideShow controlSize={18} controlColor="#777" hideZoom hidePaging>
        {filled.map(({ data: { description, name, role } }, i) => (
          <Box py={2} px={3} key={i}>
            <PrismicRichText forceType="small" source={description} />
            <Box align="right" mt={2}>
              <PrismicRichText forceType="paragraph" source={name} />
            </Box>
          </Box>
        ))}
      </SlideShow>
    </Border>
  )
}

const Volunteering = ({ content, opportunities, additionalData }) => {
  const quotes = content.body.find(s => s.slice_type === "quotes")
  const accordionItems = content.body
    .filter(s => s.slice_type !== "quotes")
    .map(renderSliceToAccordion)

  return (
    <div>
      <Relative>
        <PageTitle content={content}>
          <Absolute bottom right p={3}>
            <ApplyNow />
          </Absolute>
        </PageTitle>
      </Relative>
      <Container pt={3}>
        <Flex wrap="wrap">
          <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
            <BreadCrumbs
              route={[
                { title: "Volunteering" },
                { title: "General Information" },
              ]}
            />
            <Section id="description" source={content.description} mb={3} />
            <Accordion items={accordionItems} />
          </Box>
          <Box w={[1, 1, 1, 1 / 3]} px={[0, 0, 0, 3]}>
            <SidebarHeader>Available Roles</SidebarHeader>
            {opportunities &&
              opportunities.results &&
              opportunities.results.map((props, i) => (
                <Opportunity key={i} {...props} />
              ))}
            {quotes && <Quotes items={quotes.items} data={additionalData} />}
          </Box>
        </Flex>
      </Container>
    </div>
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
    <div>
      <Relative>
        <PageTitle content={content}>
          <Absolute bottom right p={3}>
            <ApplyNow />
          </Absolute>
        </PageTitle>
      </Relative>
      <Container py={4}>
        <Flex>
          <Box w={[1, 1, 1, 2 / 3]} pr={3}>
            <BreadCrumbs
              route={[
                { title: "Volunteering", href: "/volunteering" },
                {
                  title: (
                    <PrismicRichText
                      forceType="unformatted"
                      source={content.title}
                    />
                  ),
                },
              ]}
            />
            <Section
              id="about"
              title="About the Programme"
              source={content.description}
            />
            {mainSlices}
          </Box>
          <Box w={[1, 1, 1, 1 / 3]} px={2}>
            {locations.results &&
              locations.results.length > 0 && (
                <SidebarHeader>Available Locations</SidebarHeader>
              )}
            {locations.results.map((props, i) => (
              <Location key={i} {...props} />
            ))}
            {sidebarSlices}
          </Box>
        </Flex>
      </Container>
    </div>
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

export default withLayout(Page)

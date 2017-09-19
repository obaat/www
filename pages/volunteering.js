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
import Icon from "../components/Icon"
import Accordion, { AccordionSection } from "../components/Accordion"
import SidebarHeader from "../components/SidebarHeader"
import {
  Absolute,
  Relative,
  Arrow,
  BackgroundImage,
  Flex,
  Box,
  Border,
  ButtonOutline,
  Panel,
  PanelHeader,
  Heading,
  Text,
  H3,
} from "../ui"
import get from "lodash/get"
import { withProps } from "recompose"
// import Error from "next/error"

const Bread = g(Box)({})

const Crumb = g.span({
  whiteSpace: "nowrap",
  color: "#aaa",
  display: "inline-block",
})

const BreadCrumbs = ({ route }) => (
  <Bread mb={1}>
    {route.map(({ title, href }, i) => (
      <span key={i}>
        <Crumb pr={1}>{title} </Crumb>
        {(route.length === 1 || route.length - 1 > i) && (
            <Icon pl={1} f={0} color="#000" name="angle-double-right" />
          )}{" "}
        {route.length === 1 && <Crumb pr={1}>/</Crumb>}
      </span>
    ))}
  </Bread>
)

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
      {title && <Heading>{title}</Heading>}
      <PrismicRichText {...props} />
    </div>
  )

const Opportunity = ({ uid, data }) => (
  <Relative mb={2}>
    <BackgroundImage
      bg="#000"
      color="#fff"
      ratio={1 / 2}
      src={get(data, "header_image.url")}
    >
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
        <Link href={`/volunteering/?id=${uid}`} as={`/volunteering/${uid}`}>
          <Button
            palette="normal"
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

const renderers = {
  text_only: ({ primary, items }) =>
    primary.description && <PrismicRichText source={primary.description} />,
  faq: ({ items = [] }) => (
    <Box>
      {items.map(({ question, answer }, i) => (
        <Box key={i} w={1}>
          <PrismicRichText w={1} forceType="heading5" source={question} />
          <PrismicRichText w={1} forceType="paragraph" source={answer} mb={3} />
        </Box>
      ))}
    </Box>
  ),

  table: ({ items = [] }) => (
    <table width="100%">
      <tbody>
        {items.map(({ column_1, column_2 }, i) => (
          <tr key={i}>
            <td>
              <PrismicRichText source={column_1} />
            </td>
            <td>
              <PrismicRichText source={column_2} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

const renderPrismicSlice = ({ slice_type, items, primary }, i) => {
  const title = primary.title && (
    <PrismicRichText forceType="heading6" source={primary.title} />
  )
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
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

const VolunteeringOpportunity = ({ content, locations }) => {
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
                { title: "Volunteering" },
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
          </Box>
          <Box w={[1, 1, 1, 1 / 3]} px={2}>
            <SidebarHeader>Available Locations</SidebarHeader>
            {locations.results.map((props, i) => (
              <Location key={i} {...props} />
            ))}
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
    return {
      content: res.data,
      opportunities,
      meta: res,
    }
  }
}

export default withLayout(Page)

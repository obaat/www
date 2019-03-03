import React from "react"
import styled from "@emotion/styled"
import Button from "../../components/Button"
import Link from "../../components/Link"
import { withProps } from "recompose"
import ApplyNow from "../../components/ApplyNow"
import { getByUID, getByIDs, types } from "../../utils/api"

import { pageWithTitle } from "../../hoc/page"
import PrismicRichText from "../../components/PrismicRichText"
import SlideShow from "../../components/SlideShow"
import SidebarHeader from "../../components/SidebarHeader"
import PrismicSlice from "../../components/PrismicSlice"
import {
  Absolute,
  Relative,
  BackgroundImage,
  Flex,
  Box,
  ButtonOutline,
  Subhead,
} from "../../ui"

const Overlay = withProps({
  top: true,
  bottom: true,
  left: true,
  right: true,
  p: 2,
})(
  styled(Absolute)({
    pointerEvents: "none",
    background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5))",
  }),
)

const Section = ({ title, id, ...props }) =>
  props.source && (
    <div>
      <a id={id} />
      {title && <Subhead>{title}</Subhead>}
      <PrismicRichText {...props} />
    </div>
  )

const Location = ({ uid, data }) => (
  <Relative mb={2}>
    <SlideShow hidePaging controlSize={18}>
      {data.image_gallery.map(({ image }, i) => (
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
      <Link to={`/location/${uid}`}>
        <Button
          palette="black"
          color="#fff"
          bg="rgba(0,0,0,0.3)"
          invert
          icon="ArrowRight"
          iconSize={12}
          width={1}
          py={1}
          as={ButtonOutline}
        >
          More
        </Button>
      </Link>
    </Absolute>
  </Relative>
)

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
      <Box width={[1, 1, 1, 2 / 3]} pr={3}>
        <Section
          id="about"
          title="About the Programme"
          source={content.description}
        />
        {mainSlices}
      </Box>
      <Box width={[1, 1, 1, 1 / 3]} px={2} pt={2}>
        {locations.results && locations.results.length > 0 && (
          <SidebarHeader>Available Locations</SidebarHeader>
        )}
        {locations.results.map((props, i) => (
          <Location key={i} {...props} />
        ))}
        {sidebarSlices}
        <ApplyNow width={1} />
      </Box>
    </Flex>
  )
}

export const data = uid => async () => {
  const res = await getByUID(types.VOLUNTEERING)(uid)
  const locations = await getByIDs(res.data.locations.map(l => l.location.id))
  return {
    content: res.data,
    meta: res,
    locations,
  }
}

export default pageWithTitle({
  route: [{ title: "Volunteer With Us", href: "/volunteering" }],
  withApply: true,
})(VolunteeringOpportunity)

import React from "react"
import { pageWithTitle } from "../hoc/page"
import { HumanDate } from "../utils/date"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"

import SidebarHeader from "../components/SidebarHeader"
import PrismicRichText from "../components/PrismicRichText"
import PrismicSlice from "../components/PrismicSlice"
import SlideShow from "../components/SlideShow"
import {
  Absolute,
  Relative,
  Text,
  BackgroundImage,
  Flex,
  Box,
  Image,
} from "../ui"
import Map from "../components/GoogleMap"
import UILink from "../components/Link"

const Partner = ({ data: { title, description, logo, website }, uid }) => {
  const content = (
    <div>
      {logo && logo.url ? (
        <Image src={logo.url} />
      ) : (
        <PrismicRichText
          mb={0}
          pt={2}
          style={{ textAlign: "center" }}
          textAlign="center"
          align="center"
          justify="center"
          forceType="small"
          source={title}
        />
      )}
    </div>
  )

  return (
    <Box w={1 / 2} mb={3}>
      {website && website.url ? (
        <UILink target="_blank" to={website.url}>
          {content}
        </UILink>
      ) : (
        content
      )}
    </Box>
  )
}

const Project = ({ content = {}, partners }) => {
  const sections = content.body.map((props, i) => (
    <Box key={i} mb={2}>
      <PrismicSlice {...props} />
    </Box>
  ))
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pl={3}>
        {content.date_completed && (
          <Box mb={2}>
            <SidebarHeader>
              Completed <HumanDate iso={content.date_completed} />
            </SidebarHeader>
          </Box>
        )}
        {content.location &&
          content.location.latitude && (
            <Box mb={2}>
              <SidebarHeader>Location</SidebarHeader>
              <Map center={content.location} zoom={9} />
            </Box>
          )}
        {partners &&
          partners.length > 0 && (
            <div>
              <SidebarHeader>Partners</SidebarHeader>
              <Flex wrap="wrap">
                {partners.map((props, i) => (
                  <Partner {...props} uid={i} key={i} />
                ))}
              </Flex>
            </div>
          )}
        {sections}
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const res = await getByUID(types.PROJECT)(uid)
  const partners = await getByIDs(res.data.partners.map(l => l.partner.id))
  return {
    content: res.data,
    partners: partners.results,
    project: true,
  }
}

export default pageWithTitle({
  route: [{ title: "Projects", href: "/projects" }],
})(Project)

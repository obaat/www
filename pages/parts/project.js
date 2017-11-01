import React, { Component } from "react"
import { pageWithTitle } from "../../hoc/page"
import { HumanDate } from "../../utils/date"
import isFuture from "date-fns/is_future"
import { Element, scroller } from "react-scroll"
import { Apply, data as applyData } from "../apply"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../../utils/api"

import SidebarHeader from "../../components/SidebarHeader"
import PrismicRichText from "../../components/PrismicRichText"
import PrismicSlice from "../../components/PrismicSlice"
import SlideShow from "../../components/SlideShow"
import {
  FlagFinish,
  Rocket,
  SymbolPound,
  QuestionInBubble,
} from "../../components/SvgIcons"
import {
  Absolute,
  Relative,
  Text,
  BackgroundImage,
  Flex,
  Box,
  Image,
  Button,
} from "../../ui"
import Map from "../../components/GoogleMap"
import UILink from "../../components/Link"

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

const Project = class Project extends Component {
  render() {
    const { content = {}, partners, applyData } = this.props
    const plannedOrCurrent = isFuture(content.date_completed)
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
          {!plannedOrCurrent &&
            content.date_completed && (
              <Box mb={2}>
                <SidebarHeader>
                  Completed <HumanDate iso={content.date_completed} />
                </SidebarHeader>
              </Box>
            )}
          {plannedOrCurrent && (
            <Box>
              <Flex wrap="wrap" mb={2}>
                <Box w={35}>
                  <Rocket size={24} palette="brick" />
                </Box>
                <Box bold={500}>
                  <HumanDate iso={content.date_start} />
                </Box>
              </Flex>
              <Flex wrap="wrap" mb={2}>
                <Box w={35}>
                  <FlagFinish size={24} palette="brick" />
                </Box>
                <Box bold={500}>
                  <HumanDate iso={content.date_completed} />
                </Box>
              </Flex>
              <Flex wrap="wrap" mb={2}>
                <Box w={35}>
                  <SymbolPound size={24} palette="brick" />
                </Box>
                <Box>
                  <Flex align="center">
                    <Box bold={500}>Starting from £{content.price}</Box>
                    <Box pl={1}>
                      <UILink to="#Costs">
                        <QuestionInBubble size={20} palette="black" />
                      </UILink>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
              <Box w={1} pb={2}>
                <Button
                  w={1}
                  palette="brick"
                  invert
                  onClick={() =>
                    scroller.scrollTo("apply", {
                      duration: 500,
                      smooth: true,
                      offset: -70,
                    })}
                >
                  More Information & Apply
                </Button>
              </Box>
            </Box>
          )}
          {sections}
          {!plannedOrCurrent &&
            content.location &&
            content.location.latitude && (
              <Box mb={2}>
                <SidebarHeader>Location</SidebarHeader>
                <Map center={content.location} zoom={9} />
              </Box>
            )}
          {!plannedOrCurrent &&
            partners &&
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
        </Box>
        {plannedOrCurrent && (
          <Element name="apply">
            <Box w={1}>
              <Apply {...applyData} />
            </Box>
          </Element>
        )}
      </Flex>
    )
  }
}

export const data = uid => async () => {
  const res = await getByUID(types.PROJECT)(uid)
  const partners = await getByIDs(res.data.partners.map(l => l.partner.id))
  const apply = await applyData()
  return {
    content: res.data,
    partners: partners.results,
    project: true,
    applyData: apply,
  }
}

export default pageWithTitle({
  route: [{ title: "Projects", href: "/projects" }],
})(Project)

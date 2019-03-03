import React, { Component } from "react"
import { pageWithTitle } from "../../hoc/page"
import { HumanDate, FullHumanDate } from "../../utils/date"
import isFuture from "date-fns/is_future"
import { Element, scroller } from "react-scroll"
import { Apply, data as applyData } from "../apply"
import compact from "lodash/compact"
import { getByUID, getByIDs, types } from "../../utils/api"

import SidebarHeader from "../../components/SidebarHeader"
import PrismicRichText from "../../components/PrismicRichText"
import PrismicSlice from "../../components/PrismicSlice"
import {
  FlagFinish,
  Rocket,
  SymbolPound,
  QuestionInBubble,
} from "../../components/SvgIcons"
import { Subhead, Flex, Box, Image, Button } from "../../ui"
import Map from "../../components/GoogleMap"
import Link from "../../components/Link"

const HeadlinePartner = ({ data: { title, description, logo } }) => (
  <Flex width={1} mb={2}>
    {logo && logo.url && (
      <Box width={1 / 3} pr={3}>
        <Image src={logo.url} />
      </Box>
    )}
    <Box width={2 / 3}>
      <PrismicRichText
        mb={0}
        pt={2}
        Component={Subhead}
        source={title}
        xmb={0}
      />
      <PrismicRichText mb={0} pt={2} source={description} />
    </Box>
  </Flex>
)

const Partner = ({ data: { title, logo, website }, uid }) => {
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
    <Box width={1 / 2} mb={3} key={uid}>
      {website && website.url ? (
        <Link target="_blank" to={website.url}>
          {content}
        </Link>
      ) : (
        content
      )}
    </Box>
  )
}

const toSection = (props, i) => (
  <Box key={i} mb={2}>
    <PrismicSlice {...props} />
  </Box>
)

const toNav = ({ items }) => (
  <Box>
    {items.map(({ title, date }, i) => (
      <Box key={i}>
        <PrismicRichText
          style={{ textDecoration: "underline" }}
          onClick={() =>
            scroller.scrollTo(title[0].text, {
              duration: 500,
              smooth: true,
              offset: -70,
            })
          }
          source={title}
          forceType="paragraph"
          xmb={0}
        />
        <FullHumanDate iso={date} />
      </Box>
    ))}
  </Box>
)
const Project = class Project extends Component {
  render() {
    const { content = {}, partners, applyData } = this.props
    const plannedOrCurrent = isFuture(content.date_completed)
    const planned = isFuture(content.date_started)
    const diarySections = content.body.filter(
      ({ slice_type }) => slice_type === "diary",
    )
    const diaryNav = diarySections.map(toNav)
    const mainSections = diarySections.map(toSection)
    const sideSections = content.body
      .filter(({ slice_type }) => slice_type !== "diary")
      .map(toSection)
    return (
      <Flex wrap="wrap">
        <Box width={[1, 1, 1, 2 / 3]}>
          {plannedOrCurrent && partners && partners.length > 0 && (
            <Box width={1}>
              {partners.map((props, i) => (
                <HeadlinePartner {...props} uid={i} key={i} />
              ))}
            </Box>
          )}
          <PrismicRichText source={content.description} />
          {mainSections}
        </Box>
        <Box width={[1, 1, 1, 1 / 3]} pl={3}>
          {!plannedOrCurrent && content.date_completed && (
            <Box mb={2}>
              <SidebarHeader>
                Completed <HumanDate iso={content.date_completed} />
              </SidebarHeader>
            </Box>
          )}
          {plannedOrCurrent && (
            <Box>
              <Flex wrap="wrap" mb={2}>
                <Box width={35}>
                  <Rocket size={24} palette="brick" />
                </Box>
                <Box bold={500}>
                  <HumanDate iso={content.date_start} />
                </Box>
              </Flex>
              <Flex wrap="wrap">
                <Box width={35} />
                <Box>{diaryNav}</Box>
              </Flex>
              <Flex wrap="wrap" mt={2} mb={2}>
                <Box width={35}>
                  <FlagFinish size={24} palette="brick" />
                </Box>
                <Box bold={500}>
                  <HumanDate iso={content.date_completed} />
                </Box>
              </Flex>
              {planned && (
                <Flex wrap="wrap" mb={2}>
                  <Box width={35}>
                    <SymbolPound size={24} palette="brick" />
                  </Box>
                  <Box>
                    <Flex align="center">
                      <Box bold={500}>Starting from £{content.price}</Box>
                      <Box pl={1}>
                        <Link to="#Costs">
                          <QuestionInBubble size={20} palette="black" />
                        </Link>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              )}
              <Box width={1} pb={2}>
                <Button
                  width={1}
                  palette="brick"
                  invert
                  onClick={() =>
                    scroller.scrollTo("apply", {
                      duration: 500,
                      smooth: true,
                      offset: -70,
                    })
                  }
                >
                  More Information & Apply
                </Button>
              </Box>
            </Box>
          )}
          {sideSections}
          {!plannedOrCurrent && content.location && content.location.latitude && (
            <Box mb={2}>
              <SidebarHeader>Location</SidebarHeader>
              <Map center={content.location} zoom={9} />
            </Box>
          )}
          {!plannedOrCurrent && partners && partners.length > 0 && (
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
            <Box width={1}>
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
  const partnerIds = compact(res.data.partners.map(l => l.partner.id))
  const partners = await getByIDs(partnerIds)
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

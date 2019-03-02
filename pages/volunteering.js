import React from "react"
import ApplyNow from "../components/ApplyNow"
import Link from "../components/Link"
import { withRouteData } from "react-static"
import { Switch } from "react-router"
import get from "lodash/get"
import VolunteeringOpp, {
  data as oppData,
} from "./parts/volunteering_opportunity"
import { ArrowRight } from "../components/SvgIcons"
import { getByIDs, getSingleton, getByType, types } from "../utils/api"

import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import Accordion from "../components/Accordion"
import SidebarHeader from "../components/SidebarHeader"
import Quotes from "../components/SidebarQuote"
import { renderers as sliceRenderers } from "../components/PrismicSlice"
import { Absolute, Flex, Box, Subhead, H6 } from "../ui"

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
    <Link to={`/volunteering/${uid}`}>
      <Flex inline align="center">
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
  const id = get(primary, "title[0].text", `s-${i}`)
  return {
    id,
    title,
    description: (
      <Component primary={primary} items={items} slice_type={slice_type} />
    ),
  }
}

const Volunteering = ({ content, volunteering, additionalData }) => {
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
          initialOpen={accordionItems[accordionItems.length - 1].id}
        />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} px={[0, 0, 0, 3]}>
        <SidebarHeader>Available Placements</SidebarHeader>
        {volunteering.map((props, i) => (
          <Opportunity key={i} {...props} />
        ))}
        <H6 mt={2}>Volunteer Experiences</H6>
        {quotes && <Quotes items={quotes.items} data={additionalData} />}
        <ApplyNow w={1} />
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const res = await getSingleton(types.VOLUNTEERING_PAGE_CONTENT)
  const volunteering = await getByType(types.VOLUNTEERING)
  const quotes = res.data.body.find(s => s.slice_type === "quotes")
  const ids = (quotes && quotes.items.map(l => l.quote.id)) || []
  const additionalData = ids.length ? await getByIDs(ids) : { results: [] }
  return {
    volunteering: volunteering.results,
    content: res.data,
    additionalData,
  }
}

export const children = async () => {
  const volunteering = await getByType(types.VOLUNTEERING)
  return volunteering.results.map(({ uid }) => ({
    path: "/" + uid,
    getData: oppData(uid),
  }))
}

const _Volunteering = pageWithTitle({
  withApply: true,
})(Volunteering)

export default _Volunteering

const vWithProps = withRouteData(_Volunteering)
const opWithProps = withRouteData(VolunteeringOpp)

export const routes = ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={vWithProps} />
    <Route path={`${match.url}/:uid`} component={opWithProps} />
  </Switch>
)

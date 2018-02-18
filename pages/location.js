import React from "react"
import { getByUID, getByType, types } from "../utils/api"
import { Switch, Route, Link, withRouteData } from "react-static"
import ApplyNow from "../components/ApplyNow"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import { Flex, Box, BackgroundImage, Heading } from "../ui"

const Location = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 1 / 2]}>
        <SlideShow autoplay controlSize={24}>
          {content.image_gallery.map(({ image, description }, i) => (
            <BackgroundImage src={image.url} key={i} />
          ))}
        </SlideShow>
      </Box>
      <Box w={[1, 1, 1, 1 / 2]} pl={[0, 0, 0, 3]}>
        <PrismicRichText source={content.description} />
      </Box>
    </Flex>
  )
}
const _Location = pageWithTitle({ withApply: true })(Location)
export default _Location

export const data = uid => async () => {
  const location = await getByUID(types.VOLUNTEERING_OPPORTUNITY_LOCATION)(uid)
  return { content: location.data }
}

export const children = async (...args) => {
  const events = await getByType(types.VOLUNTEERING_OPPORTUNITY_LOCATION)
  const pages = events.results.map(({ uid }) => ({
    path: "/" + uid,
    getProps: data(uid),
  }))
  return pages
}

const locationWithProps = withRouteData(_Location)
export const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:uid`} component={locationWithProps} />
  </Switch>
)

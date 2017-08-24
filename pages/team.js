import React from "react"
import g from "glamorous"
import Helmet from "react-helmet"
import { getByType, getSingleton, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import { Flex, Box, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import get from "lodash/get"

const TeamMember = ({ uid, data: { name, image, description } }) =>
  <div>
    <a id={uid} />
    <Flex>
      <Box w={1 / 4} mb={3}>
        <BackgroundImage ratio={4 / 3} src={image.url} />
      </Box>
      <Box w={3 / 4} pl={3}>
        <PrismicRichText forceType="heading2" source={name} />
        <PrismicRichText source={description} />
      </Box>
    </Flex>
  </div>

const Team = ({ team = [], content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText color="#fff" source={content.description} />
        {team.map((props, i) => <TeamMember {...props} key={i} />)}
      </Container>
    </div>
  )
}

Team.getInitialProps = async () => {
  const team = await getByType(types.TEAM_MEMBERS)
  const page = await getSingleton(types.TEAM_PAGE_CONTENT)
  return { team: team.results, content: page.data }
}

export default withLayout(Team)

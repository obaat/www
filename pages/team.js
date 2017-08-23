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

const TeamMember = ({ data: { name, image, description } }) =>
  <div>
    <Flex>
      <Box w={1}>
        <PrismicRichText source={name} />
      </Box>
    </Flex>
    <Flex>
      <Box w={1 / 3}>
        <SlideShow>
          {image && image.url && <BackgroundImage src={image.url} />}
        </SlideShow>
      </Box>
      <Box w={2 / 3} pl={3}>
        <PrismicRichText source={description} />
      </Box>
    </Flex>
  </div>

const Team = ({ team = [], content = {} }) => {
  const image = get(content, ["header_image", "url"])
  return (
    <div>
      <Helmet title={content.title && content.title[0].text} />
      <PageTitle image={image}>
        <PrismicRichText color="#fff" fontSize={7} source={content.title} />
      </PageTitle>
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
  console.log(page)
  return { team: team.results, content: page.data }
}

export default withLayout(Team)

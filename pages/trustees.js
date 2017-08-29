import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const TeamMember = ({ uid, odd, data: { name, image, description } }) =>
  <div>
    <a id={uid} />
    <Flex>
      <Box w={1 / 5} mb={3} order={odd ? 2 : 1}>
        <BackgroundImage ratio={4 / 3} src={image.url} bg="#aaa" />
      </Box>
      <Box
        w={4 / 5}
        pl={odd ? 0 : 3}
        pr={odd ? 3 : 0}
        order={odd ? 1 : 2}
        style={{ textAlign: odd ? "right" : "left" }}
      >
        <Border bottom mb={2} borderColor="#aaa">
          <PrismicRichText forceType="heading2" source={name} />
        </Border>
        <PrismicRichText source={description} />
      </Box>
    </Flex>
  </div>

const Trustees = ({ members = [], content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText color="#fff" source={content.description} />
        {members.map((props, i) =>
          <TeamMember {...props} key={props.uid} odd={!!(i % 2)} />,
        )}
      </Container>
    </div>
  )
}

Trustees.getInitialProps = async () => {
  const page = await getSingleton(types.TRUSTEES_PAGE_CONTENT)
  const members = await getByIDs(page.data.trustees.map(l => l.trustee.id))
  return { members: members.results, content: page.data }
}

export default withLayout(Trustees)

import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

export const TeamMember = ({
  uid,
  odd,
  data: { name, job_title, image, description },
}) => (
  <div>
    <a id={uid} />
    <Flex wrap="wrap" mb={3}>
      <Box w={[1, 1, 1 / 5]} mb={3} order={odd ? 2 : 1}>
        <BackgroundImage ratio={4 / 3} src={image.url} bg="#aaa" />
      </Box>
      <Box
        w={[1, 1, 4 / 5]}
        pl={[0, 0, 0, odd ? 0 : 3]}
        pr={[0, 0, 0, odd ? 3 : 0]}
        order={[0, 0, 0, odd ? 1 : 2]}
        style={{ textAlign: odd ? "right" : "left" }}
      >
        <Border bottom mb={1} pb={2} borderColor="grey">
          <PrismicRichText mb={0} forceType="heading2" source={name} />
          <PrismicRichText mb={0} forceType="paragraph" source={job_title} />
        </Border>
        <PrismicRichText
          mt={1}
          style={{ textAlign: "justify" }}
          source={description}
        />
      </Box>
    </Flex>
  </div>
)

const Team = ({ members = [], content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText color="#fff" source={content.description} />
        {members.map((props, i) => (
          <TeamMember {...props} key={props.uid} odd={!!(i % 2)} />
        ))}
      </Container>
    </div>
  )
}

Team.getInitialProps = async () => {
  const page = await getSingleton(types.TEAM_PAGE_CONTENT)
  const members = await getByIDs(page.data.team_members.map(l => l.member.id))
  return { members: members.results, content: page.data }
}

export default withLayout(Team)

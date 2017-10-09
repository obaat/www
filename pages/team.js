import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"

export const TeamMember = ({
  uid,
  odd,
  data: { name, job_title, image, description },
}) => (
  <div>
    <a id={uid} />
    <Flex wrap="wrap" mb={1} style={{ textAlign: odd ? "right" : "left" }}>
      <Border w={1} bottom mb={1} pb={2} borderColor="gray6">
        <PrismicRichText xmb={0} forceType="heading6" source={name} />
        <PrismicRichText xmb={0} forceType="paragraph" source={job_title} />
      </Border>
      <Box w={1}>
        <Box
          mt={1}
          mr={odd ? 0 : 2}
          ml={odd ? 2 : 0}
          mb={2}
          w={150}
          style={{ float: odd ? "right" : "left" }}
        >
          <BackgroundImage ratio={4 / 3} src={image.url} bg="#aaa" />
        </Box>
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
      <PrismicRichText color="#fff" source={content.description} />
      {members.map((props, i) => (
        <TeamMember {...props} key={props.uid} odd={!!(i % 2)} />
      ))}
    </div>
  )
}

export const data = async () => {
  const page = await getSingleton(types.TEAM_PAGE_CONTENT)
  const members = await getByIDs(page.data.team_members.map(l => l.member.id))
  return { members: members.results, content: page.data }
}

export default pageWithTitle()(Team)

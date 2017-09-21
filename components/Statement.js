import React from "react"
import PrismicRichText from "../components/PrismicRichText"
import Container from "../components/Container"
import Icon from "../components/Icon"
import { Flex, Box, Avatar } from "../ui"

const Statement = ({ data: { description, avatar, name, role } }) => (
  <Container maxWidth="600px" py={0}>
    <Flex align="flex-start">
      <Box>
        <Icon f={50} name="quote-left" />
      </Box>
      <Box p={3} align="justify">
        <PrismicRichText forceType="paragraph" source={description} />
        <Flex>
          <Box>
            {avatar && avatar.url && <Avatar size={70} src={avatar.url} />}
          </Box>
          <Box w={1} align="right">
            <PrismicRichText forceType="heading4" source={name} />
            <PrismicRichText forceType="paragraph" source={role} />
          </Box>
        </Flex>
      </Box>
      <Box alignSelf="flex-end">
        <Icon f={50} name="quote-right" />
      </Box>
    </Flex>
  </Container>
)

export default Statement

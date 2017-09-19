import React from "react"
import PrismicRichText from "../components/PrismicRichText"
import Container from "../components/Container"
import Icon from "../components/Icon"
import { Flex, Box } from "../ui"

const Statement = ({ data: { description, name, role } }) => (
  <Container maxWidth="600px">
    <Flex align="flex-start">
      <Box>
        <Icon f={50} name="quote-left" />
      </Box>
      <Box p={3} align="justify">
        <PrismicRichText forceType="paragraph" source={description} />
        <Box align="right">
          <PrismicRichText forceType="heading4" source={name} />
          <PrismicRichText forceType="paragraph" source={role} />
        </Box>
      </Box>
      <Box alignSelf="flex-end">
        <Icon f={50} name="quote-right" />
      </Box>
    </Flex>
  </Container>
)

export default Statement

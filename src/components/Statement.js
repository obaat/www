import React from "react"
import PrismicRichText from "../components/PrismicRichText"
import Container from "../components/Container"
import { QuoteOpen } from "../components/SvgIcons"
import { Flex, Box, Avatar } from "../ui"

const Statement = ({ w, data: { description, avatar, name } }) => (
  <Container maxWidth="600px" py={0} width={w}>
    <Flex align="flex-start">
      <Box p={3} align="justify">
        <Flex align="center" mb={2}>
          {avatar && avatar.url && (
            <Box width={100}>
              <Avatar size={70} src={avatar.url} />
            </Box>
          )}
          <Box align="right">
            <PrismicRichText forceType="heading4" xmb={1} source={name} />
          </Box>
        </Flex>
        <Box p={2} style={{ float: "left" }}>
          <QuoteOpen palette="gray2" invert size={32} />
        </Box>
        <PrismicRichText forceType="paragraph" source={description} />
      </Box>
    </Flex>
  </Container>
)

export default Statement

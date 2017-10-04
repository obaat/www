import React from "react"
import PrismicRichText from "../components/PrismicRichText"
import Container from "../components/Container"
import { QuoteOpen, QuoteClose } from "../components/SvgIcons"
import { Flex, Box, Avatar } from "../ui"

const Statement = ({ w, data: { description, avatar, name, role } }) => (
  <Container maxWidth="600px" py={0} w={w}>
    <Flex align="flex-start">
      <Box>
        <QuoteOpen palette="gray2" invert size={32} />
      </Box>
      <Box p={3} align="justify">
        <Flex align="center">
          {avatar &&
            avatar.url && (
              <Box w={100}>
                <Avatar size={70} src={avatar.url} />
              </Box>
            )}
          <Box align="right">
            <PrismicRichText forceType="heading4" xmb={1} source={name} />
          </Box>
        </Flex>
        <PrismicRichText forceType="paragraph" source={description} />
        <Box align="right">
          <PrismicRichText forceType="small" source={role} />
        </Box>
      </Box>
      <Box alignSelf="flex-end">
        <QuoteClose palette="gray2" invert size={32} />
      </Box>
    </Flex>
  </Container>
)

export default Statement

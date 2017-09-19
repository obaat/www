import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Contact = ({ content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <Flex wrap="wrap">
          <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
            <iframe
              width="100%"
              height="1100px"
              src="//timecounts.org/embed/form/one-brick-at-a-time/8529.iframe"
            />
          </Box>
          <Box w={[1, 1, 1, 1 / 3]} pr={[0, 0, 0, 3]}>
            <PrismicRichText source={content.description} />
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

Contact.getInitialProps = async () => {
  const page = await getSingleton(types.CONTACT_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Contact)

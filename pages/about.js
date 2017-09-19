import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const About = ({ content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container>
        <Flex wrap="wrap">
          <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
            <PrismicRichText source={content.description} />
          </Box>
          <Box w={[1, 1, 1, 1 / 3]} pr={[0, 0, 0, 3]}>
            <SidebarHeader>Related Information</SidebarHeader>
            <Box>
              <Link href="/trustees">
                <a>Trustees</a>
              </Link>
            </Box>
            <Box>
              <Link href="/volunteering">
                <a>Volunteer With Us</a>
              </Link>
            </Box>
            <Box>
              <Link href="/contact">
                <a>Contact Us</a>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

About.getInitialProps = async () => {
  const page = await getSingleton(types.ABOUT_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(About)

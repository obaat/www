import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const About = ({ content = {} }) => {
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pr={[0, 0, 0, 3]}>
        <SidebarHeader>Related Information</SidebarHeader>
        <Box>
          <Link href="/trustees">Trustees</Link>
        </Box>
        <Box>
          <Link href="/volunteering">Volunteer With Us</Link>
        </Box>
        <Box>
          <Link href="/projects?status=complete">Completed Projects</Link>
        </Box>
        <Box>
          <Link href="/contact">Contact Us</Link>
        </Box>
      </Box>
    </Flex>
  )
}

About.getInitialProps = async () => {
  const page = await getSingleton(types.ABOUT_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(About)

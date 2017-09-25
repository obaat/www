import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Embed, Box, Border, BackgroundImage } from "../ui"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const src = {
  __html: `
            <script
              src="//timecounts.org/embed/form/one-brick-at-a-time/8486.js"
              class="timecounts-form-embed-one-brick-at-a-time-8486"
            ></script>
            `,
}

const Apply = ({ content = {} }) => {
  const location = ""
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
        <PrismicRichText source={content.description} />
        <iframe
          width="640px"
          height="1400px"
          src="//timecounts.org/embed/form/one-brick-at-a-time/8486.iframe"
        />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pr={[0, 0, 0, 3]}>
        <SidebarHeader>Related Information</SidebarHeader>
        <Box>
          <Link href="/volunteering">Volunteer Information</Link>
        </Box>
        <Box>
          <Link href="/contact">Contact Us</Link>
        </Box>
      </Box>
    </Flex>
  )
}

Apply.getInitialProps = async () => {
  const page = await getSingleton(types.APPLY_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(Apply)

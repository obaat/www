import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Embed, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

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
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText source={content.description} />
        <Flex>
          <Box w={1} pl={3} dangerouslySetInnerHTML={src} />
        </Flex>
      </Container>
    </div>
  )
}

Apply.getInitialProps = async () => {
  const page = await getSingleton(types.APPLY_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Apply)

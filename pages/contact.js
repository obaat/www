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
        <PrismicRichText source={content.description} />
      </Container>
    </div>
  )
}

Contact.getInitialProps = async () => {
  const page = await getSingleton(types.CONTACT_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Contact)

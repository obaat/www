import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Financials = ({ members = [], content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText color="#fff" source={content.description} />
      </Container>
    </div>
  )
}

Financials.getInitialProps = async () => {
  const page = await getSingleton(types.FINANCIALS_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Financials)

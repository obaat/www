import React from "react"
import { getSingleton, types } from "../utils/api"
import page from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
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

export default page(Financials)

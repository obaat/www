import React from "react"
import { getSingleton, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Resources = ({ members = [], content = {} }) => {
  return <PrismicRichText color="#fff" source={content.description} />
}

Resources.getInitialProps = async () => {
  const page = await getSingleton(types.FINANCIALS_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(Resources)

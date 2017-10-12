import React from "react"
import { getSingleton, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import PrismicSlice from "../components/PrismicSlice"

const Resources = ({ members = [], content = {} }) => {
  const body = content.body || []
  const slices = body.map((props, i) => <PrismicSlice key={i} {...props} />)
  return (
    <div>
      <PrismicRichText source={content.description} />
      {slices}
    </div>
  )
}

export const data = async () => {
  const page = await getSingleton(types.FINANCIALS_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(Resources)

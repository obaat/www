import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"

const Sponsor = ({ members = [], content = {} }) => {
  return <div>Coming Soon</div>
}

export default pageWithTitle({ title: "Sponsor" })(Sponsor)

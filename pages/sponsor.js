import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Sponsor = ({ members = [], content = {} }) => {
  return (
    <div>
      <PageTitle title="Sponsor" />
      <Container py={4}>Coming Soon</Container>
    </div>
  )
}

export default withLayout(Sponsor)

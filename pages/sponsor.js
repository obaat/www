import React from "react"
import page from "../hoc/page"
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

export default page(Sponsor)

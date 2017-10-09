import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import { TeamMember } from "./team"

const Trustees = ({ members = [], content = {} }) => {
  return (
    <div>
      <PrismicRichText color="#fff" source={content.description} />
      {members.map((props, i) => (
        <TeamMember {...props} key={props.uid} odd={!!(i % 2)} />
      ))}
    </div>
  )
}

export const data = async () => {
  const page = await getSingleton(types.TRUSTEES_PAGE_CONTENT)
  const members = await getByIDs(page.data.trustees.map(l => l.trustee.id))
  return { members: members.results, content: page.data }
}

export default pageWithTitle()(Trustees)

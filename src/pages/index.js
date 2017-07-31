import React from 'react'
import Link from 'gatsby-link'
import Lorem from 'react-lorem-component'
import { space, color, fontSize } from 'styled-system'
import { Button } from 'bloomer'
import g from 'glamorous'

const Banner = g.div(fontSize)

const Mission = g.p({
  fontStyle: "italic",
  textAlign: "center",
  maxWidth: "600px",
}, space)

const Panel = g.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flex:"0 0 100%",
  width: "100VW",
  height: "100VH",
}, color)

const ImagePanel = g(Panel)({
  backgroundImage: `url("http://placekitten.com/1024/768")`,
  backgroundSize: "cover",
  color: "#fff",
}, space)

const IndexPage = () => (
  <div>
    <ImagePanel px={4}>
      <Banner fontSize={8}>We Love Kittens</Banner>
      <Banner fontSize={5}>Do You?</Banner>
    </ImagePanel>
    <Panel>
      <Banner fontSize={8}>ONE BRICK AT A TIME</Banner>
      <Banner fontSize={5}>Skills Exchange and Building Schools in Uganda</Banner>
      <Mission my={4}>
        To ensure the long term viability of One Brick at a Time, as a social enterprise, to continue delivering locally identified construction initiatives that positively impact upon the education, health and well-being of the communities of the Rwenzori Region and beyond.
      </Mission>
      <Button isColor="info">Learn More</Button>
    </Panel>
    <Panel bg="blue">
    </Panel>
  </div>
)

export default IndexPage

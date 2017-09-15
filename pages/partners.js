import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, Image, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Partner = ({ title, description, logo, website, uid, odd }) => (
  <div>
    <a id={uid} />
    <Flex>
      <Box w={1 / 5} mb={3} order={odd ? 2 : 1}>
        <Image src={logo.url} />
      </Box>
      <Box
        w={4 / 5}
        pl={odd ? 0 : 3}
        pr={odd ? 3 : 0}
        order={odd ? 1 : 2}
        style={{ textAlign: odd ? "right" : "left" }}
      >
        <Border bottom mb={2} borderColor="#aaa">
          <PrismicRichText forceType="heading2" source={title} />
        </Border>
        <PrismicRichText source={description} />
      </Box>
    </Flex>
  </div>
)

const Partnerships = ({ content = {} }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        {content.partner &&
          content.partner.map((props, i) => (
            <Partner {...props} uid={i} key={i} odd={!!(i % 2)} />
          ))}
      </Container>
    </div>
  )
}

Partnerships.getInitialProps = async () => {
  const page = await getSingleton(types.PARTNERSHIPS_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Partnerships)

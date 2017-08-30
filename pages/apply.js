import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Embed, Box, Border, BackgroundImage } from "../ui"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"

const Apply = ({ content = {} }) => {
  const location = ""
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText source={content.description} />
        <Flex>
          <Box w={1} pl={3}>
            <Embed style={{ height: "1500px" }}>
              <iframe
                marginHeight="0"
                marginWidth="0"
                src={`https://docs.google.com/forms/d/e/1FAIpQLSdR_K85O1_3Pg7z4nzPGB37jiFwetJlSbBSrZraXVVlOIbpgQ/viewform?embedded=true&widget=false&chrome=false&entry.1260481247=${location}&entry.56285992&entry.895371665&entry.339691265&entry.2042927356&entry.700506932&entry.418736231&entry.1605466493&entry.924248410&entry.1256463636&entry.765744329&entry.307847870&entry.1874226761&entry.772398085&entry.1890537392&entry.1590100381&entry.1229356498&entry.495815691&entry.292593812&entry.811296524&entry.40506322&entry.728090202&entry.1309269413&entry.354021446&entry.1933107496&`}
                frameBorder="0"
                allowFullScreen
              />
            </Embed>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

Apply.getInitialProps = async () => {
  const page = await getSingleton(types.APPLY_PAGE_CONTENT)
  return { content: page.data }
}

export default withLayout(Apply)

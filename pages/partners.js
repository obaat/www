import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, Image } from "../ui"
import Link from "../components/Link"
import humanizeUrl from "humanize-url"

const Partner = ({ data: { title, description, logo, website }, uid, odd }) => (
  <div>
    <a id={uid} />
    <Flex>
      {logo && (
        <Box w={1 / 5} mb={3} order={odd ? 2 : 1}>
          <Image src={logo.url} />
        </Box>
      )}
      <Box
        w={4 / 5}
        pl={odd ? 0 : 3}
        pr={odd ? 3 : 0}
        order={odd ? 1 : 2}
        style={{ textAlign: odd ? "right" : "left" }}
      >
        <Border bottom mb={2} borderColor="gray4">
          <PrismicRichText mb={0} forceType="heading2" source={title} />
          {website && (
            <Link target="_blank" to={website.url}>
              {humanizeUrl(website.url)}
            </Link>
          )}
        </Border>
        <PrismicRichText source={description} />
      </Box>
    </Flex>
  </div>
)

const Partnerships = ({ partners = [] }) => {
  return (
    <div>
      {partners.map((props, i) => (
        <Partner {...props} uid={i} key={i} />
      ))}
    </div>
  )
}

export const data = async () => {
  const page = await getSingleton(types.PARTNERSHIPS_PAGE_CONTENT)
  const partners = await getByIDs(page.data.partners.map(l => l.partner.id))
  return { partners: partners.results, content: page.data }
}

export default pageWithTitle()(Partnerships)

import React from "react"
import SlideShow from "../components/SlideShow"
import PrismicRichText from "../components/PrismicRichText"
import { Flex, Box, Border, Avatar } from "../ui"

const SidebarQuote = ({ data, items = [] }) => {
  const filled = items.map(({ quote: { id } }) =>
    data.results.find(r => r.id === id),
  )

  return (
    <SlideShow
      controlSize={18}
      controlColor="#777"
      px={1}
      autoplaySpeed={6000}
      hideZoom
      hideArrows
      hidePaging
      autoplay
    >
      {filled.map(({ data: { avatar, description, name, role } }, i) => (
        <Flex key={i} py={2} px={1} wrap="wrap">
          <Border left borderWidth={3} borderColor="cyan5" px={2} w={1}>
            <PrismicRichText
              forceType="paragraph"
              xmb={0}
              source={description}
            />
          </Border>
          <Flex align="center" justify="flex-end" w={1} mt={2} mr={2}>
            <PrismicRichText
              bold={700}
              xmb={0}
              forceType="paragraph"
              source={name}
            />
            {avatar &&
              avatar.url && <Avatar ml={2} size={50} src={avatar.url} />}
          </Flex>
        </Flex>
      ))}
    </SlideShow>
  )
}
export default SidebarQuote

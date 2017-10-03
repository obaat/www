import React from "react"
import g from "glamorous"
import Link from "next/link"
import Map from "../components/GoogleMap"
import mapDark from "../components/mapDark.json"
import Social from "./Social"
import { Flex, Border, Box, H6, Text } from "../ui"

const w = [1, 1, 1, 1 / 3]

const social = [
  { url: "https://facebook.com/onebrickngo/", network: "facebook" },
  { url: "https://instagram.com/onebrickngo/", network: "instagram" },
  { url: "https://twitter.com/onebrickngo/", network: "twitter" },
  { url: "mailto:enquirires@onebrick.org.uk", network: "email" },
]

export default () => (
  <div>
    <Flex palette="gray9" wrap="wrap" invert>
      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <Text>Become part of our story</Text>
        <Social />
      </Box>

      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <Map
          zoom={12}
          center={{ lat: 0.670188, lng: 30.287467 }}
          height="200px"
        />
      </Box>

      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <address>
          OBAAT UK<br />
          Charity number 1155099<br />
          Liverpool Hope University Taggart Avenue<br />
          Liverpool<br />
          L16 9JD<br />
          England
        </address>
      </Box>
      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <address>
          OBAAT Uganda<br />
          NGO registration number 11726<br />
          Bankside Road<br />
          Njara-Mukasenyi P. O. BOX 349<br />
          Fort Portal<br />
          Uganda<br />
        </address>
      </Box>
    </Flex>
    <Flex bg="#000" color="#fff">
      <Border w={1} top borderColor="gray3" p={3}>
        <Box f={0}>Paper Creatures Custom</Box>
      </Border>
    </Flex>
  </div>
)

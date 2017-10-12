import React from "react"
import g from "glamorous"
import Map from "../components/GoogleMap"
import mapDark from "../components/mapDark.json"
import Social from "./Social"
import Link from "./Link"
import { Flex, Border, Box, H6, Text } from "../ui"
import { PaperCreatures } from "./SvgIcons"

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
        <address>
          OBAAT UK<br />
          Liverpool Hope University <br />
          Taggart Avenue<br />
          Liverpool<br />
          L16 9JD<br />
          England<br />
          Charity number 1155099<br />
        </address>
      </Box>
      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <address>
          OBAAT Uganda<br />
          Bankside Road<br />
          Njara-Mukasenyi<br />
          P. O. BOX 349, Fort Portal<br />
          Uganda<br />
          NGO registration number 11726<br />
        </address>
      </Box>
      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <Map
          zoom={12}
          center={{ lat: 0.670188, lng: 30.287467 }}
          height="200px"
        />
      </Box>
    </Flex>
    <Flex palette="gray9" invert>
      <Border w={1} top borderColor="gray6" px={3} pt={2} pb={0}>
        <Link url="http://papercreatures.com">
          <Box>
            <PaperCreatures viewBox="80 80 250 250" size={60} />
          </Box>
        </Link>
      </Border>
    </Flex>
  </div>
)

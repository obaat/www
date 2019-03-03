import React from "react"
import Map from "../components/GoogleMap"
import Social from "./Social"
import Link from "./Link"
import { Flex, Border, Box, Text } from "../ui"
import { PaperCreatures } from "./SvgIcons"

export default () => (
  <div>
    <Flex palette="gray9" wrap="wrap" invert>
      <Box width={[1, 1, 1, 1 / 4]} p={3}>
        <Text>Become part of our story</Text>
        <Social />
      </Box>

      <Box width={[1, 1, 1, 1 / 4]} p={3}>
        <address>
          OBAAT UK
          <br />
          Liverpool Hope University <br />
          Taggart Avenue
          <br />
          Liverpool, L16 9JD
          <br />
          United Kingdom
          <br />
          NGO number 1155099
          <br />
        </address>
      </Box>
      <Box width={[1, 1, 1, 1 / 4]} p={3}>
        <address>
          OBAAT Uganda
          <br />
          Bankside Road
          <br />
          Njara-Mukasenyi
          <br />
          P. O. BOX 349
          <br />
          Fort Portal, Uganda
          <br />
          NGO number 11726
          <br />
        </address>
      </Box>
      <Box width={[1, 1, 1, 1 / 4]} p={3}>
        <Map
          zoom={12}
          center={{ lat: 0.670188, lng: 30.287467 }}
          height="200px"
        />
      </Box>
    </Flex>
    <Flex palette="gray9" invert>
      <Border width={1} top borderColor="gray6" px={3} pt={2} pb={0}>
        <Link url="http://papercreatures.com">
          <Box>
            <PaperCreatures viewBox="80 80 250 250" size={60} />
          </Box>
        </Link>
      </Border>
    </Flex>
  </div>
)

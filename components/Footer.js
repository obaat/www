import React from "react"
import g from "glamorous"
import Link from "next/link"
import Social from "./Social"
import { Flex, Box, H6 } from "../ui"

const w = [1, 1, 1, 1 / 3]

const social = [
  { url: "https://facebook.com/onebrickngo/", network: "facebook" },
  { url: "https://instagram.com/onebrickngo/", network: "instagram" },
  { url: "https://twitter.com/onebrickngo/", network: "twitter" },
  { url: "mailto:enquirires@onebrick.org.uk", network: "email" },
]

export default () => (
  <div>
    <Flex palette="black" wrap="wrap" invert>
      <Box w={[1, 1, 1, 1 / 2]} p={3}>
        <H6>Become part of our story</H6>
        <Social />
      </Box>
      {/* <Box>
      <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/30.287619,0.670685,12/300x200?access_token=pk.eyJ1IjoicGFwZXJjcmVhdHVyZXMiLCJhIjoiY2o3ejF3bXllMXZzYzJ3bzR3eWprOHQyaCJ9.oiyWWuJWI-tXXBwY7U1cMw" />
    </Box> */}

      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <addr>
          OBAAT UK<br />
          Charity number 1155099<br />
          Liverpool Hope University Taggart Avenue<br />
          Liverpool<br />
          L16 9JD<br />
          England
        </addr>
      </Box>
      <Box w={[1, 1, 1, 1 / 4]} p={3}>
        <addr>
          OBAAT Uganda<br />
          NGO registration number 11726<br />
          Bankside Road<br />
          Njara-Mukasenyi P. O. BOX 349<br />
          Fort Portal<br />
          Uganda<br />
        </addr>
      </Box>
    </Flex>
    <Flex p={3} bg="#000" color="#fff">
      <Box f={0}>Paper Creatures Custom</Box>
    </Flex>
  </div>
)

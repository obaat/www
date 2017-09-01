import React from "react"
import g from "glamorous"
import Link from "next/link"
import { Flex, Box } from "../ui"
import Icon from "./Icon"

const Slink = ({ icon, href, children, ...props }) => (
  <a href={href} target="_blank">
    <Icon {...props} /> {children}
  </a>
)

export default () => (
  <Flex palette="brick" invert>
    <Box w={1 / 3} p={3}>
      <div>Become part of our story</div>
      <Slink
        color="#fff"
        f={"40px"}
        mr={1}
        name="facebook-official"
        href="https://facebook.com/onebrickngo/"
      />
      <Slink
        mr={1}
        f="40px"
        color="#fff"
        name="instagram"
        href="https://instagram.com/onebrickngo/"
      />
      <Slink
        mr={1}
        f="40px"
        color="#fff"
        name="twitter"
        href="https://twitter.com/onebrickngo/"
      />
      <Slink
        mr={1}
        f="40px"
        color="#fff"
        name="envelope"
        href="mailto:enquirires@onebrick.org.uk"
      />
    </Box>

    <Box w={1 / 3} p={3}>
      <addr>
        OBAAT UK<br />
        Charity number 1155099<br />
        Liverpool Hope University Taggart Avenue<br />
        Liverpool<br />
        L16 9JD<br />
        England
      </addr>
    </Box>
    <Box w={1 / 3} p={3}>
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
)

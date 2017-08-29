import React from "react"
import g from "glamorous"
import Link from "next/link"
import { Flex, Box } from "../ui"
import Icon from "./Icon"

const Slink = ({ icon, href, children }) =>
  <div>
    <a href={href}>
      <Icon name={icon} /> {children}
    </a>
  </div>

export default () =>
  <Flex>
    <Box w={1 / 2}>
      <Slink icon="facebook-official" href="https://facebook.com/onebrickngo/">
        facebook.com/onebrickngo
      </Slink>
      <Slink icon="instagram" href="https://instagram.com/onebrickngo/">
        instagram.com/onebrickngo
      </Slink>
      <Slink icon="envelope" href="mailto:enquirires@onebrick.org.uk">
        enquiries@onebrick.org.uk
      </Slink>
    </Box>

    <Box w={1 / 2}>
      <addr>
        OBAAT UK<br />
        Charity number 1155099<br />
        Liverpool Hope University Taggart Avenue<br />
        Liverpool<br />
        L16 9JD<br />
        England
      </addr>
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

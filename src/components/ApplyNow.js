import React from "react"
import Button from "../components/Button"
import { ButtonOutlineFilled } from "../ui"
import Link from "./Link"

export default ({ w }) => (
  <Link to="/apply">
    <Button
      bold
      invert
      icon="File"
      palette="cyan6"
      px={2}
      fontSize={1}
      iconSize={20}
      style={{ marginBottom: "-90px" }}
      as={ButtonOutlineFilled}
      w={w}
    >
      Apply Now
    </Button>
  </Link>
)

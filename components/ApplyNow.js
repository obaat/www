import React from "react"
import Button from "../components/Button"
import Link from "next/link"
import { ButtonOutlineFilled } from "../ui"

export default () => (
  <Link as="/apply" href="/apply">
    <Button
      bold
      invert
      icon="check"
      palette="brick"
      fontSize={1}
      iconSize={0}
      style={{ marginBottom: "-90px" }}
      as={ButtonOutlineFilled}
    >
      Apply Now
    </Button>
  </Link>
)

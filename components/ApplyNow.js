import React from "react"
import Button from "../components/Button"
import Link from "next/link"
import { ButtonOutlineFilled } from "../ui"

export default () => (
  <Link as="/apply" href="/apply" prefetch>
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
    >
      Apply Now
    </Button>
  </Link>
)

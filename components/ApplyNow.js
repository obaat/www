import React from "react"
import Button from "../components/Button"
import Link from "next/link"
import { ButtonCircleOutlineFilled } from "../ui"

export default () =>
  <Link as="/apply" href="/apply">
    <Button
      bold
      icon="mail-reply"
      palette="brick"
      invert
      style={{ marginBottom: "-80px" }}
      as={ButtonCircleOutlineFilled}
    >
      APPLY NOW
    </Button>
  </Link>

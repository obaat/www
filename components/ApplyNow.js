import React from "react"
import Button from "../components/Button"
import Link from "next/link"
import { ButtonCircleOutline } from "../ui"

export default () =>
  <Link as="/apply" href="/apply">
    <Button
      bold
      icon="mail-reply"
      palette="brick"
      invert
      style={{ marginBottom: "-80px" }}
      as={ButtonCircleOutline}
    >
      APPLY NOW
    </Button>
  </Link>

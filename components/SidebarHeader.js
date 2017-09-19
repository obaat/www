import React from "react"
import { Border, H6 } from "../ui"

const SidebarHeader = ({ children }) => (
  <Border bottom mb={2} borderColor="grey">
    <H6>{children}</H6>
  </Border>
)

export default SidebarHeader

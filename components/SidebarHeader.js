import React from "react"
import { Border, H6 } from "../ui"

const SidebarHeader = ({ children }) => (
  <Border bottom mb={2} pb={1} borderColor="#bbb">
    <H6>{children}</H6>
  </Border>
)

export default SidebarHeader

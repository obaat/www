import React from "react"
import { Border } from "../ui"

const SidebarHeader = ({ children }) => (
  <Border bottom mb={2} pb={1} borderColor="#bbb">
    {children}
  </Border>
)

export default SidebarHeader

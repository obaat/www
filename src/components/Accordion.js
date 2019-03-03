import React from "react"
import styled from "@emotion/styled"
import { withRouter } from "react-static"
import { ArrowDown as IconArrowDown, ArrowUp as IconArrowUp } from "./SvgIcons"
import { withProps } from "recompose"

import { Box, Panel } from "../ui"

const AccordionContainer = styled(Panel)({
  borderBottom: "1px solid #ccc",
  borderColor: "#fff",
})

const AccordionHeader = styled(Box)({})

const AccordionBody = styled(Box)({
  borderTop: "2px solid #fff",
})

const ArrowDown = styled(IconArrowDown)({
  float: "right",
  marginTop: "6px",
})

const ArrowUp = styled(IconArrowUp)({
  float: "right",
  marginTop: "6px",
})

const AccordionSection = ({ open, setOpen, title, id, description }) => {
  return (
    <AccordionContainer>
      <a name={id} />
      <AccordionHeader
        id={id}
        mb={-2}
        palette="gray1"
        invert
        p={2}
        onClick={setOpen}
      >
        {open ? (
          <ArrowUp size={15} palette="black" />
        ) : (
          <ArrowDown size={15} palette="black" />
        )}
        {title}
      </AccordionHeader>
      {open && (
        <AccordionBody p={2} palette="gray2" invert>
          {description}
        </AccordionBody>
      )}
    </AccordionContainer>
  )
}

const oneOpen = withProps(({ history, location, initialOpen }) => {
  return {
    setOpen: id => () => {
      if (location.hash === "#" + id) {
        history.replace({ hash: "" })
      } else {
        history.replace({ hash: id })
      }
    },
    openSection: location.hash.replace("#", "") || initialOpen,
  }
})

export default withRouter(
  oneOpen(({ items, openSection, setOpen }) => (
    <div>
      {items.map((props, i) => (
        <AccordionSection
          key={i}
          open={props.id === openSection}
          setOpen={setOpen(props.id)}
          {...props}
        />
      ))}
    </div>
  )),
)

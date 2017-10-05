import React from "react"
import { Formik, Form } from "formik"
import g from "glamorous"
import { getSingleton, getByType, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import range from "lodash/range"
import PrismicRichText from "../components/PrismicRichText"
import { Index } from "react-powerplug"
import { ArrowNextStage } from "../components/SvgIcons"
import Quotes from "../components/SidebarQuote"
import Accordion, { AccordionSection } from "../components/Accordion"
import months from "months"
import PrismicSlice, {
  renderers as sliceRenderers,
} from "../components/PrismicSlice"
import {
  Flex,
  Select as UISelect,
  Option,
  Box,
  Input,
  Textarea,
  Subhead,
  Label,
} from "../ui"
import Button from "../components/Button"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const submit = async (values, actions) => {
  const res = await fetch(
    "https://lv00fuasu7.execute-api.eu-west-1.amazonaws.com/development/volunteer_application",
    {
      method: "POST",
      body: JSON.stringify({
        content: values,
      }),
    },
  )
  const data = await res.json()
  actions.setSubmitting(false)
}

const Select = ({ options }) => (
  <UISelect>
    {options.map(o => (
      <Option key={o.value} value={o.value}>
        {o.value}
      </Option>
    ))}
  </UISelect>
)

const RangeDropdown = ({ start = 1, end, step = 1, ...props }) => (
  <Select
    {...props}
    options={range(start, end, step).map(i => ({ value: i }))}
  />
)

const AboutVolunteering = props => (
  <Form>
    <Label>Role you're interested in</Label>
    <Label>How long would you like to volunteer?</Label>
    <Flex>
      <Box w={1 / 2} mr={1}>
        <RangeDropdown end={12} name="period_integer" />
      </Box>
      <Box w={1 / 2} mr={1}>
        <Select
          options={[
            { value: "week(s)" },
            { value: "month(s)" },
            { value: "year(s)" },
          ]}
        />
      </Box>
    </Flex>
    <Label>When can you start?</Label>
    <Flex w={1}>
      <Box w={1 / 3} mr={1}>
        <RangeDropdown end={31} name="start_day" />
      </Box>
      <Box w={1 / 3} mr={1}>
        <Select
          options={months.abbr.map(value => ({ value }))}
          name="start_month"
        />
      </Box>
      <Box w={1 / 3}>
        <RangeDropdown
          start={new Date().getFullYear()}
          end={new Date().getFullYear() + 1}
          name="start_year"
        />
      </Box>
    </Flex>
  </Form>
)

const AboutYou = props => (
  <Form>
    <Label>E-mail</Label>
    <Input type="email" name="email" placeholder="volunteer@example.com" />
    <Flex>
      <Box w={1 / 2} mr={1}>
        <Label>First Name</Label>
        <Input name="firstName" placeholder="Jane" />
      </Box>
      <Box w={1 / 2}>
        <Label>Last Name</Label>
        <Input name="lastName" placeholder="Doe" />
      </Box>
    </Flex>
    <Flex>
      <Box w={1 / 2} mr={1}>
        <Label>Contact Telephone</Label>
        <Input type="tel" name="phone" placeholder="+44 0700 000000" />
      </Box>
      <Box w={1 / 2}>
        <Label>Date of Birth</Label>
        <Flex w={1}>
          <Box w={1 / 3} mr={1}>
            <RangeDropdown end={31} name="dob_day" />
          </Box>
          <Box w={1 / 3} mr={1}>
            <Select
              options={months.abbr.map(value => ({ value }))}
              name="start_month"
            />
          </Box>
          <Box w={1 / 3}>
            <RangeDropdown
              start={new Date().getFullYear()}
              end={1900}
              step={-1}
              name="dob_year"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Form>
)

const Done = props => (
  <Form>
    <Label>Role you're interested in</Label>
    <Label>How long would you like to volunteer?</Label>
  </Form>
)

const pages = [
  { title: "About You", Component: AboutYou },
  { title: "Your Trip", Component: AboutVolunteering },
  { title: "Done", Component: Done },
]

const WizardStep = ({ title, i, last, active, done, ...props }) => {
  const color = active ? "black" : `gray${i + 2}Invert`
  return (
    <Box
      px={3}
      py={1}
      palette={done ? "gray1Invert" : color}
      style={{ position: "relative" }}
      {...props}
    >
      {title}
      {!last && (
        <ArrowNextStage
          size={40}
          style={{
            position: "absolute",
            right: "-19px",
            top: "2px",
            zIndex: 99999,
          }}
          palette={done ? "gray1" : active ? "blackInvert" : `gray${i + 2}`}
        />
      )}
    </Box>
  )
}

const FormWizard = () => (
  <Formik
    initialValues={{ email: "", color: "red", firstName: "" }}
    onSubmit={submit}
    render={props => (
      <Index initial={0}>
        {({ index, setIndex }) => {
          const { Component } = pages[index]
          const next = () => setIndex(index + 1)
          return (
            <Box palette="gray1" invert p={2}>
              <Flex justify="center" align="center">
                {pages.map((page, i) => (
                  <WizardStep
                    key={i}
                    last={i === pages.length - 1}
                    onClick={() => index > i && setIndex(i)}
                    w={1 / pages.length}
                    i={i}
                    active={index === i}
                    done={index > i}
                    ml={i && 1}
                    {...page}
                  />
                ))}
              </Flex>
              <Box palette="black" p={2}>
                <Component />
              </Box>
              <Box mt={1} align="right">
                <Button
                  py={1}
                  palette="cyan6"
                  icon="ArrowRight"
                  iconPosition="right"
                  iconSize={12}
                  onClick={next}
                  invert
                >
                  Next
                </Button>
              </Box>
            </Box>
          )
        }}
      </Index>
    )}
  />
)

const renderSliceToAccordion = ({ slice_type, items, primary }, i) => {
  const title = primary.title && (
    <PrismicRichText forceType="paragraph" bold={300} source={primary.title} />
  )
  const Component = sliceRenderers[slice_type] || Unknown
  return {
    id: `s-${i}`,
    title,
    description: (
      <Component primary={primary} items={items} slice_type={slice_type} />
    ),
  }
}

const Apply = ({ content = {}, quotes, main = [], additionalData }) => {
  const accordionItems = main.map(renderSliceToAccordion)

  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 0.6]} pr={[0, 0, 0, 2]}>
        <PrismicRichText source={content.description} />
        <FormWizard />
      </Box>
      <Box w={[1, 1, 1, 0.4]}>
        <Accordion items={accordionItems} />
        {quotes && <Quotes items={quotes.items} data={additionalData} />}
      </Box>
    </Flex>
  )
}

Apply.getInitialProps = async () => {
  const page = await getSingleton(types.APPLY_PAGE_CONTENT)
  const opportunities = await getByType(types.VOLUNTEERING)
  const volunteering = await getSingleton(types.VOLUNTEERING_PAGE_CONTENT)
  const quotes = volunteering.data.body.find(s => s.slice_type === "quotes")
  const main = volunteering.data.body.filter(s => s.slice_type !== "quotes")
  const ids = (quotes && quotes.items.map(l => l.quote.id)) || []
  const additionalData = ids.length ? await getByIDs(ids) : { results: [] }
  return {
    content: page.data,
    quotes,
    main,
    additionalData,
    opportunities,
  }
}

export default pageWithTitle()(Apply)

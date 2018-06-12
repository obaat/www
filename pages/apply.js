import React from "react"
import { Formik, Form } from "formik"
import BlockUi from "react-block-ui"
import styled from "react-emotion"
import { getSingleton, getByType, getByIDs, types } from "../utils/api"
import get from "lodash/get"
import map from "lodash/map"
import mapKeys from "lodash/mapKeys"
import mapValues from "lodash/mapValues"
import filter from "lodash/filter"
import { pageWithTitle } from "../hoc/page"
import { string, object } from "yup"
import range from "lodash/range"
import snakeCase from "lodash/snakeCase"
import PrismicRichText from "../components/PrismicRichText"
import { Counter } from "react-powerplug"
import ga from "../utils/analytics"
import {
  ExclamationSquare,
  ArrowNextStage,
  Checkbox,
} from "../components/SvgIcons"
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
  Small,
  Subhead,
  H5,
  Label,
} from "../ui"
import Button from "../components/Button"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const curYear = new Date().getFullYear()

const initialValues = {
  email: "",
  dobDay: "1",
  dobYear: "1998",
  dobMonth: "1",
  periodInteger: "2",
  periodUnit: "1 week(s)",
  startDay: "1",
  startYear: curYear,
  startMonth: "1",
  role: "select",
  foundVia: "",
}

const submit = cb => async (values, actions) => {
  actions.setErrors()
  try {
    const res = await fetch(
      "https://wug9lonkm7.execute-api.eu-west-1.amazonaws.com/production/volunteer_application",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: mapKeys(
            mapValues(values, (v, k) => v || initialValues[k]),
            (_, k) => snakeCase(k),
          ),
        }),
      },
    )
    const data = await res.json()
    const success = res.ok && data.result === "OK"
    actions.setSubmitting(false)
    if (!success) {
      actions.setErrors({
        unknown: "There was an issue submitting your request, Please try again",
      })
    }
    cb(success)
  } catch (e) {
    actions.setSubmitting(false)
    actions.setErrors({
      unknown: "There was an issue submitting your request, Please try again",
    })
    cb(false)
  }
}

const Select = ({ options, ...props }) => (
  <UISelect mb={1} {...props}>
    {options.map(o => (
      <option key={o.value} value={o.value}>
        {o.text || o.value}
      </option>
    ))}
  </UISelect>
)

const RangeDropdown = ({ start = 1, end, step = 1, ...props }) => (
  <Select
    {...props}
    options={range(start, end, step).map(i => ({ value: i }))}
  />
)

const AboutVolunteering = ({ opportunities }) => (
  <div>
    <Label>Role you're interested in</Label>
    <Select
      name="role"
      options={[
        { value: "Other" },
        { value: "select", text: "Choose" },
        ...opportunities.results.map(o => ({
          value: get(o, "data.title[0].text"),
        })),
      ]}
    />
    <Label>How long would you like to volunteer?</Label>
    <Flex>
      <Box w={1 / 2} mr={1}>
        <RangeDropdown end={12} name="periodInteger" />
      </Box>
      <Box w={1 / 2} mr={1}>
        <Select
          name="periodUnit"
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
        <RangeDropdown end={31} name="startDay" />
      </Box>
      <Box w={1 / 3} mr={1}>
        <Select
          options={months.abbr.map(value => ({ value }))}
          name="startMonth"
        />
      </Box>
      <Box w={1 / 3}>
        <RangeDropdown start={curYear} end={curYear + 2} name="startYear" />
      </Box>
    </Flex>
    <Label>Any questions or comments</Label>
    <Textarea name="additionalInfo" />
    <Label>How did you find us?</Label>
    <Textarea name="foundVia" />
  </div>
)

const AboutYou = props => (
  <div>
    <Label>E-mail</Label>
    <Input type="email" name="email" placeholder="elizabeth@example.com" />
    <Flex>
      <Box w={1 / 2} mr={1}>
        <Label>First Name</Label>
        <Input name="firstName" placeholder="Elizabeth" />
      </Box>
      <Box w={1 / 2}>
        <Label>Last Name</Label>
        <Input name="lastName" placeholder="El" />
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
            <RangeDropdown end={31} name="dobDay" />
          </Box>
          <Box w={1 / 3} mr={1}>
            <Select
              options={months.abbr.map(value => ({ value }))}
              name="dobMonth"
            />
          </Box>
          <Box w={1 / 3}>
            <RangeDropdown
              start={curYear}
              end={1900}
              step={-1}
              name="dobYear"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </div>
)

const aboutValidation = object().shape({
  email: string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last name is required"),
  phone: string().required("Phone is required"),
  // dob_day: Yup.number().required("DOB required"),
  // dob_month: Yup.number().required("DOB required"),
  // dob_year: Yup.number().required("DOB required"),
})

const Done = props => (
  <Flex wrap="wrap" justify="center">
    <Checkbox palette="black" size={70} />
    <Box ml={2}>
      <H5 mb={1}>Thank you for your interest</H5>
      <Box w={1}>We will get back to you shortly</Box>
    </Box>
  </Flex>
)

const pages = [
  {
    title: "About You",
    Component: AboutYou,
    validation: aboutValidation,
  },
  {
    title: "Trip Details",
    Component: AboutVolunteering,
  },
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
            right: "-24px",
            top: "2px",
            zIndex: 9,
          }}
          palette={done ? "gray1" : active ? "blackInvert" : `gray${i + 2}`}
        />
      )}
    </Box>
  )
}

const Errors = ({ errors, touched }) => {
  if (!errors || !Object.keys(errors).length) return null
  return (
    <Box w={1}>
      {map(filter(errors, (_, id) => touched[id]), (v, k, i) => (
        <Flex
          key={`${k}-${i}`}
          palette="red6"
          invert
          p={2}
          mb={1}
          align="center"
        >
          <ExclamationSquare />
          <Box ml={2}>{v}</Box>
        </Flex>
      ))}
    </Box>
  )
}

const done = { Component: Done, title: "Complete" }

const FormWizard = props => (
  <Counter initial={0}>
    {({ count, inc }) => {
      const { Component, validation } = pages[count] || done
      const next = (values, actions) => {
        inc()
        actions.setSubmitting(false)
      }
      const onSubmit = pages[count + 1]
        ? next
        : submit(success => {
            success &&
              ga.event({
                category: "Request",
                action: "Applied for volunteer position",
                label: "new_volunteer",
              })
            success && setIndex(count + 1)
          })
      const steps = pages.concat(done)
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
          render={({ handleSubmit, touched, isSubmitting, errors }) => {
            return (
              <BlockUi blocking={isSubmitting}>
                <Box palette="gray1" invert p={2}>
                  <Flex justify="center" align="center">
                    {steps.map((page, i) => (
                      <WizardStep
                        key={i}
                        last={i === steps.length - 1}
                        onClick={() => count > i && setIndex(i)}
                        w={1 / steps.length}
                        i={i}
                        active={count === i}
                        done={count > i}
                        ml={i && 1}
                        {...page}
                      />
                    ))}
                  </Flex>
                  <Box palette="black" p={2}>
                    <form>
                      <Component {...props} />
                    </form>
                    <Errors errors={errors} touched={touched} />
                  </Box>
                  {pages[count] && (
                    <Box mt={2} align="right">
                      <Button
                        py={1}
                        palette="cyan6"
                        icon="ArrowRight"
                        iconPosition="right"
                        iconSize={12}
                        onClick={handleSubmit}
                        invert
                      >
                        {(pages[count + 1] || done).title}
                      </Button>
                    </Box>
                  )}
                </Box>
              </BlockUi>
            )
          }}
        />
      )
    }}
  </Counter>
)

const renderSliceToAccordion = ({ slice_type, items, primary }, i) => {
  const title = primary.title && (
    <PrismicRichText forceType="paragraph" bold={300} source={primary.title} />
  )
  const Component = sliceRenderers[slice_type] || Unknown
  const id = get(primary, "title[0].text", `s-${i}`)
  return {
    id,
    title,
    description: (
      <Component primary={primary} items={items} slice_type={slice_type} />
    ),
  }
}

export const Apply = ({
  content = {},
  quotes,
  main = [],
  opportunities,
  additionalData,
}) => {
  const accordionItems = main.map(renderSliceToAccordion)

  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 0.5]} pr={[0, 0, 0, 2]}>
        <PrismicRichText source={content.description} />
        <FormWizard opportunities={opportunities} />
      </Box>
      <Box w={[1, 1, 1, 0.5]}>
        <Accordion items={accordionItems} />
        {quotes && <Quotes items={quotes.items} data={additionalData} />}
      </Box>
    </Flex>
  )
}

export const data = async () => {
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

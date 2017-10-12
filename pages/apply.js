import React from "react"
import { Formik, Form } from "formik"
import BlockUi from "react-block-ui"
import g from "glamorous"
import { getSingleton, getByType, getByIDs, types } from "../utils/api"
import get from "lodash/get"
import map from "lodash/map"
import filter from "lodash/filter"
import { pageWithTitle } from "../hoc/page"
import Yup from "yup"
import range from "lodash/range"
import PrismicRichText from "../components/PrismicRichText"
import { Index } from "react-powerplug"
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
  Label,
} from "../ui"
import Button from "../components/Button"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const curYear = new Date().getFullYear()

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
          content: values,
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
        <RangeDropdown end={12} name="period_integer" />
      </Box>
      <Box w={1 / 2} mr={1}>
        <Select
          name="period_unit"
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
        <RangeDropdown start={curYear} end={curYear + 2} name="start_year" />
      </Box>
    </Flex>
    <Label>Any questions or comments</Label>
    <Textarea name="additional_info" />
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
            <RangeDropdown end={31} name="dob_day" />
          </Box>
          <Box w={1 / 3} mr={1}>
            <Select
              options={months.abbr.map(value => ({ value }))}
              name="dob_month"
            />
          </Box>
          <Box w={1 / 3}>
            <RangeDropdown
              start={curYear}
              end={1900}
              step={-1}
              name="dob_year"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </div>
)

const aboutValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone is required"),
  // dob_day: Yup.number().required("DOB required"),
  // dob_month: Yup.number().required("DOB required"),
  // dob_year: Yup.number().required("DOB required"),
})

const Done = props => (
  <Flex wrap="wrap" justify="center">
    <Checkbox palette="black" size={40} />
    <Box ml={2}>
      <Subhead>Thanks for your interest</Subhead>
    </Box>
    <Box w={1}>We will get back to you shortly</Box>
  </Flex>
)

const initialValues = {
  email: "",
  dob_day: 1,
  dob_year: 1998,
  dob_month: 1,
  period_integer: 2,
  period_unit: "1 week(s)",
  start_day: 1,
  start_year: curYear,
  start_month: 1,
  role: "select",
}

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
  <Index initial={0}>
    {({ index, setIndex }) => {
      const { Component, validation } = pages[index] || done
      const next = (values, actions) => {
        setIndex(index + 1)
        actions.setSubmitting(false)
      }
      const onSubmit = pages[index + 1]
        ? next
        : submit(success => {
            success &&
              ga.event({
                category: "Request",
                action: "Applied for volunteer position",
                label: "new_volunteer",
              })
            success && setIndex(index + 1)
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
                        onClick={() => index > i && setIndex(i)}
                        w={1 / steps.length}
                        i={i}
                        active={index === i}
                        done={index > i}
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
                  {pages[index] && (
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
                        {(pages[index + 1] || done).title}
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
  </Index>
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

const Apply = ({
  content = {},
  quotes,
  main = [],
  opportunities,
  additionalData,
}) => {
  const accordionItems = main.map(renderSliceToAccordion)

  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 0.6]} pr={[0, 0, 0, 2]}>
        <PrismicRichText source={content.description} />
        <FormWizard opportunities={opportunities} />
      </Box>
      <Box w={[1, 1, 1, 0.4]}>
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

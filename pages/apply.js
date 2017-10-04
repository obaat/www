import React from "react"
import { Formik, Form } from "formik"
import g from "glamorous"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import {
  Flex,
  Embed,
  Box,
  Border,
  BackgroundImage,
  Input,
  Textarea,
  Subhead,
  Label,
  Switch,
} from "../ui"
import SidebarHeader from "../components/SidebarHeader"
import Link from "../components/Link"

const Example = () => (
  <div>
    <Formik
      initialValues={{ email: "", color: "red", firstName: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
      render={props => (
        <Form>
          <Subhead>About You</Subhead>
          <Label>E-mail</Label>
          <Input
            type="email"
            name="email"
            placeholder="volunteer@example.com"
          />
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
          <Label>Nationality</Label>
          <Input name="nationality" />
          <Label>Contact Telephone</Label>
          <Input type="tel" name="phone" placeholder="+44 0700 000000" />
          <Label>Why do you want to volunteer</Label>
          <Input
            component={Textarea}
            type="why_volunteer"
            name="why_volunteer"
          />
          <Label>How long do you wish to volunteer</Label>
          <Input name="period" />
          <Label>Previous Experience</Label>

          <Input component={Textarea} name="previous_experience" />
          <Label>Education</Label>
          <Input component={Textarea} name="education" />
          <Label>Role you are interested in</Label>
          <Input name="role" />
          <Label>Do you have any criminal convictions</Label>
          <Input component={Switch} name="criminal" />
          <Subhead>References</Subhead>
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
)

const Apply = ({ content = {} }) => {
  const location = ""
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pr={[0, 0, 0, 3]}>
        <PrismicRichText source={content.description} />
        <Example />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pr={[0, 0, 0, 3]}>
        <SidebarHeader>Related Information</SidebarHeader>
        <Box>
          <Link href="/volunteering">Volunteer Information</Link>
        </Box>
        <Box>
          <Link href="/contact">Contact Us</Link>
        </Box>
      </Box>
    </Flex>
  )
}

Apply.getInitialProps = async () => {
  const page = await getSingleton(types.APPLY_PAGE_CONTENT)
  return { content: page.data }
}

export default pageWithTitle()(Apply)

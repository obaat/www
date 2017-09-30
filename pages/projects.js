import React from "react"
import { pageWithTitle } from "../hoc/page"
import Link from "next/link"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"

import SidebarHeader from "../components/SidebarHeader"
import PrismicRichText from "../components/PrismicRichText"
import PrismicSlice from "../components/PrismicSlice"
import SlideShow from "../components/SlideShow"
import Accordion, { AccordionSection } from "../components/Accordion"
import { Absolute, Relative, BackgroundImage, Flex, Box, Image } from "../ui"
import UILink from "../components/Link"
import get from "lodash/get"

const Partner = ({ data: { title, description, logo, website }, uid }) => (
  <Box w={1 / 3} mb={3}>
    <UILink target="_blank" href={website.url}>
      {logo ? (
        <Image src={logo.url} />
      ) : (
        <PrismicRichText mb={0} forceType="heading2" source={title} />
      )}
    </UILink>
  </Box>
)

const Project = ({ content = {}, partners }) => {
  const sections = content.body.map((props, i) => (
    <Box key={i} mb={2}>
      <PrismicSlice {...props} />
    </Box>
  ))
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pl={3}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pl={3}>
        <SidebarHeader>Partners</SidebarHeader>
        <Flex>
          {partners.map((props, i) => <Partner {...props} uid={i} key={i} />)}
        </Flex>
        {sections}
      </Box>
    </Flex>
  )
}

const ProjectPreview = ({ uid, data, slug }) => (
  <Box w={[1, 1, 1, 1 / 2]} p={1} color="#fff">
    <Relative>
      <Link href={`/projects/?id=${uid}`} as={`/projects/${uid}`}>
        <BackgroundImage
          bg="#000"
          ratio={1 / 1.5}
          src={get(data, "header_image.url")}
        >
          <Absolute top left p={2}>
            <PrismicRichText forceType="heading2" source={data.title} />
          </Absolute>
          <Absolute bottom right p={2} fontSize={4}>
            See More
          </Absolute>
        </BackgroundImage>
      </Link>
    </Relative>
  </Box>
)

const ProjectsIndex = ({ projects, content }) => {
  return (
    <div>
      <PrismicRichText source={content.description} />
      <Flex wrap="wrap">
        {projects.results.map(props => (
          <ProjectPreview key={props.uid} {...props} />
        ))}
      </Flex>
    </div>
  )
}

const Page = ({ project, ...props }) =>
  project ? <Project {...props} /> : <ProjectsIndex {...props} />

Page.getInitialProps = async ({ query: { status, id: uid } }) => {
  if (uid) {
    const res = await getByUID(types.PROJECT)(uid)
    const partners = await getByIDs(res.data.partners.map(l => l.partner.id))
    return {
      content: res.data,
      partners: partners.results,
      project: true,
    }
  } else {
    const res = await getSingleton(types.PROJECT_PAGE_CONTENT)
    const ids = res.data[
      status === "planned" ? "planned_projects" : "projects"
    ].map(l => l.project.id)
    const projects = ids.length ? await getByIDs(ids) : { results: [] }
    return {
      content: res.data,
      projects,
    }
  }
}

export default pageWithTitle({
  route: [{ title: "Project", href: "/projects" }],
})(Page)

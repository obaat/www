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

import PrismicRichText from "../components/PrismicRichText"
import PrismicSlice from "../components/PrismicSlice"
import SlideShow from "../components/SlideShow"
import Accordion, { AccordionSection } from "../components/Accordion"
import { Absolute, Relative, BackgroundImage, Flex, Box } from "../ui"
import get from "lodash/get"

const Project = ({ content = {} }) => {
  const sections = content.body.map((props, i) => (
    <PrismicSlice mb={2} key={i} {...props} />
  ))
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]} pl={3}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pl={3}>
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
    return {
      content: res.data,
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

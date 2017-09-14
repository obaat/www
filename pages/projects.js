import React from "react"
import Button from "../components/Button"
import ApplyNow from "../components/ApplyNow"
import g from "glamorous"
import Link from "next/link"
import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"
import { withLayout } from "../components/Layout"
import PrismicRichText from "../components/PrismicRichText"
import SlideShow from "../components/SlideShow"
import PageTitle from "../components/PageTitle"
import Container from "../components/Container"
import Accordion, { AccordionSection } from "../components/Accordion"
import {
  Absolute,
  Relative,
  BackgroundImage,
  Flex,
  Box,
  Border,
  ButtonOutline,
  Panel,
  PanelHeader,
  Heading,
  Text,
  H3,
} from "../ui"
import get from "lodash/get"
import { withProps } from "recompose"
// import Error from "next/error"

const Project = ({ content = {} }) => {
  return (
    <div>
      <Relative>
        <PageTitle content={content}>
          <Absolute bottom right p={3}>
            <ApplyNow />
          </Absolute>
        </PageTitle>
      </Relative>
      <Container py={4}>
        <Flex wrap="wrap">
          <Box w={[1, 1, 1, 1 / 3]}>
            <SlideShow autoplay controlSize={18}>
              {content.image_gallery.map(({ image, description }, i) => (
                <BackgroundImage src={image.url} key={i} />
              ))}
            </SlideShow>
          </Box>
          <Box w={[1, 1, 1, 2 / 3]} pl={3}>
            <PrismicRichText source={content.description} />
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

const ProjectPreview = ({ uid, data, slug }) => (
  <Box w={[1, 1, 1, 1 / 2]} p={1}>
    <Relative>
      <Link href={`/projects/?id=${uid}`} as={`/projects/${uid}`}>
        <BackgroundImage
          bg="#000"
          ratio={1 / 1.5}
          src={get(data, "header_image.url")}
        >
          <Absolute top left p={2}>
            <PrismicRichText
              forceType="heading1"
              color="#fff"
              source={data.title}
            />}
          </Absolute>
          <Absolute bottom right p={2}>
            <Button
              palette="normal"
              bg="rgba(0,0,0,0.3)"
              invert
              icon="chevron-right"
              w={1}
              py={1}
              as={ButtonOutline}
            >
              See More
            </Button>
          </Absolute>
        </BackgroundImage>
      </Link>
    </Relative>
  </Box>
)

const ProjectsIndex = ({ projects, content }) => {
  return (
    <div>
      <PageTitle content={content} />
      <Container py={4}>
        <PrismicRichText source={content.description} />
        <Flex wrap="wrap">
          {projects.results.map(props => (
            <ProjectPreview key={props.uid} {...props} />
          ))}
        </Flex>
      </Container>
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

export default withLayout(Page)

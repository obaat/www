import React from "react"
import { pageWithTitle } from "../hoc/page"
import Link from "next/link"
import { HumanDate } from "../utils/date"
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
import {
  Absolute,
  Relative,
  Text,
  BackgroundImage,
  Flex,
  Box,
  Image,
} from "../ui"
import Map from "../components/GoogleMap"
import UILink from "../components/Link"
import get from "lodash/get"

const Partner = ({ data: { title, description, logo, website }, uid }) => {
  const content = (
    <div>
      {logo && logo.url ? (
        <Image src={logo.url} />
      ) : (
        <PrismicRichText
          mb={0}
          pt={2}
          style={{ textAlign: "center" }}
          textAlign="center"
          align="center"
          justify="center"
          forceType="small"
          source={title}
        />
      )}
    </div>
  )

  return (
    <Box w={1 / 2} mb={3}>
      {website && website.url ? (
        <UILink target="_blank" href={website.url}>
          {content}
        </UILink>
      ) : (
        content
      )}
    </Box>
  )
}

const Project = ({ content = {}, partners }) => {
  const sections = content.body.map((props, i) => (
    <Box key={i} mb={2}>
      <PrismicSlice {...props} />
    </Box>
  ))
  return (
    <Flex wrap="wrap">
      <Box w={[1, 1, 1, 2 / 3]}>
        <PrismicRichText source={content.description} />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]} pl={3}>
        {content.date_completed && (
          <Box mb={2}>
            <SidebarHeader>
              Completed <HumanDate iso={content.date_completed} />
            </SidebarHeader>
          </Box>
        )}
        {content.location &&
          content.location.latitude && (
            <Box mb={2}>
              <SidebarHeader>Location</SidebarHeader>
              <Map center={content.location} zoom={9} />
            </Box>
          )}
        {partners &&
          partners.length > 0 && (
            <div>
              <SidebarHeader>Partners</SidebarHeader>
              <Flex wrap="wrap">
                {partners.map((props, i) => (
                  <Partner {...props} uid={i} key={i} />
                ))}
              </Flex>
            </div>
          )}
        {sections}
      </Box>
    </Flex>
  )
}

const ProjectPreview = ({ uid, data, slug }) => (
  <Box w={[1, 1, 1, 1 / 3]} p={1} color="#fff">
    <Relative>
      <Link href={`/projects/?id=${uid}`} as={`/projects/${uid}`}>
        <BackgroundImage
          bg="#000"
          ratio={1 / 1.5}
          src={get(data, "listview_image.url", get(data, "header_image.url"))}
        >
          <Absolute top left bottom right p={2} bg="rgba(0,0,0,0.3)">
            <PrismicRichText forceType="heading4" xmb={0} source={data.title} />
            {data.date_completed && <HumanDate iso={data.date_completed} />}
          </Absolute>
          <Absolute bottom right p={2} fontSize={3}>
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
      {projects.results.length === 0 && <Text>No Projects</Text>}
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
  route: [{ title: "Projects", href: "/projects" }],
})(Page)

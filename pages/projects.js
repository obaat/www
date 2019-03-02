import React from "react"
import { withRouteData } from "react-static"
import { Link, Switch } from "react-router"
import { pageWithTitle } from "../hoc/page"
import { HumanDate } from "../utils/date"
import Project, { data as projectData } from "./parts/project"

import {
  getByUID,
  getByIDs,
  getSingleton,
  getByType,
  types,
} from "../utils/api"

import PrismicRichText from "../components/PrismicRichText"
import PrismicSlice from "../components/PrismicSlice"
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
import get from "lodash/get"

const ProjectPreview = ({ uid, data, slug }) => (
  <Box w={[1, 1, 1, 1 / 3]} p={1} color="#fff">
    <Relative>
      <Link to={`/projects/${uid}`}>
        <BackgroundImage
          bg="#000"
          color="#fff"
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

const Projects = ({ projects, content }) => {
  if (!content || !projects) {
    return <div>No Data</div>
  }
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

const dataWithStatus = status => async () => {
  const res = await getSingleton(types.PROJECT_PAGE_CONTENT)
  const ids = res.data[
    status === "planned" ? "planned_projects" : "projects"
  ].map(l => l.project.id)
  const projects = ids.length
    ? await getByIDs(ids, { pageSize: 100 })
    : { results: [] }
  return {
    content: res.data,
    projects,
  }
}

export const data = dataWithStatus("completed")

export const children = async () => {
  const allProjects = await getByType(types.PROJECT)
  const pages = allProjects.results.map(({ uid }) => ({
    path: "/" + uid,
    getData: projectData(uid),
  }))

  pages.push({
    path: "/planned",
    getData: dataWithStatus("planned"),
  })
  return pages
}

const _Projects = pageWithTitle()(Projects)
export default _Projects

const projectsWithProps = withRouteData(_Projects)
const projectWithProps = withRouteData(Project)

export const routes = ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={projectsWithProps} />
    <Route path={`${match.url}/planned`} exact component={projectsWithProps} />
    <Route exact path={`${match.url}/:uid`} component={projectWithProps} />
  </Switch>
)

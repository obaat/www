import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { Switch, Route, Link, withRouteData } from "react-static"
import BlogPost, { data as blogPostData } from "./parts/blog_post"
import { Flex, Box, Border, BackgroundImage } from "../ui"

const Blog = pageWithTitle()(({ members = [], content = {} }) => (
  <Flex>
    <Box w={[1, 1, 1, 2 / 3]} pr={3}>
      <PrismicRichText source={content.description} />
    </Box>
  </Flex>
))

export const data = async () => {
  const page = await getSingleton(types.BLOG_PAGE_CONTENT)
  const posts = await getSingleton(types.BLOG_PAGE_CONTENT)
  return { content: page && page.data }
}

export const children = async () => {
  const allBlogs = await getByType(types.BLOG_POST)
  return allBlogs.results.map(({ uid }) => ({
    path: "/" + uid,
    getData: blogPostData(uid),
  }))
}

export default Blog

const blogWithData = withRouteData(Blog)
const blogPostWithData = withRouteData(BlogPost)

export const routes = ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={blogWithData} />
    <Route exact path={`${match.url}/:uid`} component={blogPostWithData} />
  </Switch>
)

import React from "react"
import { getByType, getSingleton, getByIDs, types } from "../utils/api"
import styled from "@emotion/styled"
import { pageWithTitle } from "../hoc/page"
import PrismicRichText from "../components/PrismicRichText"
import { withRouteData } from "react-static"
import { Switch } from "react-router"
import Link from "../components/Link"
import { ArrowRight } from "../components/SvgIcons"
import BlogPost, {
  data as blogPostData,
  BlogPostClean as Post,
} from "./parts/blog_post"
import { Flex, Box, Border, BackgroundImage } from "../ui"

const PreviewPost = styled(Post)({
  maxHeight: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  content: "",
  position: "relative",
  ":before": {
    content: '""',
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    background: "linear-gradient(transparent 150px, white)",
  },
})

const LLink = ({ post, className }) => (
  <Link to={`/blog/${post.uid}`} className={className}>
    <Flex inline align="center">
      <Box>See Full Post</Box>
      <Box pl={1}>
        <ArrowRight color="#000" size={12} />
      </Box>
    </Flex>
  </Link>
)

const FullPost = styled(LLink)({
  marginBottom: "20px",
  display: "block",
})

const Blog = pageWithTitle()(({ content = {}, posts = [] }) => (
  <Flex>
    <Box w={[1, 1, 1, 1]} pr={3}>
      <PrismicRichText source={content.description} />
      {posts.map((post, i) => (
        <div key={i}>
          <PreviewPost content={post.data} />
          <FullPost post={post} />
        </div>
      ))}
    </Box>
  </Flex>
))

export const data = async () => {
  const page = await getSingleton(types.BLOG_PAGE_CONTENT)
  const posts = await getByType(types.BLOG_POST)
  return { content: page && page.data, posts: posts.results }
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

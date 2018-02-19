import React, { Component } from "react"
import { pageWithTitle } from "../../hoc/page"

const BlogPost = class Project extends Component {
  render() {
    return <div />
  }
}

export const data = uid => async () => {
  const res = await getByUID(types.BLOG_POST)(uid)
  const apply = await applyData()
  return {
    content: res.data,
  }
}

export default pageWithTitle({
  route: [{ title: "Blog", href: "/blog" }],
})(BlogPost)

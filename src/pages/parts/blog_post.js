import React, { Component } from "react"
import { pageWithTitle } from "../../hoc/page"
import { HumanDate, FullHumanDate } from "../../utils/date"
import PrismicRichText from "../../components/PrismicRichText"
import { getByUID, types } from "../../utils/api"
import { Flex, Box } from "../../ui"

class BlogPost extends Component {
  render() {
    const { content, className } = this.props
    return (
      <div className={className}>
        <PrismicRichText xmb={1} forceType="heading6" source={content.title} />
        <PrismicRichText source={content.content} />
      </div>
    )
  }
}

export const data = uid => async () => {
  const res = await getByUID(types.BLOG_POST)(uid)
  return {
    content: res.data,
  }
}

export { BlogPost as BlogPostClean }

export default pageWithTitle({
  route: [{ title: "Blog", href: "/blog" }],
})(BlogPost)

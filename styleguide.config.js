const { webpackConfig } = require("react-static/lib/static/webpack")
const getConfig = require("react-static/lib/static/getConfig").default

const path = require("path")
const config = getConfig({}, { watch: true })

module.exports = {
  webpackConfig: webpackConfig({ config, stage: "dev" }),
  components: "components/**/*.js",
  styleguideComponents: {
    Wrapper: path.join(__dirname, "styleguide/ThemeWrapper"),
  },
}

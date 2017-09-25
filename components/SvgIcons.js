import School from "../svg/school.svg"
import Home from "../svg/home.svg"
import Home2 from "../svg/home-2.svg"
import Map from "../svg/map.svg"
import Building from "../svg/building.svg"
import ArrowRight from "../svg/arrow-right.svg"
import User from "../svg/user.svg"
import HeadCog from "../svg/head-cog.svg"
import g from "glamorous"
import mapValues from "lodash/mapValues"
import withProps from "recompose/withProps"
// import importAll from "import-all.macro"
// const icons = importAll.sync("../svg/*.svg")

const icons = { HeadCog, ArrowRight, School, Home, Home2, Map, Building, User }

module.exports = mapValues(icons, icon =>
  withProps(({ size = 24, color = "#fff" }) => ({
    fill: color,
    viewBox: "0 0 24 24",
    width: size,
    height: size,
  }))(icon),
)

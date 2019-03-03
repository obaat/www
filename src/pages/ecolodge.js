import React from "react"
import { getSingleton, getByIDs, types } from "../utils/api"
import PrismicRichText from "../components/PrismicRichText"
import { pageWithTitle } from "../hoc/page"
import Link from "../components/Link"
import { TickInCircle, Share } from "../components/SvgIcons"
import {
  Absolute,
  Relative,
  Flex,
  Box,
  Border,
  Text,
  BackgroundImage,
} from "../ui"
import CircularProgressbar from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import theme from "../theme"
import UI from "../ui"
import get from "lodash/get"

const ProjectChoice = ({
  project: { data, uid },
  selected,
  onSelect,
  addOnSelected,
}) => {
  let percentage = null
  let so_far = data.funded_to_date + (selected ? addOnSelected : 0)
  if (data.funding_target) {
    percentage = Math.min(100, (so_far / data.funding_target) * 100)
  }

  return (
    <Relative>
      {selected ? (
        <Absolute right top px={22} py={22}>
          <TickInCircle size={38} color={theme.colors.primary[0]} />
        </Absolute>
      ) : null}
      <Border
        borderWidth={3}
        borderColor="base"
        bg={selected ? theme.colors.primary[0] : null}
        mb={2}
        p={1}
        invert
        onClick={onSelect}
      >
        <Flex direction="column">
          <Box color={selected ? theme.colors.primary[1] : null}>
            <Flex direction="row">
              <Box flex="2">
                <PrismicRichText
                  forceType="heading5"
                  xmb={0}
                  source={data.title}
                />
                <Text>
                  {so_far > data.funding_target ? (
                    "Fully Funded"
                  ) : (
                    <span>
                      Funded £{so_far} of £{data.funding_target}
                    </span>
                  )}
                </Text>
              </Box>
              <Box width="60px">
                {percentage !== null ? (
                  <CircularProgressbar
                    percentage={percentage}
                    text={selected ? "" : `${parseInt(percentage, 10)}%`}
                    initialAnimation
                    background
                    backgroundPadding={6}
                    styles={{
                      background: {
                        fill: theme.colors.primary[1],
                      },
                      path: {
                        stroke: theme.colors.primary[0],
                      },
                      text: {
                        // Text color
                        fill: theme.colors.primary[0],
                        // Text size
                        fontSize: "24px",
                      },
                    }}
                  />
                ) : null}
              </Box>
            </Flex>
          </Box>
          <Box>
            <BackgroundImage
              bg="#000"
              color="#fff"
              ratio={1 / 3}
              src={get(
                data,
                "listview_image.url",
                get(data, "header_image.url"),
              )}
            >
              <Absolute bottom right p={2} fontSize={3}>
                <Link target="_blank" to={`/projects/${uid}`}>
                  <Share color="white" />
                </Link>
              </Absolute>
            </BackgroundImage>
          </Box>
        </Flex>
      </Border>
    </Relative>
  )
}

const EcoLodge = ({ content = {}, projects = [] }) => {
  const [selectedProject, selectProject] = React.useState(null)
  const [totalCost, setTotalCost] = React.useState(null)

  const setPriceEventHandler = details => setTotalCost(details.total_cost)
  const resetPriceEventHandler = () => setTotalCost(null)

  React.useEffect(() => {
    if (window && window.allocate) {
      window.allocate.on("details", setPriceEventHandler)
      window.allocate.on("room", resetPriceEventHandler)
      window.allocate.on("occupancy-options", resetPriceEventHandler)
      console.log("added event listeners")
      return () => {
        if (window.allocate && window.allocate.off) {
          window.allocate.off("details", setPriceEventHandler)
          window.allocate.off("room", resetPriceEventHandler)
          window.allocate.off("occupancy-options", resetPriceEventHandler)
        }
      }
    }
  }, [totalCost])

  React.useEffect(() => {
    if (window && window.refreshAllocateWidgets) {
      window.refreshAllocateWidgets()
    }
  })

  return (
    <Flex>
      <Box w={[1, 1, 1, 2 / 3]} pr={3}>
        <PrismicRichText source={content.description} />
        <div
          data-allocate-target="https://test-allocate-next.allocate.co.uk/"
          data-allocate-secure-target="http://localhost:4001/ecolodge"
          data-allocate-payment-disabled="false"
          data-allocate-palette={`#fff,${theme.colors.tertiary[0]},${
            theme.colors.primary[0]
          }`}
          className="_allocate"
          data-allocate-widget="booking"
        />
      </Box>
      <Box w={[1, 1, 1, 1 / 3]}>
        <Box style={{ position: "sticky", top: 200 }}>
          <UI.H6>Choose the project that your stay will help</UI.H6>
          <Text>
            Profits from your stay are re-invested directly into the local
            community. You can decide which project to invest in below
          </Text>
          {projects.map(project => (
            <ProjectChoice
              project={project}
              key={project.uid}
              addOnSelected={totalCost}
              onSelect={() => selectProject(project.uid)}
              selected={selectedProject === project.uid}
            />
          ))}
          <Box mb={2}>
            {totalCost ? (
              <span>Your stay for £{totalCost} will pay for the following</span>
            ) : (
              <span>
                Once you have chosen a stay you can see how much will go to this
                project
              </span>
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export const data = async () => {
  const page = await getSingleton(types.ECOLODGE)
  const projects = await getByIDs(
    page.data.project_options.map(l => l.project.id),
  )
  return { projects: projects.results, content: page.data }
}

export default pageWithTitle()(EcoLodge)

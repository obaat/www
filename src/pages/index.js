import React from 'react'
import Link from 'gatsby-link'
import Lorem from 'react-lorem-component'
import { space, color, fontSize } from 'styled-system'
import Button from '../components/Button'
import g from 'glamorous'

const Banner = g.div(fontSize)

const Mission = g.div(
  {
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: '600px',
  },
  space
)

const Panel = g.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: '0 0 100%',
    width: '100VW',
    minHeight: '100VH',
  },
  color,
  space
)

const ImagePanel = g(Panel)(
  {
    backgroundImage: `url("//placekitten.com/1024/768")`,
    backgroundSize: 'cover',
    color: '#fff',
  },
  space
)

const IndexPage = () =>
  <div>
    <ImagePanel p={4}>
      <Banner fontSize={8}>We Love Kittens</Banner>
      <Banner fontSize={5}>Do You?</Banner>
    </ImagePanel>
    <Panel p={4}>
      <Banner fontSize={8}>ONE BRICK AT A TIME</Banner>
      <Banner fontSize={5}>
        Skills Exchange and Building Schools in Uganda
      </Banner>
      <Mission my={4}>
        <p>
          We believe that by building and refurbishing, we are building brighter
          future. From schools to medical facilities, One Brick at a Time is
          dedicated to alleviating poverty in marginalised areas in Uganda.
        </p>
        <p>
          We partner up with community-based NGOs to develop network of mutual
          support and we recruit volunteers to maintain these projects. This is
          allowing for social investment in the regional economy in the Rwenzori
          Region and beyond.
        </p>
        <p>
          We provide project and programme management, well-trained local
          builders and all the equipment which result in strong, sustainable and
          important facilities helping to break the cycle of poverty.
        </p>
      </Mission>
      <Button type="info">Learn More</Button>
    </Panel>
    <Panel bg="blue.0">
      Our Impact since 2005
    </Panel>
  </div>

export default IndexPage

import React from 'react'
import {omit} from 'lodash'

export default getInitialProps => ChildComponent => ParentComponent => {
  const Wrapper = (props) => {
    //TODO: maybe split up props?
    return (
      <ParentComponent {...props }>
        <ChildComponent {...props } />
      </ParentComponent>
    )

  }

  Wrapper.getInitialProps = async (...args) => {
    const parentProps = await getInitialProps(...args)
    const childProps = ChildComponent.getInitialProps ? await ChildComponent.getInitialProps(...args) : {}
    return {...parentProps, ...childProps}
  }

  return Wrapper
}


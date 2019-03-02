import React from "react"
import ReactDOM from "react-dom"

// Your top level component
import App from "./App"

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== "undefined") {
  ;(function(i, a) {
    i[a] = i[a] || { _upa: [] }
    i[a].on = function(e, v) {
      i[a]._upa.push([e, v])
    }
  })(window, "allocate")
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render

  const render = Comp => {
    renderMethod(<Comp />, document.getElementById("root"))
  }
  // Render!
  render(App)
}

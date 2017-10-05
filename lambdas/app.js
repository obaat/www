const express = require("express")
const app = express()
const AWS = require("aws-sdk")
const sns = new AWS.SNS({ region: "eu-west-1" })
const map = require("lodash/map")
const entities = require("html-entities").XmlEntities
const bodyParser = require("body-parser")
const topicArn = "arn:aws:sns:eu-west-1:028531558027:MailVolunteerApp"
const { PORT = 5000 } = process.env

// const React = require("react")
// const Oy = require("oy-vey")
// var ReactDOMServer = require("react-dom/server")

// const { Table, TBody, TR, TD } = Oy

// const Email = props =>
//   React.createElement(
//     Table,
//     { width: 700 },
//     React.createElement(
//       TBody,
//       null,
//       map(props.content, function(v, k) {
//         return React.createElement(
//           TR,
//           null,
//           React.createElement(TD, { align: "right" }, k),
//           React.createElement(TD, { align: "left" }, v),
//         )
//       }),
//     ),
//   )

app.use(bodyParser.json())

app.post("/volunteer_application", function(req, res) {
  const { content = {} } = req.body
  // const template = ReactDOMServer.renderToString(
  //   React.createElement(Email, { content: req.body.content }),
  // )
  const message = map(content, (v, k) => k + ":\n" + entities.decode(v))

  sns
    .publish({
      Message: message.join("\n"),
      Subject: `[website] Application for volunteer ${content.firstName} ${content.lastName}`,
      TopicArn: topicArn,
    })
    .promise()
    .then(result => {
      res.json({ result: "OK" })
    })
    .catch(e => {
      res.status(500).json({ result: "ERR" })
    })
})

app.listen(PORT, function() {
  console.log("Example app listening on port " + PORT)
})

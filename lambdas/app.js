const express = require("express")
const cors = require("cors")
const app = express()
const AWS = require("aws-sdk")
const sns = new AWS.SNS({ region: "eu-west-1" })
const entities = require("html-entities").XmlEntities
const bodyParser = require("body-parser")
const topicArn = "arn:aws:sns:eu-west-1:028531558027:MailVolunteerApp"
const { PORT = 5000 } = process.env

app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.json({
    status: "OK",
  })
})

app.options("/volunteer_application", cors()) // enable pre-flight request for DELETE request
app.post("/volunteer_application", cors(), function(req, res) {
  const { content = {} } = req.body
  const message = Object.keys(content).map(k => {
    const v = content[k]
    return `${k.replace("_", " ")}: ${entities.decode(v)}`
  })

  sns
    .publish({
      Message: message.join("\n"),
      Subject: `[volunteer-app] Application for volunteer ${
        content.first_name
      } ${content.last_name}`,
      TopicArn: topicArn,
    })
    .promise()
    .then(result => {
      res.json({ result: "OK" })
    })
    .catch(e => {
      res.status(500).json({ result: "ERR", e })
    })
})

app.listen(PORT, function() {
  console.log("Example app listening on port " + PORT)
})

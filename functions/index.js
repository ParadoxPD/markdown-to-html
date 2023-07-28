const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require('cors');
// const fs = require("fs");
const PORT = 5000;
const { generateHTMLPage, generateDiv } = require("./pageify");

/*
Never forget to add the cors middleware if you dont want to die from debugging later...
*/
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors())

app.post("/", function (req, res) {
  let markDownData = req.body.data;
  let themeData = req.body.theme;
  let typeData = req.body.type; // div or page
  let title = req.body.title;
  let resData = undefined;

  if (typeData === "page")
    resData = generateHTMLPage(markDownData, themeData, title);
  else if (typeData === "div") resData = generateDiv(markDownData, themeData);
  console.log(req.body.theme);
  //   fs.writeFileSync("test.html", resData);
  res.send(resData);
});

// const server = app.listen(PORT, function () {
//   console.log(`App listening at port ${server.address().port}`);
// });

exports.api = functions.https.onRequest(app);

const express = require("express");
const app = express();
const fs = require("fs");
var cors = require('cors')
const PORT = process.env.PORT || 5000;
const { generateHTMLPage, generateDiv } = require("./pageify");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use(express.json());

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
  fs.writeFileSync("test.html", resData);
  res.send(resData);
});

const server = app.listen(PORT, function () {
  console.log(`App listening at port ${server.address().port}`);
});

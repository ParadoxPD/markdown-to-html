const express = require('express');
const app = express();
const fs = require('fs')
const PORT = process.env.PORT || 8080
const {
    generateHTMLPage
} = require('./pageify')

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


app.post('/', function (req, res) {
    let markDownData = req.body.data;
    let themeData = req.body.theme;
    let htmlData = generateHTMLPage(markDownData, themeData);
    console.log(req.body.theme);
    fs.writeFileSync('htmlfile.html', htmlData);
    res.send(htmlData);
})


const server = app.listen(PORT, function () {
    console.log(`App listening at port ${PORT}`);
})
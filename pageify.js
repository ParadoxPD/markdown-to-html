const fs = require('fs');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");
const xssFilter = require("xss");

const converter = new showdown.Converter({
    tables: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
    pre: true,
    extensions: [showdownHighlight({
        pre: true
    })]
});




function generateHTMLPage(markDownData, themeData) {

    let htmlData = xssFilter(converter.makeHtml(markDownData));
    converter.setFlavor('github');
    let styleData;
    let pageTitle = "Hello";

    styleData = fs.readFileSync(__dirname + `/style-${themeData}.css`);

    let preContent = `
            <html>
            <head>
                <title>` + pageTitle + `</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <div id='content'>
            `

    let postContent = `
                </div>
                <style type='text/css'>` + styleData + `</style>
            </body>
            </html>`;




    return preContent + htmlData + postContent

}

module.exports = {
    generateHTMLPage
}
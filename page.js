var fs = require('fs');


function generateHTMLPage(html) {
    let styleData;
    let pageTitle = "Hello";

    styleData = fs.readFileSync(__dirname + '/style.css');

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




    return preContent + html + postContent

}

module.exports = {
    generateHTMLPage
}
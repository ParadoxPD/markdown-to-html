const fs = require('fs');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");
const https = require('https');
const axios = require('axios')
var xssFilter = require("xss");
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

let {
    generateHTMLPage
} = require('./page');




let converter = new showdown.Converter({
    tables: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
    extensions: [showdownHighlight({
        pre: true
    })]
});


let url = 'https://raw.githubusercontent.com/srijan-paul/blog/master/11ty/bohoo-js.md'

https.get(url, (res) => {
    let data = '';

    res.on('data', chunk => {
        data += chunk
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
        let html = xssFilter(converter.makeHtml(data));
        let html2 = xssFilter(md.render(data))
        converter.setFlavor('github');


        fs.writeFile('htmlfile2.html', generateHTMLPage(html2), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        fs.writeFile('markdownfile.md', data, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });


}).on("error", (err) => {
    console.log("Error: " + err.message);
});
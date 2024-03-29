const fs = require("fs");
const showdown = require("showdown");
const showdownHighlight = require("showdown-highlight");
const xssFilter = require("xss");

const converter = new showdown.Converter({
    tables: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
    extensions: [
        showdownHighlight({
            pre: true,
        }),
    ],
});

const copyCodeSuccessColors = {
    dark: "#32CE55AA",
    light: "#3bc738",
};

function generateHTMLPage(markDownData, themeData, title) {
    let htmlData = xssFilter(converter.makeHtml(markDownData));
    converter.setFlavor("github");
    let styleData;
    let pageTitle = (title == "" || title == null || title == undefined) ? "" : title;

    styleData = fs.readFileSync(__dirname + `/style-${themeData}.css`);

    let copyIcon = `
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" style="display: block;" transform="scale(0.65)">
                            <g>
                                <g>
                                <path fill="000000" d="M480.6,109.1h-87.5V31.4c0-11.3-9.1-20.4-20.4-20.4H31.4C20.1,11,11,20.1,11,31.4v351c0,11.3,9.1,20.4,20.4,20.4h87.5    v77.7c0,11.3,9.1,20.4,20.4,20.4h341.3c11.3,0,20.4-9.1,20.4-20.4v-351C501,118.3,491.9,109.1,480.6,109.1z M51.8,362V51.8h300.4    v57.3H139.3c-11.3,0-20.4,9.1-20.4,20.4V362H51.8z M460.2,460.2H159.7V150h300.4V460.2z"/>
                                <path fill="000000" d="m233.3,254.4h155.8c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-155.8c-11.3,0-20.4,9.1-20.4,20.4 0,11.2 9.1,20.4 20.4,20.4z"/>
                                <path d="m233.3,396.6h155.8c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-155.8c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4z"/>
                                </g>
                            </g>
                        </svg>
                    `;

    let preContent =
        `
            <html>
            <head>
                <title>` +
        pageTitle +
        `</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark.min.css" integrity="sha512-Jk4AqjWsdSzSWCSuQTfYRIF84Rq/eV0G2+tu07byYwHcbTGfdmLrHjUSwvzp5HvbiqK4ibmNwdcG49Y5RGYPTg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js" integrity="sha512-gU7kztaQEl7SHJyraPfZLQCNnrKdaQi5ndOyt4L4UPL/FHDd/uB9Je6KDARIqwnNNE27hnqoWLBq+Kpe4iHfeQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script>hljs.highlightAll();</script>
                 <style type='text/css'>` +
        styleData +
        `.title {
                    margin: 0px;
                    max-width: 900px;
                    padding: 10px 40px;
                    padding-bottom: 20px;
                    margin-left: auto;
                    margin-right: auto;

                }
                @media only screen and (max-width: 600px) {
                    .title{
                        padding: 0px 20px 20px 20px !important;
                    }
                }
                </style>
            </head>
            <body>
            <h1 class="title">${pageTitle}</h1>
                <div id='content'>
            `;

    let postContent =
        `
                </div>
                <script>
                    function getCopyCodeButton(){
                        const codes = document.querySelectorAll("pre")
                        codes.forEach((codeBlock) => {
                            let htmlCode = codeBlock.innerHTML

                            htmlCode += \`
                                            <button class=\"copy-code-button\" onclick=\"copyCode(this)\">
                                                ${copyIcon}
                                            </button>
                                            <span class = \"copy-code-success-message\">
                                                Copied!
                                            </span>
                                        \`
                            codeBlock.innerHTML = htmlCode
                        });
                }

                    function copyCode(event) {
                        const color = "${copyCodeSuccessColors[themeData]}";
                        const codeBlock = event.parentElement;
                        let codeSnippet = codeBlock.querySelector('code').innerText;
                        console.log(codeSnippet);
                        const cb = navigator.clipboard;
                        cb.writeText(codeSnippet).then(() => {
                            const copyMessage = codeBlock.querySelector('.copy-code-success-message');
                            const codeCopyButton = codeBlock.querySelector('.copy-code-button');
                            const codeCopyButtonSVG = codeBlock.querySelector('.copy-code-button svg');
                            copyMessage.style.opacity = 1;
                            copyMessage.style.color = color;
                            codeCopyButton.setAttribute('style', \`border-color: \${color}!important \`);
                            codeCopyButtonSVG.setAttribute('style', \`fill: \${color}!important \`);
                            console.log(codeCopyButton);
                            setTimeout(() => {
                                copyMessage.style.opacity = 0;
                                codeCopyButton.setAttribute('style', 'border-color:#40454C60');
                                codeCopyButtonSVG.setAttribute('style', 'fill:#80858C99');
                            }, 600);
                        });
                    }
                </script>
            </body>
            </html>`;

    return preContent + htmlData + postContent;
}

function generateDiv(markDownData, themeData) {
    let htmlData = xssFilter(converter.makeHtml(markDownData));
    converter.setFlavor("github");
    let styleData;

    styleData = fs.readFileSync(__dirname + `/style-${themeData}.css`);

    let copyIcon = `
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" style="display: block;" transform="scale(0.65)">
                            <g>
                                <g>
                                <path fill="000000" d="M480.6,109.1h-87.5V31.4c0-11.3-9.1-20.4-20.4-20.4H31.4C20.1,11,11,20.1,11,31.4v351c0,11.3,9.1,20.4,20.4,20.4h87.5    v77.7c0,11.3,9.1,20.4,20.4,20.4h341.3c11.3,0,20.4-9.1,20.4-20.4v-351C501,118.3,491.9,109.1,480.6,109.1z M51.8,362V51.8h300.4    v57.3H139.3c-11.3,0-20.4,9.1-20.4,20.4V362H51.8z M460.2,460.2H159.7V150h300.4V460.2z"/>
                                <path fill="000000" d="m233.3,254.4h155.8c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-155.8c-11.3,0-20.4,9.1-20.4,20.4 0,11.2 9.1,20.4 20.4,20.4z"/>
                                <path d="m233.3,396.6h155.8c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-155.8c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4z"/>
                                </g>
                            </g>
                        </svg>
                    `;

    let preContent = `

                <div id='markdown' class='markdown-div'>
            `;

    let postContent =
        `
                </div>
                <style type='text/css'>` +
        styleData +
        `</style>
                <script>
                    const codes = document.querySelectorAll("pre")
                    codes.forEach((codeBlock) => {
                        let htmlCode = codeBlock.innerHTML

                        htmlCode += \`
                                        <button class=\"copy-code-button\" onclick=\"copyCode(this)\">
                                            ${copyIcon}
                                        </button>
                                        <span class = \"copy-code-success-message\">
                                            Copied!
                                        </span>
                                    \`
                        codeBlock.innerHTML = htmlCode
                    });

                    function copyCode(event) {
                        const color = "${copyCodeSuccessColors[themeData]}";
                        const codeBlock = event.parentElement;
                        let codeSnippet = codeBlock.querySelector('code').innerText;
                        console.log(codeSnippet);
                        const cb = navigator.clipboard;
                        cb.writeText(codeSnippet).then(() => {
                            const copyMessage = codeBlock.querySelector('.copy-code-success-message');
                            const codeCopyButton = codeBlock.querySelector('.copy-code-button');
                            const codeCopyButtonSVG = codeBlock.querySelector('.copy-code-button svg');
                            copyMessage.style.opacity = 1;
                            copyMessage.style.color = color;
                            codeCopyButton.setAttribute('style', \`border-color: \${color}!important \`);
                            codeCopyButtonSVG.setAttribute('style', \`fill: \${color}!important \`);
                            console.log(codeCopyButton);
                            setTimeout(() => {
                                copyMessage.style.opacity = 0;
                                codeCopyButton.setAttribute('style', 'border-color:#40454C60');
                                codeCopyButtonSVG.setAttribute('style', 'fill:#80858C99');
                            }, 600);
                        });
                    }
                </script>
            `;

    return preContent + htmlData + postContent;
}

module.exports = {
    generateHTMLPage,
    generateDiv,
};

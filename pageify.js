const fs = require('fs');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");
const xssFilter = require("xss");

const converter = new showdown.Converter({
    tables: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true,
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
                    `

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
                        const color = "#32CE55AA";
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




    return preContent + htmlData + postContent

}

module.exports = {
    generateHTMLPage
}
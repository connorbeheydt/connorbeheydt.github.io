const pug = require('pug');
const showdown = require('showdown');
const fs = require('fs');
const cheerio = require('cheerio');
path = require('path');

console.log("Compiling pug...")

// Convert portfolio post markdown to html
const converter = new showdown.Converter();
if (!fs.existsSync()){
    fs.mkdir(path.join(__dirname, "./site/portfolio-posts/"),
        (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('./portfolio-posts not found, creating...');
        });
}
fs.readdirSync("./src/portfolio-posts/").forEach((filePath) => {
    const  postHtml = converter.makeHtml(fs.readFileSync(`./src/portfolio-posts/${filePath}`, 'utf8').replace(/&gt;+/g, '>'));
    const  pageHtml = pug.renderFile('src/pug/portfolio-post.pug', { postHtml:  postHtml });
    const  fileName = filePath.split('.')[0];
    fs.writeFileSync(`site/portfolio-posts/${fileName}.html`, pageHtml);
});

// Generate Portfolio json
let portfolio_data = {};
fs.readdirSync("./site/portfolio-posts/").forEach((filePath) => {
    const html = cheerio.load(fs.readFileSync(`./site/portfolio-posts/${filePath}`, 'utf8'));
    const title = html("h1").text();
    const desc = html("h2:first").next("p").text();
    const link = "/portfolio-posts/" + filePath;
    const image_src = html("img:first").attr("src");
    portfolio_data[title] = {"description": desc, "link": link, "image_src": image_src}
});
console.log(portfolio_data)

// Compile all pages
fs.readdirSync("./src/pug/pages").forEach((filePath) => {
    let pageHtml = "";
    if (filePath == "portfolio.pug") {
        pageHtml = pug.renderFile(`./src/pug/pages/${filePath}`, {"data": portfolio_data});
    } else {
        pageHtml = pug.renderFile(`./src/pug/pages/${filePath}`);
    }
    const  fileName = filePath.split('.')[0];
    console.log(`  Converting ${filePath} to ${fileName}...`);
    fs.writeFileSync(`site/${fileName}.html`, pageHtml);
});


// Copy assets to site
fs.cp(`src/assets`, `site/assets`, {recursive: true}, (err) => {
    if (err){
        console.log(err);
    }
});


const pug = require('pug');
const showdown = require('showdown');
const fs = require('fs');

//// Compile the source code
//const compiledFunction = pug.compileFile('template.pug');
//// Render a set of data
//let stuff = compiledFunction({
//  name: 'Timothy',
//    test: {
//        p1: 'This is a test text 1',
//        p2: 'This *is* a test text 2'
//    }
//})
//console.log(stuff);

console.log("Compiling pug...")
//const  pageHtml = pug.renderFile('./src/pug/homepage.pug');
//const  fileName = "./site/index.html"
//fs.writeFileSync(fileName, pageHtml);
//fs.writeFileSync("./site/work-experience.html", pug.renderFile('./src/pug/work-experience.pug'));

fs.readdirSync("./src/pug/pages").forEach((filePath) => {
    const  pageHtml = pug.renderFile(`./src/pug/pages/${filePath}`);
    const  fileName = filePath.split('.')[0];
    console.log(`  Converting ${filePath} to ${fileName}...`)
    fs.writeFileSync(`site/${fileName}.html`, pageHtml);
});

// Nav

// Homepage
// Footer


//// This works now!
//const converter = new showdown.Converter();
//fs.readdirSync("./posts/").forEach((filePath) => {
//    const  postHtml = converter.makeHtml(fs.readFileSync(`./posts/${filePath}`, 'utf8'));
//    const  pageHtml = pug.renderFile('src/post.pug', { postHtml:  postHtml });
//    console.log(pageHtml)
//    const  fileName = filePath.split('.')[0];
//    fs.writeFileSync(`site/posts/${fileName}.html`, pageHtml);
//});

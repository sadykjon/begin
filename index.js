// console.log("hello world");
// console.log("hello world");
// const fs = require("fs")
//  const textIn=fs.readFileSync("./txt/input.txt","utf-8")
//  console.log(textIn);
//  const textOut=this is what we know about the avacado: ${textIn}\nCreated on ${new Date()}
//  fs.writeFileSync("./txt/output.txt",textOut)
//  console.log("file written!");

// const fs = require("fs")
//  const textIn=fs.readFileSync("./txt/hello.txt","utf-8")
//  console.log(textIn);
//  const textOut=`Perfect words: ${textIn}\nCreated on ${new Date()}`
//  fs.writeFileSync("./txt/world.txt",textOut)
//  console.log("Написейшен уууууура ура ура ура ура ура ");

// // fs.readFile("./txt/start.txt", "utf-8",(err,data1)=>{
// //     if (err) return console.log("error $%$#%!@#!@%");
// //     console.log(data1);
// //     fs.readFile(./txt/${data1}.txt, "utf-8", (err, data2)=>{
// //         console.log(data2);
// //         fs.readFile(./txt/append.txt, "utf-8", (err, data3)=>{
// //             console.log(data3);
// //             fs.writeFile("./txt/final.txt", ${data2}\n${data3}, 'utf-8',err=>{
// //                 console.log("your file has been written");
// //             })
// //         })
// //     })
// // })


// fs.readFile("./txt/start.txt",'utf-8',(err, data1)=>{
//     if(err) return console.log("Error");
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2)
//         fs.readFile('./txt/append.txt',"utf-8",(err,data3)=>{
//             console.log(data3)
//             fs.writeFile(`./txt/final.txt',${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('your file has been written bitch');
//             })
//             })
//         })
//     })
//     console.log("will read file");

const fs=require("fs")
const http=require('http')
const url=require('url')

const slugify=require('slugify')

const replaceTemplate=(temp, product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output= output.replace(/{%IMAGE%}/g, product.image)
    output= output.replace(/{%FROM%}/g, product.from)
    output= output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output= output.replace(/{%QUANTITY%}/g, product.quantity)
    output= output.replace(/{%PRICE%}/g, product.price)
    output= output.replace(/{%DESCRIPTION%}/g, product.description)
    output= output.replace(/{%ID%}/g, product.id)

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    return output
}












const tempOverviev=fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8")
//  console.log(tempOverviev);

const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8")

// console.log(templCard);
const templProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8")

// console.log(templProduct);


const data=fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
// console.log(data);
const dataObj=JSON.parse(data)



const slugs=dataObj.map((el)=>{
    slugify(el.productName,{
        lower:true
    })
    // console.log(el.productName);
})
// console.log(slugify('Fresh Avocados', {lower:true}));


















const server=http.createServer((req,res)=>{
    // console.log(req);
const {pathname, query}=url.parse(req.url, true)
if(pathname==='/' || pathname==="/overview"){
    res.writeHead(200,{
        'Content-Type': 'text/html'
    })
    const cardsHtml=dataObj
    .map((el)=>replaceTemplate(tempCard,el))
    .join('')
    const output=tempOverviev.replace('{%PRODUCT_CARDS%}',cardsHtml)
    res.end(output)


}else if (pathname==="/product"){
    res.writeHead(200,{
        'Content-Type': 'text/html'
    })
    const product=dataObj[query.id]
    const output=replaceTemplate(templProduct,product)
    res.end(output)



}else if (pathname==="/api"){
    res.writeHead(200,{
        'Content-Type': 'application/json '
    })
    res.end(data)
}else{
    res.writeHead(404,{
        'Content-Type': 'text/html',


    })
    res.end('<h1>page not found!</h1>')
}
})
const PORT=4445
server.listen(PORT,'127.0.0.1', ()=>{
    console.log(`listen to request on port ${PORT}`)
})
// http://127.0.0.1:4445



  
const http = require('http');
const fs = require('fs');
const path = require('path');
const getContentType = require('./utils/contentType');
const formidable = require('formidable');
const mv = require('mv');

const httpServer = http.createServer((req,res)=>{
    if(req.method == "GET"){
            switch (req.url) {
            case "/":
                sendRes("index.html","text/html",res);
                break;
            default:
                sendRes(req.url,getContentType(req.url),res);
                break;
        }
    }else if(req.method == "POST"){
        let oldpath;
        let newpath;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            oldpath = files.filetoupload.path;
            newpath = __dirname+'/static/images/'+files.filetoupload.name;
           mv(oldpath, newpath, function (err) {
            if (err) throw err;
            });
        });
        sendRes("index.html","text/html",res);
    }else{
        res.writeHead(404);
        res.write("404 not found");
        res.end();
        console.log(`error 404 ${url}`);
    }
    
    
}).listen(3000, ()=>{
    console.log('port 3000');
});

function sendRes(url,contentType,res){
    let file = path.join(__dirname +"/static/"+ url)
    fs.readFile(file,(err,content)=>{
        if (err) 
        {
            res.writeHead(404);
            res.write("404 not found");
            res.end();
            console.log(`error 404 ${url}`);
        }
        else
        {
            res.writeHead(200,{'Content-Type':contentType});
            res.write(content);
            res.end();
            console.log(`res 200 ${url}`);
        }
    });
}
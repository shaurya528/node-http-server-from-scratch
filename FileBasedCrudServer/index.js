import { readFileSync } from "fs";
import http from "http"

const server = http.createServer((req,res)=>{
   if(req.url== "/users" && req.method=="GET"){
    try{
        let rawData=readFileSync("./Data.json",'utf-8')
        res.writeHead(200,{'content-type':'application/json'});
        res.end(rawData);
    }catch(err){
        console.error("cant read file",err);
    }
   }else if(req.url.startsWith("/user/") && req.method=="GET"){
    try{
        let id= req.url.split('/')[2];
    let rawData=readFileSync("./Data.json",'utf-8');
     let data= JSON.parse(rawData)
     let user=data[id-1]
     res.writeHead(200,{'content-type':'application/json'});
     res.end(JSON.stringify(user));
     console.log(id);
     console.log(user)

    }catch(err){
     console.error("canot get the user")
    }
   }

})
const PORT=3003;

server.listen(PORT,()=>{
console.log(`http://localhost:${PORT}`)
})
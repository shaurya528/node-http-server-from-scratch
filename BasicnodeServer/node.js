import http from "http"
const PORT =3002;
const Data = {User:["prince ","kavya","cutie"]}
const server = http.createServer((req,res)=>{
if(req.url=="/" && req.method=="GET"){
    res.writeHead(200,{'content-type':'application/json'})
     res.end(JSON.stringify(Data))
    
}else if(req.url=="/push" && req.method=="POST"){
    let body="";
    req.on('data',chunk=>{
          body+=chunk;
    })
    req.on('end',()=>{
        try{
            let parsed= JSON.parse(body);
                if(!parsed.name){
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end( JSON.stringify({message:"username is required"}));
                }
                Data.User.push(parsed.name);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end( JSON.stringify({message:"username succes saved",user:Data.User}));
        }catch(err){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    })
   
}else{
    res.writeHead(404,{'content-type':'application/json'});
    res.end(JSON.stringify({message:"unable to detch your request"}))
}

})
server.listen(PORT,()=>{
console.log("listining")
});
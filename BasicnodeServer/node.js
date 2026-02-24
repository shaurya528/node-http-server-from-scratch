import http from "http"
const PORT =3002;
const server = http.createServer((req,res)=>{
if(req.url=="/"){
    res.end("working")
}

})
server.listen(PORT,()=>{
console.log("listining")
});
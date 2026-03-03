import http from 'http'
import { handleaRoutes } from "./Routes/userRoutes.js";
const server = http.createServer((req,res)=>{
  
handleaRoutes(req,res);
})

const PORT=3003;

server.listen(PORT,()=>{
console.log(`http://localhost:${PORT}`)
})
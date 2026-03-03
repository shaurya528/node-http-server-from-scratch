
import { addUser, deleteUsers, editUser, handleAlluser, handleUserById } from "../Controller/handleRequest.js";

export const handleaRoutes=(req,res)=>{
    if(req.url== "/users" && req.method=="GET"){
        handleAlluser(req,res);
       }else if(req.url.startsWith("/user/") && req.method=="GET"){
        handleUserById(req,res);
       }else if(req.url=="/add" && req.method=="POST"){
        addUser(req,res);
       }
       else if(req.url.startsWith("/user/") && req.method=="PUT"){
       
                  editUser(req,res);
         
    }else if(req.url.startsWith('/user/') && req.method=='DELETE'){
    
       deleteUsers(req,res);
    
    }
    else{
    
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "unable to aceess" }));
    
    }
}
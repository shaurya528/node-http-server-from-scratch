import { readFileSync, writeFileSync } from "fs";
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
   }else if(req.url=="/add" && req.method=="POST"){
    let body="";
    req.on('data',chunk=>{
      body+= chunk.toString();
    })
    req.on('end',()=>{
        if(body){
            try{
                let newUser= JSON.parse(body);
                let raw=readFileSync("./Data.json",'utf-8');
                let user=JSON.parse(raw);
                newUser.id=user.length+1;
                user.push(newUser)
                writeFileSync('./Data.json',JSON.stringify(user,null,2));
                res.writeHead(200)
                res.end(JSON.stringify({message:"succes while adding file"}))
                
            }catch(err){
                console.error("unable to write file");
            }
        }
    })
   }
   else if(req.url.startsWith("/user/") && req.method=="PUT"){
    console.log("Incoming:", req.method, req.url);
    let id =parseInt(req.url.split("/")[2])
    if(!isNaN(id)){
           let body ="";
           req.on('data',chunk=>{
            body+= chunk.toString();
           })
           req.on('end',()=>{
          try{
                let raw=readFileSync('./Data.json','utf-8')
                let users = JSON.parse(raw);
                const updateUser = JSON.parse(body);
                console.log("ID:", id);
console.log("Total users:", users.length);
console.log("users[id-1]:", users[id-1]);
                if(updateUser.id && updateUser.id !== id){
                    res.writeHead(400,{'content-type':'application/json'})
                    return res.end(JSON.stringify({message:"unable to update id"}))
                }
                if(updateUser.name && typeof updateUser.name === 'string'){
                      users[id-1].name= updateUser.name
                }
                if(!isNaN(updateUser.number)){
                    users[id-1].number=updateUser.number
                }
                writeFileSync("./Data.json",JSON.stringify(users,null,2));
                res.writeHead(200,{ 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "User updated successfully" }))

            }catch(err){
                console.error(err); 
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Internal Server Error" }));
            }
           })
    } else{
        res.writeHead(400, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ message: "Invalid ID" }));
    }
}else if(req.url.startsWith('/user/') && req.method=='DELETE'){
const id= parseInt(req.url.split("/")[2]);
if(id){
   try{
    let raw=readFileSync('./Data.json','utf-8')
    let users = JSON.parse(raw);

   const newUser= users.filter(ele=> ele.id != id);
   writeFileSync("./Data.json",JSON.stringify(newUser,null,2));
   res.writeHead(200,{ 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: "User delete successfully" }))
   }catch(err){
    console.error(err); 
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
   }

}





}else{

}

})

const PORT=3003;

server.listen(PORT,()=>{
console.log(`http://localhost:${PORT}`)
})
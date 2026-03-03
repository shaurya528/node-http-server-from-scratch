
import { getAllUsers, getUserByid ,saveUser} from "../module/DataAccess.js";
export const handleAlluser= (req,res)=>{
    try{
        const rawData=getAllUsers();
         res.writeHead(200,{'content-type':'application/json'});
         res.end(JSON.stringify(rawData));
     }catch(err){
         console.error("can not handle user at handleAllUser",err);
     }
}
export const handleUserById =(req,res)=>{
    let id= Number.parseInt(req.url.split('/')[2]);
   if(id){
   try{
    let user = getUserByid(id);
    console.log(id);
    console.log(user)
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(user));
   }catch(err){
          console.log("error in handleusrby id")
   }
   }
}
export const addUser=(req,res)=>{
    let body="";
    req.on('data',chunk=>{
      body+= chunk.toString();
    })
    req.on('end',()=>{
        if(body){
            try{
                let newUser= JSON.parse(body);
                if(!newUser.name){
                    return  res.end(JSON.stringify({message:"please send proper username"}))
                }
                if(!newUser.number ){
                    return  res.end(JSON.stringify({message:"send proper Number "}))
                }
                let user=getAllUsers();
                newUser.id=user.length+1;
                user.push(newUser)
               saveUser(user)
                res.writeHead(201)
                res.end(JSON.stringify({message:"succes while adding file"}))
            }catch(err){
                console.error("unable to write file in adduser");
            }
        }
    })
}
export const editUser=(req,res)=>{

    let id =parseInt(req.url.split("/")[2])
    if(!isNaN(id)){
           let body ="";
           req.on('data',chunk=>{
            body+= chunk.toString();
           })
           req.on('end',()=>{
          try{
                
                let users = getAllUsers()
                const updateUser = JSON.parse(body);
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
               saveUser(users)
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

}
export const deleteUsers=()=>{
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
    
    
    
    
    
    }


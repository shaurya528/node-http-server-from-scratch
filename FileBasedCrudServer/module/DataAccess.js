import path from 'path'
import { readFileSync,writeFileSync } from 'fs'
import { fileURLToPath } from 'url'

const _dirname =path.dirname(fileURLToPath(import.meta.url));
 const Data_file = path.join(_dirname,"..",'Data.json');

 export const getAllUsers = ()=>{
    try{
        const rawData= readFileSync(Data_file,'utf-8');
        return JSON.parse(rawData)
    }catch(err){
       console.log("error reading file",err);
       return [];
    }
 }
 export const saveUser=(user)=>{
    try{
     writeFileSync(Data_file,JSON.stringify(user,null,2))
    }catch(err){
  console.error("error in writing file",err);
    }
 }
 export const getUserByid= (id)=>{
 try{
    const user = getAllUsers();
 return user.find(u=>u.id===id)
 }catch(err){
    console.log("canot read user by id",err);
    return {};
 }
 }
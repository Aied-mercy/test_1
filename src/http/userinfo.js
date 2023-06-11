//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const userinfoPage=(data)=>{
    return instance.request({
     url:'/api/userinfo/page', 
         method:'post',
         data
    })
 }
 const userinfoAdd=(data)=>{
    return instance.request({
     url:'/api/userinfo/add', 
         method:'post',
         data
    })
 }
 const userinfoEdit=(data)=>{
    return instance.request({
     url:'/api/userinfo/edit', 
         method:'post',
         data
    })
 }
 const userinfoDelId=(params)=>{
    return instance.request({
     url:'/api/userinfo/delete', 
         params
    })
 }

export {
    userLogin,
    adminLogin,
    userinfoPage,
    userinfoAdd,
    userinfoEdit,
    userinfoDelId,
} 
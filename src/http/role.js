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
const rolePage=(data)=>{
    return instance.request({
     url:'/api/role/page', 
         method:'post',
         data
    })
 }
 const roleAdd=(data)=>{
    return instance.request({
     url:'/api/role/add', 
         method:'post',
         data
    })
 }
 const roleEdit=(data)=>{
    return instance.request({
     url:'/api/role/edit', 
         method:'post',
         data
    })
 }
 const roleDelId=(params)=>{
    return instance.request({
     url:'/api/role/delete', 
         params
    })
 }

export {
    userLogin,
    adminLogin,
    rolePage,
    roleAdd,
    roleEdit,
    roleDelId,
} 
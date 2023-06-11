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
const permissionPage=(data)=>{
    return instance.request({
     url:'/api/permission/page', 
         method:'post',
         data
    })
 }
 const permissionAdd=(data)=>{
    return instance.request({
     url:'/api/permission/add', 
         method:'post',
         data
    })
 }
 const permissionEdit=(data)=>{
    return instance.request({
     url:'/api/permission/edit', 
         method:'post',
         data
    })
 }
 const permissionDelId=(params)=>{
    return instance.request({
     url:'/api/permission/delete', 
         params
    })
 }

export {
    userLogin,
    adminLogin,
    permissionPage,
    permissionAdd,
    permissionEdit,
    permissionDelId,
} 
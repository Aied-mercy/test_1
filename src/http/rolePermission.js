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
const rolePermissionPage=(params)=>{
    return instance.request({
     url:'/api/rolePermission/all', 
        params
    })
 }
 const rolePermissionAdd=(data)=>{
    return instance.request({
     url:'/api/rolePermission/add', 
         method:'post',
         data
    })
 }
 const rolePermissionEdit=(data)=>{
    return instance.request({
     url:'/api/rolePermission/edit', 
         method:'post',
         data
    })
 }
 const rolePermissionDelId=(params)=>{
    return instance.request({
     url:'/api/rolePermission/delete', 
         params
    })
 }

export {
    userLogin,
    adminLogin,
    rolePermissionPage,
    rolePermissionAdd,
    rolePermissionEdit,
    rolePermissionDelId,
} 
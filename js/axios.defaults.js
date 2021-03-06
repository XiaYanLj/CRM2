//对axios进行二次封装
axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.defaults.withCredentials = true; //配置为true 后台的请求带上cookie
// 数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//仍然使用表单的形式扔给服务器，数据格式改变
axios.defaults.transformRequest = function (data) {
    if(!data) return data;
    let result = '';
    for(let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`
    }
    return result.substring(1);
};
//配置请求拦截器
axios.interceptors.request.use(config =>{
    return config
})
//配置响应拦截器
axios.interceptors.response.use(response=>{
    return response.data;
},reason=>{
    //如果路径出错，返回404 和其他错误...
    // console.dir(reason);
    if(reason.response){
        switch(String(reason.responce.status)){
            case "404":
                alert("当前请求的地址不存在")
                break;
            default:
                break;
        }
    }
    //直接创建一个失败的Promise
    return Promise.reject(reason);
})
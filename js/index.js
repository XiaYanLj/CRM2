$(function(){
    init();

    let $plan = $.Callbacks();
    $plan.add((_,baseInfo)=>{
        //渲染用户信息和实现退出登录
        // console.log("渲染用户信息和实现退出登录:",baseInfo);
        $(".baseBox>span").html(`你好,${baseInfo.name || ''}`)
    })
    //实现退出登录
    $('.baseBox>a').click(async function(){
        let result = await axios.get("/user/signout")
        if(result.code == 0){
            //退出登陆成功
            window.location.href = "login.html"
            return;
        }
        //退出登陆失败
        alert("网络不给力，稍后在试")
    })
    $plan.add((power)=>{
        //渲染菜单
        console.log("渲染菜单:",power);
    })

    async function init() {
        let result = await axios.get("/user/login");
        console.log(result);
        if(result.code !=0 ){
            alert("你还没有登录，请先登录...")
            window.location.href = "login.html";
            return; 
        }
        //登陆成功
        let [power,baseInfo] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        baseInfo.code === 0 ? baseInfo = baseInfo.data : null;
        // console.log(power);
        $plan.fire(power,baseInfo)
    }
})
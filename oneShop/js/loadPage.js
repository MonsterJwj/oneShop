$(function () {
   $(".tableBtn").on("click",function () {
       var $userName = $(".userHead").siblings().val();
       console.log($userName);
       var $pwd = $(".userLock").siblings().val();
       console.log($pwd);
       //验证用户名
       var use=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}|^1[3578]\d{9}$|^[\u4e00-\u9fa5]{2,4}$/;
       //验证密码
       var pwd=/^\w{6,10}$/;

       //判断与文本框的值相同
       if(!use.test($userName)){
           alert('用户名格式不对');
       }else if(pwd.test($pwd)){
           alert("登陆成功")
       }else{
           alert('密码格式不对哦');
       }
   }) ;
});
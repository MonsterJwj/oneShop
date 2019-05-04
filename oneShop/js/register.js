(function(){
    //手机号验证
    $("#phone").on("blur",function(){
        var phone=$(this).val();
        var reg= /^1[3578]\d{9}$/;
        if(!reg.test(phone)){
            $(this).val("手机号不正确");
        }
    });
    $("#phone").on("focus",function(){
        $(this).val("");
    });
    //密码验证
    $("#pass").on("blur",function(){
        var pass=$(this).val();
        //密码不能含有非法字符，长度在4-10之间
        var reg=/^\w{6,10}$/;
        if(!reg.test(pass)){
            $(this).val("密码格式不正确");
        }
    });
    $("#pass").on("focus",function(){
        $(this).val("");
    });

    //确认密码
    $("#passt").on("blur",function(){
        var pass=$(this).parent().prev().val();
        var past=  $(this).val();
        if(pass!==past){
            $(this).val("两次密码不一致");
        }
    });
    $('#passt').on("focus",function(){
        $(this).val("");
    });


// 倒计时效果
    var min=60;
    var timer=null;
    $(".fr").on("click",function(){
        timer=setInterval(function(){
            console.log(1);
            min--;
            if (min>0){
                //在节点输出内容
                $(".fr").text(min+"秒后重新发送");
                $(".fr").disabled=true;
            } else{
                clearInterval(timer);//清除定时器
                $(".fr").text("请重新发送验证码");
                $(".fr").disabled=false;
            }
        },1000);

    });
})();
$(function () {
    //客户服务二级菜单的显示与隐藏
    $(".ss_listBg").hover(function () {
        $(".ss_list_bg").show();
    },function () {
        $(".ss_list_bg").hide();
    });



    //左边导航栏的二级菜单
    $(".leftNav ul>li").hover(function () {
        $(this).find(".zj").show();
    },function () {
        $(this).find(".zj").hide();
    });



    //轮播图动画
    function changeImg() {
        var lis = $(".banner .slide_box").children();
        var numlis = $(".banner .num").children();
        var num = 0;
        var timer = null;
        //公共部分
        var common = function (index) {
            for (var i=0;i<lis.length;i++){
                lis[i].style.display = "none";
                numlis[i].className = "";
            }
                lis[index].style.display = "block";
                numlis[index].className = "active";
                num = index;
        };
        //播放图片
        var autoPlay = function () {
            timer = setInterval(function () {
                num++;
                if (num>lis.length-1){
                    num = 0;
                }
                common(num);
            },1000);
        };
        //鼠标的移动与移出
        var mouse = function () {
            for (var j=0;j<numlis.length;j++){
                //为列表添加一个index属性
                numlis[j].index = j;
                numlis[j].onmouseenter = function () {
                    clearInterval(timer);
                    common(this.index);
                };
                numlis[j].onmouseleave = function () {
                    autoPlay();
                };
            }
        };
        //将函数 返回出去
        return {
            auto:autoPlay,
            mouse:mouse
        }
    }
    //调用函数
    var play = changeImg();
    play.auto();
    play.mouse();




    //购物车
    var timeoutId;
    var $last = $(".last");
    //鼠标的移入与移出
    function fadeOut() {
        timeoutId = setTimeout(function() {
            $last.fadeOut('slow');
        }, 500)
    }
    $('.car_t').hover(function() {
        clearTimeout(timeoutId)
        $last.fadeIn('slow');
    }, fadeOut);

    $last.hover(function() {
        clearTimeout(timeoutId)
    }, fadeOut);

    //声明一个存放数据的
    var newshop = {
        nums:0,
        prices:0,
        shopData:[]
    };

    //初始化数据（从页面获取数据）
    var $lis = $(".i_car .shop>ul>li");
    $lis.each(function (index,item) {
        // console.log(index,item);
        var num = $(item).find(".J_inputCount").val() - 0;
        var price = $(item).find(".J_smallTotalPrice").text().slice(1) - 0;
        // console.log(num,price);
        newshop.shopData.push({
            num: num,
            totalNum: num,
            price: price,
            totalPrice: num * price
        });
    });
    //点击 +
    $(".shop .J_btnAddCount").on("click",function () {
        //获取下标
        var c_index = $(this).parents("li").index();
        var newNum = ++newshop.shopData[c_index].num;
        //改变数据
        changeDate(c_index,newNum);
        //改变页面数据

    });
    //点击 -
    $(".J_btnDelCount").on("click",function () {
        //获取下标  对数据的操作都要用到index
        var c_index = $(this).parents("li").index();
        //--在后，先拿变量去用，用完了再加；--在前，先自加再拿去用
        var newNum = newshop.shopData[c_index].num;
        // if (newNum<=1){
        //     alert("是否要删除该商品？");
        //     return false;
        // }
        --newNum;
        changeDate(c_index,newNum);
        if (newNum <= 0) {
            //  数量为零的时候删除购物车
            var c_index = $(this).parents('li').index();
            $(this).parents('li').remove();
            //删除当前下标和触发点击事件下标相等的数据。只删除一个长度
            newshop.shopData.splice(c_index, 1);
            changeDate(-1);
            if (newshop.shopData.length === 0) {
                $(".shop").hide();
                $(".noshop").show();
            }
        }
    });
    //点击 x
    $(".J_btnDelete").on("click",function () {
        //获取下标  对数据的操作都要用到index
        var c_index = $(this).parents("li").index();
        //删除页面商品信息
        $lis[c_index].remove();
        //删除数据信息
        newshop.shopData.splice(c_index,1);

        changeDate(-1);
        if(newshop.shopData.length===0){
            $(".shop").hide();
            $(".noshop").show();
        }
        // console.log(newshop);
    });
    //购物车公共部分
    //改变数据
    function changeDate(index,num){
        //修改单个商品的数据
        if (index>=0){
            newshop.shopData[index].num = num;
            newshop.shopData[index].totalNum = num;
            newshop.shopData[index].totalPrice = num * newshop.shopData[index].price;
        }
        //修改总计商品数据
        //每次点击+时  都先让总计 和 总价格  变为0
        newshop.nums = 0;
        newshop.prices = 0;
        $.each(newshop.shopData,function (index,item) {
            newshop.prices += item.totalPrice;
            newshop.nums += item.num;
            // console.log(newshop);
        });
        //调用 修改页面信息的函数
        change_html(index);
        console.log(newshop);
    }
    //修改页面数据
    function change_html(index) {
        if (index>=0){
            $lis.eq(index).find(".J_smallTotalPrice").text("￥"+newshop.shopData[index].totalPrice);
            $lis.eq(index).find(".J_inputCount").val(newshop.shopData[index].num);
            $lis.eq(index).find(".J_count").text("共"+newshop.shopData[index].totalNum+"件商品");
        }

        $(".J_totalPrice").text("￥"+newshop.prices);
        $(".J_totalCount").text("("+newshop.nums+")");
    }




    //快讯 轮播广告
    function moveDown(){
        var marginTop = 0;
        var stop = false;
        var timer = setInterval(function(){
            //当鼠标移入的时候停止计时器，因为stop初始值位false所以只有当鼠标移入的时候才会阻止计时器执行
            if(stop) return;
            $("#express").children('li').first().animate({
                    'margin-top':marginTop--
                },0, function(){
                    var first = $(this);
                    if(!first.is(':animated')){
                        if(-marginTop>first.height()){
                            first.css({'margin-top':0}).appendTo($("#express"));
                            marginTop=0;
                        }
                    }
                });
        },50);
        $("#express").hover(function(){
            stop=true;
        },function(){
            stop=false;
        });
    }
    moveDown();
});
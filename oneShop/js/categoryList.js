$(function () {
    var $listBox = $(".cate_list");
    var isDesc = true;
    $("#sortPrice").on("click",function (e) {
        /* 调用多次document.body.append(),每次都要刷新页面一次。效率也就大打折扣了，而使用document_createDocumentFragment()
        创建一个文档碎片,把所有的新结点附加在其上，然后把文档碎片的内容一次性添加到document中,这也就只需要一次页面刷新就可。*/
        var fragment= document.createDocumentFragment();
        var list = $('li', $listBox).toArray();
        var $target = $(e.target);/*返回出此事件的元素*/

        isDesc = !isDesc;
        list.sort(function(li1, li2) {
            var price1 = $('.price span', li1).text().slice(1);//获得每次的价格
            var price2 = $('.price span', li2).text().slice(1);
            var diff = price1 - price2;//获得差价

            return isDesc ? -diff : diff
        });

        $.map(list, function(li) {
            fragment.appendChild(li);  //重新排序添加到list里面去
        });

        $listBox.empty();
        $listBox.append(list);

        return false
    });
});
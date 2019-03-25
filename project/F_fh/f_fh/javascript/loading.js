$(document).ready(function(){
    var $resourceTypeList = $(".ctipslist_wrap");//最外层元素名
//  function item_masonry(){
//      $resourceTypeList.imagesLoaded(function() {
//          $resourceTypeList.masonry({ 
//              itemSelector: ".ctipslist_list"//列表元素类名
//          }).children(".ctipslist_list").css("visibility", "visible");//元素css默认状态为hidden
//      });
//  }
//  item_masonry();
    $resourceTypeList.infinitescroll({
        navSelector     : "#more",
        nextSelector    : "#more a",
        itemSelector    : ".ctipslist_list",
        pixelsFromNavToBottom: 150,   
        clickb          : false,//判断是否点击加载更多
        clickobj        : ".load-more-link",//点击加载更多按钮
        loading:{
            img: "",
            msgText: "",
            finishedMsg: "没有了",
            finished: function(){
                $("#infscr-loading").hide();
            }
        }, errorCallback:function(){
        	$(".load-more-link").hide();
        }

    }, function(newElements){
        var $newElems = $(newElements);
        $resourceTypeList.masonry("appended", $newElems, false).children(".ctipslist_list").css("visibility", "visible");
        $newElems.fadeIn();
        
        return;
    });
})
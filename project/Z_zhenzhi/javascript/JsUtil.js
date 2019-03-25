/**
 * Created by Administrator on 2015/4/7.
 */
var JsUtil;
(function (JsUtil) {
    JsUtil.getImage = getImg;
    var mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
    function getImg(callback,thisRef){
		//egret.ImageLoader.crossOrigin = null;
        var fileType = /^(?:image\/bmp|image\/gif|image\/jpeg|image\/png)$/i;
        var file = document.createElement("input");
        document.body.appendChild(file);
        file.type = "file";
        file.style.display = "none";
        file.accept = "image/*";
        //file.capture = "camera";
        file.click();
        var _dataJson;
        file.addEventListener("change",function(e){//读取文件
            if(!e.target || !e.target.files.length || !e.target.files[0]){
                return;
            }
            var _file = e.currentTarget.files[0];
            if(!fileType.test(_file.type)){
                return;
            }
            EXIF.getData(_file,function(){
                //var _dataTxt = EXIF.pretty(this);
                _dataJson = JSON.stringify(EXIF.getAllTags(this));
                var _orientation = EXIF.getTag(this,"Orientation");//
        });
            onFile.readAsDataURL(_file);
        },false);

        var onFile = new FileReader();
        onFile.onload = function  (e) {//文件读取完毕
            //$("img")[0].src = e.currentTarget.result;
            var re = /^data:base64,/;
            var ret = this.result + '';
            //console.log(ret);
            if (re.test(ret)) {
                ret = ret.replace(re, 'data:' + mime[type] + ';base64,');
            }
            getImgComplete(ret);
            //console.log(ret);
        }
        function getImgComplete(url){
            //console.log("dataJson" + _dataJson);
            if(callback){
                callback(thisRef,url,_dataJson);
            }
			//egret.ImageLoader.crossOrigin = "anonymous";
        }
    }
    function showImg(src){
        document.getElementById("imgResult").src = src;
        document.getElementById("imgResult").style.display = "";
    }
    JsUtil.showImg = showImg;
    function hiddenImg(){
        document.getElementById("imgResult").style.display = "none";
    }
    JsUtil.hiddenImg = hiddenImg;
    JsUtil.callPhone = callPhone;
    function callPhone(tel){
       var dom= document.createElement("a");
        dom.href= "tel:" + tel;
        dom.click();
    }
	 /**
     * 判断是否为微信客户端
     */
	 function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    JsUtil.isWeiXin = isWeiXin;
    /**
     * 弹出框提示文字
     * @param msg  内容
     */
    function share(msg) {
        alert(msg);
    }
    JsUtil.share = share;
    /**
     * 显示分享层
     */
    function shareDiv(divId,imgId,imgsorce,type){
        document.getElementById(divId).style.display="block";
        if(type == 1){
            document.getElementById("BtnDiv").style.display="block";
            document.getElementById("BtnDiv2").style.display="none";
            document.getElementById(imgId).src = imgsorce;
            //document.getElementById(divId).className ="fadeInDiv";
            //document.getElementById("btn1").className ="fadeIn1";
            //document.getElementById("btn2").className ="fadeIn2";
            //document.getElementById("btn3").className ="fadeIn3";
        }else if(type == 0){
            document.getElementById("BtnDiv").style.display="block";
            //document.getElementById(divId).className ="showFade";
            //document.getElementById("btn1").style.opacity ="1";
            //document.getElementById("btn2").style.opacity ="1";
            //document.getElementById("btn3").style.opacity ="1";
            //document.getElementById("btn1").className ="";
            //document.getElementById("btn2").className ="";
            //document.getElementById("btn3").className ="";
        }else{
            document.getElementById(imgId).src = imgsorce;
            //document.getElementById(divId).className ="fadeInDiv";
            document.getElementById("BtnDiv2").style.display="block";
            document.getElementById("BtnDiv").style.display="none";
        }
    }
    JsUtil.shareDiv = shareDiv;

    /**
     * 隐藏分享层
     */
    function shareHidden(divId){
        document.getElementById(divId).style.display="none";
        document.getElementById(divId).className ="hiddenFade";
        document.getElementById("btn1").className ="hiddenFade";
        document.getElementById("btn2").className ="hiddenFade";
        document.getElementById("btn3").className ="hiddenFade";
        document.getElementById("BtnDiv2").style.display="block";
        document.getElementById("BtnDiv").style.display="none";
    }
    JsUtil.shareHidden = shareHidden;

    /**
     * 显示层
     * @param divId
     */
    function showDiv(divId){
        document.getElementById(divId).style.display="";
    }
    JsUtil.showDiv = showDiv;

    /**
     * 隐藏层
     * @param divId
     */
    function hideDiv(divId){
        document.getElementById(divId).style.display="none";
    }
    JsUtil.hideDiv = hideDiv;
	
	 /**
     * 播放声音
     * @param audioId 要播放的音频ID
     */
    function audioPlay(audioId){
         var audio = document.getElementById(audioId);
         audio.volume=1;
         audio.play();
    }
    JsUtil.audioPlay = audioPlay;
    /**
     * 暂停声音
     * @param audioId 要暂停的音频ID
     */
    function audioPause(audioId){
        var audio = document.getElementById(audioId);
        audio.pause();
    }
    JsUtil.audioPause = audioPause;
    /**
     * 播放视频
     * @param videoId 要播放的视频ID
     */
    function videoPlay(videoId){
        var videodiv = document.getElementById("videodiv");
        videodiv.style.top="0";
        videodiv.style.display="block";

        var video = document.getElementById("video");
        video.currentTime=0;
        video.style.display = "";
        video.play(0);
		

        var close = document.getElementById("close");
        close.style.display = "";

        video.addEventListener("ended", videoEnd2);
        egret.setTimeout(function(){
            video.addEventListener("pause", videoEnd1);
        },this,1000);
    }
    //var _panduan=false;
    function videoEnd1(){
        var video = document.getElementById("video");
        if(video.currentTime<=10){
            video.style.display = "none";
            var videodiv = document.getElementById("videodiv");
            videodiv.style.display="none";
            easy.MyEvent.sendEvent("VIDEO_END");
        }
    }
    function videoEnd2(){
        var videodiv = document.getElementById("videodiv");
        videodiv.style.display="none";
        var video = document.getElementById("video");
        video.style.display = "none";
        easy.MyEvent.sendEvent("VIDEO_END");
    }

    JsUtil.videoPlay = videoPlay;
    function launchFullscreen(element)
    {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        }
        else if(element.webkitRequestFullscreen)
        {
            element.webkitRequestFullScreen();
        }else{

            var docHtml  = document.documentElement;
            var docBody  = document.body;
            var videobox  = document.getElementById('videobox');
            var  cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
            document.IsFullScreen = true;

        }
    }

    /**
     * 暂停视频
     * @param videoId 要暂停的视频ID
     */
    function videoPause(videoId){
        var videodiv = document.getElementById("videodiv");
        videodiv.style.display="none";
        var video = document.getElementById("video");
        video.style.display = "none";
        var close = document.getElementById("close");
        close.style.display = "none";
        video.pause();
        easy.Debug.log = "videoPause";
    }
    JsUtil.videoPause = videoPause;


    /**
     * 取cookie内容
     * @param name cookie的名称
     * @returns {*}  cookie的值
     */
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return "";
    }
    JsUtil.getCookie = getCookie;

    /**
     * 写入cookie
     * @param name 名称
     * @param value  值
     */
    function setCookie(name,value){
        var Days = 1; //此 cookie 将被保存 1 天
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    JsUtil.setCookie = setCookie;

    /**
     * 获取url中的参数值
     * @param name
     * @returns {*}
     */
    function getUrlByName(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        if (location) {
            var r = location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(decodeURIComponent(decodeURI(r[2])));
            }
        }
        return "";
    }
    JsUtil.getUrlByName = getUrlByName;

    JsUtil.DownLoadReportIMG = DownLoadReportIMG;
    //JsUtil.DoSaveAsIMG = DoSaveAsIMG;

    function DownLoadReportIMG(imgPathURL) {

        //如果隐藏IFRAME不存在，则添加
        if (!document.getElementById("IframeReportImg"))
            $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" ;" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
        if (document.all.IframeReportImg.src != imgPathURL) {
            //加载图片
            document.all.IframeReportImg.src = imgPathURL;
        }
        else {
            //图片直接另存为
            if (document.all.IframeReportImg.src != "about:blank")
                document.frames("IframeReportImg").document.execCommand("SaveAs");

        }
    }
    JsUtil.SaveAs5 = SaveAs5;
    function SaveAs5(imgURL)
    {
        var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
        for(; oPop.document.readyState != "complete"; ){
            if (oPop.document.readyState == "complete")break;
        }
        oPop.document.execCommand("SaveAs");
        oPop.close();
    }
    JsUtil.Savepic = Savepic;
    function Savepic(){
        window.location="javascript:Ai7Mg6P='';for%20(i7M1bQz=0;i7M1bQz<document.images.length;i7M1bQz++){Ai7Mg6P+='<img%20src='+document.images[i7M1bQz].src+'><br>'};if(Ai7Mg6P!=''){document.write('<center>'+Ai7Mg6P+'</center>');void(document.close())}else{alert('No%20images!')}"
    }
    //function showImg(src){
    //    document.getElementById("imgResult").src = src;
    //}
    //JsUtil.showImg = showImg;
    //function DoSaveAsIMG() {
    //    if (document.all.IframeReportImg.src != "about:blank")
    //        document.frames("IframeReportImg").document.execCommand("SaveAs");
    //}
})(JsUtil || (JsUtil = {}));


var WeiXinUtil;
(function (WeiXinUtil) {
    /**
     * 分享到朋友圈
     * @param title 分享标题
     * @param link 分享链接
     * @param imgUrl 分享图标
     */
    function stateQR(show,div){
       if(show){
           $("#code"+div).show();
       }else{
           $("#code"+div).hide();
       }
    }
    WeiXinUtil.stateQR=stateQR;
    function share_onMenuShareTimeline(title,link,imgUrl){
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    JsUtil.share_onMenuShareTimeline = share_onMenuShareTimeline;

    /**
     * 分享给朋友
     * @param title 分享标题
     * @param desc 分享描述
     * @param link 分享链接
     * @param imgUrl 分享图标
     * @param type 分享类型
     * @param dataUrl
     */
    function share_onMenuShareAppMessage(title,desc,link,imgUrl,type,dataUrl){
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type, // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    JsUtil.share_onMenuShareAppMessage = share_onMenuShareAppMessage;
    function wx_chooseImage(successFuc,thisFuc){
        wx.chooseImage({
            count:1,
            sizeType:["original","compressed"],
            sourceType:["album","camera"],
            success:function(res){
                var localIds = res.localIds;
                wx.uploadImage({
                    localId:localIds[0],
                    isShowProgressTips:1,
                    success:function(res){
                        var serverId = res.serverId;
                        successFuc.call(thisFuc,serverId);
                    }
                })
            }
        })
    }
    WeiXinUtil.wx_chooseImage = wx_chooseImage;

})(WeiXinUtil || (WeiXinUtil = {}));


function launchFullscreen(element)
    {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        }
        else if(element.webkitRequestFullscreen)
        {
            element.webkitRequestFullScreen();
        }else{

            var docHtml  = document.documentElement;
            var docBody  = document.body;
            var videobox  = document.getElementById('videobox');
            var  cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
            document.IsFullScreen = true;

        }
    }

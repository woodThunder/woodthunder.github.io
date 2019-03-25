$(function () {
    //获取短信验证码
    var times = 10;
        function roof(){
            if(times == 0){
                $('.yzm').text('获取短信验证码('+times+'s)');
                $('.yzm').prop('disabled',false);
                $('.yzm').text('获取短信验证码');
                times = 10;
                return
            }
            $('.yzm').text('获取短信验证码('+times+'s)');
            times--;
            setTimeout(roof,1000);
        }
        $('.yzm').on('click',function(){            
            $(this).prop('disabled',true);
            roof();
        });







      //日期选择
      var currYear = (new Date()).getFullYear();  
      var opt={};
      opt.date = {preset : 'date'};
      opt.default = {
        theme: 'android-ics light', //皮肤样式
            //display: 'modal', //显示方式 
            display: 'bottom',
            mode: 'scroller', //日期选择模式
            lang:'zh',
            startYear:currYear - 50, //开始年份
            endYear:currYear + 50, //结束年份
            onSelect: function (value) {
                //点击确定触发的事件
                //alert(111)
            }
      };
      $("#birthday").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));

      //宝宝性别选择
      /*$("#babysex").mobiscroll().select({
                    theme: 'android-ics light',
                    mode: 'scroller',
                    display: 'bottom',
                    lang: 'zh',
                    placeholder: '宝宝性别',//placeholder
                    inputClass:'ui-inp_c1', //为插件生成的input添加样式
                    inputName:'inp_p1',
                    headerText: '选择宝宝性别',
                    onSelect: function(value) {
                        //点击确定触发事件                    
                    }
      });*/
      $("#babysex").mobiscroll().treelist({
            theme: "android-ics light",
            mode: 'scroller',
            display: 'bottom',
            lang: 'zh',
            //fixedWidth: [100,100,100],//3组滚动框的宽度  
            placeholder: '宝宝性别',//placeholder
            inputClass: 'tmp',
            labels: ['省', '市', '区'],
            rows:5,//滚动区域内的行数  
            showLabel:false,//是否显示labels  
            headerText: '选择宝宝性别',
            onSelect: function(valueText, inst) {
                var n = inst.getValue();
                var $list=$(this).children("li").eq(n[0]);
                var m1_id = $list.find("div").attr("data-value");
                /*var m2_id = $list.find("span").eq(n[1]).attr("data-value");
                var m3_id = $list.find("span").eq(n[1]).next().find('li').eq(n[2]).attr("data-value");
                var value =  valueText.split('');             
                console.log(valueText,m1_id,value[0],m2_id,value[1],m3_id,value[2]);  */              
            },
            formatResult: function (data) {
                //自定义输出内容
                var $div = $("#babysex").children("li").eq(data[0]);   
                return $div.find('div').text()
               // return $div.find('div').text() + ' ' + $div.find('span').eq(data[1]).text()+ ' '+ $div.find('span').eq(data[1]).next().find('li').eq(data[2]).text();
            } 
        });
        $("input[id^=babysex]").focus();
        $("#babysex").mobiscroll('hide');


      //所在城市地选择      
      $("#current-area-list").mobiscroll().treelist({
            theme: "android-ics light",
            mode: 'scroller',
            display: 'bottom',
            lang: 'zh',
            fixedWidth: [100,100,100],//3组滚动框的宽度  
            placeholder: '所在城市',//placeholder
            inputClass: 'tmp',
            labels: ['省', '市', '区'],
            rows:5,//滚动区域内的行数  
            showLabel:false,//是否显示labels  
            headerText: '请选择所在城市地',
            onSelect: function(valueText, inst) {
                var n = inst.getValue();
                var $list=$(this).children("li").eq(n[0]);
                var m1_id = $list.find("div").attr("data-value");
                var m2_id = $list.find("span").eq(n[1]).attr("data-value");
                var m3_id = $list.find("span").eq(n[1]).next().find('li').eq(n[2]).attr("data-value");
                var value =  valueText.split('');             
                console.log(valueText,m1_id,value[0],m2_id,value[1],m3_id,value[2]);                
            },
            formatResult: function (data) {
                //自定义输出内容
                var $div = $("#current-area-list").children("li").eq(data[0]);   
                return $div.find('div').text() + ' ' + $div.find('span').eq(data[1]).text()+ ' '+ $div.find('span').eq(data[1]).next().find('li').eq(data[2]).text();
            } 
        });
        $("input[id^=current-area-list]").focus();
        $("#current-area-list").mobiscroll('hide');
        //end
})
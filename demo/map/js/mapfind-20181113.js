//var mapprefix = 'http://192.168.1.250/gxhy';
//var mapprefix = 'http://www.guangxinhongye.com';
var mapprefix = '';
function LocalControl() {
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(20, 20);
}

// 通过JavaScript的prototype属性继承于BMap.Control
LocalControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
LocalControl.prototype.initialize = function (map) {
    // 创建一个DOM元素
    var div = $('<div class="nvbtns" style="z-index:5000;width:40px; cursor:pointer; font-size:0;">'+
	    '<img src="'+ mapprefix +'images/map/default/dt.png"  data-w="地铁" data-i="dt">' + 
        '<img src= "'+ mapprefix +'images/map/default/gj.png" data-w="公交" data-i="gj">' + 
        '<img src= "'+ mapprefix +'images/map/default/cs.png" data-w="超市" data-i="jsf">' + 
        '<img src= "'+ mapprefix +'images/map/default/yh.png" data-w="银行" data-i="yh">' + 
        '<img src= "'+ mapprefix +'images/map/default/jd.png" data-w="酒店"  data-i="jd">' + 
        '<img src= "'+ mapprefix +'images/map/default/ct.png" data-w="餐厅" data-i="ct"></div>');
    // 将DOM元素返回
    map.getContainer().appendChild(div[0]);
    $(div).find('img').click(function () {
        //初始化
        $.each($(div).find('img'), function (i, v) {
            if ($(v).attr('src').indexOf('click') > 0) {
                var temp = $(v).attr('src');
                $(v).attr('src', temp.replace('click', 'default'));
            }
        });
        //替换当前
        var src = $(this).attr('src');
        if (src.indexOf('default') > 0) {
            $(this).attr('src', src.replace('default', 'click'));
            Map.search($(this).attr('data-w'), $(this).attr('data-i'))
        }
    });
    return div[0];
};
function LocalControl2() {
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(100, 10);
}
LocalControl2.prototype = new BMap.Control();
LocalControl2.prototype.initialize = function (map) {
    // 创建一个DOM元素
    var div = $('<div class="nvbtns"  style="z-index:5000"><img id="panoramabtn" src="'+ mapprefix +'/image/map/default/jj.png" data-type="jj">' + '&nbsp;' +
        '<img src="'+ mapprefix +'/image/map/default/wx.png" data-type="wx">' + '&nbsp;' +
        '<img src="'+ mapprefix +'/image/map/click/pmt.png" data-type="pmt"></div>');
    // 将DOM元素返回
    map.getContainer().appendChild(div[0]);
    $(div).find('img').click(function () {
        //初始化
        $.each($(div).find('img'), function (i, v) {
            if ($(v).attr('src').indexOf('click') > 0) {
                var temp = $(v).attr('src');
                $(v).attr('src', temp.replace('click', 'default'));
            }
        });
        //替换当前
        var src = $(this).attr('src');
        if (src.indexOf('default') > 0) {
            $(this).attr('src', src.replace('default', 'click'));
            var type = $(this).attr('data-type');
            if (type == 'wx') {
                Map.panoramahide();
                map.setMapType(BMAP_HYBRID_MAP);
            } else if (type == 'pmt') {
                Map.panoramahide();
                map.setMapType(BMAP_NORMAL_MAP);
            } else if (type == 'jj') {
                Map.panoramashow();
                $('.nvbtns').css('z-index', 5000);
            }
        }
    });
    return div[0];
};
var Map = {
    map: null,
    markers: [],//标注点数组
    circle: null,
    markerClusterer: null,
    currentinfobox: null,
    defaultcenterdpoint: null,//坐标点
    markerico: new BMap.Icon(mapprefix + "images/map/ico/local.png", new BMap.Size(42, 58)),
    markerico2: new BMap.Icon(mapprefix + "images/map/ico/local2.png", new BMap.Size(20, 27)),
    ctico: new BMap.Icon(mapprefix + "images/map/ico/canting.png", new BMap.Size(31, 41)),
    dtico: new BMap.Icon(mapprefix + "images/map/ico/ditie.png", new BMap.Size(31, 41)),
    gjico: new BMap.Icon(mapprefix + "images/map/ico/gongjiao.png", new BMap.Size(31, 41)),
    jdico: new BMap.Icon(mapprefix + "images/map/ico/jiudian.png", new BMap.Size(31, 41)),
    jsfico: new BMap.Icon(mapprefix + "images/map/ico/chaoshi.png", new BMap.Size(31, 41)),
    yhico: new BMap.Icon(mapprefix + "images/map/ico/yinhang1.png", new BMap.Size(31, 41)),
    currentpanorama: null,
    init: function (x, y, z, c, tiltle) {
        var self = this;
        map = new BMap.Map("td1", {enableMapClick: false});
        map.centerAndZoom(new BMap.Point(x, y), z);
        
        if (!c) {
        	console.log(false)
            self.addcontrol();
            map.enableScrollWheelZoom();
            map.setMinZoom(11);
            map.setMaxZoom(18);
        } else {
            self.addcontrol();
            map.addControl(new LocalControl());
           // map.addControl(new LocalControl2());//地图内地图模式切换图标
            map.setMinZoom(11);
            map.setMaxZoom(18);
            map.disableScrollWheelZoom();//禁用滚轮放大缩小
            //map.disableDragging();
            map.disableDoubleClickZoom();//禁用双击放大
            var pt = new BMap.Point(x, y);// 创建点坐标  
            self.defaultcenterdpoint = pt; //把坐标点赋值给私有变量defaultcenterdpoint
            var marker2 = self.getmarker(pt, {'x': x, 'y': y, 'title': tiltle, 'content': '', ico: self.markerico});//创建标注
            self.addclickhandler(marker2);//给标注添加mouseover事件
            map.addOverlay(marker2);// 将标注添加到地图中 
            new BMap.PanoramaService().getPanoramaByLocation(pt, function (data) {
                if (data == null) {
                    $('#panoramabtn').hide();
                }
            });
            //var panorama = new BMap.Panorama("td"); //默认为显示导航控件
            //panorama.setPosition(map.getCenter());
            ////map.addControl(new BMap.PanoramaControl())
            //self.currentpanorama = panorama;
            //if (panorama) {
            //    panorama.hide();
            //} else {
            //    $('#panoramabtn').hide();
            //}
            //map.disableInertialDragging();
        }
    },
    //添加平移缩放控件
    addcontrol: function () {
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE
            // 启用显示定位
            //enableGeolocation: true
        });
        map.addControl(navigationControl);
    },
    load: function (data) {
        var self = this;
        self.addmarkers(data);
    },
    addmarkers: function (data) {
        var self = this;
        for (var i = 0; i < data.length; i++) {
            var x = data[i].x;
            var y = data[i].y;
            var pt = new BMap.Point(x, y);
            var marker = self.getmarker(pt, data[i]);
            //marker.setIcon(self.markerico);
            //marker.title = data[i].title;
            //marker.content = data[i].content;
            //marker.id = data[i].id;
            //marker.cb = data[i].callback;
            self.addclickhandler(marker);
            self.markers.push(marker)
        }
    },
    getmarker: function (pt, data) {
        var marker = new BMap.Marker(pt);
        //marker.setIcon(self.markerico);
        marker.title = data.title;
        marker.content = data.content;
        marker.id = data.id;
        marker.cb = data.callback;
        if (data.ico) {
            marker.setIcon(data.ico)
        } else {
            marker.setIcon(this.markerico2);
        }
        return marker;
    },
    addclickhandler: function (marker) {
        var self = this;
        marker.addEventListener("mouseover", function (e) {
                var p = e.target;
                content = self.getinfoboxhtml(marker.title, marker.content, marker.id, marker.cb);
                var infobox = new BMapLib.InfoBox(map, content, {
                    closeIconUrl: mapprefix +  'images/close.png',
                    closeIconMargin: '15px 16px auto auto'
                });
                infobox.addEventListener("open", function (e) {
                    if (window.Map.currentinfobox != null) {
                        window.Map.currentinfobox.close();
                    }
                    window.Map.currentinfobox = e.target;
                });
                infobox.addEventListener("close", function (e) {
                    window.Map.currentinfobox = null;
                });
                infobox.enableAutoPan();
                infobox.open(marker);
            }
        );
        //marker.addEventListener("mouseout", function (e) {
        //    setTimeout(function () {
        //        if (window.Map.currentinfobox != null) {
        //            window.Map.currentinfobox.close();
        //        }
        //    }, 500);
        //});
    },
    getinfoboxhtml: function (title, content, id, cb) {
        if (cb) {
            title = '<a target="_bank" href="' + cb + '" class="maplink">' + title + '</a>';
            content = '符合查询条件' + content + '套</br>';
        }
        return '<img src="'+mapprefix + 'images/box_top.png" width="228" height="16">' +
            '<div style="width:228px;background:url('+mapprefix + 'images/box_content.png) repeat-y;background-size: 228px 100%;margin-top: -6px;padding: 5px 0;"> ' +
            '   <p style="margin: auto;width:185px;font-size: 18px;color: #555;font-weight: bold;">' + title + '</p>' +
            '   <p style="margin: auto;width:181px;word-break: break-all;white-space:normal;overflow:auto;font-size: 14px;color: #999999;margin-top: 5px;line-height: 20px;">' +
            content +
            '</div> ' +
            '<img src="'+mapprefix + 'images/box_bottom.png" width="228" height="22">';
    },
    showmarkers: function () {
        var self = this;
        self.markerClusterer = new BMapLib.MarkerClusterer(map, {markers: self.markers});
        self.markerClusterer.setMaxZoom(14);
    },
    clearmarkers: function () {
        var self = this;
        if (self.markerClusterer != null) {
            self.markers = [];
            self.markerClusterer.clearMarkers();
        }
    },
    search: function (word, ico) {
        var self = this;
        if (word.length == 0) {
            if (self.local != null) {
                local.clearResults();
            }
            map.removeOverlay(self.circle);
            self.circle = null;
        } else {
            if (self.circle == null) {
                self.circle = new BMap.Circle(self.defaultcenterdpoint, 1000, {//创建圆覆盖物
                    fillColor: "blue",
                    strokeWeight: 1,
                    fillOpacity: 0.15,
                    strokeOpacity: 0.2
                });
                map.addOverlay(self.circle);
            }
            if (self.local != null) {
                self.local.clearResults();
            } else {
                self.local = new BMap.LocalSearch(map, {});//用于位置检索、周边检索和范围检索
            }
            self.panoramahide();
            self.local.searchNearby(word, self.circle.getCenter(), 1000);//根据中心点、半径与检索词发起周边检索
            self.local.setSearchCompleteCallback(function (results) {//设置检索结束后的回调函数
                console.log(results);
                var s = [];
                for (var i = 0; i < results.getCurrentNumPois(); i++) {//getCurrentNumPois()返回当前页的结果数
                    var temp = results.getPoi(i);
                    //console.log(temp);
                    if (ico == 'gj') {
                        ico = self.gjico;
                    } else if (ico == 'ct') {
                        ico = self.ctico;
                    } else if (ico == 'dt') {
                        ico = self.dtico
                    } else if (ico == 'jd') {
                        ico = self.jdico;
                    } else if (ico == 'yh') {
                        ico = self.yhico;
                    } else if (ico == 'jsf') {
                        ico = self.jsfico;
                    }
                    s.push({
                        'title': temp.title, 'content': temp.address, 'x': temp.point.lng, 'y': temp.point.lat,
                        'ico': ico
                    });
                }
                self.clearmarkers();
                self.addmarkers(s);
                self.showmarkers();
            })
        }
    },
    panoramacreate: function () {
        var self = this;
        var panorama = new BMap.Panorama("td"); //默认为显示导航控件
        panorama.setPosition(map.getCenter());
        self.currentpanorama = panorama;
    },
    panoramashow: function () {
        var self = this;
        
		if (self.currentpanorama != null) {
            
			self.panoramacreate(); //后加的
			self.currentpanorama.show()
        } else {
           
			self.panoramacreate();
        }
    },
    panoramahide: function () {
        var self = this;
        if (self.currentpanorama != null) {
            self.currentpanorama.hide();
        }
    }
};
var map;
var layers = {};
var OLSM;
var roadViewMode =false;
var gubun;
var gubun2;
var fid;

var pointX;
var pointY;
var pointPnu;

var backUrl;

var OLSProxy='../mapApi.jsp?resourceUrl=';

var currentSearchMode ='';

//레이어 검색
var search_layer = ["허가신고공","불용공","공공관정","민방위비상급수시설","온천"];

var lang_kor = {
    "decimal" : "",
    "emptyTable" : "데이터가 없습니다.",
    "info" : "_START_ - _END_ (총 _TOTAL_ 건)",
    "infoEmpty" : "0건",
    "infoFiltered" : "(전체 _MAX_ 건 중 검색결과)",
    "infoPostFix" : "",
    "thousands" : ",",
    "lengthMenu" : "_MENU_ 건씩 보기",
    "loadingRecords" : "로딩중...",
    "processing" : "처리중...",
    "search" : "검색 : ",
    "zeroRecords" : "검색된 데이터가 없습니다.",
    "paginate" : {
        "first" : "첫 페이지",
        "last" : "마지막 페이지",
        "next" : "다음",
        "previous" : "이전"
    },
    "aria" : {
        "sortAscending" : " :  오름차순 정렬",
        "sortDescending" : " :  내림차순 정렬"
    }
};

var identifyLayerArray = ['허가신고공','불용공','공공관정','국가지하수관측망','수질측정망','민방위비상급수시설','온천공'];

var well_ly_tb = "<table id='datatables' class='display' style='width:100%'><thead><tr><th>허가신고번호</th><th>관정주소</th><th>허가신고형태</th><th>용도</th><th>음용여부</th><th>양수능력</th><th>굴착심도</th><th>굴착직경</th><th>동력장치마력</th><th>토출관직경</th><th>설치심도</th></tr></thead></table>";
var well_ly_col = [{ "data": "permNtNo" },{ "data": "address" },{ "data": "formcd" },{ "data": "srvcd" },{ "data": "pota" },{ "data": "cap" },{ "data": "digDph" },{ "data": "digDiam"},{"data":"dynEqnHrp"},{"data":"pipeDiam"},{"data":"esbDph"}];
var well_ly_url = "searchLayerWell.do";

var bul_ly_tb ="<table id='datatables' class='display' style='width:100%'><thead><tr><th>허가신고번호</th><th>관정주소</th><th>허가신고형태</th><th>용도</th><th>음용여부</th><th>양수능력</th><th>굴착심도</th><th>굴착직경</th><th>동력장치마력</th><th>토출관직경</th><th>설치심도</th></tr></thead></table>";
var bul_ly_col = [{ "data": "permNtNo" },{ "data": "address" },{ "data": "formcd" },{ "data": "srvcd" },{ "data": "pota" },{ "data": "cap" },{ "data": "digDph" },{ "data": "digDiam"},{"data":"dynEqnHrp"},{"data":"pipeDiam"},{"data":"esbDph"}];
var bul_ly_url ="searchLayerBY.do";

var gg_ly_tb ="<table id='datatables' class='display' style='width:100%'><thead><tr><th>허가신고번호</th><th>관정주소</th><th>허가신고형태</th><th>용도</th><th>양수능력</th><th>연사용량</th><th>굴착직경</th><th>펌프마력</th><th>토출관직경</th></tr></thead></table>";
var gg_ly_col = [{ "data": "permNtNo" },{ "data": "address" },{ "data": "formcd" },{ "data": "srvcd" },{ "data": "cap" },{ "data": "yqua" },{ "data": "digDiam" },{ "data": "pumpHrp" },{ "data": "pipeDiam" }];
var gg_ly_url ="searchLayerGG.do";

var mb_ly_tb ="<table id='datatables' class='display' style='width:100%'><thead><tr><th>비상시설관리번호</th><th>건물명</th><th>주소</th><th>시설구분</th><th>규모</th><th>수질등급</th></tr></thead></table>";
var mb_ly_col = [{ "data": "facNo" },{ "data": "facNm" },{ "data": "jaddress" },{ "data": "facCd" },{ "data": "facScp" },{ "data": "wtGd"}];
var mb_ly_url ="searchLayerMb.do";

var hspr_ly_tb ="<table id='datatables' class='display' style='width:100%'><thead><tr><th>상호</th><th>주소</th><th>사용유무</th><th>1일허가량</th><th>채수량</th></tr></thead></table>";
var hspr_ly_col = [{ "data": "onchSangho" },{ "data": "onchAddr" },{ "data": "rem" },{ "data": "allowDay" },{ "data": "yield" }];
var hspr_ly_url ="searchLayerHspr.do";

//whpa
var whpaAction;

//면적, 거리 재기, 반경 검색
var measureActivation;	
var measureTooltip;
var measureTooltipElement;	
var sketch;

//개발가능량
var devavailActivation;

//레이어검색
var searchLayerActivation;

//영역검색
var intersectActivation;

//영향반경
var selectFeature;
var influeActivation;

//좌표변환
var exchangeActivation;

//지적도 pnu
var selectedPnu;

//주소 검색
var addressActivation;

//인허가검토
var inheoActivation;

//정보조회
var indentifyActiVation;
var exceptLayer =['vworld','satellite','hybrid','vector','inheoLayer'];

//이전 다음
var nav_his = [];
var size = -1;
var undo_redo = false;

var mapCenter = [126.6359336,36.5553426];

proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
ol.proj.setProj4 = proj4;

proj4.defs("EPSG:5181","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
ol.proj.setProj4 = proj4;

proj4.defs("EPSG:5186","+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
ol.proj.setProj4 = proj4;

proj4.defs("EPSG:5174","+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");
ol.proj.setProj4 = proj4;

//브이월드 일반지도
layers['vworld'] = new ol.layer.Tile({
	name : 'vworld',
    title : 'vworld',
    visible : true,
    type : 'base',
    preload: 0,
    source : new ol.source.XYZ({
        url : OLSProxy + 'http://xdworld.vworld.kr:8080/2d/Base/201710/{z}/{x}/{y}.png'
    })
});

//브이월드 위성영상
layers['satellite'] = new ol.layer.Tile({
	name : 'satellite',
    title : 'satellite',
    visible : false,
    type : 'base',
    preload: 0,
    source : new ol.source.XYZ({
        url : OLSProxy + 'http://xdworld.vworld.kr:8080/2d/Satellite/201710/{z}/{x}/{y}.jpeg'
    })
});

//브이월드 하이브리드
layers['hybrid'] = new ol.layer.Tile({
	name : 'hybrid',
	title : 'hybrid',
	visible : false,
	type : 'base',
    preload: 0,
	source : new ol.source.XYZ({
		url : OLSProxy + 'http://xdworld.vworld.kr:8080/2d/Hybrid/201612/{z}/{x}/{y}.png'
  })
});

var whpa_source1 = new ol.source.Vector();
layers['whpa1'] = new ol.layer.Vector({
	name : 'whpa1',
	type: 'vector',
	source: whpa_source1,
	style: new ol.style.Style({
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({color: 'red'}),
			stroke: new ol.style.Stroke({
				color: [255,0,0], width: 2
			})
		})
	})
});

var whpa_source2 = new ol.source.Vector();
layers['whpa2'] = new ol.layer.Vector({
	name : 'whpa2',
	type: 'vector',
	source: whpa_source2
});

var polygonStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,1)'
    })
});

var polylineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 2
    })
});

var analy_whpa_poly = new ol.source.Vector();
layers['analy_whpa'] = new ol.layer.Vector({
  name : 'analy_whpa',
  type: 'vector',
  source: source,
  style: new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: 'red',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,255,0,1)'
    })
  })
});


var analy_whpa_polyStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'gray',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'rgba(200,200,200,0.5)'
    })
});

var pointStyle = new ol.style.Style({
	stroke: new ol.style.Stroke({
        color: '#0000FF',
        width: 2
	}),
	image: new ol.style.Circle({
		radius: 8,
		stroke: new ol.style.Stroke({
			color: '#000000'
		}),
		fill: new ol.style.Fill({
			color: '#FF0000'
		})
	})
});


var gptrac_source = new ol.source.Vector();
layers['analy_gptrac'] = new ol.layer.Vector({
  name : 'analy_gptrac',
  type: 'vector',
  source: gptrac_source,
  style: gptrac_line
});

var gptrac_line = function(feature) {
	
	var geometry = feature.getGeometry();
	  var styles = [
		  new ol.style.Style({
			stroke: new ol.style.Stroke({
				//color: '#ffcc33',
				color: 'RED',
		        width: 2
		    })
	  })
	  ];
	  geometry.forEachSegment(function (start, end) {
	        var dx = end[0] - start[0];
	        var dy = end[1] - start[1];
	        var rotation = Math.atan2(dy, dx);

	        var lineStr1 = new ol.geom.LineString([end, [end[0] - 10, end[1] + 10]]);
	        lineStr1.rotate(rotation, end);
	        var lineStr2 = new ol.geom.LineString([end, [end[0] - 10, end[1] - 10]]);
	        lineStr2.rotate(rotation, end);
			
			var point = new ol.geom.Point([start[0], start[1]]);			

	        var stroke = new ol.style.Stroke({
	            color: 'black',
	            width: 1
	        });
			
			var image = new ol.style.Circle({
				radius: 2,
				fill: new ol.style.Fill({
					color: 'black'
				})
			})
			
	        styles.push(new ol.style.Style({
	            geometry: point,
	            image: image
	        }));
			
	        styles.push(new ol.style.Style({
	            geometry: lineStr1,
	            stroke: stroke
	        }));
	        styles.push(new ol.style.Style({
	            geometry: lineStr1,
	            stroke: stroke
	        }));
	        styles.push(new ol.style.Style({
	            geometry: lineStr2,
	            stroke: stroke
	        }));
	    });
	/*
	  var geometry = feature.getGeometry();
	  var styles = 
		  new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: '#ffcc33',
		        width: 2
		    })
	  })

	  geometry.forEachSegment(function(start, end) {
	    var dx = end[0] - start[0];
	    var dy = end[1] - start[1];
	    var rotation = Math.atan2(dy, dx);
	    // arrows
	    styles.push(ol.style.Style({
	      geometry: new ol.geom.Point(end),
	      image: new Icon({
	        src: '../../../images/gis/arrow_v.png',
	        anchor: [0.75, 0.5],
	        rotateWithView: true,
	        rotation: -rotation
	      })
	    }));
	  });
	  */
	  return styles;
};

var source = new ol.source.Vector();
layers['vector'] = new ol.layer.Vector({
  name : 'vector',
  type: 'vector',
  source: source,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#0080FF',
      width: 2
    }),
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 60],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: '../images/gis/marker.png'
    }))
  })
});


var inheoSource = new ol.source.Vector();
layers['inheoLayer']  = new ol.layer.Vector({ type: 'vector', source: inheoSource });

var result_source = new ol.source.Vector();
var result_style = new ol.style.Style({
	stroke: new ol.style.Stroke({
        color: '#0000FF',
        width: 2
	}),
	image: new ol.style.Circle({
		radius: 8,
		stroke: new ol.style.Stroke({
			color: '#000000'
		}),
		fill: new ol.style.Fill({
			color: '#FF0000'
		})
	})
});
layers['result_vector'] = new ol.layer.Vector({
  name : 'result_vector',
  type: 'vector',
  source: result_source,
  style : result_style,
});

var baseChange = function(data) {
	var layer;
	var layerGroup = findGroupLayer(map.getLayerGroup(),'name','배경지도');
	roadViewMode=false;
	if(data=='hybrid')
	{
		changeBaseLayer(layerGroup, 'satellite',data);	
	}else{
		changeBaseLayer(layerGroup, data);
	}
	map.updateSize();
}

var mapZoomHandler = function(evt){
	//var extent = map.getView().calculateExtent(map.getSize());
	//console.log(extent);
	//console.log(map.getView().getZoom());
	//console.log(ol.proj.transform(map.getView().getCenter(),'EPSG:3857', 'EPSG:4326'));
	if (undo_redo === false) {
        if (size < nav_his.length - 1) {
            for (var i = nav_his.length - 1; i > size; i--) {
                nav_his.pop();
            }
        }
        nav_his.push({
            extent: map.getView().calculateExtent(map.getSize()),
            size: map.getSize(),
            zoom: map.getView().getZoom()
        });
        size = size + 1;
    }
	
	initToc();
}

var initToc = function()
{
	for( var servicename in OLSData){
		
		var zoom = map.getView().getZoom();
		if(OLSData[servicename].zoomlevel!=0){
			var input = $('#input_'+servicename);
			var  layer = findLayer(map.getLayerGroup(),'name',OLSData[servicename].name);
			if(zoom < OLSData[servicename].zoomlevel){
				if(input.is(":checked")){
					input.attr('disabled','disabled');
					layer.setVisible(false);
				}
			}else{
				if(input.is(":checked")){
					input.removeAttr('disabled','disabled');
					layer.setVisible(true);
				}
			}
		}
	};
}

var fullExtent = function(){
	map.getView().setZoom(10);
	map.getView().setCenter(ol.proj.fromLonLat(mapCenter));
}

var findGroupLayer= function(layer, key, value) {

    if (layer.get(key) === value) {
    	return layer;
    }

    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findGroupLayer(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

var changeBaseLayer = function(layers, value, value2){
	var layersArray = layers.getLayers().getArray();
	
	for (var i = 0; i < layersArray.length; i++) {
        if(layersArray[i].get('type')=='base'){
        	if(layersArray[i].get('name')==value || layersArray[i].get('name')==value2){
        		layersArray[i].setVisible(true);
        	}else{
        		layersArray[i].setVisible(false);
        	}
        }
    }
}

var findLayer = function(layers, key, value){
	var layersArray = layers.getLayers().getArray();
	
	for (var i = 0; i < layersArray.length; i++) {
        if(layersArray[i].get(key)==value){
        	return layersArray[i];
        }
    }
}

//Layer Switch
var initializeToc =function(element, group) {
    element.append(buildLayerToc(map.getLayerGroup(), group));
}

var buildLayerToc = function(layer, group, except) {
	
	var exceptLy = new Array();
	if(except!=undefined)
	{
		exceptLy = except;
	}
	var div='';
	
	if(layer.get('name')!=undefined)
	{
		var layersArray = layer.getLayers().getArray();
		
		for (var i = 0; i < layersArray.length; i++) {
	        if(layersArray[i].get('type')!='base'){
	        	if(layersArray[i].get('type')!='vector')
	        	{
		        	var servicename = OLSM.getServiceNameWidthLayerName(layersArray[i].get('name'));
		        	if(OLSData[servicename].group==group && group==''){
		        		if(OLSData[servicename].visible){
		        			div += "<li id='" + servicename + "' ><input id='input_" +servicename+ "' type='checkbox' class='levelno' onclick='setVisibleLayer(\""+servicename+"\");' checked>"
		        		}else{
		        			div += "<li id='" + servicename + "' ><input id='input_" +servicename+ "' type='checkbox' class='levelno' onclick='setVisibleLayer(\""+servicename+"\");'>"
		        		}
		        		div += "<label for='a1'  style='cursor:pointer' onclick='showLegend(\""+servicename+"\");'><span style='padding-left:5px'>" + OLSData[servicename].name + "</span></label>";
		        		div += "<i style='cursor:pointer'    onclick='showLegend(\""+servicename+"\");'><span class='legendbox' /></i>";
		        	   	div += "<div class='sliderbox sliderUI'>";
		        	   	div += "<div id='custom-handle' class='ui-slider-handle'></div>";
		        	   	div += "</div>";
	            	   	div += "<div class='hiders_"+servicename+"' style='margin-left:20px;display:none;width:100px;'>";     		
		        		div += "<img id='img_" + servicename + "' />";
		        		div += "</div>";
		        	   	div += "</li>";
		        	}else if(OLSData[servicename].group==group){
	        			div += "<li>";
	        			div +="<input type='checkbox' id='a3' class='levelyes'/>";
	        			div += "<a href='#' onclick='javascript:setGroupVisible(\"" +i+"\");return false;'><label for='a3' class='lavelneme'><span>" +OLSData[servicename].group+"</span></label></a>";
	        			div += "<ul class='lastlavel' id='group_" + i + "' >";
	        			
	        			div += subBuildLayerToc(layer, group, exceptLy);
		        	   	
	        	   		div += "</ul>";
	        	   		div += "</li>";
	        			break;
		        	}
	        	}
	        }
	    }
	}
    return div;
}

var subBuildLayerToc=function(layer, group, except){

	var div='';
	var layersArray = layer.getLayers().getArray();
	for (var i = 0; i < layersArray.length; i++) {
        if(layersArray[i].get('type')!='base'){
        	if(layersArray[i].get('type')!='vector')
        	{
            	var servicename = OLSM.getServiceNameWidthLayerName(layersArray[i].get('name'));
            	
            	if(OLSData[servicename].group==group && except.indexOf(OLSData[servicename].name)==-1){
	        		if(OLSData[servicename].visible){
	        			div += "<li id='" + servicename + "'><input id='input_" +servicename+ "' type='checkbox' class='levelno' onclick='javascript:setVisibleLayer(\""+servicename+"\");' checked>"
	        		}else{
	        			div += "<li id='" + servicename + "'><input id='input_" +servicename+ "' type='checkbox' class='levelno' onclick='javascript:setVisibleLayer(\""+servicename+"\");'>"
	        		}
            		
            		div += "<label for='a1'  style='cursor:pointer' onclick='showLegend(\""+servicename+"\");'><span style='padding-left:5px'>" + OLSData[servicename].name + "</span></label>";
            		div += "<i style='cursor:pointer'   onclick='showLegend(\""+servicename+"\");'><span class='legendbox' /></i>";
            	   	div += "<div class='sliderbox sliderUI'>";
            	   	div += "<div id='custom-handle' class='ui-slider-handle'></div>";
            	   	div += "</div>";
            	   	div += "<div class='hiders_"+servicename+"' style='margin-left:20px;display:none;width:100px;'>";    
            	   	if(!OLSData[servicename].legendpop){
            	   		div += "<img id='img_" + servicename + "' />";
            	   	}else{
            	   		div += "<a href='#' onclick='showlegendpop(\""+servicename+"\");'><img src='../images/gis/legend.png' /></a>";
            	   	}
	        		div += "</div>";
            	   	div += "</li>";
            	}
        	}
        }
	}
	return div;
}

var showLegend = function(servicename){
	$(".hiders_"+servicename).toggle();
	var imgurl = OLSData[servicename].image;
	if(!OLSData[servicename].legendpop){
		if($("#img_"+servicename).attr('src')==undefined){
			$("#img_"+servicename).attr("src",imgurl);	
		}
	}
}

var showlegendpop = function(servicesname){
	var imgurl = OLSData[servicesname].image;
	$(".legendContainer").fadeIn();
	if(OLSData[servicesname].name=='수문지질도'){
		$("#legend").attr("src",imgurl);
		$("#legend").width('550px');
		$("#legend").height('850px');
	}else{
		$("#legend").attr("src",imgurl);
		$("#legend").width('650px');
		$("#legend").height('850px');
	}
}

var setVisibleLayer = function(servicename){
	
	var checked = $("input:checkbox[id='input_"+servicename+"']").is(":checked");
	
	var layer = findLayer(map.getLayerGroup(), 'name', OLSData[servicename].name);
	
	if(checked){
		if(OLSData[servicename].zoomlevel!=0)
		{
			if(layer.getVisible()==false)		
			{
				if(map.getView().getZoom()<OLSData[servicename].zoomlevel)
				{
					/*
					$.confirm({
						animation: 'none',
						boxWidth: '300px',
					    useBootstrap: false,
					    title: '',
					    content: OLSData[servicename].zoomlevel + ' 이하의 레벨에서 보시겠습니까?',
					    buttons: {
					        "예": function () {
					        	 layer.setVisible(true);
									map.getView().setZoom(OLSData[servicename].zoomlevel);
					        },
					        "아니오": function () {
					        	layer.setVisible(false);
								$("input:checkbox[id='input_"+servicename+"']").prop("checked", false);
					        }
					    }
					});
					*/

		        	layer.setVisible(true);
					map.getView().setZoom(18);
					
				}else{
					layer.setVisible(true);
				}
			}
		}else{
			layer.setVisible(true);
		}
	}else{
		layer.setVisible(false);
	}
}

var setGroupVisible = function(value){
	$("#group_"+value).toggle();
}
//Layer Switch

Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
}

var identifyHandler = function(evt){

	if(currrentMode=='identify'){
		
		source.clear();
		var identifyLayerName = undefined;
		
		var pixel = map.getEventPixel(evt.originalEvent);
		map.forEachLayerAtPixel(pixel, function(layer) {
			var layername =layer.getProperties().name;
			if(!exceptLayer.contains(layername))
			{	
				identifyLayerName =	layername;
				return false;
			}else{
				return false;
			}
		});
		
		var viewResolution = (map.getView().getResolution());
		if(identifyLayerName!=undefined)
		{
			var servicename = OLSM.getServiceNameWidthLayerName(identifyLayerName);
			
			if(identifyLayerName=='국가지하수 관측망' || identifyLayerName=='수위관측소'){
				
				var point = new ol.geom.Point(evt.coordinate);
				var extent = new ol.extent.buffer(point.getExtent(), 10* viewResolution);
				var poly = ol.geom.Polygon.fromExtent(extent);
				
				var query = "";
				for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
					var tmp =  ol.proj.transform([poly.getCoordinates()[0][idx][0],poly.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
			    	query += tmp[0] + ' ' + tmp[1] + ' ';
			    }
				var url = OLSProxy + encodeURI(OLSData[servicename].identify);
	
				var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
				             "<Intersects>"+
				             "<PropertyName>geom</PropertyName>"+
				             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
			             	 "<gml:exterior>"+
			                 "<gml:LinearRing>"+
			                 "<gml:posList>"+query+"</gml:posList>"+
			                 "</gml:LinearRing>"+
			                 "</gml:exterior>"+
				             "</gml:Polygon>"+
				             "</Intersects>"+
				             "</Filter>";
	
	            $.ajax({
	            	type : "GET",
	                url: url,  
	                data:{
	                	filter : encodeURI(filter)
	                },
	            }).then(function(response) {	
					var g =  new ol.format.GML2();
					var features = g.readFeatures(response);
					if(features.length>0)
		        	{
		        		var resultPoint = new ol.Feature({
		    				geometry: point,
		    				id: 'test'
		    			})
		        		source.addFeature(resultPoint);
		        		
		        		showIdentifyPop(features, identifyLayerName);
		        	}else{
		        		//showDialog(identifyLayerName, "결과 값이 없습니다.");
		        		alert('결과 값이 없습니다.');
		        	}
		        }).fail(function(response) {
		        	console.log(response);
		        });
			}
		}else{
			alert('결과 값이 없습니다.');
		}
	}
}

/*
var analysis_whpa_select1 = function(evt){

	whpa_source1.clear();
	
	var point = new ol.geom.Point(evt.coordinate);
	
	$("#tmx1Ti").val(Number(point.getCoordinates()[0]).toFixed(4));
	$("#tmy1Ti").val(Number(point.getCoordinates()[1]).toFixed(4));
	var resultPoint = new ol.Feature({
		geometry: point,
		id: 'test'
	})
	whpa_source1.addFeature(resultPoint);
}

var analysis_whpa_select2 = function(evt){

	whpa_source1.clear();
	
	var point = new ol.geom.Point(ol.proj.transform([evt.coordinate[0],evt.coordinate[1]], 'EPSG:3857', 'EPSG:5186'));
	//map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([lonlat.getCoordinates()[0],lonlat.getCoordinates()[1]], 'EPSG:3857', 'EPSG:4326')));

	//new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat).transform(epsg900913,epsg5186);
	
	
	$("#tmx2Ti").val(Number(point.getCoordinates()[0]).toFixed(4));
	$("#tmy2Ti").val(Number(point.getCoordinates()[1]).toFixed(4));
	var resultPoint = new ol.Feature({
		geometry: new ol.geom.Point([evt.coordinate[0],evt.coordinate[1]]),
		id: 'test'
	})
	whpa_source1.addFeature(resultPoint);
	
	draw_tm2_polygon(point);
}
*/

var pumpingCapacityArr = []; //실제 파라미터용
var pumpingCapacityAcl = []; //리스트용
//리스트 추가
function draw_tm2_polygon(lonlat){
	
	if(pumpingCapacityArr.length > 1){
		alert("최대 2개까지 중심좌표를 추가할 수 있습니다.");
		return false;
	}
	/*
	if(analy_whpa_poly != null){
		if(analy_whpa_poly.geometry.atPoint(lonlat) == false){
			//if(map.getLayerByName("vector_boxlayer")!=null) map.getLayerByName("vector_boxlayer").removeAllFeatures();	
			alert("정호반경내에서 좌표를 추출하십시오.");
			return false;
		}		
	}
	*/
	
	var tmx = $("#tmx2Ti").val();
	var tmy = $("#tmy2Ti").val();
	var pumpingCapacity = $("#pumpingCapacity2Ti").val();	
	var calcRadius = $("#calcRadius2Ti").val();
	var radiusTi = $("#radiusTi").val();
	
	tmx = Number(tmx).toFixed(1);
	tmy = Number(tmy).toFixed(1);
	pumpingCapacity = Number(pumpingCapacity).toFixed(1);
	radiusTi = Number(radiusTi).toFixed(1);
	
	pumpingCapacityArr.push("    " + (pumpingCapacityArr.length + 1) + "  " + tmx + "  " + tmy + "     " + pumpingCapacity + "     " + radiusTi + "    1   20       0.0");
	pumpingCapacityAcl.push({num:pumpingCapacityAcl.length + 1, tmx:tmx, tmy:tmy,pumpingCapacity:pumpingCapacity,calcRadius:radiusTi});
	
	if(pumpingCapacityArr.length == 1){
		whpa_source2.clear();
		var radius1 = get_length_geodesic(Number(calcRadius));	
		var lonlat_XY = ol.proj.transform([lonlat.getCoordinates()[0],lonlat.getCoordinates()[1]], 'EPSG:5186', 'EPSG:3857')
		var poly  = new ol.geom.Polygon([
            createCirclePointCoords(lonlat_XY[0],lonlat_XY[1], radius1,100)
        ]);
		
		var resultPolygon = new ol.Feature({
			geometry: poly,
			id: 'circle',
		})
		resultPolygon.setStyle(analy_whpa_polyStyle);
		whpa_source2.addFeature(resultPolygon);
		
		map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([lonlat.getCoordinates()[0],lonlat.getCoordinates()[1]], 'EPSG:5186', 'EPSG:4326')));
		map.getView().setZoom(16);
	}else{
		
	}

	make_list_pumpingCapacityAcl();
}

function make_list_pumpingCapacityAcl(){
	var str_div ="<colgroup><col width='20%'/><col width='20%'/><col width='20%'/><col width='20%'/><col width='20%'/></colgroup>";			
	str_div += "<tr><th>NUM</th><th>tmx</th><th>tmy</th><th>유출량</th><th>정호반경</th></tr>";	
	$(pumpingCapacityAcl).each(function(index, item) {		
		str_div += "<tr>";
		str_div += "<td>"+item.num+"</td>";
		str_div += "<td>"+item.tmx+"</td>";
		str_div += "<td>"+item.tmy+"</td>";
		str_div += "<td>"+item.pumpingCapacity+"</td>";
		str_div += "<td>"+item.calcRadius+"</td>";
		str_div += "</tr>";
	});	
	str_div += "<tr>";
	str_div += "<td colspan='5'><input type='button' value='전체삭제' onclick='clear_pop_tb_gqtrac1();'/></td>";	
	str_div += "</tr>";
	$(document.getElementById("pop_tb_gqtrac1")).html(str_div);	
}

function get_length_geodesic(value){
	value = (1.222590569*value)+0.005171857;
	return value;
}

/*
var analysis_whpa_select3 = function(evt){

	whpa_source1.clear();
	
	var point = new ol.geom.Point(evt.coordinate);
	var resultPoint = new ol.Feature({
		geometry: point,
		id: 'test'
	})
	whpa_source1.addFeature(resultPoint);
	
	draw_tm3_point(new ol.geom.Point(ol.proj.transform([point.getCoordinates()[0],point.getCoordinates()[1]], 'EPSG:3857', 'EPSG:5186')));
}
*/

var courseDirectionArr1 = [];
var courseDirectionAcl1 = [];
var courseDirectionArr2 = [];
var courseDirectionAcl2 = [];
//유동방향 정/역방향
function draw_tm3_point(point_t){
	var id_chk = $("#whpa_rdo3_1").attr("checked");
	var color = "#008000";
	var tmx = Number(point_t.getCoordinates()[0]).toFixed(1);
	var tmy = Number(point_t.getCoordinates()[1]).toFixed(1);
	if(id_chk == "checked"){
		courseDirectionArr1.push(tmx + "  " + tmy);
		courseDirectionAcl1.push({tmx:tmx,tmy:tmy});
		color = "#008000";
	}else{
		courseDirectionArr2.push(tmx + "  " + tmy);
		courseDirectionAcl2.push({tmx:tmx,tmy:tmy});		
		color = "#2E73E5";
	}	
	draw_tm3_point2(point_t);
	make_list_courseDirectionAcl();
}
function make_list_courseDirectionAcl(){
	var id_chk = $("#whpa_rdo3_1").attr("checked");
	var str_div ="<colgroup><col width='30%'/><col width='30%'/><col width='30%'/><col width='10%'/></colgroup>";			
	str_div += "<tr><th>NUM</th><th>tmx</th><th>tmy</th><th>삭제</th></tr>";	
	var list = null;
	if(id_chk == "checked"){
		list = courseDirectionAcl1;
	}else{
		list = courseDirectionAcl2;
	}
	$(list).each(function(index, item) {		
		str_div += "<tr>";
		str_div += "<td>"+(index+1)+"</td>";
		str_div += "<td>"+item.tmx+"</td>";
		str_div += "<td>"+item.tmy+"</td>";		
		str_div += "<td><input type='button' value='삭제' onclick='del_courseDirectionAcl(\""+index+"\");'/></td>";
		str_div += "</tr>";
	});	
	$(document.getElementById("pop_tb_gqtrac2")).html(str_div);	
}
function del_courseDirectionAcl(index){
	var id_chk = $("#whpa_rdo3_1").attr("checked");	
	if(id_chk == "checked"){		
		courseDirectionArr1.splice(index,1);
		courseDirectionAcl1.splice(index,1);
	}else{
		courseDirectionArr2.splice(index,1);
		courseDirectionAcl2.splice(index,1);		
	}
	make_list_courseDirectionAcl();
}
function draw_tm3_point2(point_t){
	var feature = new ol.Feature({
		geometry: point_t
	})	
	feature.setStyle(pointStyle);

	whpa_source2.addFeature(feature);
}

var zoomIn = new ol.interaction.DragBox({});

var zoomOut = new ol.interaction.DragBox({});


zoomIn.on('boxend', function (evt) {
    source.clear();
    var center =  getCenterOfExtent(evt.target.getGeometry().getExtent());
    
    map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326')))
    map.getView().setZoom(map.getView().getZoom() + 1);
});


zoomOut.on('boxend', function (evt) {
    source.clear();
    var center =  getCenterOfExtent(evt.target.getGeometry().getExtent());
    
    map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326')))
    map.getView().setZoom(map.getView().getZoom() - 1);
});

var getCenterOfExtent = function(Extent){
	var X = Extent[0] + (Extent[2]-Extent[0])/2;
	var Y = Extent[1] + (Extent[3]-Extent[1])/2;
	return [X, Y];
}

function addInteraction(interactionName, type){
	interactionInit();
	
	switch(interactionName){
		case "measure":
			addInteractionMeasure(type);
			break;
		case "intersect":
			addInteractionIntersect();
			break;
		case "influence":
			addInteractionInfluence();
			break;
		case "devavail":
			addInteractionDevavail();
			break;
		case "searchLayerPoly":
			addSearchLayerPoly(type);
			break;
		case "searchLayerCircle":
			addSearchLayerCircle(type);
			break;
		case "exchange":
			addInteractionExchange();
			break;
		case "whpa":
			addInteractionwhpaAction(type);
			break;
		case "inheo":
			addInteractionInheo();
	}	
}

function interactionInit(){
	map.removeInteraction(zoomOut);
	map.removeInteraction(zoomIn);
	map.removeInteraction(measureActivation);
	map.removeInteraction(influeActivation);
	map.removeInteraction(intersectActivation);
	map.removeInteraction(devavailActivation);
	map.removeInteraction(searchLayerActivation);	
	map.removeInteraction(exchangeActivation);
	map.removeInteraction(addressActivation);
	map.removeInteraction(whpaAction);
	map.removeInteraction(inheoActivation);
}



function addInteractionwhpaAction(whpaCommand) {
	
	var type = 'Point';
	var visualdraw = source;
	whpaAction = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(whpaAction);

    createMeasureTooltip();
    whpaAction.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
		}, this);

    whpaAction.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			
			createMeasureTooltip();
			
			switch(whpaCommand){
				case "select1":
					whpa_source1.clear();
					
					var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
					
					$("#tmx1Ti").val(Number(point.getCoordinates()[0]).toFixed(4));
					$("#tmy1Ti").val(Number(point.getCoordinates()[1]).toFixed(4));
					var resultPoint = new ol.Feature({
						geometry: point,
						id: 'test'
					})
					whpa_source1.addFeature(resultPoint);
					break;
				case "select2":
					whpa_source1.clear();
					
					var point = new ol.geom.Point(ol.proj.transform([evt.feature.getGeometry().getCoordinates()[0],evt.feature.getGeometry().getCoordinates()[1]], 'EPSG:3857', 'EPSG:5186'));
					
					$("#tmx2Ti").val(Number(point.getCoordinates()[0]).toFixed(4));
					$("#tmy2Ti").val(Number(point.getCoordinates()[1]).toFixed(4));
					var resultPoint = new ol.Feature({
						geometry: new ol.geom.Point([evt.feature.getGeometry().getCoordinates()[0],evt.feature.getGeometry().getCoordinates()[1]]),
						id: 'test'
					})
					whpa_source1.addFeature(resultPoint);
					
					draw_tm2_polygon(point);
					break;
				case "select3":
					whpa_source1.clear();
					
					var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
					var resultPoint = new ol.Feature({
						geometry: point,
						id: 'test'
					})
					whpa_source1.addFeature(resultPoint);
					
					draw_tm3_point(new ol.geom.Point(ol.proj.transform([point.getCoordinates()[0],point.getCoordinates()[1]], 'EPSG:3857', 'EPSG:5186')));
					
					break;
			}
			
			
		}, this);
}
function addSearchLayerPoly(layer) {
	var type = 'Polygon';
	var visualdraw = source;
	searchLayerActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(searchLayerActivation);

    createMeasureTooltip();
    searchLayerActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    searchLayerActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var poly = new ol.geom.Polygon(evt.feature.getGeometry().getCoordinates());
			var resultPolygon = new ol.Feature({
				geometry: poly,
				id: 'polygon',
			})
			
			source.addFeature(resultPolygon);
			
			createMeasureTooltip();
			
			var servicename = OLSM.getServiceNameWidthLayerName(layer);
			var query = "";
			for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
				var tmp =  ol.proj.transform([poly.getCoordinates()[0][idx][0],poly.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
		    	query += tmp[0] + ' ' + tmp[1] + ' ';
		    }
		    
			var tmp =  ol.proj.transform([poly.getCoordinates()[0][0][0],poly.getCoordinates()[0][0][1]],  map.getView().getProjection(),'EPSG:4326');
	    	query += tmp[0] + ' ' + tmp[1] + ' ';
			
			var url = OLSProxy + encodeURI(OLSData[servicename].identify);

			var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
			             "<Intersects>"+
			             "<PropertyName>geom</PropertyName>"+
			             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
		             	 "<gml:exterior>"+
		                 "<gml:LinearRing>"+
		                 "<gml:posList>"+query+"</gml:posList>"+
		                 "</gml:LinearRing>"+
		                 "</gml:exterior>"+
			             "</gml:Polygon>"+
			             "</Intersects>"+
			             "</Filter>";
			$.ajax({
		    	type : "GET",
		        url: url,  
		        data:{
		        	filter : encodeURI(filter)
		        },
			}).then(function(response) {	
				var g =  new ol.format.GML2();
				var features = g.readFeatures(response);
			 	if(features.length>0)
			 	{
			 		var index = $("#lysearchSc option").index($("#lysearchSc option:selected"));
			 		
			 		var perm_sn = [];
			 		for(var i=0; i < features.length; i++){
			 			switch(index){
				 			case 0:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 1:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 2:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 3:
					 			perm_sn.push(features[i].getProperties().emer_facil_mgt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 4:
				 				perm_sn.push(features[i].getProperties().onch_seq)
				 				break;
			 			}
			 		}
			 		switch(index){
			 			case 0:
			 				searchLayer(well_ly_tb, well_ly_col, well_ly_url, perm_sn);
			 				break;
			 			case 1:
			 				searchLayer(bul_ly_tb, bul_ly_col, bul_ly_url, perm_sn);
			 				break;
			 			case 2:
			 				searchLayer(gg_ly_tb, gg_ly_col, gg_ly_url, perm_sn);
			 				break;
			 			case 3:
			 				searchLayer(mb_ly_tb,  mb_ly_col, mb_ly_url, perm_sn);
			 				break;
			 			case 4:
			 				searchLayer(hspr_ly_tb, hspr_ly_col, hspr_ly_url, perm_sn);
			 				break;
			 		}
			 	}else{
			 		alert("검색 결과가 없습니다.");
			 	}
			}).fail(function(response) {
				alert("검색 결과가 없습니다.");
			});	
	}, this);
}

function addSearchLayerCircle(layer) {
	
	var type = 'Point';
	var visualdraw = source;
	searchLayerActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(searchLayerActivation);

    createMeasureTooltip();
    searchLayerActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
		}, this);

    searchLayerActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var poly  = new ol.geom.Polygon([
                createCirclePointCoords(evt.feature.getGeometry().getCoordinates()[0],evt.feature.getGeometry().getCoordinates()[1], $('.lysearchinput').val(),66)
            ]);
			var resultPolygon = new ol.Feature({
				geometry: poly,
				id: 'circle',
			})
			
			source.addFeature(resultPolygon);
			
			createMeasureTooltip();

			var servicename = OLSM.getServiceNameWidthLayerName(layer);
			var query = "";
			for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
				var tmp =  ol.proj.transform([poly.getCoordinates()[0][idx][0],poly.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
		    	query += tmp[0] + ' ' + tmp[1] + ' ';
		    }
			
			var tmp =  ol.proj.transform([poly.getCoordinates()[0][0][0],poly.getCoordinates()[0][0][1]],  map.getView().getProjection(),'EPSG:4326');
	    	query += tmp[0] + ' ' + tmp[1] + ' ';
			
			var url = OLSProxy + encodeURI(OLSData[servicename].identify);

			var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
			             "<Intersects>"+
			             "<PropertyName>geom</PropertyName>"+
			             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
		             	 "<gml:exterior>"+
		                 "<gml:LinearRing>"+
		                 "<gml:posList>"+query+"</gml:posList>"+
		                 "</gml:LinearRing>"+
		                 "</gml:exterior>"+
			             "</gml:Polygon>"+
			             "</Intersects>"+
			             "</Filter>";
			
			$.ajax({
		    	type : "GET",
		        url: url,  
		        data:{
		        	filter : encodeURI(filter)
		        },
			}).then(function(response) {	
				var g =  new ol.format.GML2();
				var features = g.readFeatures(response);
			 	if(features.length>0)
			 	{
			 		var index = $("#lysearchSc option").index($("#lysearchSc option:selected"));
			 		
			 		var perm_sn = [];
			 		for(var i=0; i < features.length; i++){

			 			switch(index){
				 			case 0:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 1:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 2:
					 			perm_sn.push(features[i].getProperties().perm_nt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 3:
					 			perm_sn.push(features[i].getProperties().emer_facil_mgt_no + features[i].getProperties().sgg_code)
				 				break;
				 			case 4:
					 			perm_sn.push(features[i].getProperties().onch_seq + features[i].getProperties().sgg_code)
				 				break;
			 			}
			 		}

			 		switch(index){
				 		case 0:
			 				searchLayer(well_ly_tb, well_ly_col, well_ly_url, perm_sn);
			 				break;
			 			case 1:
			 				searchLayer(bul_ly_tb, bul_ly_col, bul_ly_url, perm_sn);
			 				break;
			 			case 2:
			 				searchLayer(gg_ly_tb, gg_ly_col, gg_ly_url, perm_sn);
			 				break;
			 			case 3:
			 				searchLayer(mb_ly_tb,  mb_ly_col, mb_ly_url, perm_sn);
			 				break;
			 			case 4:
			 				searchLayer(hspr_ly_tb, hspr_ly_col, hspr_ly_url, perm_sn);
			 				break;
			 		}
			 	}else{
			 		alert("검색 결과가 없습니다.");
			 	}
			}).fail(function(response) {
				alert("검색 결과가 없습니다.");
			});	
		}, this);
}


//searchLayer(well_ly_tb, well_ly_col);
var searchLayerWrap = function( json_url, req_data, ly_tb, ly_col, callback ) {
	$.ajax({url:json_url,type:"post",data:req_data,success:function(e){if( typeof callback == "function" ) {callback(e,ly_tb,ly_col);}},error:function(e){alert('검색 결과가 없습니다.');}});
};

function addInteractionDevavail() {
	
	var type = 'Polygon';
	var visualdraw = source;
	devavailActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(devavailActivation);

    createMeasureTooltip();
    devavailActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    devavailActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var poly = new ol.geom.Polygon(evt.feature.getGeometry().getCoordinates());
			var resultPolygon = new ol.Feature({
				geometry: poly,
				id: 'polygon',
			})
			
			source.addFeature(resultPolygon);
			
			createMeasureTooltip();
			
			waters_intersect(poly);
	}, this);
}
    
function waters_intersect(poly){
	fn_wrapLoading();
	//지하수함양량은 104,512천m3/년  및 개발가능량(729,000천m3/년)
	//지하수함양량은 87,076천m3/년, 10년 빈도 가뭄 강수량을 적용한 지하수 개발가능량은 65,754천
	//유역면적
	var w_area=0;
	//강우량
	var rainfall=0;
	//함양률
	var cultiv_year=0;
	//개발가능량
	var dev_year=0;
				
	var servicename = OLSM.getServiceNameWidthLayerName("표준유역");

	var query = "";
    for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
    	query += poly.getCoordinates()[0][idx][0] + ' ' + poly.getCoordinates()[0][idx][1] + ' ';
    }
	var url = OLSProxy + encodeURI(OLSData[servicename].identify + '&srsName=' + OLSData[service].prj );
	
	var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
	             "<Intersects>"+
	             "<PropertyName>geom</PropertyName>"+
	             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:3857'>"+
             	 "<gml:exterior>"+
                 "<gml:LinearRing>"+
                 "<gml:posList>"+query+"</gml:posList>"+
                 "</gml:LinearRing>"+
                 "</gml:exterior>"+
	             "</gml:Polygon>"+
	             "</Intersects>"+
	             "</Filter>";
	
	$.ajax({
    	type : "GET",
        url: url,  
        data:{
        	filter : encodeURI(filter)
        },
	}).then(function(response) {	
		var g =  new ol.format.GML2();
		var features = g.readFeatures(response);
		
	 	if(features.length>0)
	 	{
	 		var html = "";
	 		w_area = poly.getArea();
			rainfall = 1354;//features[0].getProperties().rainfall;
			cultiv_year = Number(features[0].getProperties().c_year);
			dev_year = Number(w_area)*Number(rainfall)*Number(cultiv_year) / 100000;
			
	 		$("#devavail_area" ).val(numberWithCommas(w_area.toFixed(0)));
			$("#devavail_rain" ).val(numberWithCommas(rainfall));
			$("#devavail_recharge" ).val(cultiv_year);
			$("#devavail_dev" ).val(numberWithCommas(dev_year.toFixed(0)));

			uw_intersect(poly);
	 		fn_closeLoading();
	 	}else{
	 		fn_closeLoading();
			alert('검색된 유역이 없습니다. 영역을 다시 그려 주세요.');
	 	}
	}).fail(function(response) {
		fn_closeLoading();
		alert('검색된 유역이 없습니다.');
	});	
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}

function uw_intersect(poly){
	var perm_sn = [];
	
	var servicename = OLSM.getServiceNameWidthLayerName("허가신고공");

	var query = "";
	for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
		var tmp =  ol.proj.transform([poly.getCoordinates()[0][idx][0],poly.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
    	query += tmp[0] + ' ' + tmp[1] + ' ';
    }
	
	var url = OLSProxy + encodeURI(OLSData[servicename].identify);

	var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
	             "<Intersects>"+
	             "<PropertyName>geom</PropertyName>"+
	             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
             	 "<gml:exterior>"+
                 "<gml:LinearRing>"+
                 "<gml:posList>"+query+"</gml:posList>"+
                 "</gml:LinearRing>"+
                 "</gml:exterior>"+
	             "</gml:Polygon>"+
	             "</Intersects>"+
	             "</Filter>";
	
	$.ajax({
    	type : "GET",
        url: url,  
        data:{
        	filter : encodeURI(filter)
        },
	}).then(function(response) {	
		var g =  new ol.format.GML2();
		var features = g.readFeatures(response);
		
	 	if(features.length>0)
	 	{
	 		for(var i=0; i < features.length; i++){
	 			perm_sn.push(features[i].getProperties().perm_nt_no)
	 		}
	 		
	 		if(perm_sn.length>0){
	 			$.ajax({
    			 	url : contextRoot + "/gis/devYearUseQua.do",	
     				type : "POST",
     				async: true,
     				dataType : "json",
     				data : {'permNtNo' : perm_sn, 'sggCode' : features[0].getProperties().sgg_code},
    	        }).then(function(res) {

    	    		fn_closeLoading();
    	        	var outtrn = 0;
    	        	var dev_year = 0;
        			var use_rate = 0;
        			var afterdev = 0;
        				
        			if(res.result.length>0){
        				
        				outtrn = outtrn + Number(res.result[0].yUseQua);
	        			outtrn = outtrn.toFixed(2);
	        			
	        			dev_year = $("#devavail_dev" ).val();
	        			use_rate = (Number(outtrn)/Number(replaceAll(dev_year,",","")))*100;
	        			afterdev = Number(replaceAll(dev_year,",","")) - Number(outtrn);
	        			$("#devavail_use" ).val(numberWithCommas(Number(outtrn).toFixed(0)));
	        			$("#devavail_userate" ).val(use_rate.toFixed(2));
	        			$("#devavail_afterdev" ).val(numberWithCommas(afterdev.toFixed(0)));
	        			
	        		}else{
	        			dev_year = $("#devavail_dev" ).val();
	        			use_rate = (Number(outtrn)/Number(replaceAll(dev_year,",","")))*100;
	        			afterdev = Number(dev_year) - Number(outtrn);
	        			$("#devavail_use" ).val(numberWithCommas(outtrn));
	        			$("#devavail_userate" ).val(use_rate.toFixed(2));
	        			$("#devavail_afterdev" ).val(afterdev);
	        		}
    	        }).fail(function(response) {
    	        	fn_closeLoading();
	 				alert('검색된 관정이 없습니다.');
	 			});	
	 		}
	 	}else{
	 		fn_closeLoading();
			alert('검색된 관정이 없습니다.');
	 	}
	}).fail(function(response) {
		fn_closeLoading();
		alert('검색된 관정이 없습니다.');
	});	
}

function addInteractionMeasure(type) {
	
	//var type ? 'Polygon' : 'LineString')
	measureActivation = new ol.interaction.Draw({
		source: source,
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 128, 255, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});

    map.addInteraction(measureActivation);
    createMeasureTooltip();
    
    measureActivation.on('drawstart',
		function(evt) {
			sketch = evt.feature;
		}, this);

    measureActivation.on('drawend',
		function(evt) {
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			sketch = null;
			measureTooltipElement = null;
			createMeasureTooltip();
		}, this);
}



function addInteractionIntersect() {

	$('.intersect_result').show();
	
	var type = 'Circle';
	var visualdraw = source;
	intersectActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(intersectActivation);

    createMeasureTooltip();
    intersectActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
		}, this);

    intersectActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var poly  = new ol.geom.Polygon([
                createCirclePointCoords(evt.feature.getGeometry().getCenter()[0],evt.feature.getGeometry().getCenter()[1],evt.feature.getGeometry().getRadius(),66)
            ]);
			var resultPolygon = new ol.Feature({
				geometry: poly,
				id: 'circle',
			})
			
			source.addFeature(resultPolygon);
			
			createMeasureTooltip();

			var servicename = OLSM.getServiceNameWidthLayerName("관정_행정처분");
			var query = "";
		    for(var idx=0; idx < poly.getCoordinates()[0].length; idx++){
		    	query += poly.getCoordinates()[0][idx][0] + ' ' + poly.getCoordinates()[0][idx][1] + ' ';
		    }
		    
			var url = OLSProxy + encodeURI(OLSData[servicename].identify + "&typenames="+OLSData[servicename].layer +'&SRSNAME=' + OLSData[servicename].prj);
			
			var filter = "<ogc:Filter xmlns:ogc='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
			             "<ogc:Intersects>"+
			             "<ogc:PropertyName>SHAPE</ogc:PropertyName>"+
			             "<gml:Polygon srsName='urn:x-ogc:def:crs:EPSG:3857'>"+
		             	 "<gml:outerBoundaryIs>"+
		                 "<gml:LinearRing>"+
		                 "<gml:coordinates>"+query+"</gml:coordinates>"+
		                 "</gml:LinearRing>"+
		                 "</gml:outerBoundaryIs>"+
			             "</gml:Polygon>"+
			             "</ogc:Intersects>"+
			             "</ogc:Filter>";
			$.ajax({
		    	type : "GET",
		        url: url,  
		        data:{
		        	filter : encodeURI(filter)
		        },
			}).then(function(response) {	
				var g =  new ol.format.GML2();
				var features = g.readFeatures(response);
			 	if(features.length>0)
			 	{
			 		var html = "";
			 		html += "<tr>";
			 		html += "<th>인허가 번호</th>";
			 		html += "</tr>";
			 		
			 		for(var i=0; i < features.length; i++){
			    		
			 			var feature = new ol.Feature(features[i]);
			 			
			    		var pt = new ol.geom.Point([feature.getProperties().getProperties().TMX, feature.getProperties().getProperties().TMY]);
			    		var resultPoint = new ol.Feature({
							geometry: pt,
							id: feature.getProperties().getProperties().PERM_SN
						})
				    		
				    	result_source.addFeature(resultPoint);
				 		
				 		html += "<tr>";
				 		html += "<td><a href='#' onclick='goMap4(\"" + feature.getProperties().getProperties().PERM_SN + "\")'>" +  feature.getProperties().getProperties().PERM_SN + "</a></td>";
				 		html += "</tr>";
			 		}
			 		$('#intersect_result_Tbody').html(html);
			 	}else{

					$('#intersect_result_Tbody').html("검색 결과가 없습니다.");
			 	}
			}).fail(function(response) {
				$('#intersect_result_Tbody').html("검색 결과가 없습니다.");
			});	
		}, this);
}

function searchAddress(){
	alertDivShow("지도가 실행되면 해당 시설의 정확한 위치를 지도상에서 클릭해 주십시오.", 0);
	var type = 'Point';
	var visualdraw = source;
	addressActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(addressActivation);

    createMeasureTooltip();
    addressActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    addressActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
			var resultPoint = new ol.Feature({
				geometry: point,
				id:"influe"
			});
			selectFeature = resultPoint;
			source.addFeature(selectFeature);
			
			createMeasureTooltip();
			
			search_intersect(point);
		}, this);
}

function fn_parent(id, x, y, juso, bjr_nm, brd_nm, bjd_nm, pnuFull, pnu, jibun, jibunAndHo) {
	if(gubun2 == "Inheoga"){
			window.location.href = backUrl+"?type=1&x="+x+"&y="+y+"&pnuFull="+pnuFull;
			return;
	}
	else{
		var flist = id.split('_');
		if(flist[0] == "dgg"){
			window.opener.parent.jusoDataDgg(id, x, y, juso, bjr_nm, brd_nm, bjd_nm, pnuFull, pnu, jibun, jibunAndHo);
		}
		else{
			window.opener.parent.jusoData(id, x, y, juso, bjr_nm, brd_nm, bjd_nm, pnuFull, pnu, jibun, jibunAndHo);
		}
		self.close();
	}
}

function addInteractionInfluence() {
	
	var type = 'Point';
	var visualdraw = source;
	influeActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(influeActivation);

    createMeasureTooltip();
    influeActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    influeActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
			var resultPoint = new ol.Feature({
				geometry: point,
				id:"influe"
			});
			selectFeature = resultPoint;
			source.addFeature(selectFeature);
			
			createMeasureTooltip();
			
		}, this);
}


var inheoWellFeatureList = [];
var inheoCurltureFeatureList = [];
var inheoRiverFeatureList = [];
var inheoProtectFeatureList = [];
var inheoWellProtectFeatureList = [];

function clearInheoList(){
	inheoWellFeatureList = [];
	inheoCurltureFeatureList = [];
	inheoRiverFeatureList = [];
	inheoProtectFeatureList = [];
	inheoWellProtectFeatureList = [];
}
function addInteractionInheo() {
	
	var type = 'Point';
	var visualdraw = source;
	inheoActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(inheoActivation);

    createMeasureTooltip();
    inheoActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    inheoActivation.on('drawend',
		function(evt) {

	    	source.clear();
	    	result_source.clear();
	    	inheoSource.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
			var resultPoint = new ol.Feature({
				geometry: point,
				id:"inheo"
			});

			clearInheoList();
			
			selectFeature = resultPoint;
			source.addFeature(selectFeature);
			
			createMeasureTooltip();
			
			var poly  = new ol.geom.Polygon([
                createCirclePointCoords(evt.feature.getGeometry().getCoordinates()[0],evt.feature.getGeometry().getCoordinates()[1], $('.inheoinput').val(),66)
            ]);
			var resultPolygon = new ol.Feature({
				geometry: poly,
				id: 'circle',
			})
			source.addFeature(resultPolygon);
			inheo_getPnu(resultPoint.getGeometry().getCoordinates()[0], resultPoint.getGeometry().getCoordinates()[1]);
			inheo_wellintersect(poly);
			
			inheo_intersect(poly,'lt_c_uo301');
			inheo_intersect(poly,'lt_c_wkmstrm');
			inheo_intersect(poly,'lt_c_um710');
			//inheo_intersect(poly,'lt_c_uj510'); 지하수보존구역
			createMeasureTooltip();
		}, this);
}


var inheo_getPnu = function(pt_x, pt_y){
	selectedPnu="";
	var point =  ol.proj.transform([pt_x,pt_y],  map.getView().getProjection(),'EPSG:4326');
	
	$.ajax({
			url : contextRoot + "/gis/getPnu.do",
			type : "POST",
			async: true,
			dataType : "json",
			data : {'pt_x' : point[0], 'pt_y' : point[1] },
    }).then(function(res) {
    	if("success"==res.result){
    		if(res.pnu.length>0){
        		$("#inheoaddress").val(res.pnu[0].address);
        		selectedPnu = res.pnu[0].pnu;
    		}
    	}
    }).fail(function(response) {
			alert('검색된 주소가 없습니다.');
	});	
}

var inheo_wellintersect=function(poly) {
	var circleGeom = poly; 	
	
	map.getView().fit(circleGeom.getExtent(), map.getSize());
	
	var servicename = OLSM.getServiceNameWidthLayerName("허가신고공");

	var query = "";
    for(var idx=0; idx < circleGeom.getCoordinates()[0].length; idx++){
    	var tmp =  ol.proj.transform([circleGeom.getCoordinates()[0][idx][0],circleGeom.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
    	query += tmp[0] + ' ' + tmp[1] + ' ';
    }
    
    var tmpInit =  ol.proj.transform([circleGeom.getCoordinates()[0][0][0],circleGeom.getCoordinates()[0][0][1]],  map.getView().getProjection(),'EPSG:4326');
	query += tmpInit[0] + ' ' + tmpInit[1] + ' ';
	
	var url = OLSProxy + encodeURI(OLSData[servicename].identify);

	var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
	             "<Intersects>"+
	             "<PropertyName>geom</PropertyName>"+
	             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
             	 "<gml:exterior>"+
                 "<gml:LinearRing>"+
                 "<gml:posList>"+query+"</gml:posList>"+
                 "</gml:LinearRing>"+
                 "</gml:exterior>"+
	             "</gml:Polygon>"+
	             "</Intersects>"+
	             "</Filter>";
	
	$.ajax({
    	type : "GET",
        url: url,  
        data:{
        	filter : encodeURI(filter)
        },
	}).then(function(response) {	
		var g =  new ol.format.GML2();
		var features = g.readFeatures(response);
		
	 	if(features.length>0)
	 	{
	 		for(var i=0; i < features.length; i++){
		 		var point = new ol.geom.Point(ol.proj.transform([Number(features[i].getGeometry().getCoordinates()[0]), Number(features[i].getGeometry().getCoordinates()[1])], 'EPSG:4326', 'EPSG:3857'));
				var resultPoint = new ol.Feature({
					geometry: point,
					id:"inheowell"
				});
				inheoSource.addFeature(resultPoint);
	 		}
			
			inheoWellFeatureList.push(features);
			showInheoList('well', features);
	 	}else{
	 		var html="<table style='width:100%'>";
	 			html+="<tr><th>검색된 관정이 없습니다</th></tr>";
	 			html+="</table>";
	 		$('.inheo_result_tb').html(html);
	 	}
	}).fail(function(response) {
 		var html="<table style='width:100%'>";
 			html+="<tr><th>검색된 관정이 없습니다</th></tr>";
 			html+="</table>";
 		$('.inheo_result_tb').html(html);
	});	
}


var inheo_intersect=function(poly, typename) {
	var circleGeom = poly; 	
	
	map.getView().fit(circleGeom.getExtent(), map.getSize());
	
	var query = "";
    for(var idx=0; idx < circleGeom.getCoordinates()[0].length; idx++){
    	var tmp =  ol.proj.transform([circleGeom.getCoordinates()[0][idx][0],circleGeom.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
    	query += tmp[0] + ' ' + tmp[1] + ' ';
    }
    
    var tmpInit =  ol.proj.transform([circleGeom.getCoordinates()[0][0][0],circleGeom.getCoordinates()[0][0][1]],  map.getView().getProjection(),'EPSG:4326');
	query += tmpInit[0] + ' ' + tmpInit[1] + ' ';

	var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
	             "<Intersects>"+
	             "<PropertyName>ag_geom</PropertyName>"+
	             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
             	 "<gml:exterior>"+
                 "<gml:LinearRing>"+
                 "<gml:posList>"+query+"</gml:posList>"+
                 "</gml:LinearRing>"+
                 "</gml:exterior>"+
	             "</gml:Polygon>"+
	             "</Intersects>"+
	             "</Filter>";
	$.ajax({
		url :  OLSProxy + 'http://api.vworld.kr/req/wfs?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=' + typename + '&VERSION=1.1.0&MAXFEATURES=40&SRSNAME=EPSG:4326&OUTPUT=GML3&KEY=1ED82628-E246-3284-8252-101C718A43CB&DOMAIN=127.0.0.1',
        data: {
			Filter : encodeURI(filter)
		},
		success : function(res){
			
			var g =  new ol.format.GML3();
			var features = g.readFeatures(res);
        	if(features.length>0)
        	{
        		switch(typename){
        			case "lt_c_uo301":
        				inheoCurltureFeatureList.push(features);
        				break;
        			case "lt_c_wkmstrm":
        				inheoRiverFeatureList.push(features);
        				break;
        			case "lt_c_wkmstrm":
        				inheoRiverFeatureList.push(features);
        				break;
        			case "lt_c_um710":
        				inheoProtectFeatureList.push(features);
        				break;
        			case "lt_c_uj510":
        				inheoWellProtectFeatureList.push(features);
        				break;
        		}
        		
			}
		},
		error :  function(res){}
	});	
}

function showInheoList(showType, features){
	inheoSource.clear();
	var html="<table style='width:100%'>";
	switch(showType){
		case "well":
			if(features==undefined){
				if(inheoWellFeatureList.length>0){
					features = inheoWellFeatureList[0];
				}
			}
			if(features!=undefined){
				html+="<tr><th>허가번호</th><th>주소</th></tr>"
				for(var i=0; i < features.length; i++){
					html+="<tr>";
					var point = new ol.geom.Point(ol.proj.transform([Number(features[i].getGeometry().getCoordinates()[0]), Number(features[i].getGeometry().getCoordinates()[1])], 'EPSG:4326', 'EPSG:3857'));
					var resultPoint = new ol.Feature({
						geometry: point,
						id:"inheo"
					});
					var style = new ol.style.Style({
						stroke: new ol.style.Stroke({
					        color: '#0000FF',
					        width: 2
						}),
						image: new ol.style.Circle({
							radius: 8,
							stroke: new ol.style.Stroke({
								color: '#000000'
							}),
							fill: new ol.style.Fill({
								color: '#FF0000'
							})
						})
				    });
					resultPoint.setStyle(style);
					inheoSource.addFeature(resultPoint);
					html+="<td>"+features[i].getProperties().perm_nt_no+"</td><td>" + chkUndefined(features[i].getProperties().address)+"</td>";
					html+="</tr>";
				}
			}else{
				html+="<tr><th>검색된 관정이 없습니다</th></tr>";
			}
			break;
		case "curlture":
			if(features==undefined){
				if(inheoCurltureFeatureList.length>0){
					features = inheoCurltureFeatureList[0];
				}
			}
			if(features!=undefined){
				html+="<tr><th>문화재</th><th>용도구역명</th></tr>"
				for(var i=0; i < features.length; i++){
					html+="<tr>";

					var ar_line = [];
					for(var j=0;j<features[i].getGeometry().getCoordinates()[0][0].length;j++){
						var item =features[i].getGeometry().getCoordinates()[0][0][j];
						ar_line.push(ol.proj.transform([item[1], item[0]], 'EPSG:4326', 'EPSG:3857'));	
					}
					
					if(ar_line.length>0){
						var poly = new ol.geom.Polygon([ar_line]);
						
						var resultPoly = new ol.Feature({
							geometry: poly,
							id:"inheo"
						});
						var style = new ol.style.Style({
					        stroke: new ol.style.Stroke({
					            color: 'blue',
					            width: 3
					        }),
					        fill: new ol.style.Fill({
					            color: 'rgba(255,0,0,0.3)'
					        })
					    });
						resultPoly.setStyle(style);
						inheoSource.addFeature(resultPoly);
					}
					
					html+="<td>"+chkUndefined(features[i].getProperties().alias)+"</td><td>" + chkUndefined(features[i].getProperties().uname)+"</td>";
					html+="</tr>";
				}
			}else{
				html+="<tr><th>검색된 문화재가 없습니다</th></tr>";
			}
			break;
		case "river":
			if(features==undefined){
				if(inheoRiverFeatureList.length>0){
					features = inheoRiverFeatureList[0];
				}
			}
			if(features!=undefined){
				html+="<tr><th>하천등급</th><th>하천명</th></tr>"
				for(var i=0; i < features.length; i++){
					html+="<tr>";
					var ar_line = [];
					for(var j=0;j<features[i].getGeometry().getCoordinates()[0][0].length;j++){
						var item =features[i].getGeometry().getCoordinates()[0][0][j];
						ar_line.push(ol.proj.transform([item[1], item[0]], 'EPSG:4326', 'EPSG:3857'));	
					}
					
					if(ar_line.length>0){
						var poly = new ol.geom.Polygon([ar_line]);
						
						var resultPoly = new ol.Feature({
							geometry: poly,
							id:"inheo"
						});
						var style = new ol.style.Style({
					        stroke: new ol.style.Stroke({
					            color: 'blue',
					            width: 3
					        }),
					        fill: new ol.style.Fill({
					            color: 'rgba(255,0,0,0.3)'
					        })
					    });
						resultPoly.setStyle(style);
						inheoSource.addFeature(resultPoly);
					}
					html+="<td>"+chkUndefined(features[i].getProperties().riv_level)+"</td><td>" + chkUndefined(features[i].getProperties().riv_nm)+"</td>";
					html+="</tr>";
				}
			}else{
				html+="<tr><th>검색된 하천이 없습니다</th></tr>";
			}
			break;
		case "protect":
			if(features==undefined){
				if(inheoProtectFeatureList.length>0){
					features = inheoProtectFeatureList[0];
				}
			}
			if(features!=undefined){
				html+="<tr><th>상수원보호구역</th><th>기타</th></tr>"
				for(var i=0; i < features.length; i++){
					html+="<tr>";
					var ar_line = [];
					for(var j=0;j<features[i].getGeometry().getCoordinates()[0][0].length;j++){
						var item =features[i].getGeometry().getCoordinates()[0][0][j];
						ar_line.push(ol.proj.transform([item[1], item[0]], 'EPSG:4326', 'EPSG:3857'));	
					}
					
					if(ar_line.length>0){
						var poly = new ol.geom.Polygon([ar_line]);
						
						var resultPoly = new ol.Feature({
							geometry: poly,
							id:"inheo"
						});
						var style = new ol.style.Style({
					        stroke: new ol.style.Stroke({
					            color: 'blue',
					            width: 3
					        }),
					        fill: new ol.style.Fill({
					            color: 'rgba(255,0,0,0.3)'
					        })
					    });
						resultPoly.setStyle(style);
						inheoSource.addFeature(resultPoly);
					}
					html+="<td>"+chkUndefined(features[i].getProperties().uname)+"</td><td>" + chkUndefined(features[i].getProperties().remark)+"</td>";
					html+="</tr>";
				}
			}else{
				html+="<tr><th>검색된 상수원보호구역이 없습니다</th></tr>";
			}
			break;
		case "wellprotect":
			if(features==undefined){
				if(inheoWellProtectFeatureList.length>0){
					features = inheoWellProtectFeatureList[0];
				}
			}
			if(features!=undefined){
				html+="<tr><th>지하수보존구역</th><th>주소</th></tr>"
				for(var i=0; i < features.length; i++){
					html+="<tr>";
					/*
					var point = new ol.geom.Point(ol.proj.transform([Number(features[i].getGeometry().getCoordinates()[0]), Number(features[i].getGeometry().getCoordinates()[1])], 'EPSG:4326', 'EPSG:3857'));
					var resultPoint = new ol.Feature({
						geometry: point,
						id:"inheo"
					});
					result_source.addFeature(resultPoint);
					*/
					html+="<td>"+chkUndefined(features[i].getProperties().alias)+"</td><td>" + chkUndefined(features[i].getProperties().uname)+"</td>";
					html+="</tr>";
				}
			}else{
				html+="<tr><th>검색된 지하수보존구역이 없습니다</th></tr>";
			}
			break;
	}	
	html+="</table>";
	$('.inheo_result_tb').html(html);
}

function chkUndefined(val){
	if(val==undefined)
		return '';
	else
		return val;
}

function addInteractionExchange() {
	var type = 'Point';
	var visualdraw = source;
	exchangeActivation = new ol.interaction.Draw({
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),	
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.7)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				})
			})
		})
	});
	map.addInteraction(exchangeActivation);

    createMeasureTooltip();
    exchangeActivation.on('drawstart',
		function(evt) {
			// set sketch
			sketch = evt.feature;
			$( ".tooltip" ).remove();
		}, this);

    exchangeActivation.on('drawend',
		function(evt) {
    		source.clear();
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			var point = new ol.geom.Point(evt.feature.getGeometry().getCoordinates());
			var resultPoint = new ol.Feature({
				geometry: point,
				id:"influe"
			});
			selectFeature = resultPoint;
			source.addFeature(selectFeature);
			
			createMeasureTooltip();
			$("#lonlat_lon_d").val("");
		    $("#lonlat_lon_m").val("");
		    $("#lonlat_lon_s").val("");

		    $("#lonlat_lat_d").val("");
		    $("#lonlat_lat_m").val("");
		    $("#lonlat_lat_s").val("");
		    
			var longlat = ol.proj.transform([evt.feature.getGeometry().getCoordinates()[0], evt.feature.getGeometry().getCoordinates()[1]], 'EPSG:3857', 'EPSG:4326');
			$('#lonlat_lon').val(longlat[0]);
			$('#lonlat_lat').val(longlat[1]);
			
			changeDMSDgree();
		}, this);
}

//토지정보 상세보기 버튼 이벤트
function show_area_info() {
	if(selectedPnu != "") pop_land_info(selectedPnu);
	else alert("영향반경 위치를 다시 선택해 주세요.");
}

//부동산 연계 상세보기.
function pop_land_info(pnu) {
    if (pnu != "") {
        //3023010400200060002
        //30 230 104 00 2 0006 0002
        var sido = pnu.substring(0, 2); //30
        var sgg = pnu.substring(2, 5); //230
        var umd = pnu.substring(5, 8); //104
        var ri = pnu.substring(8, 10); //00
        var gbn = pnu.substring(10, 11);  //2
        var bobn = pnu.substring(11, 15); // 0006
        var bobn1 = Number(bobn);
        var bubn = pnu.substring(15, 19); // 0002
        var bubn1 = Number(bubn);
        //console.log(sido + ", " + sgg + ", " + umd + ", " + ri + ", " + gbn + ", " + bobn1 + ", " + bubn1);
        var land_info_url = "http://luris.molit.go.kr/web/actreg/arservice/ArLandUsePrintFrame.jsp?";
        var value = "pnu=" + pnu + "&mode=search&sMode=search&selGbn=umd&isNoScr=script&selSido=" + sido +
                    "&selSgg=" + sgg + "&selUmd=0" + umd + "&selRi=" + ri + "&landGbn=" + gbn + "&bobn=" + bobn1 + "&bubn=" + bubn1 + "&flag=";
        //alert(value);
        window.open(land_info_url+value, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=800, height=800");
    }
    else {
        alert("토지정보 데이터가 없습니다.");
    }    
}

/*인허가검토*/
var inheoSearch = function(){
	if($('.inheoinput').val()==""){
		alert('반경 값을 입력하세요');
		return;
	}	
		
	addInteraction('inheo');
}

var createMeasureTooltip = function() {
	measureTooltipElement = document.createElement('div');
	measureTooltipElement.className = 'tooltip tooltip-measure';
	measureTooltip = new ol.Overlay({
		element: measureTooltipElement,
		offset: [0, -15],
		positioning: 'bottom-center'
	});
	map.addOverlay(measureTooltip);
	
}

var pointerMoveHandler = function(evt) {
	if (evt.dragging) {
		return;
	}
	/** @type {string} */
	var helpMsg = '';
	/** @type {ol.Coordinate|undefined} */
	var tooltipCoord = evt.coordinate;

	if (sketch) {
		var output;
		var geom = (sketch.getGeometry());
		if (geom instanceof ol.geom.Polygon) {
			output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
			tooltipCoord = geom.getInteriorPoint().getCoordinates();
		} else if (geom instanceof ol.geom.LineString) {
			output = formatLength( /** @type {ol.geom.LineString} */ (geom));
			tooltipCoord = geom.getLastCoordinate();
		}else if (geom instanceof ol.geom.Circle) {
			output = formatCircle( /** @type {ol.geom.LineString} */ (geom));;
		}else if(geom instanceof ol.geom.Point){
			console.log('test');		
		}
		measureTooltipElement.innerHTML = output;
		measureTooltip.setPosition(tooltipCoord);
	}
};

var formatLength = function(line) {
	var length;
	length = Math.round(line.getLength() * 100) / 100;
	var output;
	if (length > 100) {
		output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) + ' ' + 'm';
	}
	return output;
}

var formatArea = function(polygon) {
	var area;
	area = polygon.getArea();
	var output;
	if (area > 10000) {
		output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
	} else {
		output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
	}
	return output;
}

var formatCircle = function(circle) {
	var output = circle.getRadius();
	if (output > 100) {
		output = (Math.round(output / 1000 * 100) / 100) + ' ' + 'km';
	} else {
		output = (Math.round(output * 100) / 100) + ' ' + 'm';
	}
	return output;
}

//초기화
var initMap = function(){
	currrentMode='';
	interactionInit();
	
	//map.removeEventListener('singleclick');
	
	clear_calc();
	source.clear();
	result_source.clear();
	inheoSource.clear();
	
	whpa_source1.clear();
	whpa_source2.clear();
	
	gptrac_source.clear();
	
	map.getOverlays().getArray().forEach(function(overlay) {
		map.removeOverlay(overlay);
	});
}

//맵 저장
var exportMap = function(e){
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.toBlob(function (blob) {
		saveAs(blob, 'map.png');
	});
}

//맵 프린트
var exportPrint = function(e){
	var canvas = document.getElementById("map").getElementsByClassName("ol-unselectable")[0];
	var img = canvas.toDataURL("image/png");
	alert(img);
}

//DIV태그 화면 중앙에 정렬
jQuery.fn.center = function () {
	this.css("position","absolute");
	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
	$(window).scrollTop()) + "px");
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
	$(window).scrollLeft()) + "px");
	return this;
}

var goMap = function(query){
	var filter = "<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>PERM_SN</ogc:PropertyName><ogc:Literal>"+query+"</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>";
	source.clear();

	var servicename = OLSM.getServiceNameWidthLayerName("관정_행정처분");
	var url = OLSProxy + encodeURI(OLSData[servicename].identify + "&typenames="+OLSData[servicename].layer +'&SRSNAME=' + OLSData[servicename].prj);
	
	$.ajax({
		url : url,	
		type : "GET",
		data:{
        	filter : encodeURI(filter)
        },
        dataType:"text",
		success : function(res) {
			var g =  new ol.format.GML3();
			var features = g.readFeatures(res);
        	if(features.length>0)
        	{
        		var pt = new ol.geom.Point(features[0].getGeometry().getCoordinates());
        		var resultPoint = new ol.Feature({
    				geometry: pt,
    				id: 'test'
    			})
        		source.addFeature(resultPoint);
        		var center =  getCenterOfExtent(resultPoint.getGeometry().getExtent());
        	    map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326')));
        	    //map.getView().setZoom(12);
        	}
		}
	});
}

var goMap2 = function(query){
	var filter = "<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>DSTRCT_NMENG</ogc:PropertyName><ogc:Literal>"+query+"</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>";
	source.clear();
	
	var servicename = OLSM.getServiceNameWidthLayerName("수역구분도");
	var url = OLSProxy + encodeURI(OLSData[servicename].identify + "&typenames="+OLSData[servicename].layer +'&SRSNAME=' + OLSData[servicename].prj);
	
	$.ajax({
		url : url,	
		type : "GET",
		data:{
        	filter : encodeURI(filter)
        },
        dataType:"text",
		success : function(res) {
			var g =  new ol.format.GML3();
			var features = g.readFeatures(res);
        	if(features.length>0)
        	{
        		var poly = new ol.geom.Polygon(features[0].getGeometry().getCoordinates()[0][0]);
				var resultPoly = new ol.Feature({
					geometry: poly,
    				id: 'test'
				})
				source.addFeature(resultPoly);
				
        		var center =  getCenterOfExtent(resultPoly.getGeometry().getExtent());
        	    //map.getView().setZoom(12);
        	}
		}
	});
}

var goMap3 = function(lat, lon){
	if(lon=="0" || lat=="0" || lon=="" || lat=="" || lon=="주소가 없습니다"){
		showDialog('위치찾기','위치를 찾을 수 없습니다');
		return;
	}
	source.clear();
	var pt = new ol.geom.Point(ol.proj.transform([Number(lat), Number(lon)], 'EPSG:4326', 'EPSG:3857'));
	var resultPoint = new ol.Feature({
		geometry: pt,
		id: 'test'
	})
	source.addFeature(resultPoint);
    
    map.getView().setCenter(ol.proj.transform([Number(lat), Number(lon)], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(19);
}


var goMap6 = function(tmx, tmy){
	if(tmx != "" && tmy != "" && tmx != "0.0" && tmx != "0" && tmy != "0.0" && tmy != "0"){
		tmx = Number(tmx);
		tmy = Number(tmy);
		source.clear();
		var pt = new ol.geom.Point(ol.proj.fromLonLat(ol.proj.transform([tmx, tmy], 'EPSG:5186', 'EPSG:4326')));
		var resultPoint = new ol.Feature({
			geometry: pt,
			id: 'goMap6'
		})
		source.addFeature(resultPoint);
		
		var center =  getCenterOfExtent(resultPoint.getGeometry().getExtent());
		
	    setTimeout(function() {
	    	 map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326')));
	    	 map.getView().setZoom(18);
	    }, 1)
	}
}

var goMap7 = function(lat, lon){
	source.clear();
	var pt = new ol.geom.Point([lat,lon]);
	var resultPoint = new ol.Feature({
		geometry: pt,
		id: 'test'
	})
	source.addFeature(resultPoint);
	var center =  getCenterOfExtent(resultPoint.getGeometry().getExtent());
    
    map.getView().setCenter(ol.proj.fromLonLat(ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326')));
}

//영향반경
var change_influ_type = function (type) {
    clear_calc();
    switch (type) {
        case "Shulze":
            $("#weber_info").hide();
            break;
        case "Weber":
            $("#weber_info").show();
            break;
        case "Kozeny":
            $("#weber_info").hide();
            break;
    }
}


var createCirclePointCoords=function(circleCenterX,circleCenterY,circleRadius,pointsToFind){
    var angleToAdd = 360/pointsToFind;
    var coords = [];  
    var angle = 0;
    for (var i=0;i<pointsToFind;i++){
        angle = angle+angleToAdd;
        var coordX = circleCenterX + circleRadius * Math.cos(angle*Math.PI/180);
        var coordY = circleCenterY + circleRadius * Math.sin(angle*Math.PI/180);
        coords.push([coordX,coordY]);
    }
    return coords;
}

//맵 프린트
var popPrint = function(e){
	
	var ua = window.navigator.userAgent;
	var version = "";
	if(ua.indexOf('MSIE') > 0 || ua.indexOf('Trident') > 0){
		
		var canvas = document.getElementById("map").getElementsByClassName("ol-unselectable")[0];
		var img = canvas.toDataURL("image/png");
		// $('#print_map').html("<img src='" + img + "'");
		$("#print_img").css("width","100%");
		$("#print_img").css("height",'100%');
		$("#print_img").attr("src",img);
		//$("#print_wrap").center();
		printMap(document.getElementById('print_map').innerHTML);
		
	} else if(ua.indexOf('Opera') > 0 || ua.indexOf('OPR') > 0){
		version = "Opera";
	} else if(ua.indexOf('Firefix') > 0){
		version = "Firefox";
	} else if(ua.indexOf('Safari') > 0) {
		if(ua.indexOf('Chrome') > 0){
			version = "Chrome";
			alert(" IE 환경에서만 인쇄할 수 있습니다.");
		}
	} else {
		version = "Safari";
	}
	
}
var printMap = function(printThis){
	var win = null;
	win = window.open();
	self.focus();
	win.document.open();
	win.document.write("<h6>소다 지하수 관측망 시스템</h6>");
	win.document.write(printThis);
	win.document.close();
	win.print();
	win.close();
}

function win(url) {
	window.open(url, "", "");  // 속성 지정하지 않은 기본창
}

function changeDMSDgree(){
	if($('#lonlat_lon').val()!="" && $('#lonlat_lat').val()!="")
	{
		var lon = $('#lonlat_lon').val();
		var lat = $('#lonlat_lat').val();
		convertDegreetoDMS(lon, lat);
	}else if($('#lonlat_lon_d').val()!="" && $('#lonlat_lon_m').val()!="" && $('#lonlat_lon_s').val()!="" && $('#lonlat_lat_d').val()!="" && $('#lonlat_lat_m').val()!="" && $('#lonlat_lat_s').val()!="")
	{
		var lon_d=$('#lonlat_lon_d').val();
		var lon_m=$('#lonlat_lon_m').val();
		var lon_s=$('#lonlat_lon_s').val();
		
		var lat_d=$('#lonlat_lat_d').val();
		var lat_m=$('#lonlat_lat_m').val();
		var lat_s=$('#lonlat_lat_s').val();
		convertDMStoDegree(lon_d, lon_m, lon_s, lat_d, lat_m, lat_s);
	}else{
		alert('좌표를 입력하세요.');
		return;
	}
	
	var lon = $('#lonlat_lon').val();
	var lat = $('#lonlat_lat').val();
	
	var pt = new ol.geom.Point(ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857'));

	var resultPoint = new ol.Feature({
		geometry: pt,
		id: 'convertDMS'
	})
	result_source.addFeature(resultPoint);
	
    map.getView().setCenter(ol.proj.fromLonLat([Number(lon),Number(lat)]));
}

function convertDegreetoDMS(lon, lat)
{
	var lontemp = lon.split('.');
	var lattemp = lat.split('.');
	
	var lon_d = lontemp[0];
	var lon_m = Math.floor(Number('0.'+lontemp[1]) * 3600 / 60);
	var lon_s = (Number('0.'+lontemp[1]) * 3600) - (lon_m*60);
	
	var lat_d = lattemp[0];
	var lat_m = Math.floor(Number('0.'+lattemp[1]) * 3600 / 60);
	var lat_s = (Number('0.'+lattemp[1]) * 3600) - (lat_m*60);
	
	var lon_d=$('#lonlat_lon_d').val(lon_d);
	var lon_m=$('#lonlat_lon_m').val(lon_m);
	var lon_s=$('#lonlat_lon_s').val(lon_s);
	
	var lat_d=$('#lonlat_lat_d').val(lat_d);
	var lat_m=$('#lonlat_lat_m').val(lat_m);
	var lat_s=$('#lonlat_lat_s').val(lat_s);
}

function convertDMStoDegree(lon_d, lon_m, lon_s, lat_d, lat_m, lat_s)
{
	var lon = Number(lon_d)+ ((Number(lon_m)/60) + (Number(lon_s)/3600));
	var lat = Number(lat_d) + ((Number(lat_m)/60) + (Number(lat_s)/3600));


	var lon = $('#lonlat_lon').val(lon);
	var lat = $('#lonlat_lat').val(lat);
}

//영향반경 검색 엑셀 저장
function exportTableToExcel(tableID, fileNm){
	filename = '';
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML;
    
    // Specify file name
    filename = fileNm?fileNm+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

/*영향반경*/
var calc=function(){
	var value="", v1, v2, v3, v4, v5, result="";
	v1 = $("#shulzeFirstValueTi").val();
	v2 = $("#shulzeSecondValueTi").val();
	v3 = $("#shulzeThirdValueTi").val();
	v4 = $("#shulzeFourthValueTi").val();
	v5 = $("#weber_value_01").val();
	$("input:radio[name='influ_type']:checked").each(function (index) { value = $(this).val(); }); 
	if(v1== "" || v2 == "" || v3 == "" || v4 =="") alert("입력값이 부족합니다.");
	else if(isNaN(v1) == true || isNaN(v2) == true || isNaN(v3) == true || isNaN(v4) == true) alert("숫자만 입력해주세요");
	else {
		if(value="Shulze") result = shulzeCalc(v1, v2, v3, v4);
		else if(value="Weber") {
			if(v5 > 3 || v5 < 1.9) alert("상수는 1.9보다 커야하며, 3보다 작아야 합니다.");
			else  result = weberCalc(v5, v1, v2, v3, v4);
		} else result = kozenyCalc(v1, v2, v3, v4);
	}
	result = Math.round(result);
	if(isNaN(result))alert("계산에 맞지 않는 데이터 입니다.");
	else {		
		$(document.getElementById('resultCalcTi')).html(result);
	}
}

var  shulzeCalc=function(value1, value2, value3, value4) {
	value1 = Number(value1);
	value2 = Number(value2);
	value3 = Number(value3);
	value4 = Number(value4);
	var num = 6 * value1 * value2 * (value3 / value4);
	var resultNum =	Math.sqrt(num);
	return resultNum;	
}

var  weberCalc=function (value1, value2, value3, value4, value5) {
	var resultNum =	Number(value1) * Math.sqrt(Number(value2) * Number(value3) * (Number(value4) / Number(value5)));
	return resultNum;	
}

var  kozenyCalc=function (value1, value2, value3, value4) {
	resultNum = Math.sqrt(((12 * Number(value2)) / (Number(value4))) * Math.sqrt(((Number(value3)) * (Number(value1))) / 3.14));
	return resultNum;	
}

var clear_calc=function () {
    $("#weber_value_01").val("");
    $("#shulzeFirstValueTi").val("");
    $("#shulzeSecondValueTi").val("");
    $("#shulzeThirdValueTi").val("");
    $("#shulzeFourthValueTi").val("");

    $("#devavail_rain").val("");
    $("#devavail_recharge").val("");
    $("#devavail_dev").val("");
    $("#devavail_use").val("");
    $("#devavail_userate").val("");
    $("#devavail_afterdev").val("");
    $("#devavail_area").val("");
    
    $(document.getElementById('resultCalcTi')).html("0");
    $(document.getElementById('resultCalcDph')).html("0");
    
    $("#influe_result_Tbody").html("");
    $("#intersect_result_Tbody").html("");
    
    $("#influe_cal_soil_label").html("&nbsp;");
    selectedPnu="";
    

    $("#lonlat_lon").val("");
    $("#lonlat_lat").val("");
    

    $("#lonlat_lon_d").val("");
    $("#lonlat_lon_m").val("");
    $("#lonlat_lon_s").val("");

    $("#lonlat_lat_d").val("");
    $("#lonlat_lat_m").val("");
    $("#lonlat_lat_s").val("");
    
    $('.info_box').hide();
}

var  apply_calc=function() {
	var radius = $(document.getElementById('resultCalcTi')).html();
	if(radius=="0") alert("계산후 적용해주세요");
	else {
		if(selectFeature==undefined){
			alert('지도 위 지점을 클릭하세요');
			return;
		}else{
			influe_anal(Number(radius));	
		}
	}
}

var  influe_anal=function(radius) {
	source.clear();
	result_source.clear();
	
	$('.influe_result').show();
	var circleGeom = new ol.geom.Polygon([ createCirclePointCoords(selectFeature.getGeometry().getCoordinates()[0], selectFeature.getGeometry().getCoordinates()[1], radius, 60) ]); 	
	 
	source.addFeature(new ol.Feature(circleGeom));
	source.addFeature(selectFeature);
	
	map.getView().fit(circleGeom.getExtent(), map.getSize());
	
	var servicename = OLSM.getServiceNameWidthLayerName("허가신고공");

	var point = new ol.geom.Point([selectFeature.getGeometry().getCoordinates()[0], selectFeature.getGeometry().getCoordinates()[1]]);
 
	var query = "";
    for(var idx=0; idx < circleGeom.getCoordinates()[0].length; idx++){
    	var tmp =  ol.proj.transform([circleGeom.getCoordinates()[0][idx][0],circleGeom.getCoordinates()[0][idx][1]],  map.getView().getProjection(),'EPSG:4326');
    	query += tmp[0] + ' ' + tmp[1] + ' ';
    }
    
    var tmpInit =  ol.proj.transform([circleGeom.getCoordinates()[0][0][0],circleGeom.getCoordinates()[0][0][1]],  map.getView().getProjection(),'EPSG:4326');
	query += tmpInit[0] + ' ' + tmpInit[1] + ' ';
	
	var url = OLSProxy + encodeURI(OLSData[servicename].identify);

	var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>"+
	             "<Intersects>"+
	             "<PropertyName>geom</PropertyName>"+
	             "<gml:Polygon xmlns:gml='http://www.opengis.net/gml' srsName='EPSG:4326'>"+
             	 "<gml:exterior>"+
                 "<gml:LinearRing>"+
                 "<gml:posList>"+query+"</gml:posList>"+
                 "</gml:LinearRing>"+
                 "</gml:exterior>"+
	             "</gml:Polygon>"+
	             "</Intersects>"+
	             "</Filter>";
	
	$.ajax({
    	type : "GET",
        url: url,  
        data:{
        	filter : encodeURI(filter)
        },
	}).then(function(response) {	
		var g =  new ol.format.GML2();
		var features = g.readFeatures(response);
	 	if(features.length>0)
	 	{
	 		var html = "";
	 		html += "<tr>";
	 		html += "<th>인허가 번호</th>";
	 		html += "<th>주소</th>";
	 		html += "</tr>";
	 		
	 		for(var i=0; i < features.length; i++){
	    		
	 			var feature = new ol.Feature(features[i]);
	 			
	 			var point = new ol.geom.Point(ol.proj.transform([Number(feature.getProperties().getProperties().geom.getCoordinates()[0]), Number(feature.getProperties().getProperties().geom.getCoordinates()[1])], 'EPSG:4326', 'EPSG:3857'));
				var resultPoint = new ol.Feature({
					geometry: point,
					id:feature.getProperties().getProperties().perm_nt_no
				});
		    	
		    	result_source.addFeature(resultPoint);
	 			
		 		html += "<tr>";
		 		//html += "<td><a href='#' onclick='goMap4(\"" + feature.getProperties().getProperties().perm_nt_no + "\")'>" +  feature.getProperties().getProperties().perm_nt_no + "</a></td>";
		 		html += "<td>" +  feature.getProperties().getProperties().perm_nt_no + "</td>";
		 		html += "<td>" +  feature.getProperties().getProperties().address + "</td>";
		 		html += "</tr>";
	 		}
	 		$('#influe_result_Tbody').html(html);
	 		
	 		calc_dph(features, selectFeature.getGeometry().getCoordinates()[0], selectFeature.getGeometry().getCoordinates()[1]);
	 	}else{

			$('#influe_result_Tbody').html("검색 결과가 없습니다.");
	 	}
	}).fail(function(response) {
		$('#influe_result_Tbody').html("검색 결과가 없습니다.");
	});	
}

var calc_dph = function(features, pt_x, pt_y){
	var perm_sn = [];
	var point =  ol.proj.transform([pt_x,pt_y],  map.getView().getProjection(),'EPSG:4326');
	var avr_dph = 0;
	
	for(var i=0; i < features.length; i++){
		if(features[i].getProperties().dig_dph==undefined)
		{
			avr_dph += 0;
		}else{
			avr_dph += Number(features[i].getProperties().dig_dph);			
		}
		perm_sn.push(features[i].getProperties().perm_nt_no);
	}
	avr_dph = avr_dph/features.length;
		
	$(document.getElementById('resultCalcDph')).html(Math.round(avr_dph));
	
	if(perm_sn.length>0){
	$.ajax({
			url : contextRoot + "/gis/getPnu.do",
			type : "POST",
			async: true,
			dataType : "json",
			data : {'pt_x' : point[0], 'pt_y' : point[1] },
    }).then(function(res) {
    	if("success"==res.result){
    		if(res.pnu.length>0){
        		$("#influe_cal_soil_label").text(res.pnu[0].address);
        		selectedPnu = res.pnu[0].pnu;
    		}
    	}
    }).fail(function(response) {
			alert('검색된 관정이 없습니다.');
		});	
	}
}


function addComma(strOrNum){
	return strOrNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function analysis_whpa_init(){	
	initMap();
	
	//포획구간 좌표추출
	$('#coodinates1Btn').click(function(){
		alert("원하는 지점을 선택해주세요.");
		$("#map").css("cursor", "help");
		//map.on('singleclick', analysis_whpa_select1);
		addInteraction("whpa","select1");
	});
	
	//포획구간 좌표추출
	$('#coodinates2Btn').click(function(){ 	
		alert("원하는 지점을 선택해주세요.");
		$("#map").css("cursor", "help");
		addInteraction("whpa","select2");
		//map.on('singleclick', analysis_whpa_select2);
	});
	
	//유동방향 정/역방향  좌표추출
	$('#coodinates3Btn').click(function(){ 	
		alert("원하는 지점을 선택해주세요.");
		$("#map").css("cursor", "help");
		addInteraction("whpa","select3");
		//map.on('singleclick', analysis_whpa_select3);
	});
	
	var whpacheck  = findLayer(map.getLayerGroup(), 'name', 'whpa1');
	if(whpacheck==undefined){
		map.addLayer(layers['whpa1']); //포획구간/유동방향 레이어
		map.addLayer(layers['whpa2']); //유동방향 정/역방향 레이어
	}else{
		whpa_source1.clear();
		whpa_source2.clear();
	}
}

//3년,5년,기타년 라디오 이벤트
function chg_whpa_rdo1(value){
	$("#maxModelingDistance1Ti").val("10");
	$("#modelingTerm1Ti").val(value);
}
//포획구간 초기화
function clear_analysis_whpa3(){
	$(".whpa_cont input[type='text']").val("");
	whpa_source1.clear();
	whpa_source2.clear();
	initMap();
	analysis_whpa_init();
}
var analysis_whpa_obj = {
	list : [],	
	init : function(){
		this.list = [];
	},	
	set : function(item){
		var obj = this.get(item.con1);
		if(obj != null){
			obj.items.push(item);
		}else{
			var new_obj = {
				id : item.con1,
				items : [item]
			};
			this.list.push(new_obj);
		}
	},
	get : function(id){
		var obj = null;
		for(var i=0;i<this.list.length;i++){
			if(id == this.list[i].id){
				obj = this.list[i];
			}
		}
		return obj;
	},
	list_w : [],
	init_w : function(){
		this.list_w = [];
	},
	set_w : function(item){
		var obj = this.get_w(item.con1);
		if(obj != null){
			obj.items.push(item);
		}else{
			var new_obj = {
				id : item.con1,
				items : [item]
			};
			this.list_w.push(new_obj);
		}
	},
	get_w : function(id){
		var obj = null;
		for(var i=0;i<this.list_w.length;i++){
			if(id == this.list_w[i].id){
				obj = this.list_w[i];
			}
		}
		return obj;
	}
};
var exe_file_path = "D:/whpa";

function analysis_whpa3(){
	whpa_source1.clear();
	whpa_source2.clear();
	//initMap();
	//analysis_whpa_init();
	fn_wrapLoading();
	var calcRadius = $("#calcRadiusTi").val();
	var tmx = $("#tmx1Ti").val();
	var tmy = $("#tmy1Ti").val();
	var maxModelingDistance = $("#maxModelingDistance1Ti").val();
	var modelingTerm = $("#modelingTerm1Ti").val();
	var pumpingCapacity = $("#pumpingCapacity1Ti").val();
	var transmissivity = $("#transmissivity1Ti").val();
	var slope = $("#slope1Ti").val();
	var flow =$("#flow1Ti").val();
	var porosity =$("#porosity1Ti").val();
	var aquiferThickness =$("#aquiferThickness1Ti").val();
	var boundaryCondition =$("#boundaryConditionDdl").val();
	var boundaryDistance = $("#boundaryDistanceTi").val();
	var boundaryDirection = $("#boundaryDirectionTi").val();
	
	try{
		calcRadius = Number(calcRadius).toFixed(0);
		tmx = Number(tmx).toFixed(1);
		tmy = Number(tmy).toFixed(1);
		maxModelingDistance = Number(maxModelingDistance).toFixed(1);
		modelingTerm = Number(modelingTerm).toFixed(1);
		pumpingCapacity = Number(pumpingCapacity).toFixed(1);
		transmissivity = Number(transmissivity).toFixed(1);
		slope = Number(slope).toFixed(6);
		flow =Number(flow).toFixed(2);
		porosity = Number(porosity).toFixed(2);
		aquiferThickness = Number(aquiferThickness).toFixed(2);
		boundaryCondition = Number(boundaryCondition).toFixed(0);
		boundaryDistance = Number(boundaryDistance).toFixed(1);
		boundaryDirection = Number(boundaryDirection).toFixed(1);
	} catch (e) {
		fn_closeLoading();
		alert("입력값이 잘못되었습니다.");
	}	
	
//	console.log("calcRadius : "+calcRadius);
//	console.log("tmx : "+tmx);
//	console.log("tmy : "+tmy);
//	console.log("maxModelingDistance : "+maxModelingDistance);
	
	$.ajax({
		type : "GET",
		url : "analysis_whpa1.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/MWCAP",
			calcRadius : calcRadius,
			tmx : tmx,
			tmy : tmy,
			maxModelingDistance : maxModelingDistance,
			modelingTerm : modelingTerm,
			pumpingCapacity : pumpingCapacity,
			transmissivity : transmissivity,
			slope : slope,
			flow : flow,
			porosity : porosity,
			aquiferThickness : aquiferThickness,
			boundaryCondition : boundaryCondition,
			boundaryDistance : boundaryDistance,
			boundaryDirection : boundaryDirection
		},		
		success : function(data) {
			analysis_whpa3_2(data);		////포획구간 계산1				
		},
		error : function(e) {
			fn_closeLoading();
			alert("포획구간 에러!!!");
		}
	});
}


//포획구간 계산1
function analysis_whpa3_2(foldname){
	$.ajax({
		type : "GET",
		url : "analysis_whpa2.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/MWCAP",
			foldname : foldname
			
		},		
		success : function(data) {
			analysis_whpa3_3(data);	//포획구간 계산3		 			
		},
		error : function(e) { 
			fn_closeLoading();
			alert("포획구간 에러!!!");
		}
	});
}
//포획구간 계산3
function analysis_whpa3_3(foldname){
	$.ajax({
		type : "GET",
		url : "analysis_whpa3.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/MWCAP",
			foldname : foldname
		},		
		success : function(data) {
			fn_closeLoading();
			draw_well_capture_zone(data);	//결과물 그리기..					
		},
		error : function(e) { 
			fn_closeLoading();
			alert("포획구간 에러!!!");
		}
	});
}
//결과물 그리기..
function draw_well_capture_zone(data){
	analysis_whpa_obj.init();	
	if(data.length > 0){		
		$.each(data, function(index,item){		
			//console.log(item);
			analysis_whpa_obj.set(item);											
		});
		draw_well_capture_zone2();//결과물 그리기2..
	}	
}

//결과물 그리기2..
function draw_well_capture_zone2(){
	var list = analysis_whpa_obj.list;	
	var len = list.length;
	for(var i=0;i<len;i++){
		var obj = list[i];
		var type = "line";
		var item_len = obj.items.length;		
		if(item_len >2 && obj.items[0].dcon1 == obj.items[item_len-1].dcon1
				&& obj.items[0].dcon2 == obj.items[item_len-1].dcon2){
			type = "poly";
		}		
		var ar_line = [];
		for(var j=0;j<item_len;j++){
			var item = obj.items[j];
			
			//var point = new ol.geom.Point([item.dcon1, item.dcon2]);		
			//ar_line.push(point);
			ar_line.push([item.dcon1, item.dcon2]);
		}
		
		var polygon_ring = new ol.geom.LineString(ar_line);	
		var feature;
		if(type == "poly"){
			//var linearRing = new ol.geom.LinearRing(ar_line);
			var poly = new ol.geom.Polygon(ar_line);	
			feature = new ol.Feature({
				geometry: poly
			})	
			
			feature.setStyle(polygonStyle);
		}else{
			//var poly = new ol.geom.Polygon([ polygon_ring ]);	
			
			feature = new ol.Feature({
				geometry: polygon_ring
			})	
			feature.setStyle(polylineStyle);
		}
		whpa_source2.addFeature(feature);
	}
}
//유동방향
function clear_pop_tb_gqtrac1(){
	pumpingCapacityArr = [];
	pumpingCapacityAcl = [];	
	
	var str_div ="<colgroup><col width='20%'/><col width='20%'/><col width='20%'/><col width='20%'/><col width='20%'/></colgroup>";			
	str_div += "<tr><th>NUM</th><th>tmx</th><th>tmy</th><th>유출량</th><th>정호반경</th></tr>";	
	str_div += "<tr>";
	str_div += "<td colspan='5'><input type='button' value='전체삭제' onclick='clear_pop_tb_gqtrac1();'/></td>";	
	str_div += "</tr>";
	$(document.getElementById("pop_tb_gqtrac1")).html(str_div);	
}
function clear_analysis_whpa3_6(){
	$(".gqtrac_cont input[type='text']").val("");
	courseDirectionArr1 = [];
	courseDirectionAcl1 = [];
	courseDirectionArr2 = [];
	courseDirectionAcl2 = [];	
	make_list_courseDirectionAcl();
	clear_pop_tb_gqtrac1();
	analy_whpa_poly = null;
	whpa_source1.clear();
	whpa_source2.clear();
	initMap();
	//analysis_whpa_init();
}
function make_list_courseDirectionAcl(){
	var id_chk = $("#whpa_rdo3_1").attr("checked");
	var str_div ="<colgroup><col width='30%'/><col width='30%'/><col width='30%'/><col width='10%'/></colgroup>";			
	str_div += "<tr><th>NUM</th><th>tmx</th><th>tmy</th><th>삭제</th></tr>";	
	var list = null;
	if(id_chk == "checked"){
		list = courseDirectionAcl1;
	}else{
		list = courseDirectionAcl2;
	}
	$(list).each(function(index, item) {		
		str_div += "<tr>";
		str_div += "<td>"+(index+1)+"</td>";
		str_div += "<td>"+item.tmx+"</td>";
		str_div += "<td>"+item.tmy+"</td>";		
		str_div += "<td><input type='button' value='삭제' onclick='del_courseDirectionAcl(\""+index+"\");'/></td>";
		str_div += "</tr>";
	});	
	$(document.getElementById("pop_tb_gqtrac2")).html(str_div);	
}

//유동방향 계산1
function analysis_whpa3_4(){
	//initMap();
	//analysis_whpa_init();
	fn_wrapLoading();
	var radiusTi = $("#radiusTi").val();
	var calcRadius = $("#calcRadius2Ti").val();
	var tmx = $("#tmx2Ti").val();
	var tmy = $("#tmy2Ti").val();
	var maxModelingDistance = $("#maxModelingDistance2Ti").val();
	var modelingTerm = $("#modelingTerm2Ti").val();
	//var pumpingCapacity = $("#pumpingCapacity2Ti").val();
	var transmissivity = $("#transmissivity2Ti").val();
	var slope = $("#slope2Ti").val();
	var flow =$("#flow2Ti").val();
	var porosity =$("#porosity2Ti").val();	
	var pumpingCapacityArr_str =String(pumpingCapacityArr);
	if(courseDirectionArr1.length < 1 && courseDirectionArr2.length < 1){
		alert("정방향/역방향 데이터가 최소 한개이상 있어야합니다.");
		return;
	}
//	if(courseDirectionArr2.length < 1){
//		alert("역방향 데이터가 최소 한개이상 있어야합니다.");
//		return false;
//	}
	var courseDirectionArr1_str =String(courseDirectionArr1);
	var courseDirectionArr2_str =String(courseDirectionArr2);
	if(courseDirectionArr1.length == 0) courseDirectionArr1_str = "none";
	if(courseDirectionArr2.length == 0) courseDirectionArr2_str = "none";
	
	var aquiferThickness = $("#aquiferThickness2Ti").val();
	var captureSection = $("#captureSectionTi").val();
	
	try{
		calcRadius = Number(calcRadius).toFixed(0);		
		radiusTi = Number(radiusTi).toFixed(0);
		tmx = Number(tmx).toFixed(1);
		tmy = Number(tmy).toFixed(1);
		maxModelingDistance = Number(maxModelingDistance).toFixed(1);
		modelingTerm = Number(modelingTerm).toFixed(2);
		//pumpingCapacity = Number(pumpingCapacity).toFixed(1);
		transmissivity = Number(transmissivity).toFixed(2);
		slope = Number(slope).toFixed(6);
		flow =Number(flow).toFixed(2);
		porosity = Number(porosity).toFixed(2);
		aquiferThickness = Number(aquiferThickness).toFixed(2);		
		captureSection = Number(captureSection).toFixed(2);
	} catch (e) {
		fn_closeLoading();
		alert("입력값이 잘못되었습니다.");
		return false;
	}	
	
	$.ajax({
		type : "GET",
		url : "analysis_whpa4.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/GPTRAC",
			calcRadius : calcRadius,
			radiusTi : radiusTi,
			tmx : tmx,
			tmy : tmy,
			maxModelingDistance : maxModelingDistance,
			modelingTerm : modelingTerm,			
			transmissivity : transmissivity,
			slope : slope,
			flow : flow,
			porosity : porosity,
			aquiferThickness : aquiferThickness,
			pumpingCapacityArr : pumpingCapacityArr_str,
			courseDirectionArr1 : courseDirectionArr1_str,
			courseDirectionArr2 : courseDirectionArr2_str,		
			captureSection : captureSection
		},		
		success : function(data) {	
			analysis_whpa3_5(data);		////유동방향 계산1	
		},
		error : function(e) { 
			fn_closeLoading();
			alert("유동방향 에러!!!");
		}
	});
}
//유동방향 계산2
function analysis_whpa3_5(foldname){
	$.ajax({
		type : "GET",
		url : "analysis_whpa5.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/GPTRAC",
			foldname : foldname
		},		
		success : function(data) {
			analysis_whpa3_6(data);	//유동방향 계산3		 			
		},
		error : function(e) { 
			fn_closeLoading();
			alert("유동방향 에러!!!");
		}
	});
}
//유동방향 계산3
function analysis_whpa3_6(foldname){
	$.ajax({
		type : "GET",
		url : "analysis_whpa6.do",
		dataType : "json",
		data : {
			path : exe_file_path+"/GPTRAC",
			foldname : foldname
		},		
		success : function(data) {	
			fn_closeLoading();
			draw_well_capture_zone3(data);	//결과물 그리기..					
		},
		error : function(e) { 
			fn_closeLoading();
			alert("유동방향 에러!!!");
		}
	});
}

function chg_whpa_rdo2(value){
	$("#maxModelingDistance2Ti").val("10");
	$("#modelingTerm2Ti").val(value);
	$("#captureSectionTi").val(value);
}

//결과물 그리기..
function draw_well_capture_zone3(data){
	analysis_whpa_obj.init_w();	
	if(data.length > 0){		
		whpa_source2.clear();
		$.each(data, function(index,item){		
			//console.log(item);
			analysis_whpa_obj.set_w(item);											
		});
		draw_well_capture_zone4();//결과물 그리기2..
	}	
}
//결과물 그리기2..
function draw_well_capture_zone4(){
	var gptraccheck  = findLayer(map.getLayerGroup(), 'name', 'analy_gptrac');
	if(gptraccheck==undefined){
		map.addLayer(layers['analy_gptrac']); //유동방향 레이어
	}else{
		gptrac_source.clear();
	}
	
	var list = analysis_whpa_obj.list_w;
	//console.log(list);
	var len = list.length;
	for(var i=0;i<len;i++){
		var obj = list[i];		
		//console.log(obj);
		var item_len = obj.items.length;		
		var ar_line = [];
		var color = "#FF0000";
		for(var j=0;j<item_len;j++){
			var item = obj.items[j];
			if(item.con2 == "RED"){
				color = "#FF0000";
			}else if(item.con2 == "BLUE"){
				color = "#0054FF";
			}else if(item.con2 == "GREEN"){
				color = "#22741C";
			}
			
			var pt = ol.proj.transform([item.dcon1, item.dcon2], 'EPSG:5186', 'EPSG:3857');
			ar_line.push([pt[0], pt[1]]);
		}
		
		var linstrings = new ol.geom.LineString();	
		
		for(var idx=0; idx < ar_line.length; idx++){
			linstrings.appendCoordinate([ar_line[idx][0], ar_line[idx][1]]);
		}
		
		var feature;
		
		if(color == "#FF0000"){
			feature = new ol.Feature({
				geometry: linstrings,
  			name : 'Line'
			})	
		}else if(color == "#0054FF"){
			feature = new ol.Feature({
				geometry: linstrings,
  			name : 'Line'
			})	
		}else{
			feature = new ol.Feature({
				geometry: linstrings,
  			name : 'Line'
			})	
		}			

		gptrac_source.addFeature(feature);
		//gptrac_source.addFeatures(feature);		
	}
}

var toolmenu = function(menuid){
	initMap();
	
	source.clear();
	
	switch(menuid){
		case 'zoomInTool':
			map.addInteraction(zoomIn);
			break;
		case 'zoomOutTool':
			map.addInteraction(zoomOut);
			break;
		case 'preViewTool':
			if (size > 0) {
		        undo_redo = true;
		        map.getView().fit(nav_his[size - 1].extent, nav_his[size - 1].size);
		        map.getView().setZoom(nav_his[size - 1].zoom);
		        setTimeout(function() {
		            undo_redo = false;
		        }, 360);
		        size = size - 1;
		    }else{
		    	alert('처음 위치 입니다.');
		    }
			currrentMode='identify';
			break;
		case 'nextViewTool':
			if (size < nav_his.length - 1) {
		        undo_redo = true;
		        map.getView().fit(nav_his[size + 1].extent, nav_his[size + 1].size);
		        map.getView().setZoom(nav_his[size + 1].zoom);
		        setTimeout(function() {
		            undo_redo = false;
		        }, 360);
		        size = size + 1;
		    }else{
		    	alert('마지막 위치 입니다.');
		    }
			currrentMode='identify';
			break;
		case 'fullExtentTool':
			fullExtent();
			currrentMode='identify';
			break;
		case 'lineMeasureTool':
			addInteraction('measure','LineString');
			break;			
		case 'areaMeasureTool':
			addInteraction('measure','Polygon');
			break;
		case 'circleMeasureTool':
			addInteraction('measure','Circle');
			break;
		case 'clearTool':;
			initMap();
			currrentMode='identify';
			break;
		case 'textDrawTool':
			addInteraction('measure','Point');
			break;
		case 'imageSaveTool':
			exportMap();
			currrentMode='identify';
			break;
		case 'printTool':
			popPrint();
			currrentMode='identify';
			break;
		case 'lonlatTool':
			$('.lonlat_box').show();
			break;
		case 'identifyTool':
			currrentMode='identify';
			map.on('singleclick', identifyHandler);
			break;
		case 'searchJuso':
			moveToPnu(pointPnu);
			goMap6(pointX, pointY);
			searchAddress();
			break;
		case 'pointMap' :
			goMap6(pointX, pointY);
			break;
	}
}

function fn_wrapLoading() {
	// 화면의 높이와 너비를 구한다.
	var maskHeight = $(document).height();
	var maskWidth = window.document.body.clientWidth;
	var loadingScreen = "<div id='loadingScreen' style='position:absolute; z-index:90000; background-color:#000000; display:none; left:0; top:0;'></div>";
	var loadingImg = '';

	loadingImg += "<div id='loadingImg' style='position:absolute; left:40%; top:40%; display:none; z-index:100000;'>";
	loadingImg += "<img src='" + contextRoot + "/images/cms/loading.gif'/>";
	loadingImg += "</div>";

	$('body').append(loadingScreen).append(loadingImg);
	$('#loadingScreen').css({'width' : maskWidth, 'height': maskHeight, 'opacity' : '0.3'});
	$('#loadingScreen').show();
	$('#loadingImg').show();
}

function fn_closeLoading(){
	var loadingScreen = $('#loadingScreen');
	var loadingImg = $('#loadingImg');
	
	loadingScreen.remove();
	loadingImg.remove();
}

var topmenu = function(menuid){
	initMap();	
	source.clear();
	
	switch(menuid){
		case 'influe':
			$('.influe_box').show();
			addInteraction('influence');
			break;
		case 'pointMap' :
			goMap6(pointX, pointY);
			break;
		case 'whpa' :
			analysis_whpa_init();
			$('.whpa_box').show();
			break;
		case 'gqtrac' :
			analysis_whpa_init();
			$('.gqtrac_box').show();
			break;
		case 'devavail' :
			$('.devavail_box').show();
			addInteraction('devavail');
			break;
		case 'bound' :
			$('.lysearch_box').show();
			break;
		case 'inheo' :
			$('.inheo_box').show();
			break;
	}
}
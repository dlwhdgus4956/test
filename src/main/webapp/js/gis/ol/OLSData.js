var key = 'AC32D7DB-A140-3840-A194-818D5395F05A';
var searchKey = "AC32D7DB-A140-3840-A194-818D5395F05A";
var domain = '127.0.0.1';
var OLSProxy='../mapApi.jsp?resourceUrl=';
var serverContext = 'http://211.115.112.21:5003'
/**
 *  초기지도  레이어표시 여부 설정
 *  OLSData visible: true/false
 */
var OLSData={		
	'service1':{group:'기본도',url:'http://api.vworld.kr/req/wms?KEY=' + key + '&DOMAIN=' + domain + '',service:'WMS',groupName:'',layer:'lt_c_adsido',identify:'http://api.vworld.kr/req/wfs?KEY=' + key + '&DOMAIN=' + domain + '&service=WFS&request=GetFeature&typename=LP_PA_CBND_BUBUN&version=1.1.0&outputFormat=application/json',style:'',name:'시도경계',title:'시도경계',version:'1.3.0',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/sido.png'},
	'service2':{group:'기본도',url:'http://api.vworld.kr/req/wms?KEY=' + key + '&DOMAIN=' + domain + '',service:'WMS',groupName:'',layer:'lt_c_adsigg',identify:'http://api.vworld.kr/req/wfs?KEY=' + key + '&DOMAIN=' + domain + '&service=WFS&request=GetFeature&typename=LP_PA_CBND_BUBUN&version=1.1.0&outputFormat=application/json',style:'',name:'구경계',title:'구경계',version:'1.3.0',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/sigungu.png'},
	'service3':{group:'기본도',url:'http://api.vworld.kr/req/wms?KEY=' + key + '&DOMAIN=' + domain + '',service:'WMS',groupName:'',layer:'lp_pa_cbnd_bubun,lp_pa_cbnd_bonbun',identify:'http://api.vworld.kr/req/wfs?KEY=' + key + '&DOMAIN=' + domain + '&service=WFS&request=GetFeature&typename=lp_pa_cbnd_bubun&version=1.1.0&outputFormat=application/json',style:'',name:'지적도',title:'지적도',version:'1.3.0',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:18,image:'../images/gis/LP_PA_CBND_BONBUN_LP_PA_CBND_BUBUN.png'},
	
	'service6':{group:'자연환경',url:'https://mgeo2.kigam.re.kr/geoserver/gwc/service/wms?1&WIDTH=256&HEIGHT=256',service:'WMS',groupName:'',layer:'Geology_map:L_50K_Geology_Map_Latest_2015',identify:'',style:'',name:'지질도(5만)',title:'지질도(5만)',version:'1.1.1',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/geo.png',legendpop:true},
	'service7':{group:'자연환경',url:'https://mgeo2.kigam.re.kr/geoserver/gwc/service/wms?1&WIDTH=256&HEIGHT=256',service:'WMS',groupName:'',layer:'Geology_map_service:S_250K_Geology_Map',identify:'',style:'',name:'지질도(25만)',title:'지질도(25만)',version:'1.1.1',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/geo.png',legendpop:true},
	'service8':{group:'자연환경',url:'https://mgeo2.kigam.re.kr/geoserver/gwc/service/wms?1&WIDTH=256&HEIGHT=256',service:'WMS',groupName:'',layer:'Geology_map:L_1M_Geology_Map',identify:'',style:'',name:'지질도(100만)',title:'지질도(100만)',version:'1.1.1',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/geo.png',legendpop:true},
	'service9':{group:'자연환경',url:'http://api.vworld.kr/req/wms?KEY=' + key + '&DOMAIN=' + domain + '',service:'WMS',groupName:'',layer:'lt_c_gimshydro',identify:'http://api.vworld.kr/req/wfs?KEY=' + key + '&DOMAIN=' + domain + '&service=WFS&request=GetFeature&typename=lt_c_gimshydro&version=1.1.0&outputFormat=application/json',style:'',name:'수문지질단위',title:'수문지질단위',version:'1.3.0',visible:false,opacity:1,prj:'EPSG:3857',zoomlevel:12,image:'../images/gis/wgeo.png',legendpop:true},
};
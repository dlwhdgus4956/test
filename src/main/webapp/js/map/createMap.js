//좌표변환 기준
var firstProjection = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"; //from
var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"; //to

function createMap(){
	var rasterLayer =  new ol.layer.Tile({
			source: new ol.source.XYZ({url: 'http://api.vworld.kr/req/wmts/1.0.0/7FC4B9C8-EE21-34DE-BE8F-8E3574DF5EC6/Base/{z}/{y}/{x}.png'})
	})
	map = new ol.Map({
		target: 'map',
		layers: [rasterLayer],
		view: new ol.View({
			zoom: 0,
			minZoom: 15,
			maxZoom: 19
		}),
		controls : ol.control.defaults({
	           attribution : false,
	           zoom : false,
		}),
	});
	 $('.ol-rotate-reset').css('display','none');
}
//icon 생성 및 라벨
function icon(){
	var iconFeatures=[]
	$.ajax({
		url:"/sgms/getPoint.do",
		type:"POST",
		dataType:"json",
		success:function(result){
			var point=[];
			for(i=0;i<result.result.length;i++){
				var mapDate = proj4(secondProjection,firstProjection, [ Number(result.result[i].site_lttd),Number(result.result[i].site_litd)]);
				if(i==0){
					point.push(mapDate[0]) 
					point.push(mapDate[1])
				}
				var iconFeature = new ol.Feature({
					  geometry: new ol.geom.Point([mapDate[0], mapDate[1]]),
					  population: 4000,
					  rainfall: 500,
					  featureId:result.result[i].site_nm
				});
				
				var iconStyle = new ol.style.Style({
					image: new ol.style.Icon({
					    anchor: [0.5, 46],
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixels',
						src: "../../images/icon2.png",
					}),
					text: new ol.style.Text({
				          text: result.result[i].site_nm,
				          scale: 1.8,
				          
					}),
				});
				iconFeature.setStyle(iconStyle);
				iconFeatures.push(iconFeature);
			}
			vectorSource = new ol.source.Vector({
			    features: iconFeatures
			});
			
			vectorLayer = new ol.layer.Vector({
			    source: vectorSource
			});
			
			map.addLayer(vectorLayer)
			map.getView().setCenter(point);
		}
	})
}
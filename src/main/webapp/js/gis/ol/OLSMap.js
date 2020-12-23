

function OLSMLayer(vMap) {
	this.map = vMap;
	this.onLayer = {};
}

//addLayer
OLSMLayer.prototype.addLayer = function(dataName) {
	// service 시작
	var service = OLSData[dataName].service;
	
	if (service == 'WMS') {
		this._addWMSLayer(dataName);
	}else if(service == 'ARCGIS'){
		this._addArcGISRest(dataName);
	}else if(service=='WFS'){
		this._addWFSLayer(dataName);
	}
};

OLSMLayer.prototype.addLayer2 = function(dataName) {	
	this._addWMSLayer2(dataName);
};


//add WMS
OLSMLayer.prototype._addWMSLayer = function(dataName) {
	if(OLSData[dataName].excep==true){
		return;
	}
	var layer = findGroupLayer(this.map.getLayerGroup(), 'name', OLSData[dataName].groupName);
	
	var wms = new ol.layer.Tile({
		name : OLSData[dataName].name, 
		title: OLSData[dataName].title,
		source : new ol.source.TileWMS({
			crossOrigin: 'anonymous', 
			url: OLSProxy + OLSData[dataName].url, 
			params: {
				'VERSION': OLSData[dataName].version, 
				'LAYERS' : OLSData[dataName].layer, 
				'SRS' :  OLSData[dataName].prj,
				'STYLES' :  OLSData[dataName].style,
			}, 
			serverType: 'geoserver' 
		}),
		opacity : OLSData[dataName].opacity,
		visible : OLSData[dataName].visible
	});
	
	if(layer!=null){
		//기존 그룹 레이어에 추가
		layer.getLayers().getArray().push(wms);
	}else{
		if(OLSData[dataName].groupName==''){
			this.map.addLayer(wms);
		}else{
			//신규 그륩 레이어 생성
			var group = new ol.layer.Group({
				layers : [wms],
				name : OLSData[dataName].groupName
			});
			this.map.addLayer(group);
		}
	}
	
	//this.map.getLayerGroup(OLSData[dataName].groupName).addLayer(wms);
	//this.map.addLayer(wms);
};

var findLayer = function(layers, key, value){
	var layersArray = layers.getLayers().getArray();
	
	for (var i = 0; i < layersArray.length; i++) {
        if(layersArray[i].get(key)==value){
        	return layersArray[i];
        }
    }
}

OLSMLayer.prototype._addWMSLayer2 = function(dataName) {
	var layer = findGroupLayer(this.map.getLayerGroup(), 'name', OLSData[dataName].groupName);
	var wms = new ol.layer.Tile({
		name : OLSData[dataName].name, 
		title: OLSData[dataName].title,
		source : new ol.source.TileWMS({
			crossOrigin: 'anonymous', 
			url: OLSProxy + OLSData[dataName].url, 
			params: {
				'VERSION': OLSData[dataName].version, 
				'LAYERS' : OLSData[dataName].layer, 
				'SRS' :  OLSData[dataName].prj,
				'STYLES' :  OLSData[dataName].style,
				//'TILED': true,
			}, 
			serverType: 'geoserver' 
		}),
		opacity : OLSData[dataName].opacity,
		visible : OLSData[dataName].visible
	});
	
	if(layer!=null){
		//기존 그룹 레이어에 추가
		layer.getLayers().getArray().push(wms);
	}else{
		if(OLSData[dataName].groupName==''){
			this.map.addLayer(wms);
		}else{
			//신규 그륩 레이어 생성
			var group = new ol.layer.Group({
				layers : [wms],
				name : OLSData[dataName].groupName
			});
			this.map.addLayer(group);
		}
	}
	
	//this.map.getLayerGroup(OLSData[dataName].groupName).addLayer(wms);
	//this.map.addLayer(wms);
};


//add WMS
OLSMLayer.prototype._addWFSLayer = function(dataName) {
	var layer = findGroupLayer(this.map.getLayerGroup(), 'name', OLSData[dataName].groupName);
	
	
	
	var wfsSource  = new ol.source.Vector({
        format: new ol.format.WFS(),
        url: function(extent) {
        	var filter;
        	if(OLSData[dataName].filter!=null){
        		filter = '&FILTER=' + OLSData[dataName].filter  ;
        	}else{
        		filter = '&BBOX=' + extent.join(',');
        	}
        	return OLSProxy + OLSData[dataName].url + 
          		'TYPENAME=' + OLSData[dataName].layer + 
          		'&VERSION=' + OLSData[dataName].version +
          		'&SRSNAME=' + OLSData[dataName].prj +
          		'&REQUEST=GetFeature' +
          		'&SERVICE=' + OLSData[dataName].service +
          		filter
        },
        strategy: ol.loadingstrategy.bbox
    });
	
	var wfs = new ol.layer.Vector({
		name : OLSData[dataName].name,
		title :OLSData[dataName].title,
        source: wfsSource,
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
  					color: 'rgba(255, 0, 0, 1)'
  				}),
  				fill: new ol.style.Fill({
  					color: 'rgba(255, 0, 0, 1)'
  				})
  			})
  		}),
        visible : false
    });
	
	if(layer!=null){
		//기존 그룹 레이어에 추가
		layer.getLayers().getArray().push(wfs);
	}else{
		if(OLSData[dataName].groupName==''){
			this.map.addLayer(wfs);
		}else{
			//신규 그륩 레이어 생성
			var group = new ol.layer.Group({
				layers : [wfs],
				name : OLSData[dataName].groupName
			});
			this.map.addLayer(group);
		}
	}
};

//remove WMS
OLSMLayer.prototype._removeWMSLayer = function(dataName) {
	var groupName = OLSData[dataName].groupName;
	var arrWms = this.map.layers.filter(function(obj, index) {
		if (obj.name == groupName) {
			return this;
		}
	});
	
	var arrLayer = arrWms[0].params.LAYERS.split(",");
	var arrStyle = arrWms[0].params.STYLES.split(",");
	
	var groupYn = OLSData[dataName].groupYn || false;
	
	var layerName =  OLSData[dataName].layer;
	
	if (arrLayer.length > 1 && !groupYn) {
		var index = arrLayer.indexOf(layerName);
		
		arrLayer.splice(index, 1);
		arrStyle.splice(index, 1);
		//스타일도 제거
		this.map.getLayersByName(groupName)[0].mergeNewParams({
			'layers' : arrLayer.join(","),
			'styles' : arrStyle.join(",")
		});
	} else {
		this.map.removeLayer(arrWms[0]);
		this._removeWMSControl(dataName, arrWms[0]);
	}
};

OLSMLayer.prototype.getServiceNameWidthLayerName = function(layername){
	for( service in OLSData){
		if (OLSData.hasOwnProperty(service))
		{
			if(OLSData[service].name==layername)
			{
				return service;
				break;
			}
		}	
	};
}

OLSMLayer.prototype.getServiceNameWidthGroupName = function(groupname){
	for( service in OLSData){
		if (OLSData.hasOwnProperty(service))
		{
			if(OLSData[service].groupName==groupname)
			{
				return service;
				break;
			}
		}	
	};
}
$(function(){
	jsMapObj.create();
})
var jsMapObj = {
		
		create : function(){
			var that = this;
			
			that.bind();
			that.init();
		},
		
		bind : function(){
			var that = this;
			var map
			createMap();
			icon();
		},
			
		init : function(){
			var that = this;
			
		}
		
}

//mpa 화면 이동
function moveMapView(x,y){
	var mapDate = proj4(secondProjection,firstProjection, [Number(y),Number(x)]);
	map.getView().setCenter([mapDate[0],mapDate[1]]);
}


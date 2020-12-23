$(function(){
	testObj.create();
})

testObj={
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		var taht = this;
		getData()
		
	},
	init : function(){
		var taht = this;
	}
}
var dataset = [];
var tiem =[];
var el =[];
var temp =[];
var ec =[];	
function getData(){
	$.ajax({
		url : "/sgms/selectDataStatusChartAndTableData.do",			
		type : "POST",
		data : {"siteCode" : 'D01' ,"sDate" :"2020-10-21","eDate":"2020-11-21" },
		dataType : "json",
		success : function(result) {
				
			for(i=0;i<result.result.length;i++){
				var yyyy = result.result[i].site_hour.substring(2,4)
				var mm = result.result[i].site_hour.substring(4,6)
				var dd = result.result[i].site_hour.substring(6,8)
				var hh = result.result[i].site_hour.substring(8,10)
				tiem.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
				el.push(result.result[i].avg_el)
				dataset.push({"x":yyyy+"년"+mm+"월"+dd+"일"+hh+"시","y":result.result[i].avg_el})
				temp.push(result.result[i].avg_temp)
				ec.push(result.result[i].avg_scond)
			}
			test(dataset);
		}
	})
}

function test(dataset){
	var dataset = [	{x:'A', y:9 },
					{x:'B', y:19},
					{x:'C', y:29},
					{x:'D', y:39}, 
					{x:'E', y:29},
					{x:'F', y:19},
					{x:'G', y:9 }
				   ];
	
	var svg = d3.select("svg") 																			//svg 를 가지고옴
	var margin = {top: 20, right: 20, bottom: 20, left: 40} 											// 차트그려질 공간의 margin 설정
    var width = +svg.attr("width") - margin.left - margin.right											// 차트그려질 공간의 margin , width 를 이용해 실사용할 width 를구함
    var height = +svg.attr("height") - margin.top - margin.bottom										// 차트그려질 공간의 height , width 를 이용해 실사용할 height 를구함
    
    
    var svgG = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // g를 추가후 속성으로 transform을 추가 transform 이란 좌표를 표시함 (x , y) 이걸 svgG라고 칭한다
																									   // g 란 d3에서 그룹을 표현한다.
	
	var xScale = d3.scalePoint()																		// scale는 종류가 8개인가? 있다 각 각 domian의 동작이 다르데 동작한다									
			.domain(dataset.map(function(d , i) {return d.x;} ))										// domain 실제로 보여줄 데이터의 최소 최대값이다 그냥 x축의 label의 시작값 과 끝값을 정하는거다
			.range([0, width])																			// renge 이거는 확장? 느낌이다 그려지는 크기에 따라 위치를 잡아주는대 그위치를 계산해준다 그냥 반응형 이디

			
	var yScale = d3.scaleLinear()
				.domain([d3.min(dataset ,function(d){ return d.y-30; }), d3.max(dataset, function(d){ return d.y +30; })])
				.range([height, 0]);
	
	
	var xAxis = d3.axisBottom()																		//xAxis x축위치를 정한다 
    				.scale(xScale)																	//x축 위치에 들어갈 x의 데이터를 호툴
    				.tickValues(xScale.domain().filter(												//tick 이란 x축을 표현하는 | 이다 이거를 tickValues 를사용해 x축의 | 의 수를 조절할수 있다 | 이거를 조절할경우 자동으로 renge를 다시 계산한다
    						function(d,i){
    							if(i%2 == 0){
    								return d
    							}
    						}));
	
	
	var yAxis = d3.axisLeft()	
					.scale(yScale)
   
	
	svgG.append("g")																				//g 추가 
		.attr("transform", "translate(0," + height + ")")											//속성추가
		.call(xAxis);																				// call이란 함수를 부른다는것 d3에서 사용됨
	 
	svgG.append("g")
		.call(yAxis);

	var line = d3.line()																			// line 이것도 이친구말도 pie 등등 이것저것있다 
			.x(function(d) {return xScale(d.x); })													// .x 축의 값을 가지고 온다 
			.y(function(d) {return yScale(d.y); });													// .y 축의 값을 가지고 온다 
																									// d3에서 function(d) 매개변수 d는 data값이다  i를 추가할경우 data에 index가 들어온다 어떤식으로 값을 설정하는지는 아직 전부 이해는 못했다
	
	svgG.append("path")																				// 위에서만든 svgG 에 path를 추가한다 
		.data([dataset])																			// .data 사용할 데이터를 정해준다 
		.attr("fill", "none")																		// 채우기 색상 없음
		.attr("stroke", "blue")																		// 라인 색 퍼렁
		.attr("d", line);																			// d라는 속성에 line 즉 좌표값을 설정해준다
																									// .on 이벤트 속성을 지정한다 실시간 차트시 사용예정! 


}



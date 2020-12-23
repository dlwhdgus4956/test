var creatrChartObj = {
	
	create: function(){
		var that = this
		
		that.bind();
		that.init();
	},
	
	bind : function(){
		var that = this
	},
	
	init : function(){
		var that = this
	}
	
}
// 단일 차트 생성
function creatrChart(name,x,y,xLimit,taget,errorTaget,witdh,height){
	if(errorTaget != null){
		errorTaget.empty();
		errorTaget.append('<canvas id="'+taget+'" width="'+witdh+'px" height="'+height+'px"></canvas>')
	}
	var ctx = document.getElementById(taget).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	    	title : name,
	    	labels: x,//x축
	        datasets: [{
	        	lineTension: 0, // 직선효과
	        	fill:false, //채우기 생삭제거
	        	borderColor: 'rgb(255, 99, 132)',//선색상
	            data: y,//값 
	            pointRadius: 0,
	            borderWidth: 5
	        }]
	    },
	    options: {
	    	responsive: false,//동적크기설정 
	    	title : {
	    		display : true,
	    		text : name,
	    		fontSize : 20
	    	},
	    	legend :{
	    		display:false
	    	},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: false,
	                    stepSize: 10,
	                }
	            }],
	            xAxes:[{
	            	ticks:{
	            		autoSkip : true,
	            		maxTicksLimit:xLimit,
	            	}
	            }],
	        }
	    }
	});
	return myChart
}

//다중 차트 생성
function createChartMulti(name,x,y1,y2,y3,y4,taget,errorTaget,witdh,height){
	if(errorTaget != null){
		errorTaget.empty();
		errorTaget.append('<canvas id="'+taget+'" width="'+witdh+'px" height="'+height+'px"></canvas>')
	}
	var ctx = document.getElementById(taget).getContext('2d');
	Chart.defaults.line.spanGaps = true;
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	    	title : name,
	    	labels: x,//x축
	        datasets: [{
	        	label : y1.length<=0?"선택 없음":$("#siteCodes1 option:selected").text(),
	        	lineTension: 0, // 직선효과
	        	fill:false, //채우기 생삭제거
	        	borderColor: 'rgb(000, 255, 000)',//선색상
	            data: y1,//값 
	            pointRadius: 2,
	            borderWidth: 2
	        },
	        {
	        	label : y2.length<=0?"선택 없음":$("#siteCodes2 option:selected").text(),
	        	lineTension: 0, // 직선효과
	        	fill:false, //채우기 생삭제거
	        	borderColor: 'rgb(255, 000, 000)',//선색상
	            data: y2,//값 
	            pointRadius: 2,
	            borderWidth: 2
	        },
	        {
	        	label : y3.length<=0?"선택 없음":$("#siteCodes3 option:selected").text(),
	        	lineTension: 0, // 직선효과
	        	fill:false, //채우기 생삭제거
	        	borderColor: 'rgb(255, 000, 255)',//선색상
	            data: y3,//값 
	            pointRadius: 2,
	            borderWidth: 2
	        },
	        {
	        	label : y4.length<=0?"선택 없음":$("#siteCodes4 option:selected").text(),
	        	lineTension: 0, // 직선효과
	        	fill:false, //채우기 생삭제거
	        	borderColor: 'rgb(000, 000, 255)',//선색상
	            data: y4,//값 
	            pointRadius: 2,
	            borderWidth: 2
	        }]
	    },
	    options: {
	    	responsive: true,//동적크기설정 
	    	title : {
	    		display : true,
	    		text : name,
	    		fontSize : 20
	    	},
	    	legend :{
	    		display:true
	    	},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: false,
	                    stepSize: 10,
	                }
	            }],
	            xAxes:[{
	            	ticks:{
	            		autoSkip : true,
	            		maxTicksLimit:10,
	            		fontSize : 12,
	            	}
	            }],
	        }
	    }
	});
}
function createBarChart(name,x,y,taget,errorTaget,witdh,height){
	if(errorTaget != null){
		errorTaget.empty();
		errorTaget.append('<canvas id="'+taget+'" width="'+witdh+'px" height="'+height+'px"></canvas>')
	}
	var ctx = document.getElementById(taget).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: x,
	        datasets: [{
	            label: name,
	            data: y,
	            borderColor: "rgba(255, 201, 14, 1)",
	            backgroundColor: "rgba(255, 201, 14, 0.5)",
	            fill: false,
	        }]
	    },
	    options: {
	    	responsive: false,//동적크기설정 
	        title: {
	            display: true,
	            text: name
	        },
	        scales: {
	            xAxes: [{
	                display: true,
	                scaleLabel: {
	                    display: true,
	                },
	                
	                ticks: {
	                    autoSkip: false
	                },
	                barPercentage: 0.1
	            }],
	            yAxes: [{
	                display: true,
	                ticks: {
	                    suggestedMin: 0,
	                },
	                scaleLabel: {
	                    display: true,
	                }
	            }]
	        }
	     
	    }
	});
}


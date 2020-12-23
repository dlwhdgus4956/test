$(function(){
	chartObj.create();
	mapDataObj.create();
	loopObj.create();
})

var idx = -1;
var site = getSiteData();
var taget; 
var sDate;
var eDate;
var chartData
var elChart 
var tempChart
var ecChart 

var chartObj={
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	
	bind : function(){
		var that = this;
		
		elChart = creatrChart("수위",[],[],20,"glChart",$("#tab1"),1550,300);
		tempChart = creatrChart("수온",[],[],20,"tempChart",$("#tab2"),1550,300);
		ecChart = creatrChart("전자전도",[],[],20,"ecChart",$("#tab3"),1550,300);
		
		realTime();
		getTaget();
		
		getChartData();
		barChart();				//여기에다 주석달기
		
	},
	
	init : function(){
		var that = this;		
	}
}

var mapDataObj ={
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		var that = this;
		kdl
		createMap();
		icon();
		
	},
	init : function(){
		var that = this
		
	}
}

var loopObj = {
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		var that = this;
		
	},
	init : function(){
		var that = this;
		tenLoop
	}
}

var tenLoop = setInterval(function() {
	realTime();
	getTaget();
	getChartData();
}, 10000);

//관정 수량 확인
function barChart(){
	$.ajax({
		url : "/admin/getSiteCountData.do",			
		type : "POST",
		async: false,
		dataType : "json",
		success : function(result) {
			var x =[];
			var y =[];
			for(i=0;i<result.resultList.length;i++){
				x.push(result.resultList[i].manager_nm)
				y.push(result.resultList[i].cnt)
			}
			createBarChart("관정현황",x,y,"barChart",$("#tab4"),1550,300)
		}
	})
	
	
}




// 관정을 반환 하는 함수
function getSiteData(){
	var site =[];
	$.ajax({
		url : "/sgms/selectBoxList.do",			
		type : "POST",
		async: false,
		dataType : "json",
		success : function(result) {
			site = result.resultList
		}
	})
	return site
}

//타겟 설정 & 현 관정 이름 10초마다 
function getTaget(){
	if(idx == site.length-1){
		idx = 0;
	}else{
		idx++;
	}
	taget = site[idx]
	$("#site").empty();
	$("#site").append(taget.site_nm)
}

//시간 10초마다 실행
function realTime(){
	$("#time").empty();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var smonth = date.getMonth();
    var clockDate = date.getDate();
    var day = date.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    sDate = year+"-"+smonth+"-"+clockDate
    eDate = year+"-"+month+"-"+clockDate
    $("#time").append("<h1>"+year+"."+month+"."+clockDate+"."+week[day]+"</h1>")
    if(hours<10){
    	hours ='0'+hours; 
    }
    if(minutes<10){
    	minutes ='0'+minutes;
    }
    $("#time").append("<h1>"+hours+":"+minutes+"</h1>")	
}


//chart Data 가지고 오기 10초마다
function getChartData(){
	var time; 
	var el =[];
	var temp =[];
	var ec =[];
	$.ajax({
		url : "/sgms/selectDataStatusChartAndTableData.do",			
		type : "POST",
		data : {"siteCode" : taget.site_code ,"sDate" : sDate ,"eDate": eDate},
		dataType : "json",
		async: false, 
		success : function(result) {
			time = getDateRangeData(sDate, eDate)
			for(i=0;i<result.result.length;i++){
				el.push(result.result[i].avg_el == undefined ? 0: result.result[i].avg_el)
				temp.push(result.result[i].avg_temp == undefined ? 0: result.result[i].avg_temp)
				ec.push(result.result[i].avg_scond == undefined ? 0: result.result[i].avg_scond)
			}
		}
	})
	return callback(time,el,temp,ec);
}
function callback(time,el,temp,ec){
	var result = {
			"taget" : taget.site_nm,
			"time" :time,
			"el" : el,
			"temp" : temp,
			"ec" : ec,
		}
	chartData = result
	return chart();
}
//차트 업데이트
function chart(){
	var taget = chartData.taget
	var count =0;
	var chartLoop = setInterval(function(){
		
		elChart.data.labels=[]
		tempChart.data.labels=[]
		ecChart.data.labels=[]
		
		elChart.data.datasets[0].data=[];
		tempChart.data.datasets[0].data=[];
		ecChart.data.datasets[0].data=[];
		
		for(i=0;i<=Math.floor(chartData.time.length/10);i++){
			elChart.data.labels.push(chartData.time[i+count]);
			tempChart.data.labels.push(chartData.time[i+count]);
			ecChart.data.labels.push(chartData.time[i+count]);
			
			elChart.data.datasets[0].data.push(fn_NVL(chartData.el[i+count], 0));
			tempChart.data.datasets[0].data.push(fn_NVL(chartData.temp[i+count], 0));
			ecChart.data.datasets[0].data.push(fn_NVL(chartData.ec[i+count], 0));
		}
		count += Math.floor(chartData.time.length/10)
		elChart.update();
		tempChart.update();
		ecChart.update();
		if(count == Math.floor(chartData.time.length/10)*10){
			clearInterval(chartLoop)
		}
	}, 1000);
	
}


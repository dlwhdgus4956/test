$(function(){
	compareObj.create();
})
var compareObj = {
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		createDate();
		createSelectBox();
		var that = this;
	},
	init : function(){
		var that = this;
	}
}

function createDate(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	date = yyyy+'-'+mm+'-';
    $( "#sDate" ).datepicker().datepicker("setDate",date+"01");
    $( "#eDate" ).datepicker().datepicker("setDate",date+dd);
}

function createSelectBox(){
	$.ajax({
		url : "/sgms/selectBoxList.do",			
		type : "POST",
		dataType : "json",
		success : function(result) {
			$("#siteCode").empty()
			for(i=0;i<result.resultList.length;i++){
				if(i==0){
					$("#siteCodes1").append("<option value="+result.resultList[i].site_code+" selected=selected>"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes2").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes3").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes4").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
				}else{
					$("#siteCodes1").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes2").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes3").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
					$("#siteCodes4").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
				}
				
			}
			getCompareData();
		}
	})
}
function getCompareData(){
	var timeLen =[];
	
	var time=[];
	
	var time1 =[];
	var time2 =[];
	var time3 =[];
	var time4 =[];

	var el1 =[];
	var el2 =[];
	var el3 =[];
	var el4 =[];
	
	var temp1 =[];
	var temp2 =[];
	var temp3 =[];
	var temp4 =[];
	
	var ec1 =[];
	var ec2 =[];
	var ec3 =[];
	var ec4 =[];
	
	
	$.ajax({
		url : "/sgms/selectDataStatusCompareChartData.do",			
		type : "POST",
		data : {
					"siteCodes1" : $("#siteCodes1 option:selected").val(),
					"siteCodes2" : $("#siteCodes2 option:selected").val(),
					"siteCodes3" : $("#siteCodes3 option:selected").val(),
					"siteCodes4" : $("#siteCodes4 option:selected").val(),
					"sDate" : $("#sDate").val(),
					"eDate":$("#eDate").val() 
		},
		dataType : "json",
		success : function(result) {
			if(result.resultList1.length >0){
				for(i=0;i<result.resultList1.length;i++){
					var yyyy = result.resultList1[i].site_hour.substring(2,4)
					var mm = result.resultList1[i].site_hour.substring(4,6)
					var dd = result.resultList1[i].site_hour.substring(6,8)
					var hh = result.resultList1[i].site_hour.substring(8,10)
					time1.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
					el1.push(result.resultList1[i].avg_el)
					temp1.push(result.resultList1[i].avg_temp)
					ec1.push(result.resultList1[i].avg_scond)
				}
				time.push(time1);
				timeLen.push(time1.length);
			}
			if(result.resultList2.length >0){
				for(i=0;i<result.resultList2.length;i++){
					var yyyy = result.resultList2[i].site_hour.substring(2,4)
					var mm = result.resultList2[i].site_hour.substring(4,6)
					var dd = result.resultList2[i].site_hour.substring(6,8)
					var hh = result.resultList2[i].site_hour.substring(8,10)
					time2.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
					el2.push(result.resultList2[i].avg_el)
					temp2.push(result.resultList2[i].avg_temp)
					ec2.push(result.resultList2[i].avg_scond)
				}
				time.push(time2);
				timeLen.push(time2.length);
			}if(result.resultList3.length >0){
				for(i=0;i<result.resultList3.length;i++){
					var yyyy = result.resultList3[i].site_hour.substring(2,4)
					var mm = result.resultList3[i].site_hour.substring(4,6)
					var dd = result.resultList3[i].site_hour.substring(6,8)
					var hh = result.resultList3[i].site_hour.substring(8,10)
					time3.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
					el3.push(result.resultList3[i].avg_el)
					temp3.push(result.resultList3[i].avg_temp)
					ec3.push(result.resultList3[i].avg_scond)
				}
				time.push(time3);
				timeLen.push(time3.length);
			}if(result.resultList4.length >0){
				for(i=0;i<result.resultList4.length;i++){
					var yyyy = result.resultList4[i].site_hour.substring(2,4)
					var mm = result.resultList4[i].site_hour.substring(4,6)
					var dd = result.resultList4[i].site_hour.substring(6,8)
					var hh = result.resultList4[i].site_hour.substring(8,10)
					time4.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
					el4.push(result.resultList4[i].avg_el)
					temp4.push(result.resultList4[i].avg_temp)
					ec4.push(result.resultList4[i].avg_scond)
				}
				time.push(time4);
				timeLen.push(time4.length);
			}
			
			var maxTimeIdex = timeLen.indexOf(Math.max.apply(null, timeLen));
			
			if(maxTimeIdex == -1){
				$("#tab1").empty();
				$("#tab2").empty();
				$("#tab3").empty();
				$("#tab1").append("<h1>데이터가 없습니다.</h1>")
				$("#tab2").append("<h1>데이터가 없습니다.</h1>")
				$("#tab3").append("<h1>데이터가 없습니다.</h1>")
			}else{
				createChartMulti('수위',time[maxTimeIdex],el1,el2,el3,el4,'tab1Chart',$('#tab1'),1550,400);
				createChartMulti('수온',time[maxTimeIdex],temp1,temp2,temp3,temp4,'tab2Chart',$('#tab2'),1550,400);
				createChartMulti('EC',time[maxTimeIdex],ec1,ec2,ec3,ec4,'tab3Chart',$('#tab3'),1550,400);
			}
			
		}
	})
}


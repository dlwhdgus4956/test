$(function(){
	dataObj.create();
})

dataObj={
	
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		var that = this;
		
		createDate();
		createSelectBox();
	},
	init : function(){
		var that = this;
	},
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
					$("#siteCode").append("<option value="+result.resultList[i].site_code+" selected=selected>"+result.resultList[i].site_nm+"</option>");
				}else{
					$("#siteCode").append("<option value="+result.resultList[i].site_code+">"+result.resultList[i].site_nm+"</option>");
				}
				
			}
			createDataStatusChartAndTable();
		}
	})
}

function createDataStatusChartAndTable(){
	$.ajax({
		url : "/sgms/selectDataStatusChartAndTableData.do",			
		type : "POST",
		data : {"siteCode" : $("#siteCode option:selected").val() ,"sDate" : $("#sDate").val(),"eDate":$("#eDate").val() },
		dataType : "json",
		success : function(result) {
			$("#tBody").empty()
			var tiem =[];
			var el =[];
			var temp =[];
			var ec =[];			
			if(result.result.length < 1){
				$("#tBody").empty();
				$("#tab1").empty();
				$("#tab2").empty();
				$("#tab3").empty();
				$("#tBody").append("<tr><td colspan='11'>데이터가 없습니다.</td></tr>");
				$("#tab1").append("<h1>데이터가 없습니다.</h1>")
				$("#tab2").append("<h1>데이터가 없습니다.</h1>.")
				$("#tab3").append("<h1>데이터가 없습니다.</h1>")
			}else{
				for(i=0;i<result.result.length;i++){
					
					var yyyy = result.result[i].site_hour.substring(2,4)
					var mm = result.result[i].site_hour.substring(4,6)
					var dd = result.result[i].site_hour.substring(6,8)
					var hh = result.result[i].site_hour.substring(8,10)
					tiem.push(yyyy+"년"+mm+"월"+dd+"일"+hh+"시")
					el.push(result.result[i].avg_el)
					temp.push(result.result[i].avg_temp)
					ec.push(result.result[i].avg_scond)
					var tbody = "<tr>";
					tbody +="<td>"+yyyy+"년"+mm+"월"+dd+"일"+hh+"시</td>";
					tbody +="<td>"+fn_NVL(result.result[i].m_sn, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_el, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_gl, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_press, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_temp, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_scond, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_baro, "-")+"</td>";
					tbody +="<td>"+fn_NVL(result.result[i].avg_bat, "-")+"</td>";
					tbody +="</tr>";
					$("#tBody").append(tbody);
				}
				creatrChart("수위",tiem,el,15,"glChart",$("#tab1"),1550,300);
				creatrChart("수온",tiem,temp,15,"tempChart",$("#tab2"),1550,300);
				creatrChart("전자전도",tiem,ec,15,"ecChart",$("#tab3"),1550,300);
			}
		}
	})
}
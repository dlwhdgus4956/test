$(function(){
	realtimeStatusObj.create();
})

var realtimeStatusObj = {
	
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	
	bind : function(){
		var that = this;
		
		getRealtimeDataList();
	},
	
	init : function(){
		var that = this;
	}
}

function getRealtimeDataList(){
	
	$.ajax({
		url : "/sgms/getRealtimeDataList.do",
		data : {
			"searchCondition" : $("#searchCondition option:selected").val(),
			"searchKeyword":$("#searchKeyword").val()
		},
		type : "POST",
		dataType : "json",
		success : function(result) {
			$("#tBody").empty();
			for(i=0;i<result.resultList.length;i++){
				var yyyy = result.resultList[i].data_time.substring(2,4)
				var mm = result.resultList[i].data_time.substring(4,6)
				var dd = result.resultList[i].data_time.substring(6,8)
				var hh = result.resultList[i].data_time.substring(8,10)
				var m = result.resultList[i].data_time.substring(10,12)
				var date= yyyy+"년"+mm+"월"+dd+"일"+hh+"시"+m+"분";
				var tbody = "<tr>";
				
				tbody += "<td>"+fn_NVL(result.resultList[i].rn,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].site_nm,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].site_code,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].modem_tel,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].w_dig_dph,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].w_elev,"-")+"</td>";
				tbody += "<td>"+date+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].el,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].gl,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].w_press,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].scond,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].w_baro,"-")+"</td>";
				tbody += "<td>"+fn_NVL(result.resultList[i].battery,"-")+"</td>";
				tbody += "<tr>";
				$("#tBody").append(tbody);
			}
		}
	})
}
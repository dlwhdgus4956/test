$(function(){
	spotObj.create();
})

var spotObj ={
	create : function(){
		var that = this
		
		that.bind();
		that.init();
	},
	bind : function(){
		var that = this
		
		spotGetDate();
	},
	init : function(){
		var that = this
	}
}

function spotGetDate(search , excel){
	if(excel){
		location.href = "/gwatcher/information/exportSpotList.do?searchCondition="+$("#searchCondition option:selected").val()+
						"searchKeyword="+$("#searchKeyword").val()+"&isExcel=" + excel;
	}else{
		$.ajax({
			url : "/sgms/getSpotList.do",
			data : search,
			type : "POST",
			dataType : "json",
			success : function(result) {
				$("#tBody").empty();
				if(result.result.length > 0){
					for(i=0;i<result.result.length;i++){
						var tBody = "<tr onclick='spotView(\""+result.result[i].site_code+"\")' code='"+result.result[i].site_code+"'>";
						tBody += "<td>"+fn_NVL(result.result[i].rn,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].site_nm,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].addr,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_dvop_year,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].site_oper,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_elev,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_csi_dia,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_dig_dph,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_nat_wtlv,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].el,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].w_temp,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].scond,'-')+"</td>";
						tBody += "<td>"+fn_NVL(result.result[i].tss,'-')+"</td>";
						$("#tBody").append(tBody);
					}
				}else{
					$("#tBody").append("<tr><td colspan='13'>검색결과가 없습니다.</td></tr>")
				}
			}
		})
	}
}

function SpotSearchBtn(){
	var search ={"searchCondition":$("#searchCondition option:selected").val() , "searchKeyword":$("#searchKeyword").val() }
	spotGetDate(search);
}

function spotView(code){
	location.href="/sgms/information/spotView.do?siteCode="+code
}

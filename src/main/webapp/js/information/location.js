$(function(){
	informationObj.create();
})
var informationObj = {
	create : function(){
		var that = this;
		
		that.bind();
		that.init();
	},
	bind : function(){
		var that = this;
		getLocationData();
	},
	init : function(){
		var that = this;
		
	}
}
function getLocationData(search){
	$.ajax({
		url:"/sgms/getLocationList.do",
		type:"POST",
		data : search,
		dataType:"json",
		success:function(result){
			$("#tBody").empty();
			if(result.result.length >0){
				for(i = 0;i<result.result.length;i++){
					var tBody = "<tr onclick='moveMapView("+result.result[i].site_litd+","+result.result[i].site_lttd+")'>";
					tBody += "<td>"+(i+1)+"</td>";
					tBody += "<td>"+result.result[i].site_nm+"</td>";
					tBody += "<td>"+result.result[i].site_code+"</td>";
					tBody += "<td>"+result.result[i].addr+"</td>";
					tBody += "</tr>";
					$("#tBody").append(tBody)
				}
			}else{
				$("#tBody").append("<tr><td colspan='4'>검색결과가 없습니다.</td></tr>")
			}
		}
	})
}
function locationSearchBtn(){
	var search ={"searchCondition":$("#searchCondition option:selected").val() , "searchKeyword":$("#searchKeyword").val() }
	getLocationData(search);
}
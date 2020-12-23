$(function(){
	memberListObj.create();
})

memberListObj={
	
	create: function(){
		var that = this;
		
		that.init();
		that.bind();
	},
	
	init : function(){
		var that = this;
		getMemberData();
	},
	
	bind : function(){
		var that = this;
		
	}
	
}
function getMemberData(){
	$.ajax({
		url : "/admin/getMemberList.do",			
		type : "POST",
		data :	{
					"searchkeyword" : $("#searchkeyword").val(),
					"searchtype" : $("#searchtype").val()
				},
		dataType : "json",
		success : function(result) {
			$("#tBody").empty();
			for(i=0;i<result.resultList.length;i++){
				var authorities = (result.resultList[i].authorities == 'ROLE_USER') ? "사용자" :"관리자";
				var enabled = (result.resultList[i].enabled == 1) ? "활성" : "비활성"
				var tbody ="<tr onclick='memberUpdateBtn(\""+result.resultList[i].user_id+"\")'>";
				tbody += "<td>"+result.resultList[i].rn+"</td>";
				tbody += "<td>"+result.resultList[i].user_id+"</td>";
				tbody += "<td>"+result.resultList[i].name+"</td>";
				tbody += "<td>"+result.resultList[i].email+"</td>";
				tbody += "<td>"+result.resultList[i].tel+"</td>";
				tbody += "<td>"+authorities+"</td>";
				tbody += "<td>"+result.resultList[i].dept+"</td>";
				tbody += "<td>"+enabled+"</td></tr>";
				$("#tBody").append(tbody)
			}
		}
	})
}
function memberUpdateBtn(userId){
	location.href="/admin/member/view.do?userId="+userId
}
$(function(){
	deptListObj.create();
})
var deptListObj = {
	
	create : function(){
		var that = this;
		
		that.init();
		that.bind();
	},
	init : function(){
		var that = this;
		
		getDeptList();
	},
	bind : function(){
		var that = this;
	}
}
//기업 데이터 조회
function getDeptList(){
	$("#tBody").empty();
	$.ajax({
		url : "/admin/getDeptList.do",			
		type : "POST",
		data :	{
					"searchKeyword" : $("#searchKeyword").val(),
					"searchCondition" : $("#searchCondition").val()
				},
		dataType : "json",
		success : function(result) {
			if(result.resultList.length <1){
				$("#tBody").append("<tr><td colspan='3'>검색결과가 없습니다.</td></tr>")
			}else{
				for(i=0;i<result.resultList.length;i++){
					var tbody = "<tr onclick='getSiteList(\""+result.resultList[i].manager_code+"\",\""+result.resultList[i].manager_nm+"\")'>";				
					tbody += "<td>"+result.resultList[i].rn+"</td>";
					tbody += "<td>"+result.resultList[i].manager_nm+"</td>";
					tbody += "<td>"+result.resultList[i].manager_code+"</td>";
					tbody += "<td><button onclick='managerUpdateModal(\"managerModal\",\""+result.resultList[i].manager_nm+"\",\""+result.resultList[i].manager_code+"\")';>수정</button></td>";
					tbody += "</tr>";
					$("#tBody").append(tbody);
				}
			}
		}
	})
}
//기업별 관정조회
function getSiteList(managerCode ,managerName){
	$("#siteTbody").empty();
	$.ajax({
		url : "/admin/getSpotList.do",			
		type : "POST",
		data :	{"managerCode" : managerCode },
		dataType : "json",
		success : function(result) {
			if(result.resultList.length <1){
				$("#siteLabel").text(managerName);
				$("#siteTbody").append("<tr><td colspan='4'>검색결과가 없습니다.</td></tr>")
			}else{
				$("#siteLabel").text(managerName);
				for(i=0;i<result.resultList.length;i++){
					var tbody ="<tr>"
					tbody += "<td>"+result.resultList[i].rn+"</td>";
					tbody += "<td>"+result.resultList[i].site_nm+"</td>";
					tbody += "<td>"+result.resultList[i].site_code+"</td>";
					tbody += "<td>"+result.resultList[i].addr+"</td>";
					tbody += "</tr>";
					$("#siteTbody").append(tbody)
				}
			}
			
		}
	})
}

//모달종료
function closeModal(modalname){
	$("#"+modalname).hide();
	$("#managerModaltitle").val("");
	$("#managerModalCon").empty();
	$("#managerModalBtn").empty();
	$("#managerName").val("");
	$("#managerCode").val("");
}
//모달창 내용 생성
function createManagerContent(){
	var modalContent ="<table>";
	modalContent +="<tr>";
	modalContent +="<th>기업명</th>";
	modalContent +="<td><input type='text' id='managerName' name='managerName' required></td>";
	modalContent +="</tr>";
	modalContent +="<tr>";
	modalContent +="<th>기업 코드</th>";
	modalContent +="<td><input type='text' id='managerCode' name='managerCode' required></td>";
	modalContent +="</tr>";
	modalContent +="</table>";
	$("#managerModalCon").append(modalContent);
}

//Add 모달창 생성
function managerAddModal(modalname){
	createManagerContent();
	$("#managerModaltitle").text("기업 코드 추가");
	$("#managerModalBtn").append("<button onclick='addManager();';>추가</button>");
	$("#managerModalBtn").append("<button onclick='closeModal(\""+modalname+"\")';>취소</button>");
	$("#"+modalname).fadeIn(300);
}

//Update 모달창 생성
function managerUpdateModal(modalname , managerName , managerCode){
	createManagerContent();
	$("#managerModaltitle").text("기업 코드 수정")
	$("#managerName").val(managerName)
	$("#managerCode").val(managerCode)
	$("#managerModalBtn").append("<button onclick='updateManager(\""+managerCode+"\")';>수정</button>");
	$("#managerModalBtn").append("<button onclick='deleteManager(\""+managerCode+"\",\""+managerName+"\")';>삭제</button>");
	$("#"+modalname).fadeIn(300);
}

function addManager(){
	if($("#managerCode").val() =="" && $("#managerName").val()==""){
		return alert("입력값을 확인해 주세요.");
	}
	$.ajax({
		url : "/admin/addManager.do",			
		type : "POST",
		data :	{
					"managerCode" : $("#managerCode").val(), 
					"managerName" : $("#managerName").val(), 
		},
		dataType : "json",
		success : function(result) {
			if(result.intResult ==1){
				alert("기업이 추가되었습니다.");
				closeModal("managerModal");
				getDeptList();
			}else{
				alert(result.intResult);
			}
		}
	})
}

function updateManager(oldManagerCode){
	if($("#managerCode").val() =="" && $("#managerName").val()==""){
		return alert("입력값을 확인해 주세요.");
	}
	$.ajax({
		url : "/admin/updateManager.do",			
		type : "POST",
		data :	{
					"oldManagerCode" : oldManagerCode, 
					"managerCode" : $("#managerCode").val(), 
					"managerName" : $("#managerName").val(), 
		},
		dataType : "json",
		success : function(result) {
			if(result.intResult ==1){
				alert("기업이 수정되었습니다.");
				closeModal("managerModal");
				getDeptList();
			}
		}
	})
}
function deleteManager(managerCode,managerName){
	if($("#managerCode").val() == managerCode && $("#managerName").val() == managerName ){
		$.ajax({
			url : "/admin/deleteManager.do",			
			type : "POST",
			data :	{ "managerCode" : $("#managerCode").val() },
			dataType : "json",
			success : function(result) {
				if(result.intResult ==1){
					alert("기업을 삭되었습니다.");
					closeModal("managerModal");
					getDeptList();
				}
			}
		})
	}else{
		alert("입력한 기업명과 삭제할 기업명이 다릅니다.")
	}
	
}



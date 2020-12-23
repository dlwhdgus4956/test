$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//authMenuListObj.create();
});

var authMenuListObj = {
		
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
			
		}
}

//새로고침
function fn_refresh(){
	
}

//목록 돌아가기
function fn_backList(){
	
	document.location.href = "/admin/auth/list.do";
}

//메뉴 설정변경
function fn_update(menuCode, cntNum) {
	var that = this;
	
	var auth = $("#auth").val();
	var newUseYn = $("#useYn"+cntNum).val();
	var oldUseYn = $("#oldVal"+cntNum).val();
	
	var frontCode =  menuCode.substring(0,2);
	var backCode = menuCode.substring(2,5);
	
	//변경유무확인
	if(newUseYn == oldUseYn){
		alert("수정된 내역이 없습니다.");
	} 
	else {
	//1차메뉴
	if(backCode == '000'){
		if(newUseYn == 'Y'){
			//alert("전체Y수정"+ menuCode + "/" + auth);
			var URL="/admin/auth/menuAllInsertProc.do";
			$.ajax({
		        type:"POST",
		        async:false,
		        dataType :"json" ,
		        enctype: "multipart/form-data",
		        url:URL,
				data : {
					auth : auth,
					menuCode : frontCode
					},
				success : function(result) {
					
					alert("수정되었습니다");
					document.location.href = "/admin/authMenu/list.do?auth="+auth;
					},
				error : function(xhr, status, error) {
					console.log(error);
					alert("요청실패(서버상태:" + status + ")");
					}
				});
			
		} else if (newUseYn == 'N'){
			//alert("전체N수정"+ menuCode + "/" + auth);
			var URL="/admin/auth/menuAllDeleteProc.do";
			$.ajax({
		        type:"POST",
		        async:false,
		        dataType :"json" ,
		        enctype: "multipart/form-data",
		        url:URL,
				data : {
					auth : auth,
					menuCode : frontCode
					},
				success : function(result) {
					
					alert("수정되었습니다");
					document.location.href = "/admin/authMenu/list.do?auth="+auth;
					},
				error : function(xhr, status, error) {
					console.log(error);
					alert("요청실패(서버상태:" + status + ")");
					}
				});
			}
		} 
	
		else {
		//2차메뉴
			if(newUseYn == 'Y'){
				//alert("일부Y수정"+ menuCode + "/" + auth);
				var URL="/admin/auth/menuInsertProc.do";
				$.ajax({
			        type:"POST",
			        async:false,
			        dataType :"json" ,
			        enctype: "multipart/form-data",
			        url:URL,
					data : {
						auth : auth,
						menuCode : menuCode
					},
					success : function(result) {
						
						alert("수정되었습니다");
						document.location.href = "/admin/authMenu/list.do?auth="+auth;
					},
					error : function(xhr, status, error) {
						console.log(error);
						alert("요청실패(서버상태:" + status + ")");
					}
				});
				
			} else if(newUseYn == 'N') {
				//alert("일부N수정"+ menuCode + "/" + auth);
				var URL="/admin/auth/menuDeleteProc.do";
				$.ajax({
			        type:"POST",
			        async:false,
			        dataType :"json" ,
			        enctype: "multipart/form-data",
			        url:URL,
					data : {
						auth : auth,
						menuCode : menuCode
						},
					success : function(result) {
						
						alert("수정되었습니다");
						document.location.href = "/admin/authMenu/list.do?auth="+auth;
						},
					error : function(xhr, status, error) {
						console.log(error);
						alert("요청실패(서버상태:" + status + ")");
						}
					});
			}
		}
	}
} 
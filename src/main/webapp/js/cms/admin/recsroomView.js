$(function(){
	
	//noticeViewObj.create();
});

var recsroomViewObj = {
	
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

//목록 돌아가기
function fn_list(){
	
	document.location.href = "/admin/recsroom/list.do";
}


function updatePage(recsroomNo){
	
	document.location.href = "/admin/recsroom/update.do?recsroomNo="+recsroomNo;
}


function fileDownLoad(fileNo){
	
	location.href=('/file/'+ fileNo + '/download.do');
	//location.href=( fileNo + '/download.do');
}

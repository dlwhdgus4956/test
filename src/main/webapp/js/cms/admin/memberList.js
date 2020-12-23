$(function(){
	
	//memberListObj.create();
});

var memberListObj = {
	
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

//사용자 정보추가
function add(){
	
	$('#searchFrm').attr('action','/admin/member/insert.do').submit();
}

//사용자 상세내역
function view(userId){
	
	$('#searchFrm').attr('action','/admin/member/view.do?userId='+userId).submit();
} 

//목록조회&페이징 
function goList(page) {
	
	if(typeof(page) == "undefined") $("#currentPage").val(1);
    else $("#currentPage").val(page); 
	//fn_wrapLoading();
	$('#searchFrm').attr('action','/admin/member/list.do').submit();
}
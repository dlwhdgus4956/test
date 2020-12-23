
// Null 값 처리
function fn_NVL(value1, value2){
    if (value1 == null || value1 == undefined){
        return value2;
    } else {
        return value1;
    }
}

// 문자열을 날짜형식 변환
function fn_formatDate(value){
    var vDate = "";

    if (String(value).length >= 4){
        vDate = String(value).substring(0, 4);
    }

    if (String(value).length >= 6){
        vDate += "-" + String(value).substring(4, 6);
    }

    if (String(value).length >= 8){
        vDate += "-" + String(value).substring(6, 8);
    }

    return vDate;
}

/*
 * 숫자 3자리마다 콤마(,) 입력
 */
function fn_setComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* DatePicker settings */
function fn_setDatePicker(tagId){
	
    $("#"+tagId).datepicker({
    	showOn : "both",
    	buttonImage : contextRoot+"/images/cms/ico_calendar.png",   
    	buttonImageOnly : true,
    	changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
    	showButtonPanel: true,
    	currentText: '오늘 날짜',
    	closeText: '닫기'
      });
}

//로딩바
function fn_wrapLoading() {
	// 화면의 높이와 너비를 구한다.
	var maskHeight = $(document).height();
	var maskWidth = window.document.body.clientWidth;
	var loadingScreen = "<div id='loadingScreen' style='position:absolute; z-index:90000; background-color:#000000; display:none; left:0; top:0;'></div>";
	var loadingImg = '';

	loadingImg += "<div id='loadingImg' style='position:absolute; left:40%; top:40%; display:none; z-index:100000;'>";
	loadingImg += "<img src='" + contextRoot + "/images/cms/loading.gif'/>";
	loadingImg += "</div>";

	$('body').append(loadingScreen).append(loadingImg);
	$('#loadingScreen').css({'width' : maskWidth, 'height': maskHeight, 'opacity' : '0.3'});
	$('#loadingScreen').show();
	$('#loadingImg').show();
}

//로딩바종료
function fn_closeLoading(){
	var loadingScreen = $('#loadingScreen');
	var loadingImg = $('#loadingImg');
	
	loadingScreen.remove();
	loadingImg.remove();
}

/**
 *  메뉴이동
*/
function fn_menu(getUrl){
	var that = this;
	
	var getAuth = $("#getUserAuth").val();
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
	var auth = getAuth.replace(regExp, "");
	
	//검증작업
	var URL="/cmmn/authCheck.do";
	$.ajax({
		type:"POST",
        async:false,
        dataType :"json" ,
        url:URL,
		data : {
			"auth" : auth,
			"getUrl" : getUrl
		},
		success : function(result) {  

			//메뉴 사용권한 재확인
			if(result.result.length > 0){
				if(getUrl == result.result[0].menu_url){
					document.location.href = getUrl;
				} else {
					alert("사용자 권한이 없습니다.");
				}
			} else {
				console.log("result :::::::::::::::::::::::::::" + result.result[0]);
				console.log("getUrl :::::::::::::::::::::::::::" + getUrl);
				alert("사용자 권한이 없습니다.");
			}
			
		},
		error : function(xhr, status, error) {
			console.log(error);
			alert("요청실패(서버상태:" + status + ")"); 
		}
	});
	
}

function setLoading(obj, cols, isTable) {
	if(isTable==null) isTable = true;
	$(obj).html((isTable?"<tr><td colspan='"+cols+"' style='text-align:center'>":'')+"<img src='"+contextRoot+"/images/cms/ico_loading.gif'>"+(isTable?"</td></tr>":''));
}

function linkPage(pageIdx){
	$("#pageIndex").val(pageIdx);
	getList(false);
}

function createPaging(vo) {
	var page = "<ul>";
	page += '<li><a href="#" onclick="linkPage('+vo.firstPageNo+'); return false;" class="first skip"></a></li>';
	var curNo = vo.currentPageNo;
	page += '<li><a href="#" onClick="linkPage('+(curNo!=1?(curNo-1):1)+'); return false;" class="prev skip"></a></li>';
	var i = vo.firstPageNoOnPageList;
	for( ; i <= vo.lastPageNoOnPageList; i++) {
		page += '<li><a href="#" onClick="linkPage('+i+'); return false;" '+(i==vo.currentPageNo?'class="active"':'')+'>'+i+'</a></li>';
	}
	page += '<li><a href="#" onClick="linkPage('+(curNo!=vo.totalPageCount?(curNo+1):vo.totalPageCount)+'); return false;" class="next skip"></a></li>';
	page += '<li><a href="#" onclick="linkPage('+vo.totalPageCount+'); return false;" class="last skip"></a></li>';
	$(".pagination").html(page);
	$("#pageIndex").val(vo.currentPageNo);
}

function setParam(f){
	return $("#"+f).serialize();
}
function getDateRangeData(param1, param2){  //param1은 시작일, param2는 종료일이다.
	var res_day = [];
 	var ss_day = new Date(param1);
   	var ee_day = new Date(param2);    	
  		while(ss_day.getTime() <= ee_day.getTime()){
  			var _mon_ = (ss_day.getMonth()+1);
  			_mon_ = _mon_ < 10 ? '0'+_mon_ : _mon_;
  			var _day_ = ss_day.getDate();
  			_day_ = _day_ < 10 ? '0'+_day_ : _day_;
  			var year = (ss_day.getFullYear()+"").substring(2,4)
  			for(i=0;i<=23;i++){
  				var h = (i+"").length <= 1 ? "0"+i : i+"" ;
  				res_day.push(year + '년' + _mon_ + '월' +  _day_+"일"+h+"시");
  			}
   			ss_day.setDate(ss_day.getDate() + 1);
   	}
   	return res_day;
}

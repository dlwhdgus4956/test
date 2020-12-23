$(function(){
	
	//headerObj.create();
});

var headerObj = {
		
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

//내계정 메뉴
headerObj.cmmn = {
		
		account : function(){
			var that = this;
			
			document.location.href = "/cmmn/account/view.do";
		},
		
		accountPw : function(){
			var that = this;
			
			document.location.href = "/cmmn/account/pwView.do";
		},
		notice : function(){
			var that = this;
			
			document.location.href = "/cmmn/notice/list.do";
		},
		
		recsroom : function(){
			var that = this;

			document.location.href = "/cmmn/recsroom/list.do";
		},
		
		board : function(){
			var that = this;

			document.location.href = "/cmmn/req/list.do";
		}
		
}

//관리자 메뉴
headerObj.admin = {
		
		memberInfo : function(){
			var that = this;

			document.location.href = "/admin/member/list.do";
		},
		
		notice : function(){
			var that = this;
			
			document.location.href = "/admin/notice/list.do";
		},
		
		recsroom : function(){
			var that = this;

			//alert("관리자자료실");
			document.location.href = "/admin/recsroom/list.do";
		},
		
		board : function(){
			var that = this;

			//alert("관리자게시판");
			document.location.href = "/admin/req/list.do";
		},
		
		authMenu : function(){
			var that = this;
			
			document.location.href = "/admin/auth/list.do";
		},
		
		menu : function(){
			var that = this;
			
			document.location.href = "/admin/menu/list.do";
		},
		
		logSttus : function(){
			var that = this;
			
			document.location.href = "/admin/logSttus/list.do";
		},
		
		logStat : function(){
			var that = this;
			
			document.location.href = "/admin/logStat/allList.do";
		},
		
		sysYearStat : function(){
			var that = this;
			
			document.location.href = "/admin/sysYearStat/list.do";
		},
		
		sysMonStat : function(){
			var that = this;
			
			document.location.href = "/admin/sysMonStat/list.do";
		},
		
		sysDayStat : function(){
			var that = this;
			
			document.location.href = "/admin/sysDayStat/list.do";
		}
}

//홈버튼
function home(){
	
	document.location.href = "/main/main.do";
}

//로그아웃
function logout(){
	
	if(confirm("로그아웃 하시겠습니까?")){
		document.location.href = "/logout";
	}
}

//헤더메뉴 201009 추가
$(function(){
  $('.header_sub').hide();
  $('.header_gnb .item').mouseover(function(){
      $('.header_sub').slideDown().one();
  });
  $('.header_wrap').mouseleave(function(){
      $('.header_sub').slideUp().one();
  });
});
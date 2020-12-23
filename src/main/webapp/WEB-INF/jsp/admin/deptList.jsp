<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="org.springframework.web.util.UrlPathHelper"%>    
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="org.springframework.web.util.UrlPathHelper"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>

	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>관측소 위치</title>
<style type="text/css">
#modal{
  display:none;
  position:fixed; 
  width:100%; height:100%;
  top:0; left:0; 
  background:rgba(0,0,0,0.3);
}
.modal-con{
  display:none;
  position:fixed;
  top:50%; left:50%;
  transform: translate(-50%,-50%);
  max-width: 60%;
  min-height: 30%;
  background:#fff;
}
.modal-con .title{
  font-size:20px; 
  padding: 20px; 
}
.modal-con .con{
  font-size:15px; line-height:1.3;
  padding: 30px;
}
.modal-con .close{
  display:block;
  position:absolute;
  width:30px; height:30px;
  border-radius:50%; 
  border: 3px solid #000;
  text-align:center; line-height: 30px;
  text-decoration:none;
  color:#000; font-size:20px; font-weight: bold;
  right:10px; top:10px;
}
	</style>
</head>
<body>
	<div class="wrapper">
	<%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
	<script type="text/javascript" src="/js/admin/deptList.js"></script>
	<section class="sub_contents">
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>
	</sec:authorize>
	<sec:authorize access="hasRole('ROLE_USER')">
		<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_contents.jsp"%>
	</sec:authorize>
	   <div class="right_contents">
			<div class="contents_area">
				<div class="location">
					<a href="${contextRoot}/main/main.do" class="nav home skip">홈</a>
					<a href="${contextRoot}/main/main.do" class="nav nav1">관리자</a>
					<a href="#" class="nav nav1">기업 관리</a>
				</div>
				<div class="location_wr clear_fix">	
					<div class="tableWrapper loaction_area lt">
						<div class="form_wrap">
								<div class="form_box">
									<label for="">조회항목</label>
									<select id="searchCondition" name="searchCondition">
										<option value="name">기업명</option>
										<option value="code">기업코드</option>
									</select>
									<input type="searchKeyword" name="searchKeyword" id="searchKeyword" value="${searchKeyword}" placeholder="검색어를 입력해주세요.">
								</div>
							
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="getDeptList()"/>
								<input type="button" class="find_btn" value="추가" onclick="managerAddModal('managerModal')"/>
							</div>
						</div>
						<div class="table_area">
							<table class="default_table">
								<colgroup>
									<col style="width:20%;">
									<col style="width:auto;">
									<col style="width:auto;">
								</colgroup>
								<thead>
									<tr>
										<th>순번</th>
										<th>기업명</th>
										<th>기업 코드</th>
										<th>수정</th>
									</tr>
								</thead>
								<tbody id="tBody">
								</tbody>
							</table>
						</div>
					</div>
						<div id="insertAndUpdate" class="loaction_area rt">
							<div class="table_area">
								<div class="form_wrap">
									<div class="form_box">
										<label id="siteLabel" for="">관정 조회</label>
									</div>
								</div>
								<table class="default_table">
										<thead>
											<tr>
												<th>순번</th>
												<th>관정 이름</th>
												<th>관정 코드</th>
												<th>관정 주소</th>											
											</tr>
										</thead>
										<tbody id="siteTbody">
										<tr><td colspan='4'>검색결과가 없습니다.</td></tr>
										</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
	<div id="managerModal" class="modal-con">
		<button class="close" onclick="closeModal('managerModal');">X</button>
		<p id="managerModaltitle"class="title"></p>
		<div id="managerModalCon" class="con">
	    </div>  
	    <div id="managerModalBtn" class="con">
	    </div>
	</div>
</body>
</html>
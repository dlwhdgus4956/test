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
	
	<title>사용자관리</title>
</head>
<body>
	<div class="wrapper">
    <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
    <script type="text/javascript" src="/js/admin/memberList.js"></script>
	<section class="sub_contents">
		<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>
	   <div class="right_contents">
				<div class="contents_area">
				<div class="location">
					<a href="${contextRoot}/main/main.do" class="nav home skip">홈</a>
					<a href="${contextRoot}/main/main.do" class="nav nav1">관리자</a>
					<a href="${contextRoot}#" class="nav nav1">회원 관리</a>
				</div>
						<div class="form_wrap">
							<div class="form_box">
								<label for="">조회항목</label>
								<select id="searchtype" name="searchtype">
									<option value="1">아이디</option>
									<option value="2">이름</option>
									<option value="3">소속명</option>
								</select>
								<input type="searchKeyword" id="searchkeyword" name="searchkeyword" value="${searchKeyword}" placeholder="검색어를 입력해주세요.">
							</div>
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="getMemberData();"/>
								<button type="button" class="exl_btn" onClick="">엑셀다운로드</button>
							</div>
						</div>
					<div class="table_area">
						<table class="default_table">
							<colgroup>
								<col style="width:auto;">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
							</colgroup>
							<thead>
								<tr>
									<th>순번</th>
									<th>아이디</th>
									<th>이름</th>
									<th>이메일</th>
									<th>전화번호</th>
									<th>권한</th>
									<th>소속</th>
									<th>사용여부</th>
								</tr>
							</thead>
							<tbody id="tBody">
							</tbody>
						</table>
					</div>
					<div class="pagination">
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
</body>
</html>
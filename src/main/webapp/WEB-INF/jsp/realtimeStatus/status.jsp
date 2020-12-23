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
	
	<title>실시간 관측현황</title>
	
</head>
</head>
<body>
	<%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
	
	 <script type="text/javascript" src="/js/realtimeStatus/realtimeStatus.js"></script>
	
	<div class="wrapper">
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
						<a href="${contextRoot}/sgms/realtimeStatus/status.do" class="nav nav1">실시간 관측현황</a>
					</div>
						<div class="form_wrap">
							<div class="form_box">
								<label for="">조회항목</label>
								<select id="searchCondition" name="searchCondition">
									<option value="siteName">관측소명</option>
									<option value="siteCode">관측소코드</option>
								</select>
								<input type="text" id="searchKeyword" >
							</div>
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="getRealtimeDataList();">
								<button type="button" class="exl_btn" onClick="">엑셀다운로드</button>
							</div>
						</div>
					<div class="table_area">
						<table class="default_table">
							<colgroup>
								<col style="width:3%">
								<col style="width:8%">
								<col style="width:8%">
								<col style="width:8%">
								<col style="width:5%">
								<col style="width:10%">
								<col style="width:10%">
								<col style="width:5%">
								<col style="width:5%">
								<col style="width:5%">
								<col style="width:5%">
								<col style="width:5%">
								<col style="width:5%">
							</colgroup>
							<thead>
								<tr>
									<th>순번</th>
									<th>관측소명</th>
									<th>관측소코드</th>
									<th>모뎀 전화번호</th>
									<th>관정깊이</th>
									<th>표고_TOC</th>
									<th>관측시간</th>
									<th>수위EL</th>
									<th>수위GL</th>
									<th>압력</th>
									<th>EC</th>
									<th>대기압</th>
									<th>배터리</th>
								</tr>
							</thead>
							<tbody id="tBody">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
</body>
</html>
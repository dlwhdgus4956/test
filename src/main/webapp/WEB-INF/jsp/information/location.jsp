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
</head>
<body>
	<div class="wrapper">
        <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
	
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>
    <script type="text/javascript" src="/js/gis/ol/ol.js"></script>
    <script type="text/javascript" src="/js/information/map.js"></script>
    <script type="text/javascript" src="/js/information/location.js"></script>
    
    
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
					<a href="${contextRoot}/sgms/information/location.do" class="nav nav1">관측소 정보</a>
					<a href="${contextRoot}/sgms/information/location.do" class="nav nav1">관측소 위치</a>
				</div>
				<div class="location_wr clear_fix">	
					<div class="tableWrapper loaction_area lt">
						<div class="form_wrap">
								<div class="form_box">
									<label for="">조회항목</label>
									<select id="searchCondition" name="searchCondition">
										<option value="name">관측소명</option>
										<option value="code">관측소코드</option>
									</select>
									<input type="searchKeyword" name="searchKeyword" id="searchKeyword" value="${searchKeyword}" placeholder="검색어를 입력해주세요.">
								</div>
							
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="locationSearchBtn()"/>
							</div>
						</div>
						<div class="table_area">
							<table class="default_table">
								<colgroup>
									<col style="width:10%;">
									<col style="width:20%;">
									<col style="width:20%;">
									<col style="width:auto;">
								</colgroup>
								<thead>
									<tr>
										<th>순번</th>
										<th>관측소명</th>
										<th>관측소코드</th>
										<th>주소</th>
									</tr>
								</thead>
								<tbody id="tBody">
								</tbody>
							</table>
						</div>
					</div>
					<div id="map" class="loaction_area rt"><div id="popup" style="background-color: red;"></div>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
</body>
</html>
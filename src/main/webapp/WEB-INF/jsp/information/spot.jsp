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
	<title>관측소 제원</title>
</head>
<body>
	<div class="wrapper">
        <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
        
        <script type="text/javascript" src="/js/information/spot.js"></script>
        
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
						<a href="${contextRoot}/sgms/information/spot.do" class="nav nav1">관측소 정보</a>
						<a href="${contextRoot}/sgms/information/spot.do" class="nav nav1">관측소 제원</a>
					</div>
						<input type="hidden" id="pageIndex" value="1" />
						<div class="form_wrap">
							<div class="form_box">
								<label for="">조회항목</label>
								<select id="searchCondition" name="searchCondition">
									<option value="name">관측소명</option>
									<option value="code">관측소코드</option>
								</select>
								<input type="searchKeyword" id="searchKeyword" name="searchKeyword" value="${searchKeyword}" placeholder="검색어를 입력해주세요.">
							</div>
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="SpotSearchBtn();"/>
								<button type="button" class="exl_btn" onClick="spotGetDate('',true)">엑셀다운로드</button>
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
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:auto">
								<col style="width:8%;">
								<col style="width:8%;">
							</colgroup>
							<thead>
								<tr>
									<th>순번</th>
									<th>관측소명</th>
									<th>주소</th>
									<th>설치일자</th>
									<th>운영현황</th>
									<th>표고</th>
									<th>굴착구경(mm)</th>
									<th>굴착심도(m)</th>
									<th>초기수위(EL.m)</th>
									<th>현재수위(EL.m)</th>
									<th>수온(&deg;C)</th>
									<th>전기전도도(ms/cm)</th>
									<th>탁도(NTU)</th>
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
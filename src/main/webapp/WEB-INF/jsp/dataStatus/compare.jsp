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
	<title>관측소 비교조회</title>
	
</head>
</head>
<body>
	<div class="wrapper">
        <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"></script>
		<script type="text/javascript" src="/js/chart/commChart.js"></script>
		<script type="text/javascript" src="/js/dataStatus/compare.js"></script>

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
						<a href="${contextRoot}/main/main.do" class="nav home">홈</a>
						<a href="${contextRoot}/gwatcher/dataStatus/data.do" class="nav nav1">관측데이터 현황</a>
						<a href="${contextRoot}/gwatcher/dataStatus/compare.do" class="nav nav1">관측소 비교조회</a>
					</div>
						<div class="form_wrap">

							<div class="form_box">
								<label for="">관측소선택</label>
								<select name="siteCodes" id="siteCodes1" class="siteCodes" onChange="">
									<option value=''>비교관측소선택</option>
								</select>
								<select name="siteCodes" id="siteCodes2" class="siteCodes" onChange="">
									<option value=''>비교관측소선택</option>
								</select>
								<select name="siteCodes" id="siteCodes3" class="siteCodes" onChange="">
									<option value=''>비교관측소선택</option>
								</select>
								<select name="siteCodes" id="siteCodes4" class="siteCodes" onChange="">
									<option value=''>비교관측소선택</option>
								</select>
							</div>
							<div class="form_box">
								<label for="">관측기간</label>
								<input type="text" id="sDate" name="sDate"class="form_date"> ~ <input type="text" id="eDate" name="eDate" class="form_date">
							</div>
							<div class="form_box">
								<input type="button" class="find_btn" value="검색" onclick="getCompareData()"/>
							</div>
						</div>
					
					<div class="tab_wrap data">
						<ul class="tabs clear_fix">
							<li><a href="#tab1">수위</a></li>
							<li><a href="#tab2">수온</a></li>
							<li><a href="#tab3">EC</a></li>
						</ul>
						<div class="tab_container">
							<div id="tab1" class="tab_content">
								<canvas id="tab1Chart"></canvas>
							</div>
							<div id="tab2" class="tab_content">
								<canvas id="tab2Chart"></canvas>
							</div>
							<div id="tab3" class="tab_content">
								<canvas id="tab3Chart"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </div>    
</body>
</html>
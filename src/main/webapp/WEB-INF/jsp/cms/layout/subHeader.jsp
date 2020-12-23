<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="org.springframework.web.util.UrlPathHelper"%>    
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> 

	<!-- jQuery  -->
	<script src="../../js/jquery-1.12.4.min.js"></script>
	<script src="../../js/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
	<script src="../../js/sub/sub_script.js"></script>
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='../../js/cms/cmmn/header.js' />"></script>
	<script type="text/javascript" src="<c:url value='../../js/cms/cmmn/fileUtils.js' />"></script>
	<script type="text/javascript" src="<c:url value='../../js/cms/cmmn/commonUtils.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/map/createMap.js' />"></script>
	
	<!-- css import -->
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/contents.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/common.css'/>" media="all" />
    
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/jquery/jquery-ui.css'/>">
	<link rel="stylesheet" href="<c:url value="/css/font/NotoSans/fonts.css"/>">
	<link rel="stylesheet" href="/css/font/SCDream/fonts.css">
	
	<script type="text/javascript" src="<c:url value='../../js/gis/pagination.js' />"></script>	
	
	<script type="text/javascript">
	var contextRoot = "${pageContext.request.contextPath}";
	</script>

	<!-- 시큐리티권한 -->
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.authorities" var="user_auth" />
		<input type="hidden" id="getUserAuth" name="getUserAuth" value="${user_auth}">
	</sec:authorize>

	<header class="header">
		<div class="inner clear_fix">
		    <h1 class="header_logo"><a href="${ctx}/main/main.do">지하수 관측 시스템</a></h1>
		  	<div class="header_right clear_fix">
			    <nav class="header_tnb">
			        <a href="${ctx}/main/main.do" class="link home">홈</a>
			 		<sec:authorize access="isAnonymous()">
			        <a href="#" class="link" data-pop-btn="팝업1">로그인</a>
			        </sec:authorize>
			       <sec:authorize access="isAuthenticated()">
					<a href="javascript:void(0)"  class="link home" onclick="logout();">로그아웃</a>
					</sec:authorize>
					<sec:authorize access="hasRole('ROLE_ADMIN')">
					<a href="/admin/member/list.do"  class="link">관리자</a>
					</sec:authorize>
			    </nav>
			    <div class="header_wrap">
			        <div class="header_gnb">
			            <ul class="clear_fix">
			            	<sec:authorize access="hasRole('ROLE_ADMIN')">
							<li class="item"><a href="/admin/monitoring.do">실시간 모니터링</a></li>
							</sec:authorize>
			                <li class="item"><a href="/sgms/realtimeStatus/status.do">실시간 관측현황</a></li>
			                <li class="item"><a href="/sgms/information/location.do">관측소 정보</a></li>
			                <li class="item"><a href="/sgms/dataStatus/data.do">관측데이터 현황</a></li>
			            </ul>
			        </div>
			        <div class="header_sub clear_fix">
			      		<sec:authorize access="hasRole('ROLE_ADMIN')">
		        		<ul>
			                <li class="item"><a class="skip">메뉴없음</a></li>
			                <li class="item"><a class="skip">메뉴없음</a></li>
			                <li class="item"><a class="skip">메뉴없음</a></li>
		            	</ul>
		        		</sec:authorize>
			            <ul>
			                <li class="item"><a class="skip">메뉴없음</a></li>
			                <li class="item"><a class="skip">메뉴없음</a></li>
			                <li class="item"><a class="skip">메뉴없음</a></li>
			            </ul>
			            <ul>
			                <li class="item"><a href="/sgms/information/location.do">-관측소 위치</a></li>
			                <li class="item"><a href="/sgms/information/spot.do">-관측소 제원</a></li>
			                <li class="item"><a href="/sgms/information/device.do">-관측장비 제원</a></li>
			            </ul>
			            <ul>
			                <li class="item"><a href="/sgms/dataStatus/data.do">-관측소별 데이터</a></li>
			                <li class="item"><a href="/sgms/dataStatus/compare.do">-관측소 비교 조회</a></li>
			            </ul>
			        </div>
			    </div>
		    </div>
		</div>
	</header>

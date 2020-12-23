<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="org.springframework.web.util.UrlPathHelper"%>    
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> 

	
	<!-- jQuery  -->
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.js'/>"></script>
	
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/header.js' />"></script>
	
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/fileUtils.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/commonUtils.js' />"></script>
	
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.bundle.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.bundle.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.min.js' />"></script>
	
	<!-- css import -->
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/font.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/common.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/board.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/content.css'/>" media="all" />
    
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/jquery/jquery-ui.css'/>">
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/chart/Chart.css'/>">
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/chart/Chart.min.css'/>">
	
	<script type="text/javascript">
	var contextRoot = "${pageContext.request.contextPath}";
	</script>

<!-- 시큐리티권한 -->
<sec:authorize access="isAuthenticated()">
    <sec:authentication property="principal.authorities" var="user_auth" />
    <input type="hidden" id="getUserAuth" name="getUserAuth" value="${user_auth}">
</sec:authorize>

<div class="hd_top">
	<div class="container">
	    <ul class="top_li">
	        <li><a href="javascript:void(0)" onclick="home();">HOME</a></li>
			<li><a href="javascript:void(0)" onclick="headerObj.cmmn.account();">MY PAGE</a></li>
			<sec:authorize access="hasRole('ROLE_ADMIN')">
				<li><a href="javascript:void(0)" onclick="headerObj.admin.memberInfo();">ADMIN</a></li>
			</sec:authorize>
			<li><a href="javascript:void(0)" onclick="logout();">LOGOUT</a></li>
        </ul>
    </div>
</div>
<!-- <h1 class="logo container"><a href="/main/main.do"><img src="../../images/cms/logo-color.svg" style="height: 20px; width: 30px;" ></a></h1> -->

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<%@ page import="org.springframework.web.util.UrlPathHelper"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SGMS - 지하수관측데이터 모니터링시스템</title>
    <style type="text/css">
    #mainChart{background-color: white;}
    </style>
</head>
<body>
	<div class="main-wrapper">
		<!-- 상단 -->
	    <%@include file="/WEB-INF/jsp/cms/layout/header.jsp"%>
		<main class="main_content">
			<div class="main_con_left">
               <h2 class="main_title">소다 모니터링 시스템</h2>
               <p class="main_title_en">Soda Glwater Monitoring System</p>
			</div>
		</main>
		<!-- 하단 -->
			<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
	</div>
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/main/main.js' />"></script>
	
</body>
</html>
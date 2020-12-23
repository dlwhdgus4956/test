<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="org.springframework.web.util.UrlPathHelper"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>

	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<title>Login</title>
	
	<!-- jQuery  -->
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.js'/>"></script>
	
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/login.js' />"></script>
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/font.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/common.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/board.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/content.css'/>" media="all" />
	 
</head>
<body>

	<div class="wrap">
        <div class="container">
            <div class="cont">
                <h3>로그인</h3>
                <div class="member">
                    <div class="member_login">
                    
                        <form action="/login" method="post" id="loginForm" class="login_form">
                        	
							<input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" />
							<div class="email">
								<label for="userId" class="blind">ID</label> 
								<input type="text" name="loginId" placeholder="계정 아이디">
								<i class="fas fa-user"></i>
							</div>
							<div class="password">
								<label for="userPw" class="blind">Password</label> 
								<input type="password" name="loginPw" placeholder="비밀번호" onkeyup="enterkey();" autocomplete="off">
								<i class="fas fa-unlock-alt"></i>
							</div>
							
							<c:if test="${not empty SPRING_SECURITY_LAST_EXCEPTION}">
								<font color="red">
									<p>${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</p> 
									<c:remove var="SPRING_SECURITY_LAST_EXCEPTION" scope="session" />
								</font>
							</c:if>
                        </form>
                        
                        <div class="loginWrap">
							<button id="loginBtn" onClick="login();">로그인</button>
							<button id="signUpBtn" onClick="signUp();">계정가입</button>
						</div>

                    </div>
                </div>
            </div>
        </div>
	</div>
	
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
	
	<title>회원신청</title>
	
	<!-- jQuery  -->
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.js'/>"></script>
	
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/signUp.js' />"></script>
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/font.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/common.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/board.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/content.css'/>" media="all" />

</head>
</head>
<body>
	<h6>회원신청 페이지</h6>
	<div>
		<form name="userForm" id="userForm"  method="post">
		<input type="hidden" name="checkId" id="checkId" value="" />
			<table class="type01">
				<tr>
					<h3></h3>
				</tr>
				<tr>
					<th>아이디</th>
					<td>
						<input type="text" name="userId" id="userId"/>
						<input type="button" value="중복확인" id="idCheck" onclick="javascript:fn_idCheck();"/>
					</td>
				</tr>
				<tr>
					<th>회원명</th>
					<td>
						<input type="text" name="name" id="name"/>
					</td>
				</tr>
				<tr>
					<th>비밀번호</th>
					<td>
						<input type="password" name="password" id="password"/>
					</td>
				</tr>
				<tr>
					<th>비밀번호확인</th>
					<td>
						<input type="password" name="password2" id="password2"/>
					</td>
				</tr>
				<tr>
					<th>이메일</th>
					<td>
						<input class="email" name="email" placeholder="이메일 양식) example@soda.com" style="width:300px"/>
					</td>
				</tr>
				<tr>
					<th>전화번호</th>
					<td>
						<input type="text" name="tel" id="tel" placeholder="전화번호 양식) 01012345678" style="width:300px"/>
					</td>
				</tr>
				<tr>
					<th>소속</th>
					<td>
						<input name="dept" id="dept" >
					</td>
				</tr>
			</table>
		</form>
	</div>
	<div>
		<a href="#"  onClick="signUp();">확인</a>
        <a href="#"  onClick="back();">취소</a>
	</div>
</body>
</html>
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
	
	<title>사용자 수정</title>
	
</head>
</head>
<body>
	<div class="wrapper">
	<%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
	<script type="text/javascript" src="/js/admin/memberView.js"></script>
	<section class="sub_contents">
		<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>
	   <div class="right_contents">
			<div class="contents_area">
			<div class="location">
					<a href="${contextRoot}/main/main.do" class="nav home skip">홈</a>
					<a href="${contextRoot}/main/main.do" class="nav nav1">관리자</a>
					<a href="${contextRoot}/admin/member/list.do" class="nav nav1">회원 관리</a>
					<a href="#" class="nav nav1">회원 정보수정</a>
				</div>
					<div class="table_area clear-fix">
					<form action="/admin/member/updateProc.do" method="POST" id="updateMember">
						<table class="default_table sp_view rt">
							<thead>
								<tr>
									<th colspan="4">회원 정보</th>
								</tr>
							</thead>
							<tbody id="tBody">
							
								<tr>
									<th>아이디</th>
									<td colspan="2"><input name="userId" type="text" value="${result.user_id }" readonly="readonly"></td>
								</tr>
								<tr>
									<th>이름</th>
									<td colspan="2"><input  name="name" type="text" value="${result.name }" readonly="readonly"></td>
								</tr>
								<tr>
									<th>소속</th>
									<td colspan="2"><input  name="dept" type="text" value="${result.dept }"></td>
								</tr>
								<tr>
									<th>전화번호</th>
									<td colspan="2"><input  name="tel" type="text" value="${result.tel }" ></td>
								</tr>
								<tr>
									<th>이메일</th>
									<td colspan="2"><input name="email" type="text" value="${result.email }"></td>
								</tr>
								<tr>
									<th>권환</th>
									<td colspan="2">
										<select name="auth" id="auth">
											<option value="ROLE_ADMIN" <c:if test="${result.authorities eq 'ROLE_ADMIN'}">selected</c:if>>관리자</option>
						                    <option value="ROLE_USER" <c:if test="${result.authorities eq 'ROLE_USER'}">selected</c:if>>사용자</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>계정 활성화</th>
									<td colspan="2">
										<select id="enabled" name="enabled">
											<option value="1" <c:if test="${result.enabled eq '1'}">selected</c:if>>활성화</option>
						                    <option value="0" <c:if test="${result.enabled eq '0'}">selected</c:if>>비활성화</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						</form>
					</div>
					<div class="btn_wrap">
						<button type="button" class="list_btn" onclick="submitBtn();">수정</button>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
</body>
</html>
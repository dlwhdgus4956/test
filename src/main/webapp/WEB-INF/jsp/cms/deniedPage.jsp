<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>접근권한 페이지</title>

	<link rel="stylesheet" href="../css/font/NotoSans/fonts.css">
	<link rel="stylesheet" href="../css/common.css">
	<link rel="stylesheet" href="../css/layout.css">
	<link rel="stylesheet" href="../css/contents.css">
</head>
<%
session.invalidate();
%>

<body>
	<div class="access_wrap">
		<div class="inner">
			<div class="access_con">
				<img src="../images/sub/not_access.png" alt="접근권한아이콘">
				<p class="access_title"><strong>접근권한</strong>이 없습니다.</p>
				<p class="access_info">권한이 없어 접근이 불가합니다. 관리자에게 문의하세요.</p>
				<a href="${ctx }/main/main.do" class="access_btn">처음으로</a>
			</div>
		</div>
	</div>	
</body>
</html>
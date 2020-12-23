<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/js/test/test1.js"></script>
</head>
<body>
	<table class="tb">
		<colgroup>
			<col style="width:3%">
			<col style="width:8%">
			<col style="width:10%">
			<col style="width:5%">
			<col style="width:5%">
		</colgroup>
		<thead>
			<tr>
				<th>순번</th>
				<th>관측소명</th>
				<th>관측시간</th>
				<th>수위EL</th>
				<th>EC</th>
			</tr>
		</thead>
		<tbody id="tBody">
		</tbody>
	</table>
</body>
</html>
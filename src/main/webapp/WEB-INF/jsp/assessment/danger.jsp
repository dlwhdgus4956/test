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
	
	<title>관리기준 대비 위험</title>
	
</head>
</head>
<body>
	<div class="wrapper">
        <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>

	<script>
    $(function(){
    	var today = new Date();
    	var dd = String(today.getDate()).padStart(2, '0');
    	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    	var yyyy = today.getFullYear();

    	date = yyyy+'-'+mm+'-';
        $( "#sDate" ).datepicker().datepicker("setDate",date+"01");
        $( "#eDate" ).datepicker().datepicker("setDate",date+dd);

		//select box에 관측소정보 넣기
		$.ajax({
			url : "<c:url value='/gwatcher/common/selectObsvList.do' />",			
			type : "POST",
			dataType : "json",
			success : function(data) {
				if(data.obsvList != null && data.obsvList.length > 0) {
					$(data.obsvList).each(function(index, item){
						$("#siteCode").append("<option "+(index==0?"selected='selected'":'')+"value='"+item.SITE_CODE+"'>"+item.SITE_NM+"</option>");
					});
				}
			}
		});
		selectDailyAverage();
	});
	
	
	function selectDailyAverage(){
		setLoading('tBody', 5, true);
		$.ajax({
			url : "<c:url value='/gwatcher/assessment/selectDailyAverage.do' />",
			data : $("#searchForm").serialize(),
			type : "POST",
			dataType : "json",
			success : function(data) {
				var tBody = "";
				if(data.data != null && data.data.length > 0) {
					$(data.data).each(function(index, item){
						tBody += "<tr><td>"+item.SITE_HOUR+"</td>";
						tBody += "<td>"+fn_NVL(item.AVG_EL, '-')+"</td>";
						tBody += "<td>"+fn_NVL(item.AVG_GL, '-')+"</td>";
						tBody += "<td>"+fn_NVL(item.ABS_DIF, '-')+"</td>";
						tBody += "<td>"+fn_NVL(getFlag(item.FLAG), '-')+"</tr>";
					});
				}
				if(tBody == '') {
					tBody += "<tr><td colspan='6'>일 관측데이터가 존재하지 않습니다.</td></tr>";
				}
				$("#tBody").html(tBody);
			}
		});
	}
	
	function getFlag(type){
		switch(type) {
		case 0:
			return '<span class="point b">안전</span>';
		case 1:
			return '<span class="point o">주의</span>';
		case 2:
			return '<span class="point g">경계</span>';
		case 3:
			return '<span class="point r">심각</span>';
		}
	}
	
	function selectExcelExport(){
		location.href = "<c:url value='/gwatcher/assessment/exportDailyAverage.do' />?" + $("#searchForm").serialize();
	}
	function fSubmit(){
		selectDailyAverage();
		return false;
	}
	</script>
	<section class="sub_contents">
		<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_contents.jsp"%>
	   <div class="right_contents">
				<div class="contents_area">
					<div class="location">
						<a href="${contextRoot}/main/main.do" class="nav home skip">홈</a>
						<a href="${contextRoot}/gwatcher/assessment/graph.do" class="nav nav1">변동수위 평가</a>
						<a href="${contextRoot}/gwatcher/assessment/graph.do" class="nav nav1">관리기준 대비 위험도</a>
					</div>
					<form name="searchForm" id="searchForm" onsubmit='javascript:return fSubmit();'>
						<div class="form_wrap">
							<div class="form_box">
								<label for="">관측기간</label>
								<input type="text" id="sDate" name="sDate"class="form_date"> ~ <input type="text" id="eDate" name="eDate" class="form_date">
							</div>
							<div class="form_box">
								<label for="">관측소명</label>
								<select id="siteCode" name="siteCode" onChange="javascript:selectDailyAverage()">
								</select>
							</div>
							<div class="form_box">
								<input type="submit" class="find_btn" value="검색"/>
								<button type="button" class="exl_btn" onClick="javascript:selectExcelExport()">엑셀다운로드</button>
							</div>
						</div>
					</form>
					
					<div class="table_area">
						<table class="default_table">
							<colgroup>
								<col style="width:20%">
								<col style="width:20%">
								<col style="width:20%">
								<col style="width:20%;">
								<col style="width:20%;">
							</colgroup>
							<thead>
								<tr>
									<th>날짜</th>
									<th>EL</th>
									<th>GL</th>
									<th>일수위변화량</th>
									<th>위험도</th>
								</tr>
							</thead>
							<tbody id="tBody">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
	<!-- js File import -->
	<%-- <script type="text/javascript" src="<c:url value='/js/gbgwis/cmmn/ ' />"></script> --%>
</body>
</html>
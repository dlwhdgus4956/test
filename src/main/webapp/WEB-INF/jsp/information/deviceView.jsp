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
	
	<title>관측장비 제원 | ${param.site_code }</title>
	
</head>
</head>
<body>
	<div class="wrapper">
        <%@include file="/WEB-INF/jsp/cms/layout/subHeader.jsp"%>
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
						<a href="${contextRoot}/main/main.do" class="nav home skip">홈</a>
						<a href="${contextRoot}/sgms/information/spot.do" class="nav nav1">관측소 정보</a>
						<a href="${contextRoot}/sgms/information/device.do" class="nav nav1">관측장비 제원</a>
					</div>
					<div class="table_area clear_fix">
						<div class="tb_type tb_type1">
							<div class="table_header clear_fix lt">
								<p>관측소 정보</p>
							</div>
							<table class="default_table">
								<colgroup>
									<col style="width:20%;">
									<col style="width:30%;">
									<col style="width:20%;">
									<col style="width:30%;">
								</colgroup>
								<tbody id="tBody1">
									<tr>
										<th>관측소명</th>
										<td>${site.site_nm }</td>
										<th>관측소코드</th>
										<td>${site.site_code }</td>
									</tr>
									<tr>
										<th>관정심도(m)</th>
										<td>${site.w_dig_dph }</td>
										<th>표고TOC(m)</th>
										<td>${site.w_elev }</td>
									</tr>
									<tr>
										<th>케이싱구경(mm)</th>
										<td colspan="3">${site.w_csi_dia }</td>
									</tr>
									<tr>
										<th>주소</th>
										<td colspan="3">${site.addr }</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="tb_type tb_type1">
							<div class="table_header clear_fix">
								<p>장비 정보</p>
							</div>
							<table class="default_table">
								<colgroup>
									<col style="width:20%;">
									<col style="width:30%;">
									<col style="width:20%;">
									<col style="width:30%;">
								</colgroup>
								<tbody id="tBody2">
									<tr>
										<th>모델 시리얼번호</th>
										<td>${modem.modem_sn }</td>
										<th>모뎀 모델명</th>
										<td>${modem.modem_model }</td>
									</tr>
									<tr>
										<th>모뎀 번호</th>
										<td>${modem.modem_tel }</td>
										<th>모뎀 도입일자</th>
										<td>${modem.ins_date }</td>
									</tr>
									<tr>
										<th>RTU 시리얼번호</th>
										<td>${rtu.rtu_sn}</td>
										<th>RTU 모델명</th>
										<td>${rtu.rtu_model}</td>
									</tr>
									<tr>
										<th>프로토콜</th>
										<td>${rtu.protocol}</td>
										<th>통신방식</th>
										<td>${rtu.telecom}</td>
									</tr>
								</tbody>
							</table>
						</div>
						
						<div class="tab_wrap">
							<div class="table_header clear_fix">
								<p>센서 정보</p>
							</div>
							<div class="tab_container">
								<div id="tab1" class="tab_content">
									<form action="">
										<div class="table_area">
											<table class="default_table">
												<colgroup>
													<col style="width:10%;">
													<col style="width:10%;">
													<col style="width:10%;">
													<col style="width:10%;">
													<col style="width:15%;">
													<col style="width:15%;">
													<col style="width:10%;">
													<col style="width:10%;">
													<col style="width:10%;">
												</colgroup>
												<thead>
													<tr>
														<th>NO</th>
														<th>센서ID</th>
														<th>모델명</th>
														<th>TYPE</th>
														<th>PSI</th>
														<th>COND</th>
														<th>설치일자</th>
														<th>제거일자</th>
													</tr>
												</thead>
												<tbody id="tBodySensor1">
													<c:forEach items="${sensorList }" var="sensor">
														<tr>
														<td>${sensor.rn }</td>
														<td>${sensor.sensor_sn }</td>
														<td>${sensor.sensor_nm }ID</td>
														<td>${sensor.sensor_type }</td>
														<td>${sensor.max_press }</td>
														<td>${sensor.max_ec }</td>
														<td>${sensor.ins_date }</td>
														<td>${sensor.sensor_del_date }</td>
													</tr>	
													</c:forEach>
												</tbody>
											</table>
										</div>
									</form>
								</div>
								<div id="tab2" class="tab_content">
									<form action="">
										<div class="table_area">
											<table class="default_table">
												<colgroup>
													<col style="width:5%;">
													<col style="width:auto;">
													<col style="width:auto;">
													<col style="width:auto;">
													<col style="width:auto;">
													<col style="width:auto;">
													<col style="width:auto;">
													<col style="width:35%;">
												</colgroup>
												<thead>
													<tr>
														<th>NO</th>
														<th>센서ID</th>
														<th>모델명</th>
														<th>TYPE</th>
														<th>PSI</th>
														<th>COND</th>
														<th>설치일자</th>
														<th>제거일자</th>
													</tr>
												</thead>
												<tbody id="tBodySensor2">
												</tbody>
											</table>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="btn_wrap">
							<button type="button" class="list_btn" onClick="location.href='${contextRoot}/sgms/information/device.do'">목록</button>
						</div>
					</div>
				</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
	<!-- js File import -->
	<script type="text/javascript" src="${contextRoot}/js/information/deviceView.js"></script>
</body>
</html>
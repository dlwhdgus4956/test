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
	
	<title>관측소 제원 | ${param.site_code }</title>
	
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
						<a href="${contextRoot}/sgms/information/spot.do" class="nav nav1">관측소 제원</a>
					</div>
					<div class="table_area clear-fix">
						<table class="default_table sp_view lt">
							<thead>
								<tr>
									<th>관측소사진</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div class="tb_photo_area">
											<c:if test="${empty result.site_img1 }">
												<img alt="" src="/images/sub/no_img.jpg">
											</c:if>
											<c:if test="${not empty result.site_img1 }">
												<img alt="" src="/images${result.site_img1}">
											</c:if>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="default_table sp_view rt">
							<thead>
								<tr>
									<th colspan="4">관측소 정보</th>
								</tr>
							</thead>
							<tbody id="tBody">
								<tr>
									<th>관측소명</th>
									<td>${result.site_nm }</td>
									<th>관측소코드</th>
									<td>${result.site_code }</td>
								</tr>
								<tr>
									<th>읍면동 주소</th>
									<td colspan="4">${result.addr }</td>
								</tr>
								<tr>
									<th>도로명 주소</th>
									<td colspan="4">${result.rdn_addr }</td>
								</tr>
								<tr>
									<th>경도</th>
									<td>${result.site_lttd}</td>
									<th>위도</th>
									<td>${result.site_litd}</td>
								</tr>
								<tr>
									<th>X좌표</th>
									<td>${result.x}</td>
									<th>Y좌표</th>
									<td>${result.y}</td>
								</tr>
								<tr>
									<th>표고</th>
									<td colspan="4">${result.w_elev}</td>
								</tr>
								<tr>
									<th>지하수 용도</th>
									<td>${result.w_srv}</td>
									<th>지하수 세부용도</th>
									<td>${result.w_dtl_srv}</td>
								</tr>
								<tr>
									<th>자연수위(m)</th>
									<td colspan="4">${result.w_nat_wtlv }</td>
								</tr>
								<tr>
									<th>관리사업부서</th>
									<td>${result.manager_nm}</td>
									<th>굴착깊이(m)</th>
									<td>${result.w_dig_dph}</td>
								</tr>
								<tr>
									<th>운영여부</th>
									<td>${result.site_oper }</td>
									<th>케이싱구경(m)</th>
									<td>${result.w_csi_dia}</td>
								</tr>
								<tr>
									<th>최초허가신고일</th>
									<td>${result.w_dvop_year }</td>
									<th>음용여부</th>
									<td>${result.w_drink_yn }</td>
								</tr>
								<tr>
									<th>비고</th>
									<td colspan="4">${result.w_rem}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn_wrap">
						<button type="button" class="list_btn" onClick="location.href='${contextRoot}/sgms/information/spot.do'">목록</button>
					</div>
				</div>
			</div>
		</section>
		<%@include file="/WEB-INF/jsp/cms/layout/subFooter.jsp"%>
    </div>
</body>
</html>
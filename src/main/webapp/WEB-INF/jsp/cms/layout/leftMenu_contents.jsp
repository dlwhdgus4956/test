<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="aside">
	<ul>
		<li><a href="${contextRoot }/sgms/realtimeStatus/status.do">실시간 관측현황</a></li>	
		<li>
			<a href="#" class="menulink has_sub">관측소 정보</a>
			<div class="sub_aside">
				<ul>
					<li><a href="/sgms/information/location.do">관측소 위치</a></li>
					<li><a href="/sgms/information/spot.do">관측소 제원</a></li>
					<li><a href="/sgms/information/device.do">관측장비 제원</a></li>
				</ul>
			</div>
		</li>	
		<li>
			<a href="#" class="menulink has_sub">관측데이터 현황</a>
			<div class="sub_aside">
				<ul>
					<li><a href="/sgms/dataStatus/data.do">관측소별 데이터</a></li>
					<li><a href="/sgms/dataStatus/compare.do">관측소 비교조회</a></li>
				</ul>
			</div>
		</li>
	</ul>
</div>

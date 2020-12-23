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
	
	<title>title</title>
	
</head>
<body>

	<header2>
        <%@include file="/WEB-INF/jsp/cms/layout/header_admin.jsp"%>
    </header2>
    
    <section>
        <div class="container">
            <%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>
            <div class="cont">
                <nav class="location">
                    <ul>
                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
                        <li><a href="#">네비1</a></li>
                        <li><a href="#">네비2</a></li>
                        <li><a href="#">네비3</a></li>
                    </ul>
                </nav>
                <h3>권한별 리스트</h3>
	            
	            <div class="tbl_wrap">
	                <table class="board_list mt30 mb20">
	                    <caption>목록</caption>
	                    <colgroup>
	                        <col style="width:25%">
	                        <col style="width:25%">
	                        <col style="width:25%">
	                        <col style="width:25%">
	                    </colgroup>
	                    <thead>
	                        <tr>
	                            <th scope="col">권한</th>
	                            <th scope="col">권한명</th>
	                            <th scope="col">비고</th>
	                            <th scope="col">관리버튼</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        
	                        <c:choose>
	                           	<c:when test="${not empty resultList}">
	                           		<c:forEach var="result" items="${resultList}" varStatus="status">
	                                 <tr>
	                                     <td>
	                                     	<c:out value="${result.authorities}" />
	                                     	<input type="hidden" id="authorities_${status.count }" name="authorities_${status.count }" value="${result.authorities}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="authNm_${status.count }" name="authNm_${status.count }" value="${result.auth_nm}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="rem_${status.count }" name="rem_${status.count }" value="${result.rem}">
	                                     </td>
	                                     <td>
	                                     	<a href="javascript:void(0)" class="" onclick="authMenu('${result.authorities}');">메뉴관리</a>
	                                     	<a href="javascript:void(0)" class="" onclick="dataUpdate('authorities_${status.count }','authNm_${status.count }','rem_${status.count }');">수정</a>
	                                     	<a href="javascript:void(0)" class="" onclick="dataDelete('${result.authorities}');">삭제</a>
	                                     </td>
	                                 </tr>
	                                </c:forEach> 
	                           	</c:when>
	                    	</c:choose>
	                            
	                        <c:if test="${empty resultList}">
	                            <tr bgColor=#ffffff align=center > 
	                                <td colspan="4" >데이터가 존재하지 않습니다.</td>
	                            </tr>
	                        </c:if>
	                        <tr>
			                	<td>
			                		<input type="text" id="iauthorities" name="iauthorities" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="iauthNm" name="iauthNm" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="irem" name="irem" value="">
			                	</td>
			                	<td>
			                		<a href="#"  onclick="dataInsert();">
                                       	등록</a>
			                	</td>
			                </tr>
	                            
	                    </tbody>
	                </table>
	            </div>
	        </div>
	    </div>
    </section>
    
    <footer>
       	<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
    <!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/authList.js' />"></script>
    
</body>
</html>
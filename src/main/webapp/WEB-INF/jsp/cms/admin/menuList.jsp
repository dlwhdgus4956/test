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
                <h3>메뉴 관리</h3>
	            
	            <div class="tbl_wrap">
	                <table class="board_list mt30 mb20">
	                    <caption>목록</caption>
	                    <colgroup>
	                        <col style="width:17%">
	                        <col style="width:17%">
	                        <col style="width:20%">
	                        <col style="width:16%">
	                        <col style="width:17%">
	                        <col style="width:10%">
	                    </colgroup>
	                    <thead>
	                        <tr>
	                            <th scope="col">메뉴코드</th>
	                            <th scope="col">메뉴명</th>
	                            <th scope="col">메뉴URL</th>
	                            <th scope="col">1차상위메뉴</th>
	                            <th scope="col">2차상위메뉴</th>
	                            <th scope="col">관리버튼</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        
	                        <c:choose>
	                           	<c:when test="${not empty resultList}">
	                           		<c:forEach var="result" items="${resultList}" varStatus="status">
	                                 <tr>
	                                     <td>
	                                     	<input type="text" id="menuCode_${status.count }" name="menuCode_${status.count }" value="${result.menu_code}">
	                                     	<input type="hidden" id="menuCode2_${status.count }" name="menuCode2_${status.count }" value="${result.menu_code}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="menuNm_${status.count }" name="menuNm_${status.count }" value="${result.menu_nm}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="menuUrl_${status.count }" name="menuUrl_${status.count }" value="${result.menu_url}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="upperMenuCode_${status.count }" name="upperMenuCode_${status.count }" value="${result.upper_menu_code}">
	                                     </td>
	                                     <td>
	                                     	<input type="text" id="upperMenuCode2_${status.count }" name="upperMenuCode2_${status.count }" value="${result.upper_menu_code2}">
	                                     </td>
	                                     <td>
	                                     	<a href="javascript:void(0)" class="" onclick="dataUpdate('menuCode2_${status.count }','menuCode_${status.count }','menuNm_${status.count }','menuUrl_${status.count }','upperMenuCode_${status.count }','upperMenuCode2_${status.count }');">수정</a>
	                                     	<a href="javascript:void(0)" class="" onclick="dataDelete('${result.menu_code}');">삭제</a>
	                                     </td>
	                                 </tr>
	                                </c:forEach> 
	                           	</c:when>
	                    	</c:choose>
	                            
	                        <c:if test="${empty resultList}">
	                            <tr bgColor=#ffffff align=center > 
	                                <td colspan="5" >데이터가 존재하지 않습니다.</td>
	                            </tr>
	                        </c:if>
	                        <tr>
			                	<td>
			                		<input type="text" id="imenuCode" name="imenuCode" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="imenuNm" name="imenuNm" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="imenuUrl" name="imenuUrl" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="iupperMenuCode" name="iupperMenuCode" value="">
			                	</td>
			                	<td>
			                		<input type="text" id="iupperMenuCode2" name="iupperMenuCode2" value="">
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
	<script type="text/javascript" src="<c:url value='/js/cms/admin/menuList.js' />"></script>
    
</body>
</html>
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
            
				<input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" />
               	<input type="hidden" id="auth" name="auth" value="${resultAuthNm[0].authorities}">

                <nav class="location">
                    <ul>
                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
                        <li><a href="#">네비1</a></li>
                        <li><a href="#">네비2</a></li>
                        <li><a href="#">네비3</a></li>
                    </ul>
                </nav>
                <h3>[<c:out value="${resultAuthNm[0].auth_nm}"/>]권한 메뉴 관리</h3>

	            <div class="tbl_wrap">
	                <table class="board_list mt30 mb20">
	                    <caption>목록</caption>
	                    <colgroup>
	                        <col style="width:25%">
	                        <col style="width:25%">
	                        <col style="width:20%">
	                        <col style="width:15%">
	                        <col style="width:15%">
	                    </colgroup>
	                    <thead>
	                        <tr>
	                            <th scope="col">1차메뉴</th>
	                            <th scope="col">2차메뉴</th>
	                            <th scope="col">권한등록일</th>
	                            <th scope="col">메뉴 사용여부</th>
	                            <th scope="col">메뉴관리버튼</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        <c:set var="rowNumber" value="${ totalCount  - ( 10 * ( currentPage - 1 ) ) }"/>
	                        <c:forEach var="result" items="${resultList}" varStatus="status">
	                            <tr>
	                        	<c:set var="upperString" value="${result.all_menu_code}"/>
	                        	<c:set var="upperSubstr" value="${fn:substring(upperString,2,5) }"/>
	                        	
	                        		<!-- 1차메뉴 -->
	                            	<td>
	                            		<c:if test="${upperSubstr eq '000'}">
		                                 	<c:out value="${result.menu_nm}" />
		                                 </c:if>	
	                                </td>
	                              	<!-- 2차메뉴 -->
	                                <td>
	                                	<c:if test="${upperSubstr ne '000'}">
	                                 		<c:out value="${result.menu_nm}" />
	                                	</c:if>
	                                </td>
	                                <td>
										<fmt:parseDate value='${result.reg_date}' var='ymd1' pattern='yyyymmdd'/>
										<fmt:formatDate value="${ymd1}" pattern="yyyy-mm-dd"/>		
	                            	</td>
	                                <td>
	                                	<!-- 기존 메뉴사용여부 -->
	                                	<c:if test="${result.menu_code ne null}">
	                                		<input type="hidden" id="oldVal${status.count}" name="oldVal${status.count}" value="Y">
	                                	</c:if>
	                                	<c:if test="${result.menu_code eq null}">
	                                		<input type="hidden" id="oldVal${status.count}" name="oldVal${status.count}" value="N">
	                                	</c:if>
	                                	
	                                	<select name="useYn${status.count}" id="useYn${status.count}" class="btn wid120">
			                              	<option value="N" <c:if test="${result.menu_code == '' }">selected</c:if>>N</option>
			                              	<option value="Y" <c:if test="${result.menu_code > 0 && result.authorities == params.auth}">selected</c:if>>Y</option>
		                              	</select>
	                                </td>
	                                <td>
	                                	<a href="javascript:void(0)" class="" onclick="fn_update('${result.all_menu_code}', '${status.count}')">수정</a>
	                                </td>
	                                
	                            </tr>
	                        </c:forEach>
	                            
	                    </tbody>
	                </table>
	                
	                <div class="btn_wrap right mb40">
	                    <a href="javascript:void(0)" class="" onClick="fn_backList();">목록</a>
	                </div>
	                
	            </div>
	        </div>
	    </div>
    </section>
    
    <footer>
       	<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
    <!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/authMenuList.js' />"></script>
    
</body>
</html>
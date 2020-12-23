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
</head>
<body>
    <div class="wrap">
    	<header2>
        	<%@include file="/WEB-INF/jsp/cms/layout/header_admin.jsp"%>
        </header2>
       
        <section>
            <div class="container wrap">
            
                <%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>
                
                <div class="cont">
                	<nav class="location">
	                    <ul>
	                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a> > </li>
	                        <li><a href="#">네비1</a> > </li>
	                        <li><a href="#">네비2</a> > </li>
	                        <li><a href="#">네비3</a> > </li>
	                    </ul>
	                </nav>
                    <div class="cont_tit">
                        <h3>권한그룹 관리</h3>
                    </div>
                    <div class="cont_box">
                    <form id="searchFrm" name="searchFrm" method="post" >
                	<%-- <input type="hidden" id="currentPage" name="currentPage" value="${currentPage}"> --%>
                	<input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" />
                	
                        <div class="tbl_wrap">
                            <table class="board_list mt30 mb20">
                                <colgroup>
                                    <col style="width:20%;">
                                    <col style="width:20%;">
                                    <col style="width:25%;">
                                    <col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>그룹코드</th>
                                        <th>그룹명</th>
                                        <th>설명</th>
                                        <th>수정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <%-- <c:set var="rowNumber" value="${ totalCount  - ( 10 * ( currentPage - 1 ) ) }"/> --%>
                                <c:forEach var="result" items="${resultList}" varStatus="status">
                                    <tr>
                                        <td><c:out value="${result.g_code}" /></td>
                                        <td><input type="text" id="gname_${status.count }" name="gname_${status.count }" value="${result.g_name}"></td>
                                        <td>
                                        	<input type="text" class="btn wid150" id="description_${status.count }" name="description_${status.count }" value="${result.description}">
                                        </td>
                                        <td>
                                        	<a href="#" class="btn_s btn_blue" onclick="javascript:view('${result.g_code}');">
                                        	상세</a>
                                        	<a href="#" class="btn_s btn_green" onclick="javascript:dataUpdate('${result.gid}','gname_${status.count }','description_${status.count }');">
                                        	수정</a>
                                        	<a href="#" class="btn_s btn_gray" onclick="javascript:dataDelete('${result.gid}');">
                                        	삭제</a>
                                        	
                                        </td>
                                    </tr>
                                </c:forEach>  
                                <c:if test="${empty resultList}">
				                    <tr bgColor="#ffffff" align="center"> 
				                        <td colspan="5">데이터가 존재하지 않습니다.</td>
				                    </tr>
				                </c:if>    
				                <tr>
				                	<td>
				                		<input type="text" id="igcode" name="icode" value="">
				                	</td>
				                	<td>
				                		<input type="text" id="igname" name="igname" value="">
				                	</td>
				                	<td>
				                		<input type="text" id="idescription" name="idescription" value="">
				                	</td>
				                	<td>
				                		<a href="#" class="btn_s btn_blue" onclick="javascript:dataInsert();">
                                        	등록</a>
				                	</td>
				                </tr>
                                </tbody>
                            </table>
                        </div>


                                <!--페이징  -->
                                <%-- <c:if test="${not empty resultList}">
                                    <c:out value="${pagingHtml}" escapeXml="false" />
                                </c:if>    --%>                     
                    </form>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div class="ft_top">
                <%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
            </div>
        </footer>
    </div>
</body>
</html>
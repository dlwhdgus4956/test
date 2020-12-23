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
            <form name="searchFrm" id="searchFrm"  method="post" >
            <input type="hidden" id="currentPage" name="currentPage" value="${currentPage}">
				<input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" />
	                <nav class="location">
	                    <ul>
	                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
	                        <li><a href="#">네비1</a></li>
	                        <li><a href="#">네비2</a></li>
	                        <li><a href="#">네비3</a></li>
	                    </ul>
	                </nav>
	                <h3>접속현황로그</h3>
	                <h4>검색조건</h4>
	                <div class="search_box">
	                    <div class="search_opt">
	                        <div class="search">
	                            <label for="searchtype">검색</label>
	                            <select name="searchtype" id="searchtype">
	                                <option value="">전체검색</option>
	                                <option value="1" <c:if test="${params.searchtype == '1' }">selected="selected"</c:if>>아이디</option>
	                                <option value="2" <c:if test="${params.searchtype == '2' }">selected="selected"</c:if>>사용자명</option>
	                            </select>
	                            <input type="text" id="searchkeyword" name="searchkeyword" value="${params.searchkeyword}" >
	                        </div>
	                    </div>
	                    
	                    <div class="search_btn">
	                        <a href="javascript:void(0)" onclick="goList(1);" class="btn btn_gray"><em class="ico_search"></em>검색</a>
	                    </div>
	                </div>
                </form>

                <div class="tbl_wrap">
                    <table class="board_list mt30 mb20">
                        <caption>목록</caption>
                        <colgroup>
                            <col style="width:10%">
                            <col style="width:15%">
                            <col style="width:15%">
                            <col style="width:">
                            <col style="width:15%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">아이디</th>
                                <th scope="col">사용자명</th>
                                <th scope="col">접속IP</th>
                                <th scope="col">접속일</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <c:choose>
                                	<c:when test="${not empty resultList}">
                                		<c:set var="rowNumber" value="${ totalCount  - ( 10 * ( currentPage - 1 ) ) }"/>
                                		<c:forEach var="result" items="${resultList}" varStatus="status">
		                                    <tr>
		                                        <td><c:out value="${(rowNumber)-status.count +1}" /></td>
		                                        <td><c:out value="${result.user_id}" /></td>
		                                        <td><c:out value="${result.user_nm}" /></td>
		                                        <td><c:out value="${result.user_ip}" /></td>
		                                        <td>
		                                        	<fmt:parseDate value="${result.connect_date}" var="dateFmt" pattern="yyyyMMdd"/>
	                                       			<fmt:formatDate value="${dateFmt}" type="both" pattern="yyyy-MM-dd"/>
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
                        </tbody>
                    </table>
                </div>
               
                <br>
				<p>검색결과: <fmt:formatNumber value="${totalCount}" pattern="#,###"/>건</p>
				
				<div class="pagelist">
					<c:if test="${not empty resultList}">
	                   <c:out value="${pagingHtml}" escapeXml="false" />
	               </c:if> 
				</div>
               
                <div class="btn_wrap right mb40">
                    <!-- <a href="javascript:void(0)" class="btn btn_gray" onclick="addPage();">등록</a> -->
                    <!-- <a href="javascript:void(0)" class="btn btn_green">버튼2</a>
                    <a href="javascript:void(0)" class="btn btn_blue"><em class="ico_down"></em>버튼3</a> -->
                </div>
                
            </div>
        </div>
    </section>
    
    <footer>
       	<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
    <!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/logSttusList.js' />"></script>
    
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.util.UrlPathHelper"%>    
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="org.springframework.web.util.UrlPathHelper"%>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0.1,maximum-scale=1.0,user-scalable=yes" />
    <title>title</title>

	<!-- jQuery  -->
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.js'/>"></script>
	
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/openYard/reqView.js' />"></script>
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/font.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/common.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/board.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/content.css'/>" media="all" />
    
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/jquery/jquery-ui.css'/>">
	
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/fileUtils.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/commonUtils.js' />"></script>

</head>
<body>

    <header>
        <%@include file="/WEB-INF/jsp/cms/layout/header.jsp"%>
    </header>
    
    <section>
        <div class="container">
            <%@include file="/WEB-INF/jsp/cms/layout/leftMenu_contents.jsp"%>
            <div class="cont">
                <nav class="location">
                    <ul>
                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
                        <li><a href="#">네비1</a></li>
                        <li><a href="#">네비2</a></li>
                        <li><a href="#">네비3</a></li>
                    </ul>
                </nav>
                
                <form id="searchForm" name="searchForm" method="post">
					<input type="hidden" id="currentPage" name="currentPage" value="${params.currentPage}">
					<input type="hidden" id="searchKeyword" name="searchKeyword" value="${params.searchKeyword}">
					<input type="hidden" id="searchType" name="searchType" value="${params.searchType}">
				</form>
				
                <h3>요청게시판 조회</h3>
                <form name="insertForm" id="insertForm"  method="post" enctype="multipart/form-data">
				<input type="hidden" id="reqNo" name="reqNo" value="${result.req_no}" readonly="readonly"/>
				<%-- <input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" /> --%>

                <div class="tbl_wrap">
                    <table class="board_write mt30 mb20">
                        <caption>수정</caption>
                        <colgroup>
                            <col style="width:20%">
                            <col style="width:">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td><c:out value="${result.title}" /></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                	<textarea readonly cols=60  rows=10 style='border:0; width:100%; overflow-x:hidden; overflow-y:auto; resize: none;'><c:out value="${result.content}"/></textarea>
                                </td>
                            </tr>
                            <tr>
	                            	<th>첨부파일</th>
									<c:if test="${not empty result.file_no}">
				                        <td colspan='3' onclick="fileDownLoad('${result.file_no}')" style="cursor:pointer; text-align:left;">
				                        	<strong><c:out value="${result.file_org_nm}"/></strong>
				                        </td>
			                        </c:if>
			                        <c:if test="${empty result.file_no}">
				                        <td colspan='3' style="text-align:left;">
				                      	  <c:out value="등록된 파일이 존재하지 않습니다"/>
				                        </td>
			                        </c:if>
	                            </tr>
                        </tbody>
                    </table>
                </div>
               
                <div class="btn_wrap right mb40">
                	<sec:authentication property="principal.username" var="loginId"/>
                	<c:if test="${result.writer == loginId}">
                    	<a href="javascript:void(0)" class="btn btn_blue" onClick="updatePage('${result.req_no}');">수정</a>
                    </c:if>
                    <a href="javascript:void(0)" class="btn btn_green" onClick="fn_list();">목록</a>
                </div>
                
                </form>
            </div>
        </div>
    </section>
    
    <footer>
		<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
</body>
</html>
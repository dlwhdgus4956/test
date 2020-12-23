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
                
                <form id="searchForm" name="searchForm" method="post">
					<input type="hidden" id="currentPage" name="currentPage" value="${params.currentPage}">
					<input type="hidden" id="searchKeyword" name="searchKeyword" value="${params.searchKeyword}">
					<input type="hidden" id="searchType" name="searchType" value="${params.searchType}">
				</form>
				
                <h3>요청게시판등록</h3>
                <form name="insertForm" id="insertForm"  method="post" enctype="multipart/form-data">
				
				<%-- <input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" /> --%>

                <div class="tbl_wrap">
                    <table class="board_write mt30 mb20">
                        <caption>등록</caption>
                        <colgroup>
                            <col style="width:20%">
                            <col style="width:">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" name="title" id="title" value=""/></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                	<textarea name="content" id="content" cols="40" rows="8" style="width:100%; resize: none;"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>파일업로드</th>
	                            <td><input type="file" id="uploadFile" name="uploadFile"  multiple/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
               
                <div class="btn_wrap right mb40">
                	<!-- <button type="submit">가입하기</button> -->
                    <a href="javascript:void(0)" class="btn btn_blue" onClick="fn_add();">확인</a>
                    <a href="javascript:void(0)" class="btn btn_green" onClick="fn_list();">목록</a>
                </div>
                
                </form>
            </div>
        </div>
    </section>
    
    <footer>
		<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/reqInsert.js' />"></script>
    
</body>
</html>
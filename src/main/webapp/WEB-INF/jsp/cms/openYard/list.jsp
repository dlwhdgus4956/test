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

	<header>
        <%@include file="/WEB-INF/jsp/cms/layout/header.jsp"%>
    </header>
    
    <section>
        <div class="container">
	       	<%-- <div class="lnb">
			    <h2>테스트메뉴</h2>
			    <ul>
			       	<c:forEach var="resultList" items="${leftMenuObj}" varStatus="status">
						<li><a href="javascript:void(0)" onclick="fn_menu('${resultList.menu_url}')"><c:out value="${resultList.menu_nm}"></c:out></a></li>
					</c:forEach>
			    </ul>
			</div> --%>
			<%@include file="/WEB-INF/jsp/cms/layout/leftMenu_contents.jsp"%>
	       	
	   		       
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
	                <h3>리스트</h3>
	                <h4>검색조건</h4>
	                <div class="search_box">
	                
	                    <div class="search_opt">
	                        <div class="search">
	                            <label for="searchtype">검색</label>
	                            <select name="searchtype" id="searchtype">
	                                <option value="">전체검색</option>
	                                <option value="1" <c:if test="${params.searchtype == '1' }">selected="selected"</c:if>>검색조건1</option>
	                                <option value="2" <c:if test="${params.searchtype == '2' }">selected="selected"</c:if>>검색조건2</option>
	                            </select>
	                            <input type="text" id="searchkeyword" name="searchkeyword" value="${params.searchkeyword}" >
	                        </div>
	                    </div>
	                    
	                    <div class="search_btn">
	                        <a href="javascript:void(0)" onclick="" class="">검색버튼</a>
	                    </div>
	                    
	                </div>
	                
				</form>
	
				<div class="tbl_wrap">
					<!-- 본문영역 -->
					<h3>열린마당본문</h3>
				</div>
	               
	            <div class="btn_wrap right mb40">
	               	<a href="javascript:void(0)" onclick="">버튼1</a>
	               	<a href="javascript:void(0)" onclick="">버튼2</a>
	            </div>
	            
	        </div>
    	</div>
    </section>
    
    <footer>
		<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
	<!-- js File import -->
	<%-- <script type="text/javascript" src="<c:url value='/js/gbgwis/cmmn/ ' />"></script> --%>
    
</body>
</html>
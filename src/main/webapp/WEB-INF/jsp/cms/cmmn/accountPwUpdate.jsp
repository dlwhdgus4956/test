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
    <header>
        <%@include file="/WEB-INF/jsp/cms/layout/header.jsp"%>
    </header>
    
    <section>
        <div class="container">
            <%@include file="/WEB-INF/jsp/cms/layout/leftMenu_account.jsp"%>
            <div class="cont">
                <nav class="location">
                    <ul>
                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
                        <li><a href="#">네비1</a></li>
                        <li><a href="#">네비2</a></li>
                        <li><a href="#">네비3</a></li>
                    </ul>
                </nav>
                <h3>비밀번호 수정</h3>
                
                <form name="insertForm" id="insertForm"  method="post" >
				<input type="hidden" name="authorities" id="authorities" value="${result.authorities}" />
				
				<%-- <input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" /> --%>

	                <div class="tbl_wrap">
	                    <table class="board_write mt30 mb20">
	                        <caption>비밀번호 수정</caption>
	                        <colgroup>
	                            <col style="width:15%">
	                            <col style="width:">
	                        </colgroup>
	                        <tbody>
	                            <tr>
	                                <th>아이디</th>
	                                <td><input type="text" name="userId" id="userId" value="${result.user_id}" readonly/></td>
	                            </tr>
	                        	<tr>
									<th><span>*</span>현재 비밀번호</th>
									<td><input type="password" name="cpassword" id="cpassword" value="" /></td>
								</tr>
	                            <tr>
	                                <th><span>*</span>새 비밀번호</th>
	                                <td><input type="password" name="password" id="password"/></td>
	                            </tr>
	                            <tr>
	                                <th><span>*</span>새 비밀번호확인</th>
	                                <td><input type="password" name="password2" id="password2"/></td>
	                            </tr>
	                            
	                        </tbody>
	                    </table>
	                </div>
	               
	                <div class="btn_wrap right mb40">
	                	<!-- <button type="submit">가입하기</button> -->
	                    <a href="javascript:void(0)" class="btn btn_blue" onClick="pwCheck();">수정</a>
	                    <a href="javascript:void(0)" class="btn btn_green" onClick="goMain();">돌아가기</a>
	                </div>
                
                </form>
            </div>
        </div>
    </section>
    
    <footer>
       <%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
    <!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/accountUpdatePw.js' />"></script>
</body>
</html>
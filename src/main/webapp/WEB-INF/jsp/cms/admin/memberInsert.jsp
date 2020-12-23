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
                <h3>사용자등록</h3>
                <%-- <form name="memberForm" id="memberForm"  method="post" action="/cmmn/signUp.do"> --%>
                <form name="memberForm" id="memberForm"  method="post" >
					<input type="hidden" name="checkId" id="checkId" value="" />
					
					<%-- <input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}" /> --%>
	
	                <div class="tbl_wrap">
	                    <table class="board_write mt30 mb20">
	                        <caption>회원가입 작성 폼</caption>
	                        <colgroup>
	                            <col style="width:15%">
	                            <col style="width:">
	                        </colgroup>
	                        <tbody>
	                            <tr>
	                                <th><span>*</span>아이디</th>
	                                <td><input type="text" name="userId" id="userId"/><a href="#" class="btn_s btn_gray ml5" onclick="javascript:fn_idCheck();">중복확인</a></td>
	                            </tr>
	                            <tr>
	                                <th><span>*</span>이름</th>
	                                <td><input type="text" name="name" id="name"/></td>
	                            </tr>
	                            <tr>
	                                <th><span>*</span>비밀번호</th>
	                                <td><input type="password" name="password" id="password"/></td>
	                            </tr>
	                            <tr>
	                                <th><span>*</span>비밀번호확인</th>
	                                <td><input type="password" name="password2" id="password2"/></td>
	                            </tr>
	                            <tr>
									<th>소속</th>
									<td>
										<select name="dept" id="dept">
											<option value="">선택하십시오.</option>
						                    <option value="1">그룹1</option>
						                    <option value="2">그룹2</option>
						                    <option value="3">그룹3</option>
					                   	</select>
									</td>
								</tr>
	                            <tr>
	                                <th>전화번호</th>
	                                <td>
	                                    <input type="text" name="tel" id="tel"  placeholder="양식) 01012345678" style="width:300px"/>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th><span>*</span>이메일</th>
	                                <td>
	                                    <input type="text" name="email" id="email"  placeholder="양식) example@soda.com" style="width:300px"/>
	                                </td>
	                            </tr>
	                        </tbody>
	                    </table>
	                </div>
	               
	                <div class="btn_wrap right mb40">
	                    <a href="javascript:void(0)" class="" onClick="fn_Submit();">확인</a>
	                    <a href="javascript:void(0)" class="" onClick="fn_list();">목록</a>
	                </div>
                
                </form>
            </div>
        </div>
    </section>
    
    <footer>
		<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/memberInsert.js' />"></script>
    
</body>
</html>
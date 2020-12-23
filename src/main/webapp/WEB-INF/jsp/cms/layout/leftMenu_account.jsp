<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="lnb">
    <h2>계정관리</h2>
    <ul>
        <li><a href="javascript:void(0)" onclick="headerObj.cmmn.account();">개인정보 관리</a></li>
        <li><a href="javascript:void(0)" onclick="headerObj.cmmn.accountPw();">비밀번호 관리</a></li>
    </ul>
</div>

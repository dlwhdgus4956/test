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
	
	<!-- jQuery  -->
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.12.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery/jquery-ui.js'/>"></script>
	
	<!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/header.js' />"></script>
	
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/fileUtils.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/cms/cmmn/commonUtils.js' />"></script>
	
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.bundle.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.bundle.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.js' />"></script>
	<script type="text/javascript" src="<c:url value='/js/chart/Chart.min.js' />"></script>
	
	<!-- css import -->
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/font.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/common.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/layout.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/board.css'/>" media="all" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/cms/content.css'/>" media="all" />
    
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/jquery/jquery-ui.css'/>">
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/chart/Chart.css'/>">
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/chart/Chart.min.css'/>">
	
	<script type="text/javascript">
	$(document).ready(function() {

		var currentIndex = "<c:out value='${index}' />";
	
	    
	    if(currentIndex == "" || currentIndex== "1"  ){
	    	page1.style.display=""; 
            page2.style.display="none"; 
            page3.style.display="none"; 
            
            $("#graph_box").show();
            $("#graph_box2").hide();
            $("#graph_box3").hide();
	        
	    	$("#mmGbn").hide();
	    	$("#schDate").hide();
	        $("select[name=gubun]").val(currentIndex);
	    }else if(currentIndex == "2"){
	    	page1.style.display="none"; 
            page2.style.display=""; 
            page3.style.display="none"; 
            
            $("#graph_box").hide();
            $("#graph_box2").show();
            $("#graph_box3").hide();
	        
	    	$("#schDate").hide();
	        $("select[name=gubun]").val(currentIndex);
	    }else if(currentIndex == "3"){
	    	page1.style.display="none"; 
            page2.style.display="none"; 
            page3.style.display=""; 
            
            $("#graph_box").hide();
            $("#graph_box2").hide();
            $("#graph_box3").show();
	        
	        $("#yyGbn").hide();
	        $("#mmGbn").hide();
	    }
		
	var ctx = document.getElementById('graph_box').getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: [
	        	<c:forEach items="${resultList}" var="entry">
				"${entry.menu_nm}",
				</c:forEach>
	        	],
	    	
	        datasets: [{
	            label: '${yyGbn}년별로그통계',
	            data: [
	            	
	            	<c:forEach items="${resultList}" var="entry">
					${entry.req_url_count},
					</c:forEach>
	            	],
	           
	           
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
	
	
	var ctx2 = document.getElementById('graph_box2').getContext('2d');
	var myChart = new Chart(ctx2, {
	    type: 'bar',
	    data: {
	        labels: [
	        	<c:forEach items="${resultList2}" var="entry">
				"${entry.menu_nm}",
				</c:forEach>
	        	],
	    	
	        datasets: [{
	            label: '${yyGbn}년${mmGbn}월별로그통계',
	            data: [
	            	
	            	<c:forEach items="${resultList2}" var="entry">
					${entry.req_url_count},
					</c:forEach>
	            	],
	           
	           
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
	
	
	var ctx3 = document.getElementById('graph_box3').getContext('2d');
	var myChart = new Chart(ctx3, {
	    type: 'bar',
	    data: {
	        labels: [
	        	<c:forEach items="${resultList3}" var="entry">
				"${entry.menu_nm}",
				</c:forEach>
	        	],
	    	
	        datasets: [{
	            label: '${schFrDate}일별로그통계',
	            data: [
	            	
	            	<c:forEach items="${resultList3}" var="entry">
					${entry.req_url_count},
					</c:forEach>
	            	],
	           
	           
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
	
	
	});
	</script>
</head>
<body>
    <header2>
        <%@include file="/WEB-INF/jsp/cms/layout/header_admin.jsp"%>
    </header2>
    <section>
    	<div class="container">
            
            <%@include file="/WEB-INF/jsp/cms/layout/leftMenu_admin.jsp"%>     
            <div class="cont" id="cont">
            <form name="searchFrm" id="searchFrm"  method="post" >
                <nav class="location">
                    <ul>
                        <li><a href="#"><img src="<c:url value='/images/cms/ico_home.gif'/>" alt=""></a></li>
                        <li><a href="#">네비1</a></li>
                        <li><a href="#">네비2</a></li>
                        <li><a href="#">네비3</a></li>
                    </ul>
                </nav>
                <h3>시스템로그통계</h3>
               
					<!-- <div style="display: block">
	                	<ul style="list-style: none;">
	                	
	                		
	                		<li>
	                			<a href="javascript:void(0)" onclick="headerObj.admin.sysYearStat();"><strong>년별시스템통계</strong></a>
	                		</li>
	                		<li>
	                			<a href="javascript:void(0)" onclick="headerObj.admin.sysMonStat();"><strong>월별시스템통계</strong></a>
	                		</li>
	                		<li>
	                			<a href="javascript:void(0)" onclick="headerObj.admin.sysDayStat();"><strong>일별시스템통계</strong></a>
	                		</li>
	                	</ul>
	                </div> -->
			
                	<h4>검색조건</h4>
	                <div class="search_box">
	                
	                    <div class="search_opt">
	                        <div class="search">
	                        	<span>
                                   <label for="gubun">구분</label>
                                   <select  id="gubun" name="gubun" onchange="displayMenu(this)">
                                       <option value="1" <c:if test="${index == '1'}">selected</c:if>>년도별통계</option>
                                       <option value="2" <c:if test="${index == '2'}">selected</c:if>>월별통계</option>
                                       <option value="3" <c:if test="${index == '3'}">selected</c:if>>일별통계</option>
                                   </select>
                                </span>
                                <span>
	                            <select id="yyGbn" name="yyGbn"  title="시작기간">
		                            <c:forEach items="${yyList}"  var="yyList">
		                                 <option value="${yyList.year }" <c:if test="${yyList.year == yyGbn}">selected</c:if>>${yyList.year }</option>
		                             </c:forEach>
		                        </select>
		                        </span>
		                        <span>
		                        <select id="mmGbn" name="mmGbn"  title="달">
		                        	<option value="01" <c:if test="${01 == mmGbn}">selected</c:if>>1월</option>
		                        	<option value="02" <c:if test="${02 == mmGbn}">selected</c:if>>2월</option>
		                        	<option value="03" <c:if test="${03 == mmGbn}">selected</c:if>>3월</option>
		                        	<option value="04" <c:if test="${04 == mmGbn}">selected</c:if>>4월</option>
		                        	<option value="05" <c:if test="${05 == mmGbn}">selected</c:if>>5월</option>
		                        	<option value="06" <c:if test="${06 == mmGbn}">selected</c:if>>6월</option>
		                        	<option value="07" <c:if test="${07 == mmGbn}">selected</c:if>>7월</option>
		                        	<option value="08" <c:if test="${08 == mmGbn}">selected</c:if>>8월</option>
		                        	<option value="09" <c:if test="${09 == mmGbn}">selected</c:if>>9월</option>
		                        	<option value="10" <c:if test="${10 == mmGbn}">selected</c:if>>10월</option>
		                        	<option value="11" <c:if test="${11 == mmGbn}">selected</c:if>>11월</option>
		                        	<option value="12" <c:if test="${12 == mmGbn}">selected</c:if>>12월</option>
		                        </select>
		                        </span>
		                        <span id="schDate">
			                        <label for="schFrDate">날짜선택</label>
	                            	<input type="text"  id="schFrDate" name="schFrDate" title="시작시간" value="${schFrDate}">
	                        	</span>
	                        </div>
	                    </div>
	                    
	                    <div class="search_btn">
	                        <a href="javascript:void(0)" onclick="goList(1);" class="">검색</a>
	                    </div>
	                    
	                </div>
               </form>
               
               	<div class="tbl_wrap" id="page1">
				    <table class="board_list mt30 mb20">
				        <caption>목록</caption>
					    <colgroup>
					        
					        <col style="width:40%">
					        <col style="width:40%">
					        <col style="width:20%">
					    </colgroup>
					    <thead>
					        <tr>
					            
					            <th scope="col">메뉴URL</th>
					            <th scope="col">메뉴명</th>
					            <th scope="col">메뉴별접속수</th>
					        </tr>
					    </thead>
				   		<tbody>
					        <c:choose>
			            	<c:when test="${not empty resultList}">
		            		
		            		<c:forEach var="result" items="${resultList}" varStatus="status">
                				<tr >
			                    	
			                      	<td><c:out value="${result.req_url}" /></td>
			                      	<td><c:out value="${result.menu_nm}" /></td>
			                      	<td><c:out value="${result.req_url_count}" /></td>
				                </tr>
				            	</c:forEach> 
				            	</c:when>
				            </c:choose>
				            <c:if test="${empty resultList}">
				                <tr bgColor=#ffffff align=center > 
				                    <td colspan="3" >데이터가 존재하지 않습니다.</td>
				                </tr>
				            </c:if>
				            
				    	</tbody>
					</table>
					
					
				</div>
				
				<div class="tbl_wrap" id="page2">
				    <table class="board_list mt30 mb20">
				        <caption>목록</caption>
					    <colgroup>
					        
					        <col style="width:40%">
					        <col style="width:40%">
					        <col style="width:20%">
					    </colgroup>
					    <thead>
					        <tr>
					            
					            <th scope="col">메뉴URL</th>
					            <th scope="col">메뉴명</th>
					            <th scope="col">메뉴별접속수</th>
					        </tr>
					    </thead>
				   		<tbody>
					        <c:choose>
			            	<c:when test="${not empty resultList2}">
		            		
		            		<c:forEach var="result" items="${resultList2}" varStatus="status">
                				<tr >
			                    	
			                      	<td><c:out value="${result.req_url}" /></td>
			                      	<td><c:out value="${result.menu_nm}" /></td>
			                      	<td><c:out value="${result.req_url_count}" /></td>
				                </tr>
				            	</c:forEach> 
				            	</c:when>
				            </c:choose>
				            <c:if test="${empty resultList}">
				                <tr bgColor=#ffffff align=center > 
				                    <td colspan="3" >데이터가 존재하지 않습니다.</td>
				                </tr>
				            </c:if>
				            
				    	</tbody>
					</table>
					
					
				</div>
				
				<div class="tbl_wrap" id="page3">
				    <table class="board_list mt30 mb20">
				        <caption>목록</caption>
					    <colgroup>
					        
					        <col style="width:40%">
					        <col style="width:40%">
					        <col style="width:20%">
					    </colgroup>
					    <thead>
					        <tr>
					            
					            <th scope="col">메뉴URL</th>
					            <th scope="col">메뉴명</th>
					            <th scope="col">메뉴별접속수</th>
					        </tr>
					    </thead>
				   		<tbody>
					        <c:choose>
			            	<c:when test="${not empty resultList3}">
		            		
		            		<c:forEach var="result" items="${resultList3}" varStatus="status">
                				<tr >
			                    	
			                      	<td><c:out value="${result.req_url}" /></td>
			                      	<td><c:out value="${result.menu_nm}" /></td>
			                      	<td><c:out value="${result.req_url_count}" /></td>
				                </tr>
				            	</c:forEach> 
				            	</c:when>
				            </c:choose>
				            <c:if test="${empty resultList}">
				                <tr bgColor=#ffffff align=center > 
				                    <td colspan="3" >데이터가 존재하지 않습니다.</td>
				                </tr>
				            </c:if>
				            
				    	</tbody>
					</table>
					
					
				</div>
				
				<canvas id="graph_box" style="heigt:450px;"></canvas>
				<canvas id="graph_box2" style="heigt:450px;"></canvas>
				<canvas id="graph_box3" style="heigt:450px;"></canvas>
				
        	</div>
    	</div>
    </section>
	<footer>
        	<%@include file="/WEB-INF/jsp/cms/layout/footer.jsp"%>
    </footer>
    
    <!-- js File import -->
	<script type="text/javascript" src="<c:url value='/js/cms/admin/allStatList.js' />"></script>
</body>
</html>
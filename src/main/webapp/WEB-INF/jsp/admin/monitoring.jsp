<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="/js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"></script>
<script type="text/javascript" src="/js/gis/ol/ol.js"></script>
<script type="text/javascript" src="/js/cms/cmmn/commonUtils.js"></script>
<script type="text/javascript" src="/js/chart/commChart.js"></script>
<script type="text/javascript" src="/js/map/createMap.js"></script>
<script type="text/javascript" src="/js/admin/monitoring.js"></script>
</head>
<body>
<!-- 시간 -->
<div id="time"></div>
<!-- 지역이름 -->
<div id="site"></div>
<!-- 지도 -->
<div id="map" style="width: 100px; height: 100px;"></div>

<!-- 그래프1 -->
<div id="tab1"> 
	<canvas id="glChart"></canvas>
</div>

<!-- 그래프2 -->
<div id="tab2">
	<canvas id="tempChart"></canvas>
</div>

<!-- 그래프3 -->
<div id="tab3">
	<canvas id="ecChart"></canvas>
</div>


<!-- 바그래프1 -->
<div id="tab4">
	<canvas id="barChart"></canvas>
</div>

<!-- 원그래프1 -->
<div>기능6</div>


<div>기능8</div><!-- 마지막 측정 데이터 -->


<div>기능10</div><!-- 현황판 -->


<div>기능13</div><!-- 통신현황 -->


<div><textarea rows="10" cols="218">로그</textarea></div><!-- 로그 -->

</body>
</html>
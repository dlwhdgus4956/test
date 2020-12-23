<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.util.UrlPathHelper"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/gis/reset.css'/>">
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/gis/gis-layout.css'/>">
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/jquery-ui.css'/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/ol/ol.css'/>" />
    <link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/confirm/jquery-confirm.min.css'/>">
    
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/grid/jquery.dataTables.min.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/grid/buttons.dataTables.min.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/js/gis/confirm/jquery-confirm.min.css'/>">
    
    <script type="text/javascript" src="<c:url value='/js/gis/jquery.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/gis/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/confirm/jquery-confirm.min.js'/>"></script>

	<script type="text/javascript" src="<c:url value='/js/gis/ol/FileSaver.min.js'/>"></script>	
	<script type="text/javascript" src="<c:url value='/js/gis/ol/canvas-toBlob.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/ol/ol.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/ol/ol-ext.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/ol/proj4.js'/>"></script>			 <%-- 좌표변환 --%>
	<script type="text/javascript" src="<c:url value='/js/gis/ol/OLSData.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/ol/OLSMap.js'/>"></script>

	<script type="text/javascript" src="<c:url value='/js/gis/pagination.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/mapUtil.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/gis/identifyPop.js'/>"></script>
	
	<script type="text/javascript">
		
		var contextRoot = "${pageContext.request.contextPath}";
		var currentMode = 'identify';
		$(document).ready(function() {
				
			/* 지도 초기설정 */
		    map = new ol.Map({
				layers : 
					new ol.layer.Group({
						layers : [ layers['vworld'],  layers['satellite'], layers['hybrid']],
						name : '배경지도'
					}),
				logo : false,
				controls: ol.control.defaults({attribution: false}).extend(
	                 [
	                  	new ol.control.OverviewMap({
	                  		className: 'ol-overviewmap ol-custom-overviewmap',
	                  		collapseLabel: '\u00BB',
	                        label: '\u00AB',
	                        collapsed: false,
							layers : [ layers['vworld'],  layers['satellite'], layers['hybrid']],
							view : new ol.View({
								//extent: maxExtent,
								center: ol.proj.fromLonLat(mapCenter),		// center 좌표
								zoom: 7,									// 초기화면 zoom level
								minZoom: 7,									// 최소 zoom level
								maxZoom: 18									// 최대 zoom level
							})
						})
					]),
				target : 'map',
				pixelRatio : 1,
				loadTilesWhileAnimating : true,
				loadTilesWhileInteracting : true,
				view : new ol.View({	
					//extent: maxExtent,
					center: ol.proj.fromLonLat(mapCenter),			// center 좌표
					zoom: 12,										// 초기화면 zoom level
					minZoom: 12,									// 최소 zoom level
					maxZoom: 19										// 최대 zoom level
				})
			});
		    
		    map.on('moveend', mapZoomHandler);
		    map.on('pointermove', pointerMoveHandler);
		    
		    OLSM = new OLSMLayer(map);
			
			for( var layer in OLSData){
				if (OLSData.hasOwnProperty(layer))
					OLSM.addLayer(layer);
			};
			
			/**
			 *  레이어 목록(그룹)
			 */
			$('#layerswitch').append(buildLayerToc(map.getLayerGroup(), '관측망'));	
			$('#layerswitch').append(buildLayerToc(map.getLayerGroup(), '자연환경'));	
			$('#layerswitch').append(buildLayerToc(map.getLayerGroup(), '기본도'));		
			
			var handle = $("#custom-handle");
		    $(".sliderUI").slider({
		        create: function() {
		            handle.text($(this).slider("value"));
		        },
		        slide: function(event, ui) {
		            handle.text(ui.value);
		       	 	var servicename = $(this).closest('li').attr('id');
		            var layer = findLayer(map.getLayerGroup(), 'name', OLSData[servicename].name);

		            layer.setOpacity(ui.value);
		            map.render();
		        },
		        min : 0.0,
		        max : 1.0,
		        step : 0.1,
		        value : 1.0
		    });
		    
		    $('.lnbtab li a').click(function() {
		        var tab_id = $(this).attr('data-tab');

		        $('.lnbtab li a').removeClass('on');
		        $('.tab-content').removeClass('current');

		        $(this).addClass('on');
		        $("#" + tab_id).addClass('current');
                $(".lnbWrap").addClass("on");
		    });
		    
		    $(".btn_toggle").click(function(){
		        $(".lnbWrap").toggleClass("on");
		    });

		    map.addLayer(layers['result_vector']);
		    map.addLayer(layers['vector']);
		    
		    toolmenu('identifyTool');
		    
		    map.getTargetElement().style.cursor = 'default';
		    $('.ol-zoom').css('display','none');
		    $('.layer').css('height', map.getProperties('height').size[1] - $('.top_menu').css('height'));
		    
		    currentSearchMode = "map01";
		    
		    $('input:radio').click(function(){
		    	$(".search_result").removeClass('on');
		        var radioMapId = $(this).attr('id');
		        switch(radioMapId){
		        	case "map01":
		        		currentSearchMode = "map01";
		        		break;
		        	case "map02":
		        		currentSearchMode = "map02";
		        		break;
		        }
		    });
		    
		    /* 주소검색 버튼 */ 
		    $('.btn_search').click(function(){
		    	goList(1);
		    	switch(currentSearchMode){
			    	case "map01":
			    	case "map02":
			    		
				    	if(!$(".search_result").hasClass('on')){
					    	$(".search_result").addClass('on');
				    	}
			    	break;
			    	
		    	};
		    	switch(currentSearchMode){
			    	case "map01":
			    		search01();
			    		break;
			    	case "map02":
			    		search02();
		    	}
		    })

		    $('#btnExport').click(function(e){
		    	exportTableToExcel('influe_result_cont_tbl');
		    });
		    
		    /* 팝업창 움직이기 옵션  */
			$(".legendContainer").draggable({ handle:'.legend_top'});
			$(".info_box").draggable({ handle:'.info_box_top'});
		  
		    setLysearch();
		    fixContentHeight();
		});
		
		var exportData;
		function searchLayer(tb, col, url, perm_sn){
			$(".lysearch_result").show();
			var url = "<c:url value='/gis/"+url+"'/>";
			$('.lysearch_result_tb').html(tb);
			var exportTable = $('#datatables').DataTable( { 
				"processing": true,
		    	searching: false, 
		    	info: true,
		    	dom: 'Bfrtip',
		        buttons: [
		        	{
		        		extend: 'excelHtml5',
		        		title: '레이어데이터'
		        	}
		        ],
		    	"ajax" : {
		    	    "url": url,
		    	    "type": "POST",
		    	    async: false,
		    	    data : {
		    	    	'permNtNo' : perm_sn
		    	    },
		    	    dataSrc : function (json) {
		                return json.myArrayList;
		            }
		    	},
		    	"pageLength": 10,
		    	"columns": col,
		    	"language" : lang_kor
		    });
			
			exportData = exportTable.buttons.exportData();
		}
		
		//map Settings (zoom, 지도영역 재설정)
		function fixContentHeight(){
		    var viewHeight = $(window).height();
		    var content = $(".MapWrap");
		    var contentHeight = viewHeight - 82 - 48;
		    content.height(contentHeight);
		    map.updateSize();
		    map.setView(new ol.View({
	            //extent: maxExtent,
				center: ol.proj.fromLonLat(mapCenter),			// center 좌표
				zoom: 12,										// 초기화면 zoom level
				minZoom: 12,									// 최소 zoom level
				maxZoom: 19										// 최대 zoom level
	     	}));
		}
		
	    /* 레이어 선택 */
		function setLysearch(){
    		var seloption = "";
    		$.each(search_layer,function(i){
    		    seloption += '<option value="'+search_layer[i]+'">'+search_layer[i]+'</option>'; 
    		});
    		$('#lysearchSc').append(seloption);
		}
		
		/* 검색 - 주소검색 */
		function search01(){
			$('.result01').css('display','block');
			$('.result02').css('display','none');
			$("#start").val(firstRecordIndex);
			$("#end").val(firstRecordIndex+10);

			var query = $(".searchinput").val().replace(/ /g, '');
			query=query==''?"충남 홍성군":query;
			var page = currentPage;
			$.ajax({
				url : "http://dapi.kakao.com/v2/local/search/address.json",
				type : "get",
				beforeSend: function(xhr) {
				    xhr.setRequestHeader("Authorization", "KakaoAK ce2b02429f2cd10befaa71b70585d817");
				},
				data : {
					query : query,
					page : page,
					output : "json"
				},
				success : function(json) {
					var html = "";
					$("#result01Tbody").empty();
					json.documents = $.grep(json.documents, function (el, i) {
						if(el.address_name.indexOf("충남 홍성군") != -1) {
							return true; // keep the element in the array
					    }else{
					    	return false;
					    }
					});
					
					var rt = json.documents;
					if(rt.length>0){
						$.each(rt, function(idx, val) {
							html +='<tr>';
							html +='<td style="text-align:center">' + '<a href="javascript:void(0)" onclick=\'javascript:goMap3("'+val.x+'","'+val.y+'");\'>' +val.address_name+'</a></td>';
							html +='</tr>';								
						});
    					$("#result01Tbody").append(html);
    					setPagination(json.meta.total_count,10);
    					renderPagination();
					}else{
						$("#result01Tbody").empty();
    					$("#pagination").empty();
    					html = '<tr><td style="text-align:center">결과 값이 존재하지 않습니다.</td></tr>';
        				$("#result01Tbody").append(html);
					}
					
				},
				error : function(param1,param2, param3) {
					//alert("실패");
				}
			});
		}
		
		/* 검색 - 지명검색 */
		function search02(){
			$('.result01').css('display','none');
			$('.result02').css('display','block');
			$("#start").val(firstRecordIndex);
			$("#end").val(firstRecordIndex+10);

			var query = $(".searchinput").val().replace(/ /g, '');
			query = query==""?"홍성":query;
			//query = encodeURIComponent(query);
			var page = currentPage;
    		$.ajax({
    			url : "http://api.vworld.kr/req/search?service=search&crs=EPSG:3857&request=search&version=2.0&size=10&type=place&format=json&errorformat=json&key="+searchKey+"&query=" + encodeURI(query) + "&page="+page,	
    			dataType : "jsonp",
    			success : function(res) {
					var html = "";
    				if ("OK" == res.response.status) {
    					var listLength = res.response.result.items.length;
    					$("#result02Tbody").empty();
    					if(listLength == 0){
    						html = '<tr><td style="text-align:center">결과값이 존재하지 않습니다.</td></tr>'
    					}
    					else{
    						for(var i =0; i<listLength; i++){
    							html +='<tr>';
    							html +='<td style="text-align:left">' + '<a href="javascript:void(0)" onclick=\'javascript:goMap7("'+res.response.result.items[i].point.x+'","'+res.response.result.items[i].point.y+'");\'>' +res.response.result.items[i].title+'</a></td>';
    							html +='</tr>';			
    						}
        					$("#result02Tbody").append(html);
        					setPagination(res.response.page.total, 10);
        					renderPagination();
    					}
    				}else{
    					$("#result02Tbody").empty();
    					$("#pagination").empty();
    					html = '<tr><td style="text-align:center">결과값이 존재하지 않습니다.</td></tr>'
        				$("#result02Tbody").append(html);
    					console.log('fail');
    				}
    			}
    		});
		}
		
	</script>
	
</head>
<body>

	<!-- 상단 -->
	<header>
	    <%@include file="/WEB-INF/jsp/cms/layout/header.jsp"%>
	</header>

	<!-- 지도영역 -->
	<div class="map_wrap">
		<div class="MapWrap">
			<div class="con_wrap gis">
			
				<div class="left_bar">
		            <ul class="lnbtab">
		                <li><a href="javascript:void(0)" title="" data-tab="tab-1">지도검색</a>
		                </li>
		                <li><a href="javascript:void(0)" title="" data-tab="tab-2">레이어</a>
		                </li>
		                <li><a href="javascript:void(0)" title="" data-tab="tab-3">배경지도</a>
		                </li>
		            </ul>
		        </div>
		        
		        <div class="lnbWrap">
		            <!--지도검색 컨텐츠-->
		            <div class="mapSearch tab-content current" id="tab-1">
		                <h4>검색조건</h4>
		                <div class="mapSearchcon">
		                    <div class="radio">
		                        <input type="radio" name="map" value="ch01" id="map01" checked="checked">
		                        <label for="map01" class="radio_ch"><span>주소</span></label>
		                        <input type="radio" name="map" value="ch01" id="map02">
		                        <label for="map02" class="radio_ch"><span>지명 및 상호</span></label>
		                    </div>
		                    <input title="검색어 입력" type="text" class="searchinput"><button class="btn_search">조회</button>
						</div>
						
			            <!--지도검색 결과창  *search_result에 클래스 on이 추가되면 보입니다.-->	                
			            <div class="search_result">
			                <h4>검색결과</h4>
			                <div class="result01">
			                	<table>
									<colgroup>
										<col width="100%;">
									</colgroup>
									<thead>
										<tr>
											<th>주소</th>
										</tr>
									</thead>
									<tbody id="result01Tbody">
									</tbody>
								</table>
			                </div>
			                <div class="result02">	
			                	<table>
									<colgroup>
										<col width="100%;">
									</colgroup>
									<thead>
										<tr>
											<th>지명 또는 상호명</th>
										</tr>
									</thead>
									<tbody id="result02Tbody">
									</tbody>
								</table>
			                </div>
			                <div class='gisPaging'>
								<div id="pagination"></div>
								<input type="hidden" id="start" name="start">
								<input type="hidden" id="end" name="end">
							</div>
						</div>
		            </div>
		
		            <!--레이어-->
		            <div class="layerWrap tab-content " id="tab-2">
						<div class="scroll">
			                <ul class="layer">
			                    <li><a href="#">주제도</a>
			                        <ul id='layerswitch'></ul>
			                	</li> 
			                </ul>
			            </div>
		            </div>
		
		            <!--배경지도-->
		            <div class="mapSearch tab-content" id="tab-3">
		                <h4>배경지도</h4>
		                <ul>
		               		<li class="top-menu-bottom"><a href="#" onclick="javascript:baseChange('vworld');">[브이월드]일반지도</a></li>
                            <li class="top-menu-bottom"><a href="#" onclick="javascript:baseChange('satellite');">[브이월드]위성영상</a></li>
                            <li class="top-menu-bottom"><a href="#" onclick="javascript:baseChange('hybrid');">[브이월드]하이브리드</a></li>
		                </ul>
		            </div>
		            
		            <a href="#this" class="btn_toggle">열기</a>
		        </div>
			
				<!-- 지도영역 -->
	            <div id="map" class="Map"></div>
	            
	            <!-- 지도 도구툴 -->
	            <div class="MapTool">
	                <ul>
	                    <li><a href="#" onclick='javascript:toolmenu("identifyTool");'><img src="<c:url value='/images/gis/map_ico01.png'/>" alt="이동"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("zoomInTool");'><img src="<c:url value='/images/gis/map_ico02.png'/>" alt="확대"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("zoomOutTool");'><img src="<c:url value='/images/gis/map_ico03.png'/>" alt="축소"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("preViewTool");'><img src="<c:url value='/images/gis/map_ico04.png'/>" alt="이전보기"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("nextViewTool");'><img src="<c:url value='/images/gis/map_ico05.png'/>" alt="이후보기"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("fullExtentTool");'><img src="<c:url value='/images/gis/map_ico06.png'/>" alt="전체보기"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("lineMeasureTool");'><img src="<c:url value='/images/gis/map_ico07.png'/>" alt="거리계산"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("areaMeasureTool");'><img src="<c:url value='/images/gis/map_ico08.png'/>" alt="면적계산"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("circleMeasureTool");'><img src="<c:url value='/images/gis/map_ico09.png'/>" alt="반경계산"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("clearTool");'><img src="<c:url value='/images/gis/map_ico10.png'/>" alt="초기화"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("imageSaveTool");'><img src="<c:url value='/images/gis/map_ico12.png'/>" alt="이미지저장"></a></li>
	                    <li><a href="#" onclick='javascript:toolmenu("printTool");'><img src="<c:url value='/images/gis/map_ico13.png'/>" alt="인쇄"></a></li>
	                    <%-- <li><a href="#" onclick='javascript:toolmenu("lonlatTool");'><img src="<c:url value='/images/gis/map_ico14.png'/>" alt="좌표변환"></a></li> --%>
	                </ul>
	            </div>
	            
	            <!-- 범례 팝업창 -->
	            <div class="legendContainer">
		            <div class="legend_top">
		                <h4>범례</h4>	
		                <a href="#" onclick="javascript:$('.legendContainer').fadeOut();">닫기</a>
		            </div>                
		            <div id="legend_cont" class="legend_cont">
		            	<img id='legend' src="" />
		            </div>
		        </div>
		        
		        <!-- 레이어 속성정보창  -->
		        <div class="info_box">
		            <div class="info_box_top">
		                <h4><div id='info_box_title'></div></h4>
		                <a href="#" onclick="javascript:$('.info_box').hide();source.clear();clear_calc();">닫기</a>
		            </div>
		            <div class="info_cont">
		                <table class="info_cont_tbl" summary="속성 정보">
		                    <caption>속성정보</caption>
		                    <colgroup>
		                        <col style="width:15%">
		                        <col style="width:15%">
		                        <col style="width:15%">
		                        <col style="width:15%">
		                    </colgroup>
		                    
		                    <tbody id="info_box_Tbody">
		                    </tbody>
		                    
		                </table>
		            </div>
		        </div>
		        
		        <!-- 프린트 영역 -->
		        <div id="print_wrap" class="print_wrap">
					<div id="print_title_div" class="print_title_div">
						<span id='print_title' class="print_title">대전광역시 지하수통합관리시스템</span>
					</div>
					<div id="print_map" class='print_map'><img id='print_img' src=''/></div>
				</div>
			
			</div>
            
        </div>
	</div>

</body>
</html>
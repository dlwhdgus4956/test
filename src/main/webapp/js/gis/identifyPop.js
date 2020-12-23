var showIdentifyPop = function(features, identifyLayerName){
	switch(identifyLayerName){
		case "국가지하수 관측망":
			natObsInfoPop(features, identifyLayerName);
			break;
		case "수위관측소":
			siteInfoPop(features, identifyLayerName);
			break;
	}
}

var natObsInfoPop = function(features, title){
	$('.info_box').css('display','block');
	$('#info_box_title').html(title);

	var html = "";
	html += "<tr>";
	html += "<th>관측소명</th>";
	html += "<td colspan='3'>" + isEmpty(features[0].getProperties().obsr_nm) + "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<tr>";
	html += "<th>관측정</th>";
	html += "<td>" + isEmpty(features[0].getProperties().obsr) + " </td>";
	html += "<th>표고(m)</th>";
	html += "<td colspan='2'>" + isEmpty(features[0].getProperties().al) + "</td>";	
	html += "</tr>";
	html += "<tr>";
	html += "<th>권역</th>";
	html += "<td>" + isEmpty(features[0].getProperties().dstrct) + "</td>";
	html += "<th>위치</th>";
	html += "<td colspan='2'>" + isEmpty(features[0].getProperties().loc) + " </td>";
	html += "</tr>";
	html += "<tr>";
	html += "<th>설치일자</th>";
	html += "<td>" + isEmpty(features[0].getProperties().instl_date) + "</td>";
	html += "<th>관리기관</th>";
	html += "<td colspan='2'>" + isEmpty(features[0].getProperties().mgc) + " </td>";
	html += "</tr>";
	html += "<tr>";
	html += "<th>관측항목</th>";
	html += "<td colspan='3'>" + isEmpty(features[0].getProperties().obsr_iem) + " </td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td style='text-align:right;' colspan='4'><input type='button' class='btn_style_01' onclick='nationObsrView(" + isEmpty(features[0].getProperties().obsr_no)+ ")' value='관측자료 조회'></td>";
	html += "</tr>";
	$('#info_box_Tbody').html(html);
}

var siteInfoPop = function(features, title){
	$('.info_box').css('display','block');
	$('#info_box_title').html(title);

	var html = "";
	html += "<tr>";
	html += "<th>관측소명</th>";
	html += "<td>" + isEmpty(features[0].getProperties().site_nm) + "</td>";
	html += "<th>관측소형태</th>";
	html += "<td colspan='2'>" + isEmpty(features[0].getProperties().site_form) + " </td>";
	html += "</tr>";
	html += "<tr>";
	html += "<th>운영현황</th>";
	html += "<td colspan='3'>" + isEmpty(features[0].getProperties().site_oper) + "</td>";
	html += "</tr>";
	html += "<th>주소</th>";
	html += "<td colspan='3'>" + isEmpty(features[0].getProperties().site_addr) + " </td>";
	html += "</tr>";
	html += "<tr>";
	html += "<input type='hidden' id='getSiteCode' name='getSiteCode' value='"+isEmpty(features[0].getProperties().site_code)+"'>"
	html += "<input type='hidden' id='getWellCode' name='getWellCode' value='"+isEmpty(features[0].getProperties().well_code)+"'>"
	html += "<td style='text-align:right;' colspan='4'><input type='button' class='btn_style_01' onclick='gwlObsrView()' value='관측자료 조회'></td>";
	html += "</tr>";
	$('#info_box_Tbody').html(html);
}


function getUseCode(code){
	var retStr= "";
	switch(code){
		case "1":
			retStr="생활용";
		break;
		case "2":
			retStr="공업용";
		break;
		case "3":
			retStr="농업용";
		break;
		case "4":
			retStr="기타";
		break;
	}
	return retStr;
}



function getWaterPotaYn(code){
	var retStr= "";
	switch(code){
		case "1":
			retStr="음용";
		break;
		case "0":
			retStr="비음용";
		break;
	}
	return retStr;
}

//팝업창 undefined 체그
function isEmpty(str){
	if(typeof str == "undefined"){
		 return "";
	}else{
		return str;
	}
}

//팝업창 undefined 체그
function isEmptyUseMap(str){
	if(typeof str == "undefined"){
		 return "주소가 없습니다";
	}else{
		return str;
	}
}



//dialog
function showDialog(title, content){
	$.confirm({
		animation: 'none',
		boxWidth: '300px',
	    useBootstrap: false,
	    title: title,
	    content: content,
	    autoClose: '확인|3000',
	    buttons: {
	        "확인": function () { }
	    }
	});
}

//국가지하수관측망 관측자료 조회
function nationObsrView(obsrNo){
	var that = this;
	
	if(confirm("관측자료 조회 하시겠습니까?")){
		
		var getUrl="/obsrvt/nation/obsrList.do?searchType="+obsrNo;
		
		fn_wrapLoading();
		document.location.href = getUrl;
	}
}

//수위관측소 관측자료 조회
function gwlObsrView(){
	var that = this;
	
	var siteCode = $("#getSiteCode").val();
	var wellCode = $("#getWellCode").val();
	
	if(confirm("관측자료 조회 하시겠습니까?")){
		
		var getUrl="/obsr/gwl/obsrList.do?wellCode="+wellCode+"&siteCode="+siteCode;
		fn_wrapLoading();
		document.location.href = getUrl;
	}
}

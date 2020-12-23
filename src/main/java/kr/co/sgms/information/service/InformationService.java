package kr.co.sgms.information.service;

import java.util.HashMap;
import java.util.List;

public interface InformationService {
	
	//관정 목록 가지고오기
	public List<HashMap<String, Object>> selectLocationList(HashMap<String, Object> param);
	
	//관정목록 및 최신데이터 조회
	public List<HashMap<String, Object>> selectSpotList(HashMap<String, Object> param);
	
	//좌표값 가지고 오기 
	public List<HashMap<String, Object>> selectPoint(HashMap<String, Object> param);
	
	//관정 상세보기
	public HashMap<String, Object> selectSpotDetail(String siteCode);
	
	//관정 및 장비정보
	public HashMap<String, Object> selectDeviceSite(String siteCode);
	public List<HashMap<String, Object>> selectDeviceSensor(String siteCode);
	public HashMap<String, Object> selectDeviceRtu(String siteCode);
	public HashMap<String, Object> selectDeviceModem(String siteCode);
}

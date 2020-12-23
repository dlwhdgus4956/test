package kr.co.sgms.information.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import kr.co.sgms.information.service.InformationService;

@Service("informationService")
public class InformationServiceImpl implements InformationService{

	@Resource(name="informationMapper")
	private InformationMapper informationMapper;
	
	@Override
	public List<HashMap<String, Object>> selectPoint(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return informationMapper.selectPoint(param);
	}

	@Override
	public List<HashMap<String, Object>> selectLocationList(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return informationMapper.selectLocationList(param);
	}

	@Override
	public List<HashMap<String, Object>> selectSpotList(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return informationMapper.selectSpotList(param);
	}

	@Override
	public HashMap<String, Object> selectSpotDetail(String siteCode) {
		// TODO Auto-generated method stub
		return informationMapper.selectSpotDetail(siteCode);
	}

	@Override
	public HashMap<String, Object> selectDeviceSite(String siteCode) {
		// TODO Auto-generated method stub
		return informationMapper.selectDeviceSite(siteCode);
	}

	@Override
	public List<HashMap<String, Object>> selectDeviceSensor(String siteCode) {
		// TODO Auto-generated method stub
		return informationMapper.selectDeviceSensor(siteCode);
	}

	@Override
	public HashMap<String, Object> selectDeviceRtu(String siteCode) {
		// TODO Auto-generated method stub
		return informationMapper.selectDeviceRtu(siteCode);
	}

	@Override
	public HashMap<String, Object> selectDeviceModem(String siteCode) {
		// TODO Auto-generated method stub
		return informationMapper.selectDeviceModem(siteCode);
	}



}

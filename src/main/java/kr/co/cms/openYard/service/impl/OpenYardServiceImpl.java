package kr.co.cms.openYard.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.cms.openYard.service.OpenYardService;


@Service("openYardService")
public class OpenYardServiceImpl implements OpenYardService {
	
	@Resource(name="openYardMapper")
	private OpenYardMapper openYardMapper;
	
	@Override
   	public List<HashMap<String, Object>> selectNoticeList(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectNoticeList(params);
   	}
	
	public int selectNoticeListCount(HashMap<String, Object> params){
		return openYardMapper.selectNoticeListCount(params);
	}
	
	@Override
   	public HashMap<String, Object> selectNotice(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectNotice(params);
   	}
	
	@Override
   	public List<HashMap<String, Object>> selectRecsroomList(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectRecsroomList(params);
   	}
	
	public int selectRecsroomListCount(HashMap<String, Object> params){
		return openYardMapper.selectRecsroomListCount(params);
	}
	
	@Override
   	public HashMap<String, Object> selectRecsroom(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectRecsroom(params);
   	}	
	
	@Override
   	public List<HashMap<String, Object>> selectReqList(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectReqList(params);
   	}
	
	public int selectReqListCount(HashMap<String, Object> params){
		return openYardMapper.selectReqListCount(params);
	}
	
	@Override
   	public HashMap<String, Object> selectReq(	HashMap<String, Object> params)  {
		
   		return openYardMapper.selectReq(params);
   	}
	
	@Override
	public Integer insertReq(HashMap<String, Object> params) {
		
		Integer rowCount = openYardMapper.insertReq(params);
		return rowCount;
	}

	@Override
	public Integer updateReq(HashMap<String, Object> params) {
		
		Integer rowCount = openYardMapper.updateReq(params);
		return rowCount;
	}

	@Override
	public Integer deleteReq(long reqNo) {
		
		Integer rowCount = openYardMapper.deleteReq(reqNo);
		return rowCount;
	}
	
	@Override
	public Integer deleteReqFile(long reqNo) {
		
		Integer rowCount = openYardMapper.deleteReqFile(reqNo);
		return rowCount;
	}
	

}

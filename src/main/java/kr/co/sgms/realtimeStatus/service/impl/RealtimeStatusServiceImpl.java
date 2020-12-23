package kr.co.sgms.realtimeStatus.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.co.sgms.realtimeStatus.service.RealtimeStatusService;

@Service("realtimeStatusService")
public class RealtimeStatusServiceImpl implements RealtimeStatusService{

	@Resource(name="realtimeStatusMapper")
	private RealtimeStatusMapper realtimeStatusMapper;
	
	@Override
	public List<HashMap<String, Object>> selectRealDataList(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return realtimeStatusMapper.selectRealDataList(param);
	}

}

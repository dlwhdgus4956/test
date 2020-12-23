package kr.co.cms.security.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.cms.cmmn.service.impl.CmmnMapper;
import kr.co.cms.cmmn.service.impl.CmmnServiceImpl;

public class Intercepter extends HandlerInterceptorAdapter {

	/// logger
	private static final Logger LOGGER = LoggerFactory.getLogger(CmmnServiceImpl.class);

	@Resource(name = "cmmnMapper")
	private CmmnMapper cmmnMapper;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		// 객체초기화
		List<HashMap<String, Object>> mainMenuObj = new ArrayList<HashMap<String, Object>>();
		List<HashMap<String, Object>> leftMenuObj = new ArrayList<HashMap<String, Object>>();
		List<HashMap<String, Object>> bestLeftMenuObj = new ArrayList<HashMap<String, Object>>();
		List<HashMap<String, Object>> refuseUrlObj = new ArrayList<HashMap<String, Object>>();

		// 변수초기화
		String getId = "";
		String getAuth = "";
		String getUrl = request.getRequestURI();
		String getUrl2 = request.getRequestURI();

		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();

		if (authentication.getName() != "anonymousUser") {
			getId = authentication.getName();

			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
			Iterator<? extends GrantedAuthority> iter = authorities.iterator();
			while (iter.hasNext()) {
				GrantedAuthority auth = iter.next();
				getAuth = auth.getAuthority();

				HashMap<String, Object> params = new HashMap<String, Object>();

				String[] arr = getUrl2.split("/");
				String subUrl = "/" + arr[1];
				String subUrl2 = (arr.length<=2) ?  "/" + arr[1] : "/" + arr[1] + "/" + arr[2];

				params.put("userId", getId);
				params.put("authorities", getAuth);
				params.put("menuUrl", getUrl);
				params.put("subMenuUrl", subUrl);

				mainMenuObj = cmmnMapper.selectMenu(params);
				leftMenuObj = cmmnMapper.selectLeftMenu(params);
				bestLeftMenuObj = cmmnMapper.selectBestLeftMenu(params); // left대메뉴

				// 메인메뉴
				if (mainMenuObj.size() > 0) {
					request.setAttribute("mainMenuObj", mainMenuObj);
				}

				// 왼쪽메뉴
				if (leftMenuObj.size() > 0) {
					request.setAttribute("leftMenuObj", leftMenuObj);
				}

				// 최상위 왼쪽메뉴
				if (bestLeftMenuObj.size() > 0) {
					request.setAttribute("bestLeftMenuObj", bestLeftMenuObj);
				}

				// 비정상적인 접근방식 막기
				if (!(getUrl.equals("/cmmn/authCheck.do"))) {

					refuseUrlObj = cmmnMapper.selectAcceptAuth(params);
					for (int i = 0, iLen = refuseUrlObj.size(); i < iLen; i++) {
						
						String getRefuseUrl = (String) refuseUrlObj.get(i).get("menu_url");
						if(!getRefuseUrl.equals("")){
							String[] refuseArr = getRefuseUrl.split("/");
							String SetRefuseUrl = "/" + refuseArr[1] + "/" + refuseArr[2];
							
							if (subUrl2.equals(SetRefuseUrl)) {
								response.sendRedirect("/cmmn/accessDenied.do");
								return false;
							}
						}
					}
				}
			}
		}

		return super.preHandle(request, response, handler);
	}
}

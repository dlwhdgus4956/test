<%@page session="false"%> <%@page import="java.net.*,java.io.*,java.util.*" %>
<% 
	HttpURLConnection connection = null; 
	InputStream ristream = null; 
	OutputStream rostream = null; 
	
	try { 
		out.clear(); 
		out = pageContext.pushBody(); 
		if(request.getParameter("resourceUrl") != null && request.getParameter("resourceUrl") != "") { 
			String resourceUrlStr = request.getParameter("resourceUrl");
			
			resourceUrlStr.replace("wms&SERVICE","wms?SERVICE");
			resourceUrlStr.replace("wfs&SERVICE","wfs?SERVICE");
			Enumeration enu = request.getParameterNames(); 
			
			while(enu.hasMoreElements()) { 
				String name = (String)enu.nextElement(); 
				if(name.equalsIgnoreCase("resourceUrl") == false) { 
					resourceUrlStr = resourceUrlStr + "&" + name + "=" + request.getParameter(name); 
				} 
			} 
			resourceUrlStr = resourceUrlStr.replace(" ","%20");
			URL resourceUrl = new URL(resourceUrlStr); 
			
			System.out.println(resourceUrlStr);
			
			connection = (HttpURLConnection)resourceUrl.openConnection(); 
			connection.setDoInput(true); 
			
			connection.setRequestMethod(request.getMethod()); 
			response.setContentType(connection.getContentType()); 
			
			// what's this for 
			out.clear(); 
			out = pageContext.pushBody(); 
			ristream = connection.getInputStream(); 
			rostream = response.getOutputStream(); 
			
			final int length = 20000; 
			byte[] bytes = new byte[length]; 
			int bytesRead = 0; 
			
			while ((bytesRead = ristream.read(bytes, 0, length)) > 0) { 
				rostream.write(bytes, 0, bytesRead); 
			} 
		}else { return; } 
	} catch(FileNotFoundException e) { 
		response.setStatus(500); 
	}  catch(Exception e) { 
		response.setStatus(500); 
	}finally { 
		if(ristream != null) { ristream.close(); } 
		if(rostream != null) { rostream.close(); } 
	} 
%>
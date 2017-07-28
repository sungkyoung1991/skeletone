package skeletone.interceptor;

import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import skeletone.member.MemberVO;

//로그인 체크 interceptor
public class LoginCheckInterceptor extends HandlerInterceptorAdapter{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession(false);
		if(session == null){
			System.out.println("###### 세션정보존재하지않음");
			//request.getRequestDispatcher(request.getContextPath()+"/skeletone/alert/notLoginAlert/").forward(request, response);
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/views/alert/notLoginAlert.jsp");
			dispatcher.include(request, response);
			return false;
		}
		
		MemberVO memberVO = (MemberVO) session.getAttribute("memberVO");
		if(memberVO == null){
			System.out.println("###### memberVO 정보존재하지않음");
			//request.getRequestDispatcher(request.getContextPath()+"/skeletone/alert/notLoginAlert/").forward(request, response);
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/views/alert/notLoginAlert.jsp");
			dispatcher.include(request, response);			
			return false;
		}
 		
		return true;
	}
	
//	@Override
//	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//		System.out.println("postHandle");
//	}
//	
//	
//	@Override
//	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//		System.out.println("afterCompletion");
//}
	
}

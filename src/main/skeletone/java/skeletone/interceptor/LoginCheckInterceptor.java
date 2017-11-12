package skeletone.interceptor;

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
		MemberVO memberVO = (MemberVO) session.getAttribute("memberVO");
		if(session == null || memberVO == null){
			System.out.println("###### 세션 로그인정보존재하지않음");
			//response.sendRedirect("/skeletone/alert/notLoginAlert/");
			RequestDispatcher rd = request.getRequestDispatcher("/skeletone/alert/notLoginAlert/");
            //rd.forward(request, response); // stream closed 에러발생		//https://m.blog.naver.com/PostView.nhn?blogId=skypoly3777&logNo=220761762249&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F
			rd.include(request, response);
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

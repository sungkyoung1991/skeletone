package skeletone.member;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/member/")
public class MemberController {
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	/**
	 * 로그인을 수행하기위한 jsp 호출
	 * @return
	 */
	@RequestMapping(value="login.do", method=RequestMethod.GET)
	public String login(){						
		return "member/login";		
	}
	
	/**
	 * 로그인처리를 위한 process
	 * session에 저장할 객체는 로그인 정보와 같이 명확하게 프로퍼티가 존재해야하는 타입만 VO로 만들어서 관리함 .
	 * 그 이외에는 commandMap을 활용하여 동적으로 binding시킨 프로퍼티를 꺼내어씀
	 * login 성공시 MemberVO 객체를 session에 add 함
	 * @param vo
	 * @param session
	 * @return
	 */
	@RequestMapping(value="login.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> login(MemberVO vo, HttpSession session){		

		Map<String,Object> resMap = new HashMap<String,Object>();
		
		MemberVO memberVO= memberService.getUserInfo(vo);				// 유저정보를 가져온다
		if(memberVO == null){	// 유저정보 없음 .
			resMap.put("resultCode", "E0001");
			resMap.put("msg", "user is not exsist");
			return resMap;
		}
		
		session.setAttribute("memberVO", memberVO);	
		resMap.put("resultCode", "S0001");
		resMap.put("msg", "user exsist. login success");		
		return resMap;
		
	}
	
	/**
	 * 로그아웃 process
	 * 로그아웃시 session 값을 초기화한후 alert 를 띄운후 , 로그인 페이지로 이동한다.
	 * @param session
	 * @return
	 */
	@RequestMapping(value="logout.do")
	public String logout(HttpSession session){
		if (session != null
				|| session.getAttribute("memberVO") != null) {
			session.invalidate();
		}		
		return "alert/logoutAlert";		
	}
}

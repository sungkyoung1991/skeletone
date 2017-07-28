package skeletone.sample;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import common.map.CommandMap;

@Controller
@RequestMapping("/sample/")
public class SampleController {
	
	@Resource(name="sampleService")
	private SampleService sampleService;
	
	//unit test example
	@RequestMapping("example.do")
	@ResponseBody
	public Object example(CommandMap reqMap){
		
		Map<String,Object> cmdMap = (Map<String,Object>)reqMap.getMap();
		//Map<String,Object> queryMap = (Map<String,Object>) sampleService.isDbAlive();

		String name = (String) cmdMap.get("name");
		//String dbMsg = (String)queryMap.get("dbMsg");
		System.out.println(name);
		//System.out.println(dbMsg);
		
		Map<String,Object> resMap = new HashMap<String,Object>();
		resMap.put("name", "jaehunpark");
		return resMap;
	}
	
	
//	pagenation sample	
//	@RequestMapping("intro.do")
//	public String intro(CommandMap commandMap, Model model) throws Exception{
//		Map<String, Object> map = commandMap.getMap();
//		
//		log.info("==========print Map============");
//		log.info(map.toString());
//		
//		if(!map.containsKey("boardNo")){
//			model.addAttribute("name", "boardNo");
//			model.addAttribute("value", "1");
//			model.addAttribute("msg", "게시판이 존재하지 않습니다.");
//			model.addAttribute("url", "/drugsafe/admin/board/intro/");
//			return "/drugsafe/cmm/alertPost";
//		}
//		
//		int totalCount = boardManageService.getBoardTotalCount(map);
//		map.put("totalCount", totalCount);
//		
//		Map<String, Object> boardInfo = boardManageService.getBoardInfo(map);
//		boardInfo.put("totalCount", totalCount);
//		model.addAttribute("boardInfo",boardInfo);
//		
//		Map<String,Object> articleList = boardManageService.getBoardArticles(map);
//		model.addAttribute("articleList",articleList.get("result"));
//		model.addAttribute("paginationInfo",articleList.get("paginationInfo"));
//		
//	    return "/drugsafe/admin/board/intro";
//	}

}

package skeletone;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import skeletone.sample.SampleController;
import skeletone.sample.SampleService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"file:src/main/resources/common/context/context-*.xml",
		"file:src/main/skeletone/resources/skeletone/context/context-*.xml",
		"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml"
		})
@WebAppConfiguration
public class SampleControllerTest {
	@Autowired
	private WebApplicationContext context;
	
	@Mock
	SampleService sampleService;
    
	@InjectMocks
    private SampleController sampleController;
    
    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {

//    	mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    	MockitoAnnotations.initMocks(this);
    	mockMvc = MockMvcBuilders.standaloneSetup(sampleController).build();
    }

    @Test
    public void testSampleController() throws Exception {
    	MockHttpServletRequestBuilder createMessage = get("/sample/example.do") 
    			.param("name", "jaehunpark");
    	mockMvc.perform(createMessage)
    	.andDo(print())
    	.andExpect(status().isOk())
    	.andExpect(jsonPath("$.name").value("jaehunpark"));
    }
}
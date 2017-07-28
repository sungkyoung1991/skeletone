var Browser = { a : navigator.userAgent.toLowerCase() }
Browser = {
  ie : /*@cc_on true || @*/ false,
  ie6 : Browser.a.indexOf('msie 6') != -1,
  ie7 : Browser.a.indexOf('msie 7') != -1,
  ie8 : Browser.a.indexOf('msie 8') != -1,
  opera : !!window.opera,
  safari : Browser.a.indexOf('safari') != -1,
  safari3 : Browser.a.indexOf('applewebkit/5') != -1,
  mac : Browser.a.indexOf('mac') != -1,
  chrome : Browser.a.indexOf('chrome') != -1,
  firefox : Browser.a.indexOf('firefox') != -1
}

// 기본 Zoom
var nowZoom = 100;
// 최대 Zoom
var maxZoom = 200;
// 최소 Zoom
var minZoom = 80;

// 화면크기 확대
var jsBrowseSizeUp = function() {
  if( Browser.chrome ) {
    if( nowZoom < maxZoom ) {
      nowZoom += 10; // 10 = 25%씩 증가
      document.getElementById('con_body').style.zoom = nowZoom + "%";
    } else{
      alert('최대 확대입니다.');
    }
  } else if( Browser.opera ) {
    alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else if( Browser.safari || Browser.safari3 || Browser.mac ) {
    alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else if( Browser.firefox ) {
    alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else {
    if( nowZoom < maxZoom ) {
      nowZoom += 10; //10 = 25%씩 증가
      document.getElementById('con_body').style.position = "relative";
      document.getElementById('con_body').style.zoom = nowZoom + "%";
    } else {
      alert('최대 확대입니다.');
    }
  }
};

// 화면크기 축소
var jsBrowseSizeDown = function() {
  if( Browser.chrome ) {
    if( nowZoom < maxZoom ) {
      nowZoom -= 10; // 10 = 25%씩 증가
      document.getElementById('con_body').style.zoom = nowZoom + "%";
    } else {
      alert('최대 확대입니다.');
    }
  } else if( Browser.opera ) {
    alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else if( Browser.safari || Browser.safari3 || Browser.mac  ) {
    alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else if( Browser.firefox ) {
    alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
  } else {
    if( nowZoom < maxZoom ) {
      nowZoom -= 10; //10 = 25%씩 증가
      document.getElementById('con_body').style.position = "relative";
      document.getElementById('con_body').style.zoom = nowZoom + "%";
    } else {
      alert('최대 축소입니다.');
    }
  }
};

// 화면크기 원래대로(100%)
var jsBrowseSizeDefault = function() {
  nowZoom = 100;
  document.getElementById('content').style.zoom = nowZoom + "%";
};


// 상단 메인메뉴(이미지용)
function displaySub(id) {
	for(i=1 ; i<=7 ; i++) {
		var img = document.getElementById("menu"+i).getElementsByTagName("img").item(0);
		if( img.src.indexOf("_on.") > -1 ) img.src = img.src.replace("_on.png", ".png");

		var sub = document.getElementById("lnb_depth"+i)

		if( sub ) {
			sub.style.display="none"

			var imgTag = sub.getElementsByTagName("img");

			for( var j = 0; j < imgTag.length ; j++ ) {
				var imgName = imgTag[j].src;
				if( imgName.indexOf("_on.") > -1 ) imgTag[j].src = imgName.replace("_on.png",".png");
			}
		}
	}
    //메인메뉴 롤오버 (만약 롤오버 사용안할려면비활성화)
	imgName = document.getElementById("menu"+id).getElementsByTagName("img").item(0).src;
	if( imgName.indexOf("_on.") < 0 ) {
		document.getElementById("menu"+id).getElementsByTagName("img").item(0).src = imgName.replace(".png","_on.png");
	}

    //서브메뉴 롤오버 (만약 롤오버 사용안할려면비활성화)
	if(document.getElementById("lnb_depth"+id)) document.getElementById("lnb_depth"+id).style.display="block";
}


// 탭메뉴1 (class)
function tabMenu(id) {
	for(i=1 ; i<=3 ; i++) {
		var sub = document.getElementById("tabLIst"+i)
		var sub2 = document.getElementById("tab"+i)

		if( sub ) {
			sub.style.display = "none";
			sub2.className = "board_tit";
		}
	}

	//메인메뉴 롤오버 (사용안할시 비활성화)
	var cName = document.getElementById("tab"+id).className;
	if( cName.indexOf(" on") < 0 ) {
		document.getElementById("tab"+id).className = "board_tit on";
	}

    //서브메뉴 롤오버 (사용안할시 비활성화)
	if(document.getElementById("tabLIst"+id)) document.getElementById("tabLIst"+id).style.display="block";
}


// 캘린더메뉴 (class)
function calenderMenu(id) {
	for(i=1 ; i<=5 ; i++) {
		var sub = document.getElementById("calender_area"+i)
		var sub2 = document.getElementById("calender_tab"+i)

		if( sub ) {
			sub.style.display = "none";
			sub2.className = "";
		}
	}

	//메인메뉴 롤오버 (사용안할시 비활성화)
	var cName = document.getElementById("calender_tab"+id).className;
	if( cName.indexOf(" on") < 0 ) {
		document.getElementById("calender_tab"+id).className = "on";
	}

    //서브메뉴 롤오버 (사용안할시 비활성화)
	if(document.getElementById("calender_area"+id)) document.getElementById("calender_area"+id).style.display="block";
}


// 탭메뉴3 (text)
function main_mouseover(data) {
  var obj1 = document.getElementById('tab01');
  var obj2 = document.getElementById('tab02');
  var obj3 = document.getElementById('tab03');
  var obj4 = document.getElementById('tab04');
  var obj1_list = document.getElementById('tab01_list');
  var obj2_list = document.getElementById('tab02_list');
  var obj3_list = document.getElementById('tab03_list');
  var obj4_list = document.getElementById('tab04_list');
  var obj = document.getElementById(data);
  var obj_list = document.getElementById(data+'_list');
  obj1.className = "";
  obj2.className = "";
  obj3.className = "";
  obj4.className = "";
  obj1_list.style.display = "none";
  obj2_list.style.display = "none";
  obj3_list.style.display = "none";
  obj4_list.style.display = "none";
  obj_list.style.display = "block";
  obj.className = "on";
}


// 로그인
function login_ok(){
  if (document.all.m_id.value == "") {
	alert("아이디를 입력해 주세요.");
	document.all.m_id.focus();
	return false;
  }
  if (document.all.m_password.value == "") {
	alert("비밀번호를 입력해 주세요.");
	document.all.m_password.focus();
	return false;
  }
  return true;
}



// 팝업 띄우기
// <a onclick="popup_open('popup.asp','293','300')" title="새창">팝업창</a>
function popup_open(url, width, height) {
  window.open(url, 'popup', 'left=0, top=0, width='+width+', height='+height+', toolbar=no, menubar=no, status=no, scrollbars=auto, resizable=no')
}


// 메인_하단 바로가기 링크(4개)
function select_gogo1() {
  var val = document.selectbox1.site_url1.value;
  window.open(val,'','');
  return false;
}

function select_gogo2() {
  var val = document.selectbox2.site_url2.value;
  window.open(val,'','');
  return false;
}

function select_gogo3() {
  var val = document.selectbox3.site_url3.value;
  window.open(val,'','');
  return false;
}

function select_gogo4() {
  var val = document.selectbox4.site_url4.value;
  window.open(val,'','');
  return false;
}

function select_gogo5() {
  var val = document.selectbox5.site_url5.value;
  window.open(val,'','');
  return false;
}


// 통합검색
function search_resultChk(){
  if (document.search_result.tsearchName.value == "") {
	alert("검색어를 입력해 주세요.");
	document.search_result.tsearchName.focus();
	return false;
  }
  return true;
}


// 메인메뉴
$(document).ready(function(){
    // Global Navigation Bar
    var gMenu = $('.lnb_warp');
    var gItem = gMenu.find('>ul>li');
    var ggItem = gMenu.find('>ul>li>div>ul>li');
    var lastEvent = null;
    gItem.find('>div').hide();
	gItem.filter(':first').addClass('first');
    function gMenuToggle(){
        var t = $(this);
        if (t.next('div').is(':hidden') || t.next('div').length == 0) {
            gItem.find('.lnb_depth').slideUp(200);
            gItem.find('a').removeClass('hover');
            t.next('div').slideDown(200);
            t.addClass('hover');
        };
    };
    function gMenuOut(){
        gItem.find('.lnb_depth').slideUp(200);
        gItem.find('a').removeClass('hover');
    };
    gItem.find('>a').mouseover(gMenuToggle).focus(gMenuToggle);
    $(".lnb_warp").mouseleave(gMenuOut);
	$("#sub_list7 ul li:last-child").focusout(gMenuOut);
});


// 전체메뉴보기
$('.allmenu dt').click(function() {
	if($(this).parent().find("dd").css('display')=='none') {
		$(this).parent().find("dt").addClass("on");
		$(this).parent().find("dd").fadeIn();
	} else {
		$(this).parent().find("dt").removeClass("on");
		$(this).parent().find("dd").fadeOut();
	}
});


// 상단 Translate
$(".lang_more").click(function () {
	 $(".lang_popup").stop().slideToggle();
	 return false;
 });

 $(".lang_more").hover(function () {
	 $(this).stop().css({
		 "cursor": "pointer"
	 })
 });


// placeholder 익스플로러 하위호환
(function ($) {
  $(document).ready(function () {
    $("input, textarea").placeholder();
  });
})(jQuery);


// 컨텐츠 탭메뉴
$(function(){
	$("ul.panel li:not("+$("ul.tab1 li a.on").attr("href")+")").hide()
	$("ul.tab1 li a").click(function(){
		$("ul.tab1 li a").removeClass("on");
		$(this).addClass("on");
		$("ul.panel li").hide();
		$($(this).attr("href")).show();
		return false;
	});
});


// 셀렉트박스 홈페이지 이동
function url_gogo1() {
  var value = document.all.site_url1.value;
  window.open(value);
}

function url_gogo2() {
  var value = document.all.site_url2.value;
  window.open(value);
}


// BX슬라이더 :: 메인_비주얼배너 (사용법 http://wooreeweb.com/lecture/archives/140)
$('.visual_list').after('<div id="pager1"></div>');
$( function () {
	var mySlider_Playing = true;
	var mySlider = $( '.visual_list' ).bxSlider
	({
		mode: 'fade',// 가로 방향 수평 슬라이드
		infiniteLoop: true, //
		speed: 900,        // 이동 속도를 설정
		pause: 5000,       //배너에 머무는 시간
		pager: true,      // 현재 위치 페이징 표시 여부 설정
		pagerSelector: '#pager1',
		auto: true,        // 자동 실행 여부
		autoHover: true,   // 마우스 호버시 정지 여부
		controls: false    // 이전 다음 버튼 노출 여부
	});


   //이전 버튼을 클릭하면 이전 슬라이드로 전환
	$( '.visual_prev' ).on( 'click', function () {
		mySlider.goToPrevSlide();  //이전 슬라이드 배너로 이동
		return false;              //<a>에 링크 차단
	});

   //다음 버튼을 클릭하면 다음 슬라이드로 전환
	$( '.visual_next' ).on( 'click', function () {
		mySlider.goToNextSlide();  //다음 슬라이드 배너로 이동
		return false;
	});

	//자동 슬라이드 전환 기능 정지
	//$( '.visual_stop' ).on( 'click', function () {
	//	mySlider.stopAuto();  //다음 슬라이드 배너로 이동
	//	return false;
	//});popB_play

	$(".visual_stop").on("click", function() {
		var iconImg = $(this).find("img");
		if(mySlider_Playing) {
			mySlider.stopAuto();
			iconImg.attr("src", "../images/main/btn_play2.png");
			iconImg.attr("alt", "배너 재생");
			mySlider_Playing = false;
		}
		else {
			mySlider.startAuto();
			iconImg.attr("src", "../images/main/btn_stop2.png");
			iconImg.attr("alt", "배너 멈추기");
			mySlider_Playing = true;
		}
		return false;
	});

} );


// BX슬라이더 :: 메인_자주찾는 민원
$(document).ready(function(){
  $('.bxslider2').bxSlider({
	mode: 'horizontal', //롤링 방향(horizontal,vertical,fade)
	speed: 900,       //롤링 스피드
	infiniteLoop: true,
	captions: false,  //캡션
	auto: false,      //자동 슬라이드 여부
	autoHover: false, //슬라이드에 마우스 호버시 애니메이션 정지 여부
	pause: 5000,      //배너에 머무는 시간
	pager: false,     //페이징넘버 보이기/감추기
	controls: true,   //prev,next 버튼 보이기/감추기
	autoControls: false,
	minSlides: 9,
    maxSlides: 9,
    slideWidth: 125,
    slideMargin: 0,
	moveSlides: 9 //슬라이드 이동시 개수
	});
});


// BX슬라이더 :: 한눈에 보는 주요 소식
$( function () {
	var mySlider = $( '.bxslider3' ).bxSlider( {
	mode: 'horizontal',// 가로 방향 수평 슬라이드
	infiniteLoop: false, //
	speed: 900,        // 이동 속도를 설정
	pause: 5000,       //배너에 머무는 시간
	pager: true,      // 현재 위치 페이징 표시 여부 설정
		auto: false,        // 자동 실행 여부
	autoHover: true,   // 마우스 호버시 정지 여부
	controls: false
	});

	//자동 슬라이드 전환 기능 정지
	$( '.news_stop' ).on( 'click', function () {
		mySlider.stopAuto();  //다음 슬라이드 배너로 이동
		return false;
	} );

});


// BX슬라이더 :: 메인_하단 롤배너
$( function () {
	var mySlider_Playing = true;
	var mySlider = $( '.bnnr_list' ).bxSlider( {
	mode: 'horizontal', //롤링 방향(horizontal,vertical,fade)
	speed: 900,       //롤링 스피드
	infiniteLoop: false,
	captions: false,  //캡션
	auto: true,       //자동 슬라이드 여부
	autoHover: false, //슬라이드에 마우스 호버시 애니메이션 정지 여부
	pause: 3500,      //배너에 머무는 시간
	pager: false,     //페이징넘버 보이기/감추기
	controls: false,   //prev,next 버튼 보이기/감추기
	autoControls: false,
	minSlides: 5,
    maxSlides: 5,
    slideWidth: 210,
    slideMargin: 10,
	moveSlides: 1 //슬라이드 이동시 개수
	} );

   //이전 버튼을 클릭하면 이전 슬라이드로 전환
	$( '.bnnr_prev' ).on( 'click', function () {
		mySlider.goToPrevSlide();  //이전 슬라이드 배너로 이동
		return false;              //<a>에 링크 차단
	} );

   //다음 버튼을 클릭하면 다음 슬라이드로 전환
	$( '.bnnr_next' ).on( 'click', function () {
		mySlider.goToNextSlide();  //다음 슬라이드 배너로 이동
		return false;
	} );

	$(".bnnr_stop").on("click", function() {
		var iconImg = $(this).find("img");
		if(mySlider_Playing) {
			mySlider.stopAuto();
			iconImg.attr("src", "../images/main/btn_play4.png");
			iconImg.attr("alt", "배너 재생");
			mySlider_Playing = false;
		}
		else {
			mySlider.startAuto();
			iconImg.attr("src", "../images/main/btn_stop4.png");
			iconImg.attr("alt", "배너 멈추기");
			mySlider_Playing = true;
		}
		return false;
	});

} );


// 분야별메뉴-문화관광 갤러리
$(document).ready(function(){
	var mySlider_Playing = true;
	var mySlider = $( '.bxslider5' ).bxSlider( {
	mode: 'fade', //롤링 방향(horizontal,vertical,fade)
	speed: 900,       //롤링 스피드
	infiniteLoop: true,
	captions: false,  //캡션
	auto: true,       //자동 슬라이드 여부
	autoHover: false, //슬라이드에 마우스 호버시 애니메이션 정지 여부
	pause: 5000,      //배너에 머무는 시간
	pager: false,     //페이징넘버 보이기/감추기
	controls: false,   //prev,next 버튼 보이기/감추기
	autoControls: false,
	});

   //이전 버튼을 클릭하면 이전 슬라이드로 전환
	$( '.tour_btn_prev' ).on( 'click', function () {
		mySlider.goToPrevSlide();  //이전 슬라이드 배너로 이동
		return false;              //<a>에 링크 차단
	});

   //다음 버튼을 클릭하면 다음 슬라이드로 전환
	$( '.tour_btn_next' ).on( 'click', function () {
		mySlider.goToNextSlide();  //다음 슬라이드 배너로 이동
		return false;
	});

	$(".tour_btn_stop").on("click", function() {
		var iconImg = $(this).find("img");
		if(mySlider_Playing) {
			mySlider.stopAuto();
			iconImg.attr("src", "../images/common/btn_play1.png");
			iconImg.attr("alt", "갤러리 재생");
			mySlider_Playing = false;
		}
		else {
			mySlider.startAuto();
			iconImg.attr("src", "../images/common/btn_stop1.png");
			iconImg.attr("alt", "갤러리 멈추기");
			mySlider_Playing = true;
		}
		return false;
	});

});



// BX슬라이더 :: 분당구안내-청사안내(본관)
$( function () {
	var mySlider = $( '.bxslider6' ).bxSlider( {
	mode: 'vertical', //롤링 방향(horizontal,vertical,fade)
	speed: 900,       //롤링 스피드
	infiniteLoop: false,
	captions: false,  //캡션
	auto: false,       //자동 슬라이드 여부
	autoHover: false, //슬라이드에 마우스 호버시 애니메이션 정지 여부
	pause: 3500,      //배너에 머무는 시간
	pager: false,     //페이징넘버 보이기/감추기
	controls: false,   //prev,next 버튼 보이기/감추기
	autoControls: false
	});

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov1_1' ).on( 'click', function () {
		mySlider.goToSlide(0);  //0번 슬라이드 배너로 이동(0부터 시작)
		 $('.gotoGov1_1').addClass('on');
		 $('.gotoGov1_2').removeClass('on');
		 $('.gotoGov1_3').removeClass('on');
		 $('.gotoGov1_4').removeClass('on');
		 $('.gotoGov1_5').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov1_2' ).on( 'click', function () {
		mySlider.goToSlide(1);  //1번 슬라이드 배너로 이동
		$('.gotoGov1_1').removeClass('on');
		 $('.gotoGov1_2').addClass('on');
		 $('.gotoGov1_3').removeClass('on');
		 $('.gotoGov1_4').removeClass('on');
		 $('.gotoGov1_5').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov1_3' ).on( 'click', function () {
		mySlider.goToSlide(2);  //2번 슬라이드 배너로 이동
		$('.gotoGov1_1').removeClass('on');
		 $('.gotoGov1_2').removeClass('on');
		 $('.gotoGov1_3').addClass('on');
		 $('.gotoGov1_4').removeClass('on');
		 $('.gotoGov1_5').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov1_4' ).on( 'click', function () {
		mySlider.goToSlide(3);  //3번 슬라이드 배너로 이동
		$('.gotoGov1_1').removeClass('on');
		 $('.gotoGov1_2').removeClass('on');
		 $('.gotoGov1_3').removeClass('on');
		 $('.gotoGov1_4').addClass('on');
		 $('.gotoGov1_5').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov1_5' ).on( 'click', function () {
		mySlider.goToSlide(4);  //4번 슬라이드 배너로 이동
		$('.gotoGov1_1').removeClass('on');
		 $('.gotoGov1_2').removeClass('on');
		 $('.gotoGov1_3').removeClass('on');
		 $('.gotoGov1_4').removeClass('on');
		 $('.gotoGov1_5').addClass('on');
		return false;
	} );
});


// BX슬라이더 :: 구청사안내도 (별관)
$( function () {
	var mySlider = $( '.bxslider7' ).bxSlider( {
	mode: 'vertical', //롤링 방향(horizontal,vertical,fade)
	speed: 900,       //롤링 스피드
	infiniteLoop: false,
	captions: false,  //캡션
	auto: false,       //자동 슬라이드 여부
	autoHover: false, //슬라이드에 마우스 호버시 애니메이션 정지 여부
	pause: 3500,      //배너에 머무는 시간
	pager: false,     //페이징넘버 보이기/감추기
	controls: false,   //prev,next 버튼 보이기/감추기
	autoControls: false
	});

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov2_1' ).on( 'click', function () {
		mySlider.goToSlide(0);  //0번 슬라이드 배너로 이동(0부터 시작)
		 $('.gotoGov2_1').addClass('on');
		 $('.gotoGov2_2').removeClass('on');
		 $('.gotoGov2_3').removeClass('on');
		 $('.gotoGov2_4').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov2_2' ).on( 'click', function () {
		mySlider.goToSlide(1);  //1번 슬라이드 배너로 이동
		$('.gotoGov2_1').removeClass('on');
		 $('.gotoGov2_2').addClass('on');
		 $('.gotoGov2_3').removeClass('on');
		 $('.gotoGov2_4').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov2_3' ).on( 'click', function () {
		mySlider.goToSlide(2);  //2번 슬라이드 배너로 이동
		$('.gotoGov2_1').removeClass('on');
		 $('.gotoGov2_2').removeClass('on');
		 $('.gotoGov2_3').addClass('on');
		 $('.gotoGov2_4').removeClass('on');
		return false;
	} );

	//지정한 [숫자] 슬라이드로 이동
	$( '.gotoGov2_4' ).on( 'click', function () {
		mySlider.goToSlide(3);  //3번 슬라이드 배너로 이동
		$('.gotoGov2_1').removeClass('on');
		 $('.gotoGov2_2').removeClass('on');
		 $('.gotoGov2_3').removeClass('on');
		 $('.gotoGov2_4').addClass('on');
		return false;
	} );

});


// 메인화면 - 수정구민,사업자,관광객 아코디언메뉴
$(function(){
	$("dd.desc:not(:first)").css("display","none");
	$("dt.tit:first").addClass("selected");
	$("dl dt.tit").click(function(){
		if($("+dd.desc",this).css("display")=="none"){
			$("dd.desc").slideUp("fast");
			$("+dd.desc",this).slideDown("fast");
			$("dt.tit").removeClass("selected");
			$(this).addClass("selected");
		}
	}).mouseover(function(){
		$(this).addClass("over");
	}).mouseout(function(){
		$(this).removeClass("over");
	});
});


// 퀵메뉴
$(window).scroll(function(){
   var num = $(this).scrollTop();
   if( num > 220 ){
	  $(".quick").css("position","fixed");
	  $(".quick").css("top","12px");
   }else{
	   $(".quick").css("position","absolute");
	   $(".quick").css("top","0");
   }
});


$(document).ready(function () {

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});


// 프린트
function print_gogo() {
  window.print();
}

// sns 연동
function sns_twitter(title, link) {
  var w = (screen.width-450)/2;
  var h = (screen.height-450)/2;
  var href = "http://twitter.com/share?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(link);
  var a = window.open(href, 'twitter', 'width=450,height=450,left='+w+',top='+h+',scrollbars=0');
  if(a) { a.focus(); }
}

function sns_facebook(title, link) {
  var w = (screen.width-450)/2;
  var h = (screen.height-450)/2;
  var href = "http://www.facebook.com/sharer.php?t="+encodeURIComponent(title)+"&u="+encodeURIComponent(link);
  var a = window.open(href, 'facebook', 'width=626,height=436,left='+w+',top='+h+',toolbar=0,status=0');
  if(a) { a.focus(); }
}


function sns_Me2Day(msg, link, tag) {
  var href = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(msg) + " " + encodeURIComponent(link) + "&new_post[tags]=" + encodeURIComponent(tag);
  var a = window.open(href, 'me2Day', '');
  if (a) { a.focus(); }
}


function sns_YozmDaum(link, prefix, parameter) {
  var href = "http://yozm.daum.net/api/popup/prePost?link=" + encodeURIComponent(link) + "&prefix=" + encodeURIComponent(prefix);
  var a = window.open(href, 'yozm', 'width=466, height=356');
  if (a) { a.focus(); }
}

function sns_kakaotok(message, link) {
  var UserAgent = navigator.userAgent;
  if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
	var ka_appid = encodeURIComponent("m.kakao");
	var ka_appver = encodeURIComponent("1.0.0");
	var ka_msg = encodeURIComponent(message);
	var ka_appurl = encodeURIComponent(link);
	var kakao_link_url = "kakaolink://sendurl?msg=" + ka_msg + "&appid=" + ka_appid + "&url=" + ka_appurl + "&appver=" + ka_appver;
	document.location.href = kakao_link_url;
  } else {
    alert("스마트폰이 아니거나 카카오톡이 설치되어 있지 않습니다.");
    return;
  }
}


// 즐겨찾기
$(document).ready(function() {
    $('#favorite').on('click', function(e) {
        var bookmarkURL = window.location.href;
        var bookmarkTitle = document.title;
        var triggerDefault = false;

        if (window.sidebar && window.sidebar.addPanel) {
            // Firefox version < 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
            // Firefox version >= 23 and Opera Hotlist
            var $this = $(this);
            $this.attr('href', bookmarkURL);
            $this.attr('title', bookmarkTitle);
            $this.attr('rel', 'sidebar');
            $this.off(e);
            triggerDefault = true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // WebKit - Safari/Chrome
            alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
        }

        return triggerDefault;
    });
});


// 주소복사
function UrlLink() {
  var IE = (document.all) ? true : false;
  var URL = location.href;
  if (IE) {
	window.clibboardData.setData('text', URL);
	alert("주소가 복사 되었습니다. Ctrl+V로 붙여 넣기 하세요.");
  } else {
	temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사 하세요.", URL);
  }
}


// 툴팁
$(document).ready(function() {
	$('.tooltip').tooltipster();
});



// 컨텐츠 위로 가기
$(document).ready(function () {
    $('#btn_top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
		$('#go_top1').focus();
        return false;
    });

	$('#btn_top2').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
		$('#go_top1').focus();
        return false;
    });
});


/*단속카메라*/
var k;
var tabNum;
var tabImg;
var tab_img;
var tab_sub;
function showca(str) {
var valid = document.getElementById("ca1");
	if(valid){
		for(k = 1 ; k < 24; k++){
			tabNum = "ca" + k;
			tab_sub = document.getElementById(tabNum);
			tab_sub.style.visibility = "hidden";
			tab_sub.style.position = "absolute";
			tab_sub.style.top = "0px";
			tab_sub.style.right = "0px";
			tabImg = "list_button" + k;
			tab_img = document.getElementById(tabImg);
			if(str == k){
			tab_sub.style.visibility = "visible";
			tab_sub.style.position = "absolute";
			tab_sub.style.top = "-85px";
			tab_sub.style.right = "45px";
			tab_sub.style.background= "url(/images/content/traffic_cctv_bg.gif) 0 0 no-repeat";
			}
		}
	}
}
function showcaoff(str) {
var valid = document.getElementById("ca1");
	if(valid){
		for(k = 1 ; k < 24; k++){
			tabNum = "ca" + k;
			tab_sub = document.getElementById(tabNum);
			tab_sub.style.visibility = "hidden";
			tab_sub.style.position = "absolute";
			tab_sub.style.top = "0px";
			tab_sub.style.right = "0px";
		}
	}
}

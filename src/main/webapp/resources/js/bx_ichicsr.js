//	==============================================================================================
//	PURPOSE : for KIDS E2B
//	CREATE  : 2014.05.15 Created By 3K
//	UPDATE  : 2015.05.23 Updated By 3K
//	DESC    : bx_ichicsh.js
//	NOTICE  : only english can be written.
//	============================================================================================== 
/*
 * 소스 수정 이력 : 송재룡 대리 
 * 2014년 6월 26일 IE8에서 지원하지 않는 trim() function 제거
 * */
var _tab1 = "\t";
var _tab2 = "\t\t";
var _tab3 = "\t\t\t";
var _tab4 = "\t\t\t\t";
var _tab5 = "\t\t\t\t\t";
var _CrLf = "\r\n";

/* 
   # name - _genXML_ichicsr
   # date - 20151013
   # writer - kkj
   # description - 사용자가 입력한 data를 xml형태 문자열값으로 변환후 server에 넘김 
   # param
   1. beforeType - update 전 진행상태 값 
   2. saveType - update될 진행상태 값
   # return - 없음
*/
function _genXML_ichicsr(beforeType , saveType) {
	alert('asdasd');
	//alert("revision #13. : _genXML_ichicsr \n beforeType - " + beforeType + " saveType - " + saveType);
	kidsNo = $("#kidsNo").val();
	$("#results").empty();
	var resultSets = "";
	//resultSets += xmlDeclare("/xdrp/baseXML/bxform/ichStandardsForm_default.xsl");
	resultSets += xmlDeclare("http://foreign.drugsafe.or.kr/dtd/icsr2.1.dtd");
	resultSets += xmlTag("ichicsr",null,"open") + _CrLf; 
	//resultSets += _genTag_system_info(); 
	resultSets += _genTag_ichicsrmessageheader(); 
	resultSets += _genTag_safetyreport();
	resultSets += xmlTag("ichicsr",null,"close");
	$('#results').text(resultSets);
	
	var param = "mXmlValue=" + encodeURIComponent(resultSets) + "&kidsNo=" + kidsNo + "&mStat=" + saveType;
	var uStat = "";	
	if(saveType != null && saveType != "") {
		//save_xml_doc(beforeType, saveType); , localhost:8080
		/* kkj 20151013 저장 포로세스 호출 - xml형태 문자열값으로 server에 넘김 */
		var url = "http://foreign.drugsafe.or.kr/xmle2b/R2_INPUT_SAVE.do";
		//var url = "http://foreign.drugsafe.or.kr/xmle2b/R2_INPUT_CHK_DATA.do";
		//var url = "http://localhost:8080/xmle2b/R2_INPUT_SAVE.do";
		$.ajax({
			type : "POST",
			url  : url,
			data : param,
			//contentType: "application/json; charset=UTF-8",
			dataType: "json",
			success : function(data) {
				uStat = data.updateStat;
				//alert('updateStat - ' + uStat);
				if( uStat == "13" )
				{
					/* kkj 20151127 사이드메뉴 화면보고 입력 시 안전원번호 set */
					var dataValue = data.kidsNo;
					if( "null" != dataValue ){
						$("#kidsNo").val(dataValue);
					}
					alertMsg("2");
					$("#SaveBtn").attr("disabled", "disabled");
					$("#TempBtn").removeAttr("disabled");
				}
				else if ( uStat == "20" )
				{
					alertMsg("3");
					$("#SaveBtn").removeAttr("disabled");
					$("#TempBtn").attr("disabled", "disabled");
					self.close();
				}
				else if (uStat == "30")
				{
					alertMsg("4");
					self.close();
				}
				else if (uStat == "99")
				{
					alertMsg("99");
				}
			},
			error : function(xhr,status,error){
				alert("error : "+error);
			}
		});
	}
	/* kkj 20151029 spinner 종료 */
	stopSpinner();
}

function _genTag_system_info() {
	var resultSet = "";
	resultSet += _tab1 + xmlTag("system_info",null,"open") + _CrLf;
	resultSet += _tab2 + xmlTag("timeStamp",'timeStamp') + _CrLf;
	resultSet += _tab2 + xmlTag("kids_rpt_no",'kids_rpt_no') + _CrLf;
	resultSet += _tab2 + xmlTag("rpt_cl_cd",'rpt_cl_cd') + _CrLf;
	resultSet += _tab2 + xmlTag("rgst_dt",'rgst_dt') + _CrLf;
	resultSet += _tab2 + xmlTag("rpt_dt",'rpt_dt') + _CrLf;
	resultSet += _tab2 + xmlTag("user_id",'user_id') + _CrLf;
	resultSet += _tab2 + xmlTag("drgmr_cmp_cd",'drgmr_cmp_cd') + _CrLf;
	resultSet += _tab2 + xmlTag("drgmr_cmp_nm",'drgmr_cmp_nm') + _CrLf;
	resultSet += _tab2 + xmlTag("big_rpt_no",'big_rpt_no') + _CrLf;
	resultSet += _tab2 + xmlTag("xml_file_id",'xml_file_id') + _CrLf;
	resultSet += _tab2 + xmlTag("xml_file_nm",'xml_file_nm') + _CrLf;
	resultSet += _tab2 + xmlTag("xml_file_desc",'xml_file_desc') + _CrLf;
	resultSet += _tab2 + xmlTag("rpt_stat_cd",'rpt_stat_cd') + _CrLf;
	resultSet += _tab1 + xmlTag("system_info",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_ichicsrmessageheader() { 
	var resultSet = "";
	resultSet += _tab1 + xmlTag("ichicsrmessageheader",null,"open") + _CrLf;
	resultSet += _tab2 + xmlTag("messagetype",'ichicsr') + _CrLf;
	resultSet += _tab2 + xmlTag("messageformatversion",'2.1') + _CrLf;
	resultSet += _tab2 + xmlTag("messageformatrelease",'2.0') + _CrLf;
	resultSet += _tab2 + xmlTag("messagenumb",'messagenumb') + _CrLf;
	resultSet += _tab2 + xmlTag("messagesenderidentifier",'messagesenderidentifier') + _CrLf;
	resultSet += _tab2 + xmlTag("messagereceiveridentifier",'KIDS') + _CrLf;
	resultSet += _tab2 + xmlTag("messagedateformat",'204') + _CrLf;
	resultSet += _tab2 + xmlTag("messagedate",'messagedate') + _CrLf;
	resultSet += _tab1 + xmlTag("ichicsrmessageheader",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_safetyreport() {
	var resultSet = ""; 
	resultSet += _tab1 + xmlTag("safetyreport",null,"open") + _CrLf; 
	resultSet += _tab2 + xmlTag("safetyreportversion",$('#safetyreportversion').val()) + _CrLf;
	resultSet += _tab2 + xmlTag("safetyreportid",$('#safetyreportid').val()) + _CrLf;
	resultSet += _tab2 + xmlTag("primarysourcecountry",$('#primarysourcecountry').val()) + _CrLf;
	resultSet += _tab2 + xmlTag("occurcountry",$('#occurcountry').val()) + _CrLf;
	//if( isLoad != true ) {
		resultSet += _tab2 + xmlTag("transmissiondateformat",'102') + _CrLf;
	//}
	// 파일보고는 자동으로 102를 넣어줘야하나?
	
	resultSet += _tab2 + xmlTag("transmissiondate",$('#transmissiondate').val()) + _CrLf; 
	resultSet += _tab2 + xmlTag("reporttype",$('#reporttype').val()) + _CrLf; 
	if( $("input:radio[name='optionsRadios0']").is(":checked") == true ) {
		resultSet += _tab2 + xmlTag("serious",$('input:radio[name="optionsRadios0"]:checked').val()) + _CrLf; 
	} else {
		resultSet += _tab2 + xmlTag("serious","2") + _CrLf;
	// ***	resultSet += _tab2 + xmlTag("serious",'serious') + _CrLf; 
	}
	if ( $('input:radio[name="optionsRadios0"]:checked').val() == "1" ) {
		if( $('input#seriousnessdeath').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnessdeath", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnessdeath", "2") + _CrLf; 
		}
		if( $('input#seriousnesslifethreatening').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnesslifethreatening", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnesslifethreatening", "2") + _CrLf; 
		}
		if( $('input#seriousnesshospitalization').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnesshospitalization", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnesshospitalization", "2") + _CrLf; 
		}
		if( $('input#seriousnessdisabling').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnessdisabling", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnessdisabling", "2") + _CrLf; 
		}
		if( $('input#seriousnesscongenitalanomali').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnesscongenitalanomali", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnesscongenitalanomali", "2") + _CrLf; 
		}
		if( $('input#seriousnessother').is(':checked') == true ) {
			resultSet += _tab2 + xmlTag("seriousnessother", "1") + _CrLf; 
		} else {
			resultSet += _tab2 + xmlTag("seriousnessother", "2") + _CrLf; 
		}
	}

	//if( isLoad != true ) {
	//I20141216 creator receivedateformat만 남는문제 해결
	if( $('#receivedate').val().length > 0 ) {
		resultSet += _tab2 + xmlTag("receivedateformat",'102') + _CrLf;
	} else {
		resultSet += _tab2 + xmlTag("receivedateformat",'') + _CrLf;
	}
	//}
	// 파일보고는 자동으로 102를 넣어줘야하나?
	resultSet += _tab2 + xmlTag("receivedate",$('#receivedate').val()) + _CrLf;
	
	//if( isLoad != true ) {
		resultSet += _tab2 + xmlTag("receiptdateformat",'102') + _CrLf;
	//}
	// 파일보고는 자동으로 102를 넣어줘야하나?

	resultSet += _tab2 + xmlTag("receiptdate",$('#receiptdate').val()) + _CrLf;

	if( $("input:radio[name='additionaldocument']").is(":checked") == true ) {
		resultSet += _tab2 + xmlTag("additionaldocument",$('input:radio[name="additionaldocument"]:checked').val()) + _CrLf;
	} else {
	// ***	resultSet += _tab2 + xmlTag("additionaldocument",'additionaldocument') + _CrLf; 
	}
	resultSet += _tab2 + xmlTag("documentlist",$('#documentlist').val()) + _CrLf;
	if( $("input:radio[name='fulfillexpeditecriteria']").is(":checked") == true ) {
		resultSet += _tab2 + xmlTag("fulfillexpeditecriteria",$('input:radio[name="fulfillexpeditecriteria"]:checked').val()) + _CrLf;
	} else {
	// ***	resultSet += _tab2 + xmlTag("fulfillexpeditecriteria",'fulfillexpeditecriteria') + _CrLf; 
	}
	resultSet += _tab2 + xmlTag("authoritynumb",$('#authoritynumb').val()) + _CrLf;
	resultSet += _tab2 + xmlTag("companynumb",$('#companynumb').val()) + _CrLf;
	if( $("input:radio[name='duplicate']").is(":checked") == true ) {
		resultSet += _tab2 + xmlTag("duplicate",$('input:radio[name="duplicate"]:checked').val()) + _CrLf; 
	} else {
	// ***	resultSet += _tab2 + xmlTag("duplicate",'duplicate') + _CrLf; 
	}
	resultSet += _genTag_reportduplicate();
	resultSet += _genTag_linkedreport();

	// 화면에서 casenullification를 1=YES 로 할 수 없어서 설명이 있으면 1=YES로 한다. 2014.9.15
	if( $('#nullificationreason').val().length > 0 ) {
		resultSet += _tab2 + xmlTag("casenullification",'1') + _CrLf;
	}
	else {
		resultSet += _tab2 + xmlTag("casenullification",$('#casenullification').val()) + _CrLf;
	}

	resultSet += _tab2 + xmlTag("nullificationreason",$('#nullificationreason').val()) + _CrLf;

	if( $("input:radio[name='medicallyconfirm']").is(":checked") == true ) {
		resultSet += _tab2 + xmlTag("medicallyconfirm",$('input:radio[name="medicallyconfirm"]:checked').val()) + _CrLf;   
	} else {
	// ***	resultSet += _tab2 + xmlTag("medicallyconfirm",'medicallyconfirm') + _CrLf; 
	}
	resultSet += _genTag_primarysource(); 
	resultSet += _genTag_sender();
	resultSet += _genTag_receiver();
	resultSet += _genTag_patient();
	resultSet += _tab1 + xmlTag("safetyreport",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_reportduplicate() { 
	var resultSet = "";
	$.each(arrReportDuplicate, function() { 
		resultSet += _tab2 + xmlTag("reportduplicate",null,"open") + _CrLf;
		resultSet += _tab3 + xmlTag("duplicatesource",this.duplicatesource) + _CrLf;
		resultSet += _tab3 + xmlTag("duplicatenumb",this.duplicatenumb) + _CrLf;
		resultSet += _tab2 + xmlTag("reportduplicate",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_linkedreport() {
	var resultSet = "";
	$.each(arrLinkReportNumb, function() { 
		resultSet += _tab2 + xmlTag("linkedreport",null,"open") + _CrLf;
		resultSet += _tab3 + xmlTag("linkreportnumb",this.linkreportnumb) + _CrLf;
		resultSet += _tab2 + xmlTag("linkedreport",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_primarysource() {
	var resultSet = "";
	$.each(arrPrimarySourceInformation, function() {
		resultSet += _tab2 + xmlTag("primarysource",null,"open") + _CrLf;
		resultSet += _tab3 + xmlTag("reportertitle",this.reportertitle) + _CrLf;
		resultSet += _tab3 + xmlTag("reportergivename",this.reportergivename) + _CrLf;
		resultSet += _tab3 + xmlTag("reportermiddlename",this.reportermiddlename) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterfamilyname",this.reporterfamilyname) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterorganization",this.reporterorganization) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterdepartment",this.reporterdepartment) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterstreet",this.reporterstreet) + _CrLf;
		resultSet += _tab3 + xmlTag("reportercity",this.reportercity) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterstate",this.reporterstate) + _CrLf;
		resultSet += _tab3 + xmlTag("reporterpostcode",this.reporterpostcode) + _CrLf;
		resultSet += _tab3 + xmlTag("reportercountry",this.reportercountry) + _CrLf;
		resultSet += _tab3 + xmlTag("qualification",this.qualification) + _CrLf;
		resultSet += _tab3 + xmlTag("literaturereference",this.literaturereference) + _CrLf;
		resultSet += _tab3 + xmlTag("studyname",this.studyname) + _CrLf;
		resultSet += _tab3 + xmlTag("sponsorstudynumb",this.sponsorstudynumb) + _CrLf;
		resultSet += _tab3 + xmlTag("observestudytype",this.observestudytype) + _CrLf;
		resultSet += _tab2 + xmlTag("primarysource",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_sender() {
	var resultSet = "";
	resultSet += _tab2 + xmlTag("sender",null,"open") + _CrLf;
	resultSet += _tab3 + xmlTag("sendertype",$('#sendertype').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderorganization",$('#senderorganization').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderdepartment",$('#senderdepartment').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendertitle",$('#sendertitle').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendergivename",$('#sendergivename').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendermiddlename",$('#sendermiddlename').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderfamilyname",$('#senderfamilyname').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderstreetaddress",$('#senderstreetaddress').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendercity",$('#sendercity').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderstate",$('#senderstate').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderpostcode",$('#senderpostcode').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendercountrycode",$('#sendercountrycode').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendertel",$('#sendertel').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendertelextension",$('#sendertelextension').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("sendertelcountrycode",$('#sendertelcountrycode').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderfax",$('#senderfax').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderfaxextension",$('#senderfaxextension').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderfaxcountrycode",$('#senderfaxcountrycode').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("senderemailaddress",$('#senderemailaddress').val()) + _CrLf;
	resultSet += _tab2 + xmlTag("sender",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_receiver() {
	var resultSet = "";
	//KIDS INFO Setting
	resultSet += _tab2 + xmlTag("receiver",null,"open") + _CrLf;
	resultSet += _tab3 + xmlTag("receivertype",'2') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverorganization",'KIDS') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverdepartment",'Office of Drug Safety Information II') + _CrLf;
	resultSet += _tab3 + xmlTag("receivertitle",'KAERS') + _CrLf;
	resultSet += _tab3 + xmlTag("receivergivename",'KOREA') + _CrLf;
	resultSet += _tab3 + xmlTag("receivermiddlename",'KIDS') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverfamilyname",'KIDS') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverstreetaddress",'5th Fl. Boryung Bldg, 136 Changgyeonggung-ro, Jongno-Gu') + _CrLf;
	resultSet += _tab3 + xmlTag("receivercity",'Seoul') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverstate",'Seoul') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverpostcode",'110-750') + _CrLf;
	resultSet += _tab3 + xmlTag("receivercountrycode",'KR') + _CrLf;
	resultSet += _tab3 + xmlTag("receivertel",'2172-6700') + _CrLf;
	resultSet += _tab3 + xmlTag("receivertelextension",'2') + _CrLf;
	resultSet += _tab3 + xmlTag("receivertelcountrycode",'82') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverfax",'2172-6701') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverfaxextension",'2') + _CrLf;
	resultSet += _tab3 + xmlTag("receiverfaxcountrycode",'82') + _CrLf;
	resultSet += _tab3 + xmlTag("receiveremailaddress",'kids_foreign@drugsafe.or.kr') + _CrLf;
	resultSet += _tab2 + xmlTag("receiver",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_patient() {
	var resultSet = "";
	resultSet += _tab2 + xmlTag("patient",null,"open") + _CrLf;
	resultSet += _tab3 + xmlTag("patientinitial",$('#patientinitial').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientgpmedicalrecordnumb",$('#patientgpmedicalrecordnumb').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientspecialistrecordnumb",$('#patientspecialistrecordnumb').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patienthospitalrecordnumb",$('#patienthospitalrecordnumb').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientinvestigationnumb",$('#patientinvestigationnumb').val()) + _CrLf;
	if( $('#patientbirthdate').val().length == 8 )
		resultSet += _tab3 + xmlTag("patientbirthdateformat","102") + _CrLf;
	resultSet += _tab3 + xmlTag("patientbirthdate",$('#patientbirthdate').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientonsetage",$('#patientonsetage').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientonsetageunit",$('#patientonsetageunit').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("gestationperiod",$('#gestationperiod').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("gestationperiodunit",$('#gestationperiodunit').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientagegroup",$('#patientagegroup').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientweight",$('#patientweight').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientheight",$('#patientheight').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientsex",$('#patientsex').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("lastmenstrualdateformat",$('#lastmenstrualdateformat').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientlastmenstrualdate",$('#patientlastmenstrualdate').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("patientmedicalhistorytext",$('#patientmedicalhistorytext').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("resultstestsprocedures",$('#resultstestsprocedures').val()) + _CrLf;
	resultSet += _genTag_medicalhistoryepisode();
	resultSet += _genTag_patientpastdrugtherapy();
	resultSet += _genTag_patientdeath();
	resultSet += _genTag_parent();
	resultSet += _genTag_reaction();
	resultSet += _genTag_test(); 
	resultSet += _genTag_drug();
	resultSet += _genTag_summary();
	resultSet += _genTag_fileupload();
	resultSet += _tab2 + xmlTag("patient",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_medicalhistoryepisode() {
	var resultSet = "";
	$.each(arrRelevantMedicalHistory, function() {
		resultSet += _tab3 + xmlTag("medicalhistoryepisode",null,"open") + _CrLf;
		resultSet += _tab4 + xmlTag("patientepisodenamemeddraversion",this.patientepisodenamemeddraver) + _CrLf;
		resultSet += _tab4 + xmlTag("patientepisodecode",this.patientepisodenamecode) + _CrLf;
		resultSet += _tab4 + xmlTag("patientepisodename",this.patientepisodename) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalstartdateformat",this.patientmedicalstartdateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalstartdate",this.patientmedicalstartdate) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalcontinue",this.patientmedicalcontinue) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalenddateformat",this.patientmedicalenddateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalenddate",this.patientmedicalenddate) + _CrLf;
		resultSet += _tab4 + xmlTag("patientmedicalcomment",this.patientmedicalcomment) + _CrLf;
		resultSet += _tab3 + xmlTag("medicalhistoryepisode",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_patientpastdrugtherapy() {
	var resultSet = "";
	$.each(arrRelevantPastDrugTherapy, function() {
		resultSet += _tab3 + xmlTag("patientpastdrugtherapy",null,"open") + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugname",this.patientdrugname) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugstartdateformat",this.patientdrugstartdateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugstartdate",this.patientdrugstartdate) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugenddateformat",this.patientdrugenddateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugenddate",this.patientdrugenddate) + _CrLf;
		resultSet += _tab4 + xmlTag("patientindicationmeddraversion",this.patientindicationmeddraversion) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugindicationcode",this.patientdrugindicationcode) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugindication",this.patientdrugindication) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrgreactionmeddraversion",this.patientdrgreactionmeddraver) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugreactioncode",this.patientdrugreactioncode) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdrugreaction",this.patientdrugreaction) + _CrLf;
		resultSet += _tab3 + xmlTag("patientpastdrugtherapy",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_patientdeath() {
	var resultSet = "";
	resultSet += _tab3 + xmlTag("patientdeath",null,"open") + _CrLf;
	resultSet += _tab4 + xmlTag("patientdeathdateformat",$('#patientdeathdateformat').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("patientdeathdate",$('#patientdeathdate').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("patientautopsyyesno",$('#patientautopsyyesno').val()) + _CrLf;
	resultSet += _genTag_patientdeathcause();
	resultSet += _genTag_patientautopsy();
	resultSet += _tab3 + xmlTag("patientdeath",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_patientdeathcause() {
	var resultSet = "";
	$.each(arrDeathCause, function() {
		resultSet += _tab4 + xmlTag("patientdeathcause",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("patientdeathreportmeddraversion",this.patientdeathreportmeddraver) + _CrLf;
		resultSet += _tab5 + xmlTag("patientdeathreport",this.patientdeathreport) + _CrLf;
		resultSet += _tab5 + xmlTag("patientdeathreportcode",this.patientdeathreportcode) + _CrLf;
		resultSet += _tab4 + xmlTag("patientdeathcause",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_patientautopsy() {
	var resultSet = "";
	$.each(arrAutopsyDetermined, function() {
		resultSet += _tab4 + xmlTag("patientautopsy",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("patientdetermautopsmeddraversion",this.patientdetermautopsmeddraver) + _CrLf;
		resultSet += _tab5 + xmlTag("patientdetermineautopsycode",this.patientdetermineautopsycode) + _CrLf;
		resultSet += _tab5 + xmlTag("patientdetermineautopsy",this.patientdetermineautopsy) + _CrLf;
		resultSet += _tab4 + xmlTag("patientautopsy",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_parent() {
	var resultSet = "";
	resultSet += _tab3 + xmlTag("parent",null,"open") + _CrLf;
	resultSet += _tab4 + xmlTag("parentidentification",$('#parentidentification').val()) + _CrLf;

	//if( isLoad != true ) {
	if( $('#parentbirthdate').val().length == 8 ) {
		resultSet += _tab2 + xmlTag("parentbirthdateformat",'102') + _CrLf;
	}

	resultSet += _tab4 + xmlTag("parentbirthdate",$('#parentbirthdate').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("parentage",$('#parentage').val()) + _CrLf;
	//if( isLoad != true ) {
	if( $('#parentage').val().length == 8 ) {
		resultSet += _tab2 + xmlTag("parentageunit",'801') + _CrLf;
	}

	//if( isLoad != true ) {
	if( $('#parentlastmenstrualdate').val().length == 8 ) {
		resultSet += _tab2 + xmlTag("parentlastmenstrualdateformat",'102') + _CrLf;
	}
	resultSet += _tab4 + xmlTag("parentlastmenstrualdate",$('#parentlastmenstrualdate').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("parentweight",$('#parentweight').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("parentheight",$('#parentheight').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("parentsex",$('#parentsex').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("parentmedicalrelevanttext",$('#parentmedicalrelevanttext').val()) + _CrLf;
	resultSet += _genTag_parentmedicalhistoryepisode();
	resultSet += _genTag_parentpastdrugtherapy();
	resultSet += _tab3 + xmlTag("parent",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_parentmedicalhistoryepisode() {
	var resultSet = "";
	$.each(arrParentRelevantMedicalHistory, function() {
		resultSet += _tab4 + xmlTag("parentmedicalhistoryepisode",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("parentmdepisodemeddraversion",this.parentmdepisodemeddraversion) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalepisodenamecode",this.parentmedicalepisodenamecode) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalepisodename",this.parentmedicalepisodename) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalstartdateformat",this.parentmedicalstartdateformat) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalstartdate",this.parentmedicalstartdate) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalcontinue",this.parentmedicalcontinue) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalenddateformat",this.parentmedicalenddateformat) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalenddate",this.parentmedicalenddate) + _CrLf;
		resultSet += _tab5 + xmlTag("parentmedicalcomment",this.parentmedicalcomment) + _CrLf;
		resultSet += _tab4 + xmlTag("parentmedicalhistoryepisode",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_parentpastdrugtherapy() {
	var resultSet = "";
	$.each(arrParentRelevantPastDrugTherapy, function() {
		resultSet += _tab4 + xmlTag("parentpastdrugtherapy",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugname",this.parentdrugname) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugstartdateformat", this.parentdrugstartdateformat) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugstartdate",this.parentdrugstartdate) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugenddateformat",this.parentdrugenddateformat) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugenddate",this.parentdrugenddate) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrgindicationmeddraversion",this.parentdrgindicationmeddraver) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugindicationcode",this.parentdrugindicationcode) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugindication",this.parentdrugindication) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrgreactionmeddraversion",this.parentdrgreactionmeddraversion) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugreactioncode",this.parentdrugreactioncode) + _CrLf;
		resultSet += _tab5 + xmlTag("parentdrugreaction",this.parentdrugreaction) + _CrLf;
		resultSet += _tab4 + xmlTag("parentpastdrugtherapy",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_reaction() {
	var resultSet = "";
	$.each(arrReactionsEvents, function() {
		resultSet += _tab3 + xmlTag("reaction",null,"open") + _CrLf;
		//resultSet += _tab4 + xmlTag('primarysourcereaction whoartCode="'+this.whoartcode+'" whoartName="'+this.whoartname+'" whoartVersion="'+this.whoartversion+'"',this.primarysourcereaction) + _CrLf;
		resultSet += _tab4 + xmlTag("primarysourcereaction",this.primarysourcereaction) + _CrLf;
		resultSet += _tab4 + xmlTag("whoartversion",this.whoartversion) + _CrLf;
		resultSet += _tab4 + xmlTag("whoartcode",this.whoartcode) + _CrLf;
		resultSet += _tab4 + xmlTag("whoartname",this.whoartname) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddraversionllt",this.reactionmeddraversionllt ) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddralltcode",this.reactionmeddralltcode) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddrallt",this.reactionmeddrallt) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddraversionpt",this.reactionmeddraversionpt ) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddraptcode",this.reactionmeddraptcode) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionmeddrapt",this.reactionmeddrapt) + _CrLf;
		resultSet += _tab4 + xmlTag("termhighlighted",this.termhighlighted) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionstartdateformat",this.reactionstartdateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionstartdate",this.reactionstartdate) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionenddateformat",this.reactionenddateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionenddate",this.reactionenddate) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionduration",this.reactionduration) + _CrLf;
		resultSet += _tab4 + xmlTag("reactiondurationunit",this.reactiondurationunit) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionfirsttime",this.reactionfirsttime) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionfirsttimeunit",this.reactionfirsttimeunit) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionlasttime",this.reactionlasttime) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionlasttimeunit",this.reactionlasttimeunit) + _CrLf;
		resultSet += _tab4 + xmlTag("reactionoutcome",this.reactionoutcome) + _CrLf;
		resultSet += _tab3 + xmlTag("reaction",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_test() {
	var resultSet = "";
	$.each(arrTestsAndProcedures, function() {
		resultSet += _tab3 + xmlTag("test",null,"open") + _CrLf;
		resultSet += _tab4 + xmlTag("testdateformat",this.testdateformat) + _CrLf;
		resultSet += _tab4 + xmlTag("testdate",this.testdate) + _CrLf;
		resultSet += _tab4 + xmlTag("testname",this.testname) + _CrLf;
		resultSet += _tab4 + xmlTag("testresult",this.testresult) + _CrLf;
		resultSet += _tab4 + xmlTag("testunit",this.testunit) + _CrLf;
		resultSet += _tab4 + xmlTag("lowtestrange",this.lowtestrange) + _CrLf;
		resultSet += _tab4 + xmlTag("hightestrange",this.hightestrange) + _CrLf;
		resultSet += _tab4 + xmlTag("moreinformation",this.moreinformation) + _CrLf;
		resultSet += _tab3 + xmlTag("test",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_drug() { 
	var resultSet = "";
	$.each(arrDrugs, function() { 
		resultSet += _tab3 + xmlTag("drug",null,"open") + _CrLf;
		resultSet += _tab4 + xmlTag("drugcharacterization",this.drugcharacterization) + _CrLf;
		resultSet += _tab4 + xmlTag("unauthorizedproduct",this.unauthorizedproduct) + _CrLf;
		resultSet += _tab4 + xmlTag("medicinalproduct",this.medicinalproduct) + _CrLf;
		resultSet += _tab4 + xmlTag("obtaindrugcountry",this.obtaindrugcountry) + _CrLf; 
		resultSet += _tab4 + xmlTag("drugbatchnumb",this.drugbatchnumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugauthorizationnumb",this.drugauthorizationnumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugauthorizationcountry",this.drugauthorizationcountry) + _CrLf;
		resultSet += _tab4 + xmlTag("drugauthorizationholder",this.drugauthorizationholder) + _CrLf;
		resultSet += _tab4 + xmlTag("drugstructuredosagenumb",this.drugstructuredosagenumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugstructuredosageunit",this.drugstructuredosageunit) + _CrLf;
		resultSet += _tab4 + xmlTag("drugseparatedosagenumb",this.drugseparatedosagenumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugintervaldosageunitnumb",this.drugintervaldosageunitnumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugintervaldosagedefinition",this.drugintervaldosagedefinition) + _CrLf;
		resultSet += _tab4 + xmlTag("drugcumulativedosagenumb",this.drugcumulativedosagenumb) + _CrLf;
		resultSet += _tab4 + xmlTag("drugcumulativedosageunit",this.drugcumulativedosageunit) + _CrLf;
		resultSet += _tab4 + xmlTag("drugdosagetext",this.drugdosagetext) + _CrLf;
		resultSet += _tab4 + xmlTag("drugdosageform",this.drugdosageform) + _CrLf;
		resultSet += _tab4 + xmlTag("drugadministrationroute",this.drugadministrationroute) + _CrLf;
		resultSet += _tab4 + xmlTag("drugparadministration",this.drugparadministration) + _CrLf;
		resultSet += _tab4 + xmlTag("reactiongestationperiod",this.reactiongestationperiod) + _CrLf;
		resultSet += _tab4 + xmlTag("reactiongestationperiodunit",this.reactiongestationperiodunit) + _CrLf;
		resultSet += _tab4 + xmlTag("drugindicationmeddraversion",this.drugindicationmeddraversion) + _CrLf; 
		resultSet += _tab4 + xmlTag("drugindication",this.drugindication) + _CrLf;
		resultSet += _tab4 + xmlTag("drugindicationcode",this.drugindicationcode) + _CrLf;
		resultSet += _tab4 + xmlTag("drugstartdateformat",this.drugstartdateformat) + _CrLf;   
		resultSet += _tab4 + xmlTag("drugstartdate",this.drugstartdate) + _CrLf;
		resultSet += _tab4 + xmlTag("drugstartperiod",this.drugstartperiod) + _CrLf; 
		resultSet += _tab4 + xmlTag("drugstartperiodunit",this.drugstartperiodunit) + _CrLf; 
		resultSet += _tab4 + xmlTag("druglastperiod",this.druglastperiod) + _CrLf;
		resultSet += _tab4 + xmlTag("druglastperiodunit",this.druglastperiodunit) + _CrLf;
		resultSet += _tab4 + xmlTag("drugenddateformat",this.drugenddateformat) + _CrLf; 
		resultSet += _tab4 + xmlTag("drugenddate",this.drugenddate) + _CrLf;
		resultSet += _tab4 + xmlTag("drugtreatmentduration",this.drugtreatmentduration) + _CrLf;
		resultSet += _tab4 + xmlTag("drugtreatmentdurationunit",this.drugtreatmentdurationunit) + _CrLf; 
		resultSet += _tab4 + xmlTag("actiondrug",this.actiondrug) + _CrLf;
		resultSet += _tab4 + xmlTag("drugrecurreadministration",this.drugrecurreadministration) + _CrLf;
		resultSet += _tab4 + xmlTag("drugadditional",this.drugadditional) + _CrLf;  
		var arrActiveSub = this.activesubstancename.split("+");
		for( j = 0; j < arrActiveSub.length; j++ ) {
			resultSet += _genTag_activesubstance(arrActiveSub[j]);
		}
		//resultSet += _tab4 + xmlTag("activesubstance",null,"open") + _CrLf;
		//resultSet += _tab5 + xmlTag("activesubstancename",this.activesubstancename) + _CrLf;
		//resultSet += _tab4 + xmlTag("activesubstance",null,"close") + _CrLf;
		//resultSet += _genTag_drugrecurrence();
		resultSet += _tab4 + xmlTag("drugrecurrence",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("drugrecuractionmeddraversion",this.drugrecuractionmeddraversion) + _CrLf;
		resultSet += _tab5 + xmlTag("drugrecuraction",this.drugrecuraction) + _CrLf;
		resultSet += _tab5 + xmlTag("drugrecuractioncode",this.drugrecuractioncode) + _CrLf;
		resultSet += _tab4 + xmlTag("drugrecurrence",null,"close") + _CrLf;
		//resultSet += _genTag_drugreactionrelatedness();
		$.each(this.arrRelatednessofdrugtoreactionsevents, function() { 
			resultSet += _tab4 + xmlTag("drugreactionrelatedness",null,"open") + _CrLf;
			resultSet += _tab5 + xmlTag("drugreactionassesmeddraversion",this.drugreactionassesmeddraversion) + _CrLf;
			resultSet += _tab5 + xmlTag("drugreactionasses",this.drugreactionasses) + _CrLf;
			resultSet += _tab5 + xmlTag("drugassessmentsource",this.drugassessmentsource) + _CrLf; 
			resultSet += _tab5 + xmlTag("drugassessmentmethod",this.drugassessmentmethod) + _CrLf;
			resultSet += _tab5 + xmlTag("drugresult",this.drugresult) + _CrLf;
			resultSet += _tab5 + xmlTag("drugreactionassescode",this.drugreactionassescode) + _CrLf;
			resultSet += _tab4 + xmlTag("drugreactionrelatedness",null,"close") + _CrLf;
		});
		resultSet += _tab3 + xmlTag("drug",null,"close") + _CrLf;
	});

	return resultSet;
}

function _genTag_activesubstance(data) { //Once, NoRepeat in KIDS, Not Use
	var resultSet = "";
	resultSet += _tab4 + xmlTag("activesubstance",null,"open") + _CrLf;
	//resultSet += _tab5 + xmlTag("activesubstancename",this.activesubstancename) + _CrLf;
	resultSet += _tab5 + xmlTag("activesubstancename",data) + _CrLf;
	resultSet += _tab4 + xmlTag("activesubstance",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_drugrecurrence() { // Not Use
	var resultSet = "";
	resultSet += _tab4 + xmlTag("drugrecurrence",null,"open") + _CrLf;
	// *** id존재 resultSet += _tab5 + xmlTag("drugrecuractionmeddraversion",'drugrecuractionmeddraversion') + _CrLf;
	// *** id존재 resultSet += _tab5 + xmlTag("drugrecuraction",'drugrecuraction') + _CrLf;
	resultSet += _tab4 + xmlTag("drugrecurrence",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_drugreactionrelatedness() { // Not Use
	var resultSet = "";
	$.each(this.arrRelatednessofdrugtoreactionsevents, function() {
		resultSet += _tab4 + xmlTag("drugreactionrelatedness",null,"open") + _CrLf;
		resultSet += _tab5 + xmlTag("drugreactionassesmeddraversion",this.drugreactionassesmeddraversion) + _CrLf;
		resultSet += _tab5 + xmlTag("drugreactionasses",this.drugreactionasses) + _CrLf;
		resultSet += _tab5 + xmlTag("drugassessmentsource",this.drugassessmentsource) + _CrLf;
		resultSet += _tab5 + xmlTag("drugassessmentmethod",this.drugassessmentmethod) + _CrLf;
		resultSet += _tab5 + xmlTag("drugresult",this.drugresult) + _CrLf;
		resultSet += _tab4 + xmlTag("drugreactionrelatedness",null,"close") + _CrLf;
	});
	return resultSet;
}

function _genTag_summary() {
	var resultSet = "";
	resultSet += _tab3 + xmlTag("summary",null,"open") + _CrLf;
	resultSet += _tab4 + xmlTag("narrativeincludeclinical",$('#narrativeincludeclinical').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("reportercomment",$('#reportercomment').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("senderdiagnosismeddraversion",$('#senderdiagnosismeddraversion').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("senderdiagnosis",$('#senderdiagnosis').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("senderdiagnosiscode",$('#senderdiagnosiscode').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("sendercomment",$('#sendercomment').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("summary",null,"close") + _CrLf;
	return resultSet;
}

function _genTag_fileupload() {
	var resultSet = "";
	resultSet += _tab3 + xmlTag("fileupload",null,"open") + _CrLf;
	resultSet += _tab4 + xmlTag("serverfilename",$('#serverfilename').val()) + _CrLf;
	resultSet += _tab4 + xmlTag("realfilenames",$('#realfilenames').val()) + _CrLf;
	resultSet += _tab3 + xmlTag("fileupload",null,"close") + _CrLf;
	return resultSet;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP') ||  new ActiveXObject("Microsoft.XMLHTTP");
var returnXmlDocument;
function loadFile(_value , isLoad) {
	var stopFlag = false;
	//alert('revision #03 - loadFile() \n ' + "isLoad - " + isLoad + "_value" + _value);
    /* kkj 20151012 vFlag - 사이드메뉴 / 안전원관리번호 어디에서 호출된 것인지 구분값 추가 boolean인데 문자열로 인식함 ㅡㅡ;*/
	if( isLoad == "true" ) {
		//view_validation();
		returnXmlDocument = createXMLFromString(_value);
		//alert('xml test - ' + returnXmlDocument);
		displayContents(returnXmlDocument);
		//reader.open('get', _value, true); 
	    //reader.onreadystatechange = displayContents;
	    //reader.send(null);
		stopFlag = true;
	}
	return stopFlag;
}

/* 
	# name - createXMLFromString
	# date - 20151013
	# writer - kkj
	# description - String value converter Xml file
	# param
	1. _xmlVal - xml형태 문자열 값
	# return - 없음
*/
function createXMLFromString(_xmlVal) {
	var xmlDocument;
	var xmlParser;
   if(window.ActiveXObject){   //IE일 경우
      xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
      xmlDocument.async = false;
      xmlDocument.loadXML(_xmlVal);
   } else if (window.XMLHttpRequest) {   //Firefox, Netscape일 경우
      xmlParser = new DOMParser();
      xmlDocument = xmlParser.parseFromString(_xmlVal, 'text/xml');
   } else {
      return null;
   }
   return xmlDocument;
}

function fncNation( country ) {
	var ret = true;
	if( country != "AD" && country != "AE" && country != "AF" && country != "AG" && country != "AI" 
     && country != "AI" && country != "AL" && country != "AM" && country != "AN" && country != "AO"  
	 && country != "AQ" && country != "AR" && country != "AS" && country != "AT" && country != "AU"  
	 && country != "AW" && country != "AX" && country != "AZ" && country != "BA" && country != "BB"  
	 && country != "BD" && country != "BE" && country != "BF"
	 && country != "BG" && country != "BH" && country != "BI" && country != "BJ"
	 && country != "BL" && country != "BM" && country != "BN" && country != "BO"
	 && country != "BQ" && country != "BQ" && country != "BR" && country != "BS"
	 && country != "BT" && country != "BU" && country != "BV" && country != "BW"
	 && country != "BY" && country != "BY" && country != "BZ" && country != "CA"
	 && country != "CC" && country != "CD" && country != "CF" && country != "CG"
	 && country != "CH" && country != "CI" && country != "CK" && country != "CL"
	 && country != "CM" && country != "CN" && country != "CO" && country != "CR"
	 && country != "CS" && country != "CS" && country != "CT" && country != "CU"
	 && country != "CV" && country != "CW" && country != "CX" && country != "CY"
	 && country != "CZ" && country != "DD" && country != "DE" && country != "DJ"
	 && country != "DK" && country != "DM" && country != "DO" && country != "DY"
	 && country != "DZ" && country != "EC" && country != "EE" && country != "EG"
	 && country != "EH" && country != "ER" && country != "ES" && country != "ET"
	 && country != "FI" && country != "FJ" && country != "FK" && country != "FM"
	 && country != "FO" && country != "FQ" && country != "FR" && country != "FX"
	 && country != "GA" && country != "GB" && country != "GD"
	 && country != "GE" && country != "GE" && country != "GF" && country != "GG"
	 && country != "GH" && country != "GI" && country != "GL" && country != "GM"
	 && country != "GN" && country != "GP" && country != "GQ" && country != "GR"
	 && country != "GS" && country != "GT" && country != "GU" && country != "GW"
	 && country != "GY" && country != "HK" && country != "HM" && country != "HN"
	 && country != "HR" && country != "HT" && country != "HU" && country != "HV"
	 && country != "ID" && country != "IE" && country != "IL" && country != "IM"
	 && country != "IN" && country != "IO" && country != "IQ" && country != "IR"
	 && country != "IS" && country != "IT" && country != "JE" && country != "JM"
	 && country != "JO" && country != "JP" && country != "JT"
	 && country != "KE" && country != "KG" && country != "KH" && country != "KI"
	 && country != "KM" && country != "KN" && country != "KP" && country != "KR"
	 && country != "KW" && country != "KY" && country != "KZ" && country != "LA"
	 && country != "LB" && country != "LC" && country != "LI" && country != "LK"
	 && country != "LR" && country != "LS" && country != "LT" && country != "LU"
	 && country != "LV" && country != "LY" && country != "MA" && country != "MC"
	 && country != "MD" && country != "ME" && country != "MF" && country != "MG"
	 && country != "MH" && country != "MI" && country != "MK" && country != "ML"
	 && country != "MM" && country != "MN" && country != "MO" && country != "MP"
	 && country != "MQ" && country != "MR" && country != "MS" && country != "MT"
	 && country != "MU" && country != "MV" && country != "MW" && country != "MX"
	 && country != "MY" && country != "MZ" && country != "NA" && country != "NC"
	 && country != "NE" && country != "NF" && country != "NG" && country != "NH"
	 && country != "NI" && country != "NL" && country != "NO" && country != "NP"
	 && country != "NQ" && country != "NR" && country != "NT" && country != "NU"
	 && country != "NZ" && country != "OM" && country != "PA" && country != "PC"
	 && country != "PE" && country != "PF" && country != "PG" && country != "PH"
	 && country != "PK" && country != "PL" && country != "PM" && country != "PN"
	 && country != "PR" && country != "PS" && country != "PT" && country != "PU"
	 && country != "PW" && country != "PY" && country != "PZ" && country != "QA"
	 && country != "RE" && country != "RH" && country != "RO" && country != "RS"
	 && country != "RU" && country != "RW" && country != "SA" && country != "SB"
	 && country != "SC" && country != "SD" && country != "SE" && country != "SG"
	 && country != "SH" && country != "SI" && country != "SJ" && country != "SK"
	 && country != "SK" && country != "SL" && country != "SM" && country != "SN"
	 && country != "SO" && country != "SR" && country != "SS" && country != "ST"
	 && country != "SU" && country != "SV" && country != "SX" && country != "SY"
	 && country != "SZ" && country != "TC" && country != "TD" && country != "TF"
	 && country != "TG" && country != "TH" && country != "TJ" && country != "TK"
	 && country != "TL" && country != "TM" && country != "TN" && country != "TO"
	 && country != "TP" && country != "TR" && country != "TT" && country != "TV"
	 && country != "TW" && country != "TZ" && country != "UA" && country != "UG"
	 && country != "UM" && country != "US" && country != "UY" && country != "UZ"
	 && country != "VA" && country != "VC" && country != "VD" && country != "VE"
	 && country != "VG" && country != "VI" && country != "VN" && country != "VU"
	 && country != "WF" && country != "WK" && country != "WS" && country != "YD"
	 && country != "YE" && country != "YT" && country != "YU" && country != "ZA"
	 && country != "ZM" && country != "ZR" && country != "ZW" )
	ret = false;

	return ret;
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}

/* kkj 20151001 화면보고 display func */
function displayContents(xmlVal) {
	//alert("bx_ichicsr.js r2input.jsp[ _xmldocLoad('') -> loadfile() ] -> bx_ichicsr.js[ loadFile('') -> displayContents() ]");
	var i;
	var rpt;
	var iMulti = 0;
	var x;
	
	/*if(reader.readyState == 4) { 
		if(reader.status == 200) {*/  
			//var result = reader.responseText;
			//$("#results").text(result);
			var safetyreportversionTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("safetyreportversion")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("safetyreportversion")[0].childNodes[0] != null) {
				safetyreportversionTemp = xmlVal.documentElement.getElementsByTagName("safetyreportversion")[0].childNodes[0].nodeValue;
				$('#safetyreportversion').val(safetyreportversionTemp);
			}
			// safetyreportversion(2A)
			if( safetyreportversionTemp.length > 2 )
			{
				$("#safetyreportversionerror").html('<span class="has-error"><font color="red">Please enter no more than 2 characters.</font></span>');
			}

			// safetyreportid *(100AN)
			var safetyreportidTemp = "";
			if (xmlVal.documentElement.getElementsByTagName("safetyreportid")[0] != null 
					&& xmlVal.documentElement.getElementsByTagName("safetyreportid")[0].childNodes[0] != null) {
				$('#safetyreportid').val(xmlVal.documentElement.getElementsByTagName("safetyreportid")[0].childNodes[0].nodeValue);
				safetyreportidTemp = xmlVal.documentElement.getElementsByTagName("safetyreportid")[0].childNodes[0].nodeValue;
			}
			if( safetyreportidTemp.length == 0 )
			{
				$("#safetyreportiderror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			}
			if( safetyreportidTemp.length > 100 )
			{
				$("#safetyreportiderror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
			}

			// primarysourcecountry *(2A)
			var primarysourcecountryTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("primarysourcecountry")[0] != null 
					&& xmlVal.documentElement.getElementsByTagName("primarysourcecountry")[0].childNodes[0] != null) {
				$('#primarysourcecountry').val(xmlVal.documentElement.getElementsByTagName("primarysourcecountry")[0].childNodes[0].nodeValue);
				primarysourcecountryTemp = xmlVal.documentElement.getElementsByTagName("primarysourcecountry")[0].childNodes[0].nodeValue;
			}
			if( primarysourcecountryTemp.length == 0 )
			{
				$("#primarysourcecountryerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			} else if( fncNation(primarysourcecountryTemp) == false ) {
				$("#primarysourcecountryerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}

			// occurcountry(2A)
			var occurcountryTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("occurcountry")[0] != null
				&& xmlVal.documentElement.getElementsByTagName("occurcountry")[0].childNodes[0] != null) {
				$('#occurcountry').val(xmlVal.documentElement.getElementsByTagName("occurcountry")[0].childNodes[0].nodeValue);
				occurcountryTemp = xmlVal.documentElement.getElementsByTagName("occurcountry")[0].childNodes[0].nodeValue;
			}

			if( occurcountryTemp.length > 0 && fncNation(occurcountryTemp) == false )
			{
				$("#occurcountryerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}

			// transmissiondateformat(102 - Format CCYYMMDD)
			var transmissiondateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("transmissiondateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("transmissiondateformat")[0].childNodes[0] != null) {
				$('#transmissiondateformat').val(xmlVal.documentElement.getElementsByTagName("transmissiondateformat")[0].childNodes[0].nodeValue);
				transmissiondateformatTemp = xmlVal.documentElement.getElementsByTagName("transmissiondateformat")[0].childNodes[0].nodeValue;
			}
			if( transmissiondateformatTemp.length == 0 )
			{
				$("#transmissiondateerror").html('<span class="has-error"><font color="red">transmissiondateformat Mandatory field</font></span>');
			}

			if( transmissiondateformatTemp != "102" ) {
				$("#transmissiondateerror").html('<span class="has-error"><font color="red">transmissiondateformat Invalid code</font></span>');
			}

			var transmissiondateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("transmissiondate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("transmissiondate")[0].childNodes[0] != null) {
				$('#transmissiondate').val(xmlVal.documentElement.getElementsByTagName("transmissiondate")[0].childNodes[0].nodeValue);
				transmissiondateTemp = xmlVal.documentElement.getElementsByTagName("transmissiondate")[0].childNodes[0].nodeValue;
				if( transmissiondateTemp.length != 8 ) 
				{
					$("#transmissiondateerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			// reporttype * (1N)
			var reporttypeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("reporttype")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("reporttype")[0].childNodes[0] != null) {
				$('#reporttype').val(xmlVal.documentElement.getElementsByTagName("reporttype")[0].childNodes[0].nodeValue);
				reporttypeTemp = xmlVal.documentElement.getElementsByTagName("reporttype")[0].childNodes[0].nodeValue;
				if( reporttypeTemp.length > 0 ) {
					if( reporttypeTemp != "1" && reporttypeTemp != "2" && reporttypeTemp != "3" && reporttypeTemp != "4" )
					{
						$("#reporttypeerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
					}
				}
				else {
					$("#reporttypeerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
				}
			} else {
				$("#reporttypeerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			}	

			var seriousTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("serious")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("serious")[0].childNodes[0] != null) {
				//$('#serious').val(xmlVal.documentElement.getElementsByTagName("serious")[0].childNodes[0].nodeValue);
				seriousTemp = xmlVal.documentElement.getElementsByTagName("serious")[0].childNodes[0].nodeValue;
				if( seriousTemp != "1" && seriousTemp != "2" )
				{
					$("#seriouserror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
				if( xmlVal.documentElement.getElementsByTagName("serious")[0].childNodes[0].nodeValue == "1" ) {
					$('#oRadios01').attr("checked",true);
					$('#oRadios02').attr("checked",false);
					$('#seriousnessCriteria').show();
				}
				else if( xmlVal.documentElement.getElementsByTagName("serious")[0].childNodes[0].nodeValue == "2" ) {
					$('#oRadios01').attr("checked",false);
					$('#oRadios02').attr("checked",true);
					$('#seriousnessCriteria').hide();
				}
			} else {
				$("#seriouserror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnessdeath")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnessdeath")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnessdeath")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnessdeath').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnessdeath")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnessdeatherror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnesslifethreatening")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnesslifethreatening")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnesslifethreatening")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnesslifethreatening').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnesslifethreatening")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnesslifethreateningerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnesshospitalization")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnesshospitalization")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnesshospitalization")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnesshospitalization').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnesshospitalization")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnesshospitalizationerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnessdisabling")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnessdisabling")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnessdisabling")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnessdisabling').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnessdisabling")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnessdisablingerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnesscongenitalanomali")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnesscongenitalanomali")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnesscongenitalanomali")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnesscongenitalanomali').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnesscongenitalanomali")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnesscongenitalanomalierror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if(xmlVal.documentElement.getElementsByTagName("seriousnessother")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("seriousnessother")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("seriousnessother")[0].childNodes[0].nodeValue == "1" ) {
					iMulti += 1;
					$('#seriousnessother').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("seriousnessother")[0].childNodes[0].nodeValue != "2" ) {
					$("#seriousnessothererror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			if( seriousTemp == "1" && iMulti == 0 ) {
				$("#seriouserror").html('<span class="has-error"><font color="red">There must be a reason for seriousness, if serious is yes</font></span>');
			}
			iMulti = 0;
			
			// receivedateformat(102 - Format CCYYMMDD)
			var receivedateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("receivedateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("receivedateformat")[0].childNodes[0] != null) {
				$('#receivedateformat').val(xmlVal.documentElement.getElementsByTagName("receivedateformat")[0].childNodes[0].nodeValue);
				receivedateformatTemp = xmlVal.documentElement.getElementsByTagName("receivedateformat")[0].childNodes[0].nodeValue;
			}

			if( receivedateformatTemp.length > 0 && receivedateformatTemp != "102" ) {
				$("#receivedateerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}

			var receivedateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("receivedate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("receivedate")[0].childNodes[0] != null) {
				$('#receivedate').val(xmlVal.documentElement.getElementsByTagName("receivedate")[0].childNodes[0].nodeValue);
				receivedateTemp = xmlVal.documentElement.getElementsByTagName("receivedate")[0].childNodes[0].nodeValue;
				if( receivedateTemp.length > 8 ) 
				{
					$("#receivedateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
				}
			}
			
			// receiptdateformat(102 - Format CCYYMMDD)
			var receiptdateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("receiptdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("receiptdateformat")[0].childNodes[0] != null) {
				$('#receiptdateformat').val(xmlVal.documentElement.getElementsByTagName("receiptdateformat")[0].childNodes[0].nodeValue);
				receiptdateformatTemp = xmlVal.documentElement.getElementsByTagName("receiptdateformat")[0].childNodes[0].nodeValue;
			}
			if( receiptdateformatTemp.length == 0 )
			{
				$("#receiptdateerror").html('<span class="has-error"><font color="red">receiptdateformat Mandatory field</font></span>');
			}
			if( receiptdateformatTemp != "102" )
			{
				$("#receiptdateerror").html('<span class="has-error"><font color="red">receiptdateformat Invalid code</font></span>');
			}

			// receiptdate (8N)
			var receiptdateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("receiptdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("receiptdate")[0].childNodes[0] != null) {
				$('#receiptdate').val(xmlVal.documentElement.getElementsByTagName("receiptdate")[0].childNodes[0].nodeValue);
				receiptdateTemp = xmlVal.documentElement.getElementsByTagName("receiptdate")[0].childNodes[0].nodeValue;
			}
			if( receiptdateTemp.length == 0 )
			{
				$("#receiptdateerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			}
			if( receiptdateTemp.length > 8 )
			{
				$("#receiptdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
			}
			
			// additionaldocument(1N) 1, 2
			var additionaldocumentTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("additionaldocument")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("additionaldocument")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("additionaldocument")[0].childNodes[0].nodeValue == "1" ) {
					$('#oRadiosadditionaldocument1').attr("checked",true);
					$('#oRadiosadditionaldocument2').attr("checked",false);
					$('#additionaldocumentsavailable').show();
					additionaldocumentTemp = "1";
				}
				else if( xmlVal.documentElement.getElementsByTagName("additionaldocument")[0].childNodes[0].nodeValue == "2" ) {
					$('#oRadiosadditionaldocument1').attr("checked",false);
					$('#oRadiosadditionaldocument2').attr("checked",true);
					$('#additionaldocumentsavailable').hide();
					additionaldocumentTemp = "2";
				} else if( xmlVal.documentElement.getElementsByTagName("additionaldocument")[0].childNodes[0].nodeValue.length > 0 ) {
					$("#additionaldocumenterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			// documentlist
			var documentlistTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("documentlist")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("documentlist")[0].childNodes[0] != null) {
				$('#documentlist').val(xmlVal.documentElement.getElementsByTagName("documentlist")[0].childNodes[0].nodeValue);
				documentlistTemp = xmlVal.documentElement.getElementsByTagName("documentlist")[0].childNodes[0].nodeValue;
			}

			if( additionaldocumentTemp == "1" && documentlistTemp.length == 0 ) 
			{
				$("#documentlisterror").html('<span class="has-error"><font color="red">Required field</font></span>');
			}

			// fulfillexpeditecriteria(1N) 1, 2
			if(xmlVal.documentElement.getElementsByTagName("fulfillexpeditecriteria")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("fulfillexpeditecriteria")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("fulfillexpeditecriteria")[0].childNodes[0].nodeValue == "1" ) {
					$('#oRadiosfulfillexpeditecriteria1').attr("checked",true);
					$('#oRadiosfulfillexpeditecriteria2').attr("checked",false);
				}
				else if( xmlVal.documentElement.getElementsByTagName("fulfillexpeditecriteria")[0].childNodes[0].nodeValue == "2" ) {
					$('#oRadiosfulfillexpeditecriteria1').attr("checked",false);
					$('#oRadiosfulfillexpeditecriteria2').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("fulfillexpeditecriteria")[0].childNodes[0].nodeValue.length > 0 ) {
					$("#fulfillexpeditecriteriaerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			// medicallyconfirm 1=Yes 2=No
			if(xmlVal.documentElement.getElementsByTagName("medicallyconfirm")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("medicallyconfirm")[0].childNodes[0] != null) {
				if( xmlVal.documentElement.getElementsByTagName("medicallyconfirm")[0].childNodes[0].nodeValue == "1" ) {
					$('#oRadiosmedicallyconfirm1').attr("checked",true);
					$('#oRadiosmedicallyconfirm2').attr("checked",false);
				}
				else if( xmlVal.documentElement.getElementsByTagName("medicallyconfirm")[0].childNodes[0].nodeValue == "2" ) {
					$('#oRadiosmedicallyconfirm1').attr("checked",false);
					$('#oRadiosmedicallyconfirm2').attr("checked",true);
				} else if( xmlVal.documentElement.getElementsByTagName("medicallyconfirm")[0].childNodes[0].nodeValue.length > 0 ) {
					$("#medicallyconfirmerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			// authoritynumb (100AN)
			var authoritynumbTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("authoritynumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("authoritynumb")[0].childNodes[0] != null) {
				$('#authoritynumb').val(xmlVal.documentElement.getElementsByTagName("authoritynumb")[0].childNodes[0].nodeValue);
				authoritynumbTemp = xmlVal.documentElement.getElementsByTagName("authoritynumb")[0].childNodes[0].nodeValue;
			}

			if ( authoritynumbTemp.length > 100) {
				$("#authoritynumberror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
			}

			// companynumb (100AN)
			var companynumbTemp = "";			
			if(xmlVal.documentElement.getElementsByTagName("companynumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("companynumb")[0].childNodes[0] != null) {
				$('#companynumb').val(xmlVal.documentElement.getElementsByTagName("companynumb")[0].childNodes[0].nodeValue);
				companynumbTemp = xmlVal.documentElement.getElementsByTagName("companynumb")[0].childNodes[0].nodeValue;
			}
			if ( companynumbTemp.length > 100) {
				$("#companynumberror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
			}

			var duplicateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("duplicate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("duplicate")[0].childNodes[0] != null) {
				$('#duplicate').val(xmlVal.documentElement.getElementsByTagName("duplicate")[0].childNodes[0].nodeValue);
				duplicateTemp = xmlVal.documentElement.getElementsByTagName("duplicate")[0].childNodes[0].nodeValue;
				if( duplicateTemp != "1" )
				{
					$("#duplicateerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				} else {
					$('#sourceofcaseidentifier').show();
					$('#oRadiosduplicate1').attr("checked",true);
				}
			}

			var casenullificationTemp = ""; // 1=Yes 화면에서 선택할 수 없음. reason을 입력하면 자동으로 1=YES 셋팅
			if(xmlVal.documentElement.getElementsByTagName("casenullification")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("casenullification")[0].childNodes[0] != null) {
				$('#casenullification').val(xmlVal.documentElement.getElementsByTagName("casenullification")[0].childNodes[0].nodeValue);
				casenullificationTemp = xmlVal.documentElement.getElementsByTagName("casenullification")[0].childNodes[0].nodeValue;
			}

			var nullificationreasonTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("nullificationreason")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("nullificationreason")[0].childNodes[0] != null) {
				$('#nullificationreason').val(xmlVal.documentElement.getElementsByTagName("nullificationreason")[0].childNodes[0].nodeValue);
				nullificationreasonTemp = xmlVal.documentElement.getElementsByTagName("nullificationreason")[0].childNodes[0].nodeValue;
				if( nullificationreasonTemp.length > 200 ) 
				{
					$("#nullificationreasonerror").html('<span class="has-error"><font color="red">Please enter no more than 200 characters.</font></span>');
				}
			}
			
			// Identification number of the report linked to this report
			// linkreportnumb 배열 처리가 필요하다. 데이터가 있어야 확인 가능
			rpt = xmlVal.documentElement.getElementsByTagName("linkedreport").length;
			arrLinkReportNumb = [];
			for (i=0;i<rpt;i++)
			{
				var linkreportnumbTemp = "";
				if(xmlVal.documentElement.getElementsByTagName("linkreportnumb")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("linkreportnumb")[i].childNodes[0] != null) {
					linkreportnumbTemp = xmlVal.documentElement.getElementsByTagName("linkreportnumb")[i].childNodes[0].nodeValue;
				}

				if( linkreportnumbTemp == "" || linkreportnumbTemp.length > 100 )
					continue;

				var obj={
					linkreportnumb : linkreportnumbTemp
				}
				
				arrLinkReportNumb.push(obj);
			}

			fnDisplayLinkReportNumb();

			// Other case Identifiers in previous transmission
			// duplicatesource, duplicatenumb
			rpt = xmlVal.documentElement.getElementsByTagName("reportduplicate").length;
			arrReportDuplicate = [];
			for (i=0;i<rpt;i++)
			{
				var duplicatesourceTemp = "";
				var duplicatenumbTemp = "";
				var errorTemp = "0";

				if(xmlVal.documentElement.getElementsByTagName("duplicatesource")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("duplicatesource")[i].childNodes[0] != null) {
					duplicatesourceTemp = xmlVal.documentElement.getElementsByTagName("duplicatesource")[i].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("duplicatenumb")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("duplicatenumb")[i].childNodes[0] != null) {
					duplicatenumbTemp = xmlVal.documentElement.getElementsByTagName("duplicatenumb")[i].childNodes[0].nodeValue;
				}

				if( duplicateTemp == "1" && duplicatesourceTemp.length == 0 ) 
				{
					errorTemp = "1";
				}
				if( duplicatesourceTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( duplicateTemp == "1" && duplicatenumbTemp.length == 0 ) 
				{
					errorTemp = "1";
				}
				if( duplicatenumbTemp.length > 100 ) {
					errorTemp = "1";
				}

				var obj={
					error : errorTemp,
					duplicatesource : duplicatesourceTemp,
					duplicatenumb : duplicatenumbTemp
				}
				
				arrReportDuplicate.push(obj);
				//$('#sourceofcaseidentifier').show();
				//$('#oRadiosduplicate1').attr("checked",true);
			}

			fnDisplayReportDuplicate();

			// primarysource
			var iStudyReport = 0;
			rpt = xmlVal.documentElement.getElementsByTagName("primarysource").length;
			x = xmlVal.documentElement.getElementsByTagName("primarysource");
			for (i=0;i<rpt;i++)
			{
				var reportertitleTemp = "";
				var reportergivenameTemp = "";
				var reportermiddlenameTemp = "";
				var reporterfamilynameTemp = "";
				var reporterorganizationTemp = "";
				var reporterdepartmentTemp = "";
				var reporterstreetTemp = "";
				var reportercityTemp = "";
				var reporterstateTemp = "";
				var reporterpostcodeTemp = "";
				var reportercountryTemp = "";
				var qualificationTemp = "";
				var literaturereferenceTemp = "";
				var studynameTemp = "";
				var sponsorstudynumbTemp = "";
				var observestudytypeTemp = "";
				var errorTemp = "0";

				if( x[i].getElementsByTagName("reportertitle")[0] != null && typeof x[i].getElementsByTagName("reportertitle")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reportertitle").length > 0 ) {
						if( x[i].getElementsByTagName("reportertitle")[0].childNodes[0] != null) {
							reportertitleTemp = x[i].getElementsByTagName("reportertitle")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reportergivename")[0] != null && typeof x[i].getElementsByTagName("reportergivename")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reportergivename").length > 0 ) {
						if( x[i].getElementsByTagName("reportergivename")[0].childNodes[0] != null) {
							reportergivenameTemp = x[i].getElementsByTagName("reportergivename")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reportermiddlename")[0] != null && typeof x[i].getElementsByTagName("reportermiddlename")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reportermiddlename").length > 0 ) {
						if( x[i].getElementsByTagName("reportermiddlename")[0].childNodes[0] != null) {
							reportermiddlenameTemp = x[i].getElementsByTagName("reportermiddlename")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterfamilyname")[0] != null && typeof x[i].getElementsByTagName("reporterfamilyname")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterfamilyname").length > 0 ) {
						if( x[i].getElementsByTagName("reporterfamilyname")[0].childNodes[0] != null) {
							reporterfamilynameTemp = x[i].getElementsByTagName("reporterfamilyname")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterstreet")[0] != null && typeof x[i].getElementsByTagName("reporterstreet")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterstreet").length > 0 ) {
						if( x[i].getElementsByTagName("reporterstreet")[0].childNodes[0] != null) {
							reporterstreetTemp = x[i].getElementsByTagName("reporterstreet")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterorganization")[0] != null && typeof x[i].getElementsByTagName("reporterorganization")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterorganization").length > 0 ) {
						if( x[i].getElementsByTagName("reporterorganization")[0].childNodes[0] != null) {
							reporterorganizationTemp = x[i].getElementsByTagName("reporterorganization")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterdepartment")[0] != null && typeof x[i].getElementsByTagName("reporterdepartment")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterdepartment").length > 0 ) {
						if( x[i].getElementsByTagName("reporterdepartment")[0].childNodes[0] != null) {
							reporterdepartmentTemp = x[i].getElementsByTagName("reporterdepartment")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reportercity")[0] != null && typeof x[i].getElementsByTagName("reportercity")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reportercity").length > 0 ) {
						if( x[i].getElementsByTagName("reportercity")[0].childNodes[0] != null) {
							reportercityTemp = x[i].getElementsByTagName("reportercity")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterstate")[0] != null && typeof x[i].getElementsByTagName("reporterstate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterstate").length > 0 ) {
						if( x[i].getElementsByTagName("reporterstate")[0].childNodes[0] != null) {
							reporterstateTemp = x[i].getElementsByTagName("reporterstate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reporterpostcode")[0] != null && typeof x[i].getElementsByTagName("reporterpostcode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reporterpostcode").length > 0 ) {
						if( x[i].getElementsByTagName("reporterpostcode")[0].childNodes[0] != null) {
							reporterpostcodeTemp = x[i].getElementsByTagName("reporterpostcode")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reportercountry")[0] != null && typeof x[i].getElementsByTagName("reportercountry")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reportercountry").length > 0 ) {
						if( x[i].getElementsByTagName("reportercountry")[0].childNodes[0] != null) {
							reportercountryTemp = x[i].getElementsByTagName("reportercountry")[0].childNodes[0].nodeValue;
							if( reportercountryTemp != null ) {
								if( fncNation(reportercountryTemp) == false )
								{
									errorTemp = "1";
								}
							}
						}
					}
				}
				
				if( x[i].getElementsByTagName("qualification")[0] != null && typeof x[i].getElementsByTagName("qualification")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("qualification").length > 0 ) {
						if( x[i].getElementsByTagName("qualification")[0].childNodes[0] != null) {
							qualificationTemp = x[i].getElementsByTagName("qualification")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("literaturereference")[0] != null && typeof x[i].getElementsByTagName("literaturereference")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("literaturereference").length > 0 ) {
						if( x[i].getElementsByTagName("literaturereference")[0].childNodes[0] != null) {
							literaturereferenceTemp = _fnReplaceOrigin(x[i].getElementsByTagName("literaturereference")[0].childNodes[0].nodeValue);
						}
					}
				}

				if( x[i].getElementsByTagName("studyname")[0] != null && typeof x[i].getElementsByTagName("studyname")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("studyname").length > 0 ) {
						if( x[i].getElementsByTagName("studyname")[0].childNodes[0] != null) {
							studynameTemp = _fnReplaceOrigin( x[i].getElementsByTagName("studyname")[0].childNodes[0].nodeValue );
						}
					}
				}

				if( x[i].getElementsByTagName("sponsorstudynumb")[0] != null && typeof x[i].getElementsByTagName("sponsorstudynumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("sponsorstudynumb").length > 0 ) {
						if( x[i].getElementsByTagName("sponsorstudynumb")[0].childNodes[0] != null) {
							sponsorstudynumbTemp = x[i].getElementsByTagName("sponsorstudynumb")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("observestudytype")[0] != null && typeof x[i].getElementsByTagName("observestudytype")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("observestudytype").length > 0 ) {
						if( x[i].getElementsByTagName("observestudytype")[0].childNodes[0] != null) {
							observestudytypeTemp = x[i].getElementsByTagName("observestudytype")[0].childNodes[0].nodeValue;
						}
					}
				}

				// Validation Check
				if( reportertitleTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( reportergivenameTemp.length > 35 ) {
					errorTemp = "1";
				}
				if( reportermiddlenameTemp.length > 15 ) {
					errorTemp = "1";
				}
				if( reporterfamilynameTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( reporterorganizationTemp.length > 60 ) {
					errorTemp = "1";
				}
				if( reporterdepartmentTemp.length > 60 ) {
					errorTemp = "1";
				}
				if( reporterstreetTemp.length > 100 ) {
					errorTemp = "1";
				}
				if( reportercityTemp.length > 35 ) {
					errorTemp = "1";
				}
				if( reporterstateTemp.length > 40 ) {
					errorTemp = "1";
				}
				if( reporterpostcodeTemp.length > 15 ) {
					errorTemp = "1";
				}
				if( literaturereferenceTemp.length > 500 ) {
					errorTemp = "1";
				}
				if( studynameTemp.length > 100 ) {
					errorTemp = "1";
				}
				if( sponsorstudynumbTemp.length > 35 ) {
					errorTemp = "1";
				}
				/* observestudytype에 대해서 생각해봐야겠다.
				if( reporttypeTemp == "2" ) {	// iStudyReport 가 한번이라도 있으면 통과
					if( observestudytypeTemp != "1" && observestudytypeTemp != "2" && observestudytypeTemp != "3" && iStudyReport == 0 )
						errorTemp = "1";
					else
						iStudyReport = 1;
				}
				*/
				if( observestudytypeTemp.length > 0 ) {
					if( observestudytypeTemp != "1" && observestudytypeTemp != "2" && observestudytypeTemp != "3" )
						errorTemp = "1";
				}
				if( qualificationTemp != "" ) {
					if( qualificationTemp != "1" && qualificationTemp != "2" && qualificationTemp != "3" && qualificationTemp != "4" && qualificationTemp != "5" )
					{
						errorTemp = "1";
					}
				}

				if( reporterfamilynameTemp.length == 0 && reporterorganizationTemp.length == 0 &&
					reporterpostcodeTemp.length == 0 && reportercountryTemp.length == 0 &&
					qualificationTemp.length == 0) {
					errorTemp = "1";
				}

				var obj={
					error : errorTemp,
					reportertitle : reportertitleTemp,
					reportergivename : reportergivenameTemp,
					reportermiddlename : reportermiddlenameTemp,
					reporterfamilyname : reporterfamilynameTemp,
					reporterorganization : reporterorganizationTemp, 
					reporterdepartment : reporterdepartmentTemp,
					reporterstreet : reporterstreetTemp,
					reportercity : reportercityTemp,
					reporterstate : reporterstateTemp,
					reporterpostcode : reporterpostcodeTemp,
					reportercountry : reportercountryTemp,
					qualification : qualificationTemp,
					literaturereference : literaturereferenceTemp,
					studyname : studynameTemp,
					sponsorstudynumb : sponsorstudynumbTemp,
					observestudytype : observestudytypeTemp
				}

				arrPrimarySourceInformation.push(obj);
			}

			fnDisplayPrimarySourceInformation();
			
			// Sender
			var sendertypeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendertype")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendertype")[0].childNodes[0] != null) {
				$('#sendertype').val(xmlVal.documentElement.getElementsByTagName("sendertype")[0].childNodes[0].nodeValue);
				sendertypeTemp = xmlVal.documentElement.getElementsByTagName("sendertype")[0].childNodes[0].nodeValue;
			}
			if( sendertypeTemp == "" )
			{
				$("#sendertypeerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			} else if( sendertypeTemp != "1" && sendertypeTemp != "2" && sendertypeTemp != "3" && sendertypeTemp != "4" && sendertypeTemp != "5" && sendertypeTemp != "6" )
			{
				$("#sendertypeerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}
			
			// senderorganization
			var senderorganizationTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderorganization")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderorganization")[0].childNodes[0] != null) {
				$('#senderorganization').val(xmlVal.documentElement.getElementsByTagName("senderorganization")[0].childNodes[0].nodeValue);
				senderorganizationTemp = xmlVal.documentElement.getElementsByTagName("senderorganization")[0].childNodes[0].nodeValue;
			}
			if( senderorganizationTemp == "" )
			{
				$("#senderorganizationerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
			} else if( senderorganizationTemp.length > 60 )
			{
				$("#senderorganizationerror").html('<span class="has-error"><font color="red">Please enter no more than 60 characters.</font></span>');
			}

			// senderdepartment
			var senderdepartmentTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderdepartment")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderdepartment")[0].childNodes[0] != null) {
				$('#senderdepartment').val(xmlVal.documentElement.getElementsByTagName("senderdepartment")[0].childNodes[0].nodeValue);
				senderdepartmentTemp = xmlVal.documentElement.getElementsByTagName("senderdepartment")[0].childNodes[0].nodeValue;
			
				if( senderdepartmentTemp.length > 60 )
				{
					$("#senderdepartmenterror").html('<span class="has-error"><font color="red">Please enter no more than 60 characters.</font></span>');
				}
			}

			// senderstreetaddress
			var senderstreetaddressTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderstreetaddress")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderstreetaddress")[0].childNodes[0] != null) {
				$('#senderstreetaddress').val(xmlVal.documentElement.getElementsByTagName("senderstreetaddress")[0].childNodes[0].nodeValue);
				senderstreetaddressTemp = xmlVal.documentElement.getElementsByTagName("senderstreetaddress")[0].childNodes[0].nodeValue;
			}
			if( senderstreetaddressTemp.length > 100 )
			{
				$("#senderstreetaddresserror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
			}

			// sendercity
			var sendercityTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendercity")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendercity")[0].childNodes[0] != null) {
				$('#sendercity').val(xmlVal.documentElement.getElementsByTagName("sendercity")[0].childNodes[0].nodeValue);
				sendercityTemp = xmlVal.documentElement.getElementsByTagName("sendercity")[0].childNodes[0].nodeValue;

				if( sendercityTemp.length > 35 )
				{
					$("#sendercityerror").html('<span class="has-error"><font color="red">Please enter no more than 35 characters.</font></span>');
				}
			}

			// senderstate
			var senderstateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderstate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderstate")[0].childNodes[0] != null) {
				$('#senderstate').val(xmlVal.documentElement.getElementsByTagName("senderstate")[0].childNodes[0].nodeValue);
				senderstateTemp = xmlVal.documentElement.getElementsByTagName("senderstate")[0].childNodes[0].nodeValue;
			}
			if( senderstateTemp.length > 40 )
			{
				$("#senderstateerror").html('<span class="has-error"><font color="red">Please enter no more than 40 characters.</font></span>');
			}

			// senderpostcode
			var senderpostcodeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderpostcode")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderpostcode")[0].childNodes[0] != null) {
				$('#senderpostcode').val(xmlVal.documentElement.getElementsByTagName("senderpostcode")[0].childNodes[0].nodeValue);
				senderpostcodeTemp = xmlVal.documentElement.getElementsByTagName("senderpostcode")[0].childNodes[0].nodeValue;
			}
			if( senderpostcodeTemp.length > 15 )
			{
				$("#senderpostcodeerror").html('<span class="has-error"><font color="red">Please enter no more than 15 characters.</font></span>');
			}

			// sendercountrycode
			var sendercountrycodeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendercountrycode")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendercountrycode")[0].childNodes[0] != null) {
				$('#sendercountrycode').val(xmlVal.documentElement.getElementsByTagName("sendercountrycode")[0].childNodes[0].nodeValue);
				sendercountrycodeTemp = xmlVal.documentElement.getElementsByTagName("sendercountrycode")[0].childNodes[0].nodeValue;
			}

			if( sendercountrycodeTemp != "" ) {
				if( fncNation( sendercountrycodeTemp) == false )
				{
					$("#sendercountrycodeerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			var sendertelTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendertel")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendertel")[0].childNodes[0] != null) {
				$('#sendertel').val(xmlVal.documentElement.getElementsByTagName("sendertel")[0].childNodes[0].nodeValue);
				sendertelTemp = xmlVal.documentElement.getElementsByTagName("sendertel")[0].childNodes[0].nodeValue;
			}
			if( sendertelTemp.length > 10 ) {
				$("#sendertelerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
			}

			var sendertelextensionTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendertelextension")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendertelextension")[0].childNodes[0] != null) {
				$('#sendertelextension').val(xmlVal.documentElement.getElementsByTagName("sendertelextension")[0].childNodes[0].nodeValue);
				sendertelextensionTemp = xmlVal.documentElement.getElementsByTagName("sendertelextension")[0].childNodes[0].nodeValue;
			}
			if( sendertelextensionTemp.length > 5 ) {
				$("#sendertelextensionerror").html('<span class="has-error"><font color="red">Please enter no more than 5 characters.</font></span>');
			}
	
			var sendertelcountrycodeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendertelcountrycode")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendertelcountrycode")[0].childNodes[0] != null) {
				$('#sendertelcountrycode').val(xmlVal.documentElement.getElementsByTagName("sendertelcountrycode")[0].childNodes[0].nodeValue);
				sendertelcountrycodeTemp = xmlVal.documentElement.getElementsByTagName("sendertelcountrycode")[0].childNodes[0].nodeValue;
			}
			if( sendertelcountrycodeTemp.length > 3 ) {
				$("#sendertelcountrycodeerror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
			}

			var sendertitleTemp = "";
			var sendermiddlenameTemp = "";
			var senderfamilynameTemp = "";
			var sendergivenameTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendertitle")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendertitle")[0].childNodes[0] != null) {
				$('#sendertitle').val(xmlVal.documentElement.getElementsByTagName("sendertitle")[0].childNodes[0].nodeValue);
				sendertitleTemp = xmlVal.documentElement.getElementsByTagName("sendertitle")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("sendermiddlename")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendermiddlename")[0].childNodes[0] != null) {
				$('#sendermiddlename').val(xmlVal.documentElement.getElementsByTagName("sendermiddlename")[0].childNodes[0].nodeValue);
				sendermiddlenameTemp = xmlVal.documentElement.getElementsByTagName("sendermiddlename")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("senderfamilyname")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderfamilyname")[0].childNodes[0] != null) {
				$('#senderfamilyname').val(xmlVal.documentElement.getElementsByTagName("senderfamilyname")[0].childNodes[0].nodeValue);
				senderfamilynameTemp = xmlVal.documentElement.getElementsByTagName("senderfamilyname")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("sendergivename")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendergivename")[0].childNodes[0] != null) {
				$('#sendergivename').val(xmlVal.documentElement.getElementsByTagName("sendergivename")[0].childNodes[0].nodeValue);
				sendergivenameTemp = xmlVal.documentElement.getElementsByTagName("sendergivename")[0].childNodes[0].nodeValue;
			}

			// Validation Check
			if( sendertitleTemp.length > 10 ) {
				$("#sendertitleerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
			}
			if( sendermiddlenameTemp.length > 15 ) {
				$("#sendermiddlenameerror").html('<span class="has-error"><font color="red">Please enter no more than 15 characters.</font></span>');
			}
			if( senderfamilynameTemp.length > 35 ) {
				$("#senderfamilynameerror").html('<span class="has-error"><font color="red">Please enter no more than 35 characters.</font></span>');
			}
			if( sendergivenameTemp.length > 35 ) {
				$("#sendergivenameerror").html('<span class="has-error"><font color="red">Please enter no more than 35 characters.</font></span>');
			}

			var senderfaxTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderfax")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderfax")[0].childNodes[0] != null) {
				$('#senderfax').val(xmlVal.documentElement.getElementsByTagName("senderfax")[0].childNodes[0].nodeValue);
				senderfaxTemp = xmlVal.documentElement.getElementsByTagName("senderfax")[0].childNodes[0].nodeValue;
			}
			if( senderfaxTemp.length > 10 ) {
				$("#senderfaxerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
			}

			var senderfaxextensionTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderfaxextension")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderfaxextension")[0].childNodes[0] != null) {
				$('#senderfaxextension').val(xmlVal.documentElement.getElementsByTagName("senderfaxextension")[0].childNodes[0].nodeValue);
				senderfaxextensionTemp = xmlVal.documentElement.getElementsByTagName("senderfaxextension")[0].childNodes[0].nodeValue;
			}
			if( senderfaxextensionTemp.length > 5 ) {
				$("#senderfaxextensionerror").html('<span class="has-error"><font color="red">Please enter no more than 5 characters.</font></span>');
			}
	
			var senderfaxcountrycodeTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderfaxcountrycode")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderfaxcountrycode")[0].childNodes[0] != null) {
				$('#senderfaxcountrycode').val(xmlVal.documentElement.getElementsByTagName("senderfaxcountrycode")[0].childNodes[0].nodeValue);
				senderfaxcountrycodeTemp = xmlVal.documentElement.getElementsByTagName("senderfaxcountrycode")[0].childNodes[0].nodeValue;
			}
			if( senderfaxcountrycodeTemp.length > 3 ) {
				$("#senderfaxcountrycodeerror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
			}

			var senderemailaddressTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderemailaddress")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderemailaddress")[0].childNodes[0] != null) {
				$('#senderemailaddress').val(xmlVal.documentElement.getElementsByTagName("senderemailaddress")[0].childNodes[0].nodeValue);
				senderemailaddressTemp = xmlVal.documentElement.getElementsByTagName("senderemailaddress")[0].childNodes[0].nodeValue;
			}

			if( senderemailaddressTemp.length > 100 ) {
				$("#senderemailaddresserror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
			} else if( validateEmail(senderemailaddressTemp) == false ) {
				$("#senderemailaddresserror").html('<span class="has-error"><font color="red">Please enter a valid email address.</font></span>');
			}
			
			// Patient Characteristics
			var patientinitialTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientinitial")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientinitial")[0].childNodes[0] != null) {
				$('#patientinitial').val(xmlVal.documentElement.getElementsByTagName("patientinitial")[0].childNodes[0].nodeValue);
				patientinitialTemp = xmlVal.documentElement.getElementsByTagName("patientinitial")[0].childNodes[0].nodeValue;
			}
			if( patientinitialTemp.length > 10 )
			{
				$("#patientinitialerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
			}

			var patientgpmedicalrecordnumbTemp = "";
			var patientspecialistrecordnumbTemp = "";
			var patienthospitalrecordnumbTemp = "";
			var patientinvestigationnumbTemp = "";

			if(xmlVal.documentElement.getElementsByTagName("patientgpmedicalrecordnumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientgpmedicalrecordnumb")[0].childNodes[0] != null) {
				$('#patientgpmedicalrecordnumb').val(xmlVal.documentElement.getElementsByTagName("patientgpmedicalrecordnumb")[0].childNodes[0].nodeValue);
				patientgpmedicalrecordnumbTemp = xmlVal.documentElement.getElementsByTagName("patientgpmedicalrecordnumb")[0].childNodes[0].nodeValue;
			}
			if(xmlVal.documentElement.getElementsByTagName("patientspecialistrecordnumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientspecialistrecordnumb")[0].childNodes[0] != null) {
				$('#patientspecialistrecordnumb').val(xmlVal.documentElement.getElementsByTagName("patientspecialistrecordnumb")[0].childNodes[0].nodeValue);
				patientspecialistrecordnumbTemp = xmlVal.documentElement.getElementsByTagName("patientspecialistrecordnumb")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("patienthospitalrecordnumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patienthospitalrecordnumb")[0].childNodes[0] != null) {
				$('#patienthospitalrecordnumb').val(xmlVal.documentElement.getElementsByTagName("patienthospitalrecordnumb")[0].childNodes[0].nodeValue);
				patienthospitalrecordnumbTemp = xmlVal.documentElement.getElementsByTagName("patienthospitalrecordnumb")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("patientinvestigationnumb")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientinvestigationnumb")[0].childNodes[0] != null) {
				$('#patientinvestigationnumb').val(xmlVal.documentElement.getElementsByTagName("patientinvestigationnumb")[0].childNodes[0].nodeValue);
				patientinvestigationnumbTemp = xmlVal.documentElement.getElementsByTagName("patientinvestigationnumb")[0].childNodes[0].nodeValue;
			}

			// Validation Check
			if( patientgpmedicalrecordnumbTemp.length > 20 ) {
				$("#patientgpmedicalrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
			}
			if( patientspecialistrecordnumbTemp.length > 15 ) {
				$("#patientspecialistrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
			}
			if( patienthospitalrecordnumbTemp.length > 35 ) {
				$("#patienthospitalrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
			}
			if( patientinvestigationnumbTemp.length > 35 ) {
				$("#patientinvestigationnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
			}

			var patientbirthdateTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientbirthdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientbirthdate")[0].childNodes[0] != null) {
				$('#patientbirthdate').val(xmlVal.documentElement.getElementsByTagName("patientbirthdate")[0].childNodes[0].nodeValue);
				patientbirthdateTemp = xmlVal.documentElement.getElementsByTagName("patientbirthdate")[0].childNodes[0].nodeValue;
			}
			var patientbirthdateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientbirthdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientbirthdateformat")[0].childNodes[0] != null) {
				patientbirthdateformatTemp = xmlVal.documentElement.getElementsByTagName("patientbirthdateformat")[0].childNodes[0].nodeValue;
			}
			if( patientbirthdateTemp.length > 0 ) {
				if( patientbirthdateformatTemp != "102" )
					$("#patientbirthdateerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			} else if( patientbirthdateTemp.length > 0 && patientbirthdateTemp.length == 0 ) {
				$("#patientbirthdateerror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
			}

			var patientonsetageTemp = "";
			var patientonsetageunitTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientonsetage")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientonsetage")[0].childNodes[0] != null) {
				$('#patientonsetage').val(xmlVal.documentElement.getElementsByTagName("patientonsetage")[0].childNodes[0].nodeValue);
				patientonsetageTemp = xmlVal.documentElement.getElementsByTagName("patientonsetage")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("patientonsetageunit")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientonsetageunit")[0].childNodes[0] != null) {
				$('#patientonsetageunit').val(xmlVal.documentElement.getElementsByTagName("patientonsetageunit")[0].childNodes[0].nodeValue);
				patientonsetageunitTemp = xmlVal.documentElement.getElementsByTagName("patientonsetageunit")[0].childNodes[0].nodeValue;
			}

			// Validation Check
			if( patientonsetageTemp.length > 0 ) {
				if( patientonsetageunitTemp.length <= 0 ) {
					$("#patientonsetageuniterror").html('<span class="has-error"><font color="red">Appropriate age unit required</font></span>');
				} else if( patientonsetageunitTemp != "800" && patientonsetageunitTemp != "801" && patientonsetageunitTemp != "802" &&
						   patientonsetageunitTemp != "803" && patientonsetageunitTemp != "804" && patientonsetageunitTemp != "805" ) {
					$("#patientonsetageuniterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			var patientagegroupTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientagegroup")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientagegroup")[0].childNodes[0] != null) {
				$('#patientagegroup').val(xmlVal.documentElement.getElementsByTagName("patientagegroup")[0].childNodes[0].nodeValue);
				patientagegroupTemp = xmlVal.documentElement.getElementsByTagName("patientagegroup")[0].childNodes[0].nodeValue;
				if( patientagegroupTemp != "1" && patientagegroupTemp != "2" && patientagegroupTemp != "3" && patientagegroupTemp != "4" &&
					patientagegroupTemp != "5" && patientagegroupTemp != "6" ) {
					$("#patientagegrouperror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			var patientlastmenstrualdateTemp = "";
			var lastmenstrualdateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientlastmenstrualdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientlastmenstrualdate")[0].childNodes[0] != null) {
				$('#patientlastmenstrualdate').val(xmlVal.documentElement.getElementsByTagName("patientlastmenstrualdate")[0].childNodes[0].nodeValue);
				patientlastmenstrualdateTemp = xmlVal.documentElement.getElementsByTagName("patientlastmenstrualdate")[0].childNodes[0].nodeValue;
			}
			if(xmlVal.documentElement.getElementsByTagName("lastmenstrualdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("lastmenstrualdateformat")[0].childNodes[0] != null) {
				$('#lastmenstrualdateformat').val(xmlVal.documentElement.getElementsByTagName("lastmenstrualdateformat")[0].childNodes[0].nodeValue);
				lastmenstrualdateformatTemp = xmlVal.documentElement.getElementsByTagName("lastmenstrualdateformat")[0].childNodes[0].nodeValue;
			}

			// Validation Check
			if( patientlastmenstrualdateTemp.length > 0 ) {
				if( lastmenstrualdateformatTemp.length <= 0 ) {
					$("#lastmenstrualdateformaterror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
				} else if( lastmenstrualdateformatTemp != "102" && lastmenstrualdateformatTemp != "602" && lastmenstrualdateformatTemp != "610" ) {
					$("#lastmenstrualdateformaterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			var gestationperiodTemp = "";
			var gestationperiodunitTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("gestationperiod")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("gestationperiod")[0].childNodes[0] != null) {
				$('#gestationperiod').val(xmlVal.documentElement.getElementsByTagName("gestationperiod")[0].childNodes[0].nodeValue);
				gestationperiodTemp = xmlVal.documentElement.getElementsByTagName("gestationperiod")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("gestationperiodunit")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("gestationperiodunit")[0].childNodes[0] != null) {
				$('#gestationperiodunit').val(xmlVal.documentElement.getElementsByTagName("gestationperiodunit")[0].childNodes[0].nodeValue);
				gestationperiodunitTemp = xmlVal.documentElement.getElementsByTagName("gestationperiodunit")[0].childNodes[0].nodeValue;
			}

			// Validation Check
			if( gestationperiodTemp.length > 0 ) {
				if( gestationperiodunitTemp.length <= 0 ) {
					$("#gestationperioduniterror").html('<span class="has-error"><font color="red">Appropriate period unit is required</font></span>');
				} else if( gestationperiodunitTemp != "802" && gestationperiodunitTemp != "803" && 
					       gestationperiodunitTemp != "804" && gestationperiodunitTemp != "810" ) {
					$("#gestationperioduniterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			var patientheightTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientheight")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientheight")[0].childNodes[0] != null) {
				$('#patientheight').val(xmlVal.documentElement.getElementsByTagName("patientheight")[0].childNodes[0].nodeValue);
				patientheightTemp = xmlVal.documentElement.getElementsByTagName("patientheight")[0].childNodes[0].nodeValue;
			}
			if( patientheightTemp.length > 3 ) {
				$("#patientheighterror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
			}
			
			var patientweightTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientweight")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientweight")[0].childNodes[0] != null) {
				$('#patientweight').val(xmlVal.documentElement.getElementsByTagName("patientweight")[0].childNodes[0].nodeValue);
				patientweightTemp = xmlVal.documentElement.getElementsByTagName("patientweight")[0].childNodes[0].nodeValue;
			}
			if( patientweightTemp.length > 6 ) {
				$("#patientweighterror").html('<span class="has-error"><font color="red">Please enter no more than 6 characters.</font></span>');
			}

			
			var patientsexTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientsex")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientsex")[0].childNodes[0] != null) {
				$('#patientsex').val(xmlVal.documentElement.getElementsByTagName("patientsex")[0].childNodes[0].nodeValue);
				patientsexTemp = xmlVal.documentElement.getElementsByTagName("patientsex")[0].childNodes[0].nodeValue;
				if( patientsexTemp != "1" && patientsexTemp != "2" ) {
					$("#patientsexerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			
			var resultstestsproceduresTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("resultstestsprocedures")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("resultstestsprocedures")[0].childNodes[0] != null) {
				$('#resultstestsprocedures').val(xmlVal.documentElement.getElementsByTagName("resultstestsprocedures")[0].childNodes[0].nodeValue);
				resultstestsproceduresTemp = xmlVal.documentElement.getElementsByTagName("resultstestsprocedures")[0].childNodes[0].nodeValue;
				if( resultstestsproceduresTemp.length > 2000 ) 
					$("#resultstestsprocedureserror").html('<span class="has-error"><font color="red">Please enter no more than 2000 characters.</font></span>');
			}

			// Death cause
			var patientdeathdateTemp = "";			// Date of death
			var patientdeathdateformatTemp = "";	// Date Format of death
			if(xmlVal.documentElement.getElementsByTagName("patientdeathdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientdeathdate")[0].childNodes[0] != null) {
				$('#patientdeathdate').val(xmlVal.documentElement.getElementsByTagName("patientdeathdate")[0].childNodes[0].nodeValue);
				patientdeathdateTemp = xmlVal.documentElement.getElementsByTagName("patientdeathdate")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("patientdeathdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientdeathdateformat")[0].childNodes[0] != null) {
				$('#patientdeathdateformat').val(xmlVal.documentElement.getElementsByTagName("patientdeathdateformat")[0].childNodes[0].nodeValue);
				patientdeathdateformatTemp = xmlVal.documentElement.getElementsByTagName("patientdeathdateformat")[0].childNodes[0].nodeValue;
			}

			if( patientdeathdateTemp.length > 0 ) {
				if( patientdeathdateformatTemp.length <= 0 ) {
					$("#patientdeathdateformaterror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
				} else if( patientdeathdateformatTemp != "602" && patientdeathdateformatTemp != "102" && patientdeathdateformatTemp != "610" ) {
					$("#patientdeathdateformaterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}

			// Was autopsy done? 
			var patientautopsyyesnoTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientautopsyyesno")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientautopsyyesno")[0].childNodes[0] != null) {
				$('#patientautopsyyesno').val(xmlVal.documentElement.getElementsByTagName("patientautopsyyesno")[0].childNodes[0].nodeValue);
				patientautopsyyesnoTemp = xmlVal.documentElement.getElementsByTagName("patientautopsyyesno")[0].childNodes[0].nodeValue;
			}

			if( patientautopsyyesnoTemp.length > 0 )
			{
				if( patientautopsyyesnoTemp != "1" && patientautopsyyesnoTemp != "2" && patientautopsyyesnoTemp != "3" ) {
					$("#patientautopsyyesnoerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
				if( patientautopsyyesnoTemp == "1" ) {
					$('#patientautopsyyesnoblock').show();
				}
			}

			if (( patientinitialTemp == null
				|| patientinitialTemp == "")
				&&(patientbirthdateTemp == null
				|| patientbirthdateTemp == "")
				&&(patientonsetageTemp == null
				|| patientonsetageTemp == "")
				&&(patientagegroupTemp == null
				|| patientagegroupTemp == "")
				&&(patientsexTemp == null
				|| patientsexTemp == ""))
			{
				$("#patientcharacteristicserror").html('<span class="has-error"><font color="red">At least one of patient initial, date of birth,  sex, onset age or age group must be filled in</font></span><br/><br/>');
			}
			else {
				$("#patientcharacteristicserror").html('');
			}

			// Death Cause repeatable block
			rpt = xmlVal.documentElement.getElementsByTagName("patientdeathcause").length;
			for (i=0;i<rpt;i++){
				var patientdeathreportcodeTemp = "";
				var patientdeathreportTemp = "";
				var patientdeathreportmeddraversionTemp = "";
				var errorTemp = "0";
				if(xmlVal.documentElement.getElementsByTagName("patientdeathreportcode")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdeathreportcode")[i].childNodes[0] != null) {
					patientdeathreportcodeTemp = xmlVal.documentElement.getElementsByTagName("patientdeathreportcode")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdeathreport")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdeathreport")[i].childNodes[0] != null) {
					patientdeathreportTemp = xmlVal.documentElement.getElementsByTagName("patientdeathreport")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdeathreportmeddraversion")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdeathreportmeddraversion")[i].childNodes[0] != null) {
					patientdeathreportmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("patientdeathreportmeddraversion")[i].childNodes[0].nodeValue;
				}
				if( patientdeathreportTemp != "" && patientdeathreportmeddraversionTemp != "" ) {
					// MedDRA LLT 명칭 가져오기
					if( isNaN(patientdeathreportTemp) == false )
					{
						var LLTName = getMedDRA(patientdeathreportTemp, patientdeathreportmeddraversionTemp);
						if( LLTName != "ERROR" ) {
							patientdeathreportcodeTemp = patientdeathreportTemp;
							patientdeathreportTemp = LLTName;
						} else {
							errorTemp = "1";
						}
					}

					var obj={
						error : errorTemp,
						patientdeathreportcode : patientdeathreportcodeTemp,
						patientdeathreport : patientdeathreportTemp,
						patientdeathreportmeddraver : patientdeathreportmeddraversionTemp
					}
					arrDeathCause.push(obj);
				}
			}

			fnDisplayDeathCause();

			// Autopsy-determined cause of Death repeatable block
			rpt = xmlVal.documentElement.getElementsByTagName("patientautopsy").length;
			for (i=0;i<rpt;i++){
				var patientdetermineautopsycodeTemp = "";
				var patientdetermineautopsyTemp = "";
				var patientdetermautopsmeddraversionTemp = "";
				if(xmlVal.documentElement.getElementsByTagName("patientdetermineautopsycode")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdetermineautopsycode")[i].childNodes[0] != null) {
					patientdetermineautopsycodeTemp = xmlVal.documentElement.getElementsByTagName("patientdetermineautopsycode")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdetermineautopsy")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdetermineautopsy")[i].childNodes[0] != null) {
					patientdetermineautopsyTemp = xmlVal.documentElement.getElementsByTagName("patientdetermineautopsy")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdetermautopsmeddraversion")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdetermautopsmeddraversion")[i].childNodes[0] != null) {
					patientdetermautopsmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("patientdetermautopsmeddraversion")[i].childNodes[0].nodeValue;
				}

				if( patientdetermineautopsyTemp != "" && patientdetermautopsmeddraversionTemp != "" ) {
					// MedDRA LLT 명칭 가져오기
					if( isNaN(patientdetermineautopsyTemp) == false )
					{
						var LLTName = getMedDRA(patientdetermineautopsyTemp, patientdetermautopsmeddraversionTemp);
						if( LLTName != "ERROR" ) {
							patientdetermineautopsycodeTemp = patientdetermineautopsyTemp;
							patientdetermineautopsyTemp = LLTName;
						}
					}
					var obj={
						patientdetermineautopsycode : patientdetermineautopsycodeTemp,
						patientdetermineautopsy : patientdetermineautopsyTemp,
						patientdetermautopsmeddraver : patientdetermautopsmeddraversionTemp
					}
					arrAutopsyDetermined.push(obj);
				}
			}

			fnDisplayAutopsyDetermined();

			var patientmedicalhistorytextTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("patientmedicalhistorytext")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("patientmedicalhistorytext")[0].childNodes[0] != null) {
				$('#patientmedicalhistorytext').val(xmlVal.documentElement.getElementsByTagName("patientmedicalhistorytext")[0].childNodes[0].nodeValue);
			}
			if( patientmedicalhistorytextTemp.length > 10000 ) {
				$("#patientmedicalhistorytexterror").html('<span class="has-error"><font color="red">Please enter no more than 10000 characters.</font></span>');
			}

			// RelevantMedicalHistory
			rpt = xmlVal.documentElement.getElementsByTagName("medicalhistoryepisode").length;
			x = xmlVal.documentElement.getElementsByTagName("medicalhistoryepisode");
			for (i=0;i<rpt;i++){
				var patientepisodenamecodeTemp = "";
				var patientepisodenameTemp = "";
				var patientepisodenamemeddraversionTemp = "";
				var patientmedicalcontinueTemp = "";
				var patientmedicalstartdateformatTemp = "";
				var patientmedicalstartdateTemp = "";
				var patientmedicalenddateformatTemp = "";
				var patientmedicalenddateTemp = "";
				var patientmedicalcommentTemp = "";
				var errorTemp = "0";
				
				if( x[i].getElementsByTagName("patientepisodename")[0] != null && typeof x[i].getElementsByTagName("patientepisodename")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientepisodename").length > 0 ) {
						if( x[i].getElementsByTagName("patientepisodename")[0].childNodes[0] != null) {
							patientepisodenameTemp = x[i].getElementsByTagName("patientepisodename")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("patientepisodecode")[0] != null && typeof x[i].getElementsByTagName("patientepisodecode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientepisodecode").length > 0 ) {
						if( x[i].getElementsByTagName("patientepisodecode")[0].childNodes[0] != null) {
							patientepisodenamecodeTemp = x[i].getElementsByTagName("patientepisodecode")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("patientepisodenamemeddraversion")[0] != null && typeof x[i].getElementsByTagName("patientepisodenamemeddraversion")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientepisodenamemeddraversion").length > 0 ) {
						if( x[i].getElementsByTagName("patientepisodenamemeddraversion")[0].childNodes[0] != null) {
							patientepisodenamemeddraversionTemp = x[i].getElementsByTagName("patientepisodenamemeddraversion")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("patientmedicalcontinue")[0] != null && typeof x[i].getElementsByTagName("patientmedicalcontinue")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalcontinue").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalcontinue")[0].childNodes[0] != null) {
							patientmedicalcontinueTemp = x[i].getElementsByTagName("patientmedicalcontinue")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("patientmedicalstartdateformat")[0] != null && typeof x[i].getElementsByTagName("patientmedicalstartdateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalstartdateformat").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalstartdateformat")[0].childNodes[0] != null) {
							patientmedicalstartdateformatTemp = x[i].getElementsByTagName("patientmedicalstartdateformat")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("patientmedicalstartdate")[0] != null && typeof x[i].getElementsByTagName("patientmedicalstartdate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalstartdate").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalstartdate")[0].childNodes[0] != null) {
							patientmedicalstartdateTemp = x[i].getElementsByTagName("patientmedicalstartdate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("patientmedicalenddateformat")[0] != null && typeof x[i].getElementsByTagName("patientmedicalenddateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalenddateformat").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalenddateformat")[0].childNodes[0] != null) {
							patientmedicalenddateformatTemp = x[i].getElementsByTagName("patientmedicalenddateformat")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("patientmedicalenddate")[0] != null && typeof x[i].getElementsByTagName("patientmedicalenddate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalenddate").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalenddate")[0].childNodes[0] != null) {
							patientmedicalenddateTemp = x[i].getElementsByTagName("patientmedicalenddate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("patientmedicalcomment")[0] != null && typeof x[i].getElementsByTagName("patientmedicalcomment")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("patientmedicalcomment").length > 0 ) {
						if( x[i].getElementsByTagName("patientmedicalcomment")[0].childNodes[0] != null) {
							patientmedicalcommentTemp = x[i].getElementsByTagName("patientmedicalcomment")[0].childNodes[0].nodeValue;
						}
					}
				}

				// Validation Check
				if( patientepisodenameTemp.length > 0 ) {
					if(patientepisodenamemeddraversionTemp == "" ){
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(patientepisodenameTemp) == false )
						{
							var LLTName = getMedDRA(patientepisodenameTemp, patientepisodenamemeddraversionTemp);
							if( LLTName != "ERROR" ) {
								patientepisodenamecodeTemp = patientepisodenameTemp;
								patientepisodenameTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					} 
				}
				if (patientmedicalstartdateTemp.length > 0 ) {
					if( patientmedicalstartdateformatTemp == "" ){
						errorTemp = "1";
					} else if( patientmedicalstartdateformatTemp != "102" && patientmedicalstartdateformatTemp != "610" &&
							   patientmedicalstartdateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if (patientmedicalenddateTemp.length > 0 ) {
					if(patientmedicalenddateformatTemp == "" ){
						errorTemp = "1";
					} else if(patientmedicalenddateformatTemp != "102" && patientmedicalenddateformatTemp != "610" &&
							   patientmedicalenddateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if( patientmedicalcontinueTemp.length > 0 ) {
					if( patientmedicalcontinueTemp != "1" && patientmedicalcontinueTemp != "2" && patientmedicalcontinueTemp != "3" ) {
						errorTemp = "1";
					}	
				}
				if( patientmedicalcommentTemp.length > 100 ) {
					errorTemp = "1";
				}

				var obj={
						error : errorTemp,
						patientepisodenamecode : patientepisodenamecodeTemp,
				 		patientepisodename : patientepisodenameTemp,
						patientepisodenamemeddraver : patientepisodenamemeddraversionTemp,
						patientmedicalstartdate : patientmedicalstartdateTemp,
						patientmedicalstartdateformat : patientmedicalstartdateformatTemp,
						patientmedicalenddate : patientmedicalenddateTemp,
						patientmedicalenddateformat : patientmedicalenddateformatTemp,
						patientmedicalcontinue : patientmedicalcontinueTemp,
						patientmedicalcomment : patientmedicalcommentTemp
					}
				if( patientepisodenameTemp != "" || patientmedicalstartdateTemp != "" || patientmedicalenddateTemp != "" ) {
					arrRelevantMedicalHistory.push(obj);
					$('#medicaltocommentsshowhide').show();
				}
			}

			fnDisplayRelevantMedicalHistory();
			
			// patientpastdrugtherapy
			rpt = xmlVal.documentElement.getElementsByTagName("patientpastdrugtherapy").length;
			for (i=0;i<rpt;i++){
				var patientdrugnameTemp = "";
				var patientdrugstartdateformatTemp = "";
				var patientdrugstartdateTemp = "";
				var patientdrugenddateformatTemp = "";
				var patientindicationmeddraversionTemp = "";
				var patientdrugindicationcodeTemp = "";
				var patientdrugindicationTemp = "";
				var patientdrugenddateTemp = "";
				var patientdrugreactioncodeTemp = "";
				var patientdrugreactionTemp = "";
				var patientdrgreactionmeddraversionTemp = "";
				var errorTemp = "0";
				
				if(xmlVal.documentElement.getElementsByTagName("patientdrugname")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugname")[i].childNodes[0] != null) {
					patientdrugnameTemp = xmlVal.documentElement.getElementsByTagName("patientdrugname")[i].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("patientdrugstartdateformat")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugstartdateformat")[i].childNodes[0] != null) {
					patientdrugstartdateformatTemp = xmlVal.documentElement.getElementsByTagName("patientdrugstartdateformat")[i].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("patientdrugstartdate")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugstartdate")[i].childNodes[0] != null) {
					patientdrugstartdateTemp = xmlVal.documentElement.getElementsByTagName("patientdrugstartdate")[i].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("patientdrugenddateformat")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugenddateformat")[i].childNodes[0] != null) {
					patientdrugenddateformatTemp = xmlVal.documentElement.getElementsByTagName("patientdrugenddateformat")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdrugenddate")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugenddate")[i].childNodes[0] != null) {
					patientdrugenddateTemp = xmlVal.documentElement.getElementsByTagName("patientdrugenddate")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientindicationmeddraversion")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientindicationmeddraversion")[i].childNodes[0] != null) {
					patientindicationmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("patientindicationmeddraversion")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdrugindicationcode")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugindicationcode")[i].childNodes[0] != null) {
					patientdrugindicationcodeTemp = xmlVal.documentElement.getElementsByTagName("patientdrugindicationcode")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdrugindication")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugindication")[i].childNodes[0] != null) {
					patientdrugindicationTemp = xmlVal.documentElement.getElementsByTagName("patientdrugindication")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdrgreactionmeddraversion")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrgreactionmeddraversion")[i].childNodes[0] != null) {
					patientdrgreactionmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("patientdrgreactionmeddraversion")[i].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("patientdrugreactioncode")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugreactioncode")[i].childNodes[0] != null) {
					patientdrugreactioncodeTemp = xmlVal.documentElement.getElementsByTagName("patientdrugreactioncode")[i].childNodes[0].nodeValue;
				}
				if(xmlVal.documentElement.getElementsByTagName("patientdrugreaction")[i] != null
						&& xmlVal.documentElement.getElementsByTagName("patientdrugreaction")[i].childNodes[0] != null) {
					patientdrugreactionTemp = xmlVal.documentElement.getElementsByTagName("patientdrugreaction")[i].childNodes[0].nodeValue;
				}

				// Validation Check
				if( patientdrugnameTemp.length > 100 ) {
					errorTemp = "1";
				}
				// Patient Drug Name
				if( patientdrugnameTemp.length > 0 ) {
					if( checkDrug(patientdrugnameTemp) == "ERROR" )
						errorTemp = "1";
				}
				if (patientdrugstartdateTemp.length > 0 ) {
					if(patientdrugstartdateformatTemp == "" ){
						errorTemp = "1";
					} else if( patientdrugstartdateformatTemp != "102" && patientdrugstartdateformatTemp != "610" &&
							   patientdrugstartdateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if (patientdrugenddateTemp.length > 0 ) {
					if(patientdrugenddateformatTemp == "" ){
						errorTemp = "1";
					} else if( patientdrugenddateformatTemp != "102" && patientdrugenddateformatTemp != "610" &&
							   patientdrugenddateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if( patientdrugindicationTemp.length > 0 ) {
					if(patientindicationmeddraversionTemp == "" ){
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(patientdrugindicationTemp) == false )
						{
							var LLTName = getMedDRA(patientdrugindicationTemp, patientindicationmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								patientdrugindicationcodeTemp = patientdrugindicationTemp;
								patientdrugindicationTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					}
				}
				if( patientdrugreactionTemp.length > 0 ) {
					if(patientdrgreactionmeddraversionTemp == "" ){
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(patientdrugreactionTemp) == false )
						{
							var LLTName = getMedDRA(patientdrugreactionTemp, patientdrgreactionmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								patientdrugreactioncodeTemp = patientdrugreactionTemp;
								patientdrugreactionTemp = LLTName;
							}
						}
					}
				}

				var obj={
					error : errorTemp,
					patientdrugname : patientdrugnameTemp,
					patientdrugstartdate : patientdrugstartdateTemp,
					patientdrugstartdateformat : patientdrugstartdateformatTemp,
					patientdrugenddate : patientdrugenddateTemp,
					patientdrugenddateformat : patientdrugenddateformatTemp,
					patientdrugindicationcode : patientdrugindicationcodeTemp,
					patientdrugindication : patientdrugindicationTemp,
					patientindicationmeddraversion : patientindicationmeddraversionTemp,
					patientdrugreaction : patientdrugreactionTemp,
					patientdrgreactionmeddraver : patientdrgreactionmeddraversionTemp
				}
				if( patientdrugnameTemp != "" || patientdrugstartdateTemp != "" || patientdrugenddateTemp != "" ) {
					arrRelevantPastDrugTherapy.push(obj);
					$('#nameofdrugasreportedtomeddrashowhide').show();
				}
			}

			fnDisplayRelevantPastDrugTherapy();

			if(xmlVal.documentElement.getElementsByTagName("parentidentification")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentidentification")[0].childNodes[0] != null) {
				$('#parentidentification').val(xmlVal.documentElement.getElementsByTagName("parentidentification")[0].childNodes[0].nodeValue);
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			var parentbirthdateTemp = "";
			var parentbirthdateformatTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("parentbirthdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentbirthdateformat")[0].childNodes[0] != null) {
				$('#parentbirthdateformat').val(xmlVal.documentElement.getElementsByTagName("parentbirthdateformat")[0].childNodes[0].nodeValue);
				parentbirthdateformatTemp = xmlVal.documentElement.getElementsByTagName("parentbirthdateformat")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if(xmlVal.documentElement.getElementsByTagName("parentbirthdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentbirthdate")[0].childNodes[0] != null) {
				$('#parentbirthdate').val(xmlVal.documentElement.getElementsByTagName("parentbirthdate")[0].childNodes[0].nodeValue);
				parentbirthdateTemp = xmlVal.documentElement.getElementsByTagName("parentbirthdate")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			var parentageTemp = "";
			var parentageunitTemp = "";
			
			if(xmlVal.documentElement.getElementsByTagName("parentage")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentage")[0].childNodes[0] != null) {
				$('#parentage').val(xmlVal.documentElement.getElementsByTagName("parentage")[0].childNodes[0].nodeValue);
				parentageTemp = xmlVal.documentElement.getElementsByTagName("parentage")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if(xmlVal.documentElement.getElementsByTagName("parentageunit")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentageunit")[0].childNodes[0] != null) {
				$('#parentageunit').val(xmlVal.documentElement.getElementsByTagName("parentageunit")[0].childNodes[0].nodeValue);
				parentageunitTemp = xmlVal.documentElement.getElementsByTagName("parentageunit")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			var parentlastmenstrualdateformatTemp = "";
			var parentlastmenstrualdateTemp = "";
			
			if(xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdateformat")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdateformat")[0].childNodes[0] != null) {
				$('#parentlastmenstrualdateformat').val(xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdateformat")[0].childNodes[0].nodeValue);
				parentlastmenstrualdateformatTemp = xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdateformat")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if(xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdate")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdate")[0].childNodes[0] != null) {
				$('#parentlastmenstrualdate').val(xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdate")[0].childNodes[0].nodeValue);
				parentlastmenstrualdateTemp = xmlVal.documentElement.getElementsByTagName("parentlastmenstrualdate")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			var parentweightTemp = "";
			var parentheightTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("parentweight")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentweight")[0].childNodes[0] != null) {
				$('#parentweight').val(xmlVal.documentElement.getElementsByTagName("parentweight")[0].childNodes[0].nodeValue);
				parentweightTemp = xmlVal.documentElement.getElementsByTagName("parentweight")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if(xmlVal.documentElement.getElementsByTagName("parentheight")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentheight")[0].childNodes[0] != null) {
				$('#parentheight').val(xmlVal.documentElement.getElementsByTagName("parentheight")[0].childNodes[0].nodeValue);
				parentheightTemp = xmlVal.documentElement.getElementsByTagName("parentheight")[0].childNodes[0].nodeValue;
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if (parentweightTemp.length > 6 ) {
				$("#parentweighterror").html('<span class="has-error"><font color="red">Please enter no more than 6 characters.</font></span>');
			}
			if (parentheightTemp.length > 3 ) {
				$("#parentheighterror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
			}

			var parentsexTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("parentsex")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentsex")[0].childNodes[0] != null) {
				$('#parentsex').val(xmlVal.documentElement.getElementsByTagName("parentsex")[0].childNodes[0].nodeValue);
				parentsexTemp = xmlVal.documentElement.getElementsByTagName("parentsex")[0].childNodes[0].nodeValue;
				if( parentsexTemp != "1" && parentsexTemp != "2" ) {
					$("#parentsexerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
				$('#parentinitialstolastmenstrualshowhide').show();
			}

			if(xmlVal.documentElement.getElementsByTagName("parentmedicalrelevanttext")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalrelevanttext")[0].childNodes[0] != null) {
				$('#parentmedicalrelevanttext').val(xmlVal.documentElement.getElementsByTagName("parentmedicalrelevanttext")[0].childNodes[0].nodeValue);
				$('#textforrelevanttocommentsshowhide').show();
				iTextforrelevanttoCommentsShowHide = 1;
			}

			// Validation Check
			if (parentbirthdateTemp.length > 0 ) {
				if(parentbirthdateformatTemp == "" ){
					$("#parentbirthdateerror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
				} else if( parentbirthdateformatTemp != "102" ) {
					$("#parentbirthdateerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			if (parentageTemp.length > 0 ) {
				if(parentageunitTemp == "" ){
					$("#parentageerror").html('<span class="has-error"><font color="red">Appropriate age unit is required</font></span>');
				} else if( parentageunitTemp != "801" ) {
					$("#parentageerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
				}
			}
			if (parentlastmenstrualdateTemp.length > 0 ) {
				if(parentlastmenstrualdateformatTemp == "" ){
					$("#parentlastmenstrualdateerror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
				} else if( parentlastmenstrualdateformatTemp != "102" ) {
					$("#parentlastmenstrualdateerror").html('<span class="has-error"><font color="red">Invalid code is required</font></span>');
				}
			}

			rpt1 = xmlVal.documentElement.getElementsByTagName("parentmedicalhistoryepisode").length;

			for (j=0;j<rpt1;j++){
				var parentmdepisodemeddraversionTemp = "";
				var parentmedicalepisodenamecodeTemp = "";
				var parentmedicalepisodenameTemp = "";
				var parentmedicalstartdateformatTemp = "";
				var parentmedicalenddateTemp = "";
				var parentmedicalcontinueTemp = "";
				var parentmedicalstartdateTemp = "";
				var parentmedicalenddateformatTemp = "";
				var parentmedicalcommentTemp = "";
				var errorTemp = "0";

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalepisodenamecode")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalepisodenamecode")[j].childNodes[0] != null) {
					parentmedicalepisodenamecodeTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalepisodenamecode")[j].childNodes[0].nodeValue;
				}	

				if(xmlVal.documentElement.getElementsByTagName("parentmdepisodemeddraversion")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmdepisodemeddraversion")[j].childNodes[0] != null) {
					parentmdepisodemeddraversionTemp = xmlVal.documentElement.getElementsByTagName("parentmdepisodemeddraversion")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalepisodename")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalepisodename")[j].childNodes[0] != null) {
					parentmedicalepisodenameTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalepisodename")[j].childNodes[0].nodeValue;

					if( isNaN(parentmedicalepisodenameTemp) == false )
					{
						var LLTName = getMedDRA(parentmedicalepisodenameTemp, parentmdepisodemeddraversionTemp);
						if( LLTName != "ERROR" ) {
							parentmedicalepisodenamecodeTemp = parentmedicalepisodenameTemp;
							parentmedicalepisodenameTemp = LLTName;
						} else {
							errorTemp = "1";
						}
					}
				}	

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalstartdateformat")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalstartdateformat")[j].childNodes[0] != null) {
					parentmedicalstartdateformatTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalstartdateformat")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalstartdate")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalstartdate")[j].childNodes[0] != null) {
					parentmedicalstartdateTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalstartdate")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalenddateformat")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalenddateformat")[j].childNodes[0] != null) {
					parentmedicalenddateformatTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalenddateformat")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalenddate")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalenddate")[j].childNodes[0] != null) {
					parentmedicalenddateTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalenddate")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentmedicalcontinue")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalcontinue")[j].childNodes[0] != null) {
					parentmedicalcontinueTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalcontinue")[j].childNodes[0].nodeValue;
				}

				// parentmedicalcomment
				if(xmlVal.documentElement.getElementsByTagName("parentmedicalcomment")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentmedicalcomment")[j].childNodes[0] != null) {
					parentmedicalcommentTemp = xmlVal.documentElement.getElementsByTagName("parentmedicalcomment")[j].childNodes[0].nodeValue;
				}

				// Validation Check
				if (parentmedicalepisodenameTemp.length > 0 ) {
					if(parentmdepisodemeddraversionTemp == "" ){
						errorTemp = "1";
					}
				}
				if (parentmedicalstartdateTemp.length > 0 ) {
					if(parentmedicalstartdateformatTemp == "" ){
						errorTemp = "1";
					} else if( parentmedicalstartdateformatTemp != "102" && parentmedicalstartdateformatTemp != "610" &&
							   parentmedicalstartdateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if (parentmedicalenddateTemp.length > 0 ) {
					if(parentmedicalenddateformatTemp == "" ){
						errorTemp = "1";
					} else if( parentmedicalenddateformatTemp != "102" && parentmedicalenddateformatTemp != "610" &&
							   parentmedicalenddateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}

				if( parentmedicalcontinueTemp.length > 0 ) {
					if( parentmedicalcontinueTemp != "1" && parentmedicalcontinueTemp != "2" && parentmedicalcontinueTemp != "3" ) {
						errorTemp = "1";
					}	
				}

				if( parentmedicalcommentTemp.length > 100 ) {
					errorTemp = "1";
				}

				var obj={
					error : errorTemp,
					parentmedicalepisodenamecode : parentmedicalepisodenamecodeTemp,
					parentmedicalepisodename : parentmedicalepisodenameTemp,
					parentmdepisodemeddraversion : parentmdepisodemeddraversionTemp,
					parentmedicalstartdate : parentmedicalstartdateTemp,
					parentmedicalstartdateformat : parentmedicalstartdateformatTemp,
					parentmedicalenddate : parentmedicalenddateTemp,
					parentmedicalenddateformat : parentmedicalenddateformatTemp,
					parentmedicalcontinue : parentmedicalcontinueTemp,
					parentmedicalcomment : parentmedicalcommentTemp
				}
				
				if( parentmedicalepisodenameTemp != "" || parentmedicalstartdateTemp != "" || parentmedicalenddateTemp != "" ) {
					arrParentRelevantMedicalHistory.push(obj);
					$('#textforrelevanttocommentsshowhide').show();
					iTextforrelevanttoCommentsShowHide = 1;
					$('#medicalhistorytocommentsshowhide').show();
				}
			}

			fnDisplayParentRelevantMedicalHistory();

			rpt1 = xmlVal.documentElement.getElementsByTagName("parentpastdrugtherapy").length;
			
			for (j=0;j<rpt1;j++){
				var parentdrugnameTemp = "";
				var parentdrugstartdateformatTemp = "";
				var parentdrugstartdateTemp = "";
				var parentdrugenddateformatTemp = "";
				var parentdrugenddateTemp = "";
				var parentdrgindicationmeddraversionTemp = "";
				var parentdrugindicationcodeTemp = "";
				var parentdrugindicationTemp = "";
				var parentdrgreactionmeddraversionTemp = "";
				var parentdrugreactioncodeTemp = "";
				var parentdrugreactionTemp = "";
				var errorTemp = "0";

				if(xmlVal.documentElement.getElementsByTagName("parentdrugname")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugname")[j].childNodes[0] != null) {
					parentdrugnameTemp = xmlVal.documentElement.getElementsByTagName("parentdrugname")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugstartdateformat")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugstartdateformat")[j].childNodes[0] != null) {
					parentdrugstartdateformatTemp = xmlVal.documentElement.getElementsByTagName("parentdrugstartdateformat")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugstartdate")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugstartdate")[j].childNodes[0] != null) {
					parentdrugstartdateTemp = xmlVal.documentElement.getElementsByTagName("parentdrugstartdate")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugenddateformat")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugenddateformat")[j].childNodes[0] != null) {
					parentdrugenddateformatTemp = xmlVal.documentElement.getElementsByTagName("parentdrugenddateformat")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugenddate")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugenddate")[j].childNodes[0] != null) {
					parentdrugenddateTemp = xmlVal.documentElement.getElementsByTagName("parentdrugenddate")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrgindicationmeddraversion")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrgindicationmeddraversion")[j].childNodes[0] != null) {
					parentdrgindicationmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("parentdrgindicationmeddraversion")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugindicationcode")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugindicationcode")[j].childNodes[0] != null) {
					parentdrugindicationcodeTemp = xmlVal.documentElement.getElementsByTagName("parentdrugindicationcode")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugindication")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugindication")[j].childNodes[0] != null) {
					parentdrugindicationTemp = xmlVal.documentElement.getElementsByTagName("parentdrugindication")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrgreactionmeddraversion")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrgreactionmeddraversion")[j].childNodes[0] != null) {
					parentdrgreactionmeddraversionTemp = xmlVal.documentElement.getElementsByTagName("parentdrgreactionmeddraversion")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugreactioncode")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugreactioncode")[j].childNodes[0] != null) {
					parentdrugreactioncodeTemp = xmlVal.documentElement.getElementsByTagName("parentdrugreactioncode")[j].childNodes[0].nodeValue;
				}

				if(xmlVal.documentElement.getElementsByTagName("parentdrugreaction")[j] != null
					&& xmlVal.documentElement.getElementsByTagName("parentdrugreaction")[j].childNodes[0] != null) {
					parentdrugreactionTemp = xmlVal.documentElement.getElementsByTagName("parentdrugreaction")[j].childNodes[0].nodeValue;
				}
					
				// Validation Check
				// Parent Drug Name
				if( parentdrugnameTemp.length > 0 ) {
					if( checkDrug(parentdrugnameTemp) == "ERROR" )
						errorTemp = "1";
				}
				if (parentdrugstartdateTemp.length > 0 ) {
					if( parentdrugstartdateformatTemp == "" ){
						errorTemp = "1";
					} else if( parentdrugstartdateformatTemp != "102" && parentdrugstartdateformatTemp != "610" &&
							   parentdrugstartdateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if (parentdrugenddateTemp.length > 0 ) {
					if( parentdrugenddateformatTemp == "" ){
						errorTemp = "1";
					} else if( parentdrugenddateformatTemp != "102" && parentdrugenddateformatTemp != "610" &&
							   parentdrugenddateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if (parentdrugindicationTemp.length > 0 ) {
					if( parentdrgindicationmeddraversionTemp == "" ){
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(parentdrugindicationTemp) == false )
						{
							var LLTName = getMedDRA(parentdrugindicationTemp, parentdrgindicationmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								parentdrugindicationcodeTemp = parentdrugindicationTemp;
								parentdrugindicationTemp = LLTName;
								
							} else {
								errorTemp = "1";
							}
						}
					}
				}
				if (parentdrugreactionTemp.length > 0 ) {
					if( parentdrgreactionmeddraversionTemp == "" ){
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(parentdrugreactionTemp) == false )
						{
							var LLTName = getMedDRA(parentdrugreactionTemp, parentdrgreactionmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								parentdrugreactioncodeTemp = parentdrugreactionTemp;
								parentdrugreactionTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					}
				}

				var obj={
					error : errorTemp,
					parentdrugname : parentdrugnameTemp,
					parentdrugstartdate : parentdrugstartdateTemp,
					parentdrugstartdateformat : parentdrugstartdateformatTemp,
					parentdrugenddate : parentdrugenddateTemp,
					parentdrugenddateformat : parentdrugenddateformatTemp,
					parentdrugindicationcode : parentdrugindicationcodeTemp,
					parentdrugindication : parentdrugindicationTemp,
					parentdrgindicationmeddraver : parentdrgindicationmeddraversionTemp,
					parentdrugreactioncode : parentdrugreactioncodeTemp,
					parentdrugreaction : parentdrugreactionTemp,
					parentdrgreactionmeddraversion : parentdrgreactionmeddraversionTemp
				}
				
				if( parentdrugnameTemp != "" || parentdrugstartdateTemp != "" || parentdrugenddateTemp != "" ) {
					arrParentRelevantPastDrugTherapy.push(obj);
					$('#parentnameofdrugasreportedtomeddrashowhide').show();
					iParentNameofdrugasreportedtoMeddraShowHide = 1;
				}
			}
	
			fnDisplayParentRelevantPastDrugTherapy();

			rpt = xmlVal.documentElement.getElementsByTagName("reaction").length;
			x = xmlVal.documentElement.getElementsByTagName("reaction");
			
			for (i=0;i<rpt;i++){
				var whoartversionTemp = "";
				var whoartnameTemp = "";
				var whoartcodeTemp = "";
				var reactionmeddralltcodeTemp = "";
				var reactionmeddralltTemp = "";
				var reactionmeddraversionlltcodeTemp = "";
				var reactionmeddraversionlltTemp = "";
				var reactionmeddraptTemp = "";
				var reactionmeddraversionptTemp = "";
				var reactionmeddraptcodeTemp = "";
				var primarysourcereactionTemp = "";
				var termhighlightedTemp = "";
				var reactionoutcomeTemp = "";
				var reactionstartdateTemp = "";
				var reactionstartdateformatTemp = "";
				var reactiondurationTemp = "";
				var reactiondurationunitTemp = "";
				var reactionenddateformatTemp = "";
				var reactionenddateTemp = "";
				var reactionfirsttimeTemp = "";
				var reactionfirsttimeunitTemp = "";
				var reactionlasttimeTemp = "";
				var reactionlasttimeunitTemp = "";
				var errorTemp = "0";
				
				if( x[i].getElementsByTagName("reactionlasttime")[0] != null && typeof x[i].getElementsByTagName("reactionlasttime")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionlasttime").length > 0 ) {
						if( x[i].getElementsByTagName("reactionlasttime")[0].childNodes[0] != null) {
							reactionlasttimeTemp = x[i].getElementsByTagName("reactionlasttime")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionlasttimeunit")[0] != null && typeof x[i].getElementsByTagName("reactionlasttimeunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionlasttimeunit").length > 0 ) {
						if( x[i].getElementsByTagName("reactionlasttimeunit")[0].childNodes[0] != null) {
							reactionlasttimeunitTemp = x[i].getElementsByTagName("reactionlasttimeunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionfirsttimeunit")[0] != null && typeof x[i].getElementsByTagName("reactionfirsttimeunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionfirsttimeunit").length > 0 ) {
						if( x[i].getElementsByTagName("reactionfirsttimeunit")[0].childNodes[0] != null) {
							reactionfirsttimeunitTemp = x[i].getElementsByTagName("reactionfirsttimeunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionfirsttime")[0] != null && typeof x[i].getElementsByTagName("reactionfirsttime")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionfirsttime").length > 0 ) {
						if( x[i].getElementsByTagName("reactionfirsttime")[0].childNodes[0] != null) {
							reactionfirsttimeTemp = x[i].getElementsByTagName("reactionfirsttime")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionenddate")[0] != null && typeof x[i].getElementsByTagName("reactionenddate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionenddate").length > 0 ) {
						if( x[i].getElementsByTagName("reactionenddate")[0].childNodes[0] != null) {
							reactionenddateTemp = x[i].getElementsByTagName("reactionenddate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionenddateformat")[0] != null && typeof x[i].getElementsByTagName("reactionenddateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionenddateformat").length > 0 ) {
						if( x[i].getElementsByTagName("reactionenddateformat")[0].childNodes[0] != null) {
							reactionenddateformatTemp = x[i].getElementsByTagName("reactionenddateformat")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactiondurationunit")[0] != null && typeof x[i].getElementsByTagName("reactiondurationunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactiondurationunit").length > 0 ) {
						if( x[i].getElementsByTagName("reactiondurationunit")[0].childNodes[0] != null) {
							reactiondurationunitTemp = x[i].getElementsByTagName("reactiondurationunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionduration")[0] != null && typeof x[i].getElementsByTagName("reactionduration")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionduration").length > 0 ) {
						if( x[i].getElementsByTagName("reactionduration")[0].childNodes[0] != null) {
							reactiondurationTemp = x[i].getElementsByTagName("reactionduration")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("whoartversion")[0] != null && typeof x[i].getElementsByTagName("whoartversion")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("whoartversion").length > 0 ) {
						if( x[i].getElementsByTagName("whoartversion")[0].childNodes[0] != null) {
							whoartversionTemp = x[i].getElementsByTagName("whoartversion")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("whoartname")[0] != null && typeof x[i].getElementsByTagName("whoartname")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("whoartname").length > 0 ) {
						if( x[i].getElementsByTagName("whoartname")[0].childNodes[0] != null) {
							whoartnameTemp = x[i].getElementsByTagName("whoartname")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("whoartcode")[0] != null && typeof x[i].getElementsByTagName("whoartcode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("whoartcode").length > 0 ) {
						if( x[i].getElementsByTagName("whoartcode")[0].childNodes[0] != null) {
							whoartcodeTemp = x[i].getElementsByTagName("whoartcode")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionmeddraptcode")[0] != null && typeof x[i].getElementsByTagName("reactionmeddraptcode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddraptcode").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddraptcode")[0].childNodes[0] != null) {
							reactionmeddraptcodeTemp = x[i].getElementsByTagName("reactionmeddraptcode")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionmeddrapt")[0] != null && typeof x[i].getElementsByTagName("reactionmeddrapt")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddrapt").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddrapt")[0].childNodes[0] != null) {
							reactionmeddraptTemp = x[i].getElementsByTagName("reactionmeddrapt")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionmeddraversionpt")[0] != null && typeof x[i].getElementsByTagName("reactionmeddraversionpt")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddraversionpt").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddraversionpt")[0].childNodes[0] != null) {
							reactionmeddraversionptTemp = x[i].getElementsByTagName("reactionmeddraversionpt")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("primarysourcereaction")[0] != null && typeof x[i].getElementsByTagName("primarysourcereaction")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("primarysourcereaction").length > 0 ) {
						if( x[i].getElementsByTagName("primarysourcereaction")[0].childNodes[0] != null) {
							primarysourcereactionTemp = x[i].getElementsByTagName("primarysourcereaction")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("termhighlighted")[0] != null && typeof x[i].getElementsByTagName("termhighlighted")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("termhighlighted").length > 0 ) {
						if( x[i].getElementsByTagName("termhighlighted")[0].childNodes[0] != null) {
							termhighlightedTemp = x[i].getElementsByTagName("termhighlighted")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionoutcome")[0] != null && typeof x[i].getElementsByTagName("reactionoutcome")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionoutcome").length > 0 ) {
						if( x[i].getElementsByTagName("reactionoutcome")[0].childNodes[0] != null) {
							reactionoutcomeTemp = x[i].getElementsByTagName("reactionoutcome")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionstartdate")[0] != null && typeof x[i].getElementsByTagName("reactionstartdate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionstartdate").length > 0 ) {
						if( x[i].getElementsByTagName("reactionstartdate")[0].childNodes[0] != null) {
							reactionstartdateTemp = x[i].getElementsByTagName("reactionstartdate")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionstartdateformat")[0] != null && typeof x[i].getElementsByTagName("reactionstartdateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionstartdateformat").length > 0 ) {
						if( x[i].getElementsByTagName("reactionstartdateformat")[0].childNodes[0] != null) {
							reactionstartdateformatTemp = x[i].getElementsByTagName("reactionstartdateformat")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("reactionmeddrallt")[0] != null && typeof x[i].getElementsByTagName("reactionmeddrallt")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddrallt").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddrallt")[0].childNodes[0] != null) {
							reactionmeddralltTemp = x[i].getElementsByTagName("reactionmeddrallt")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionmeddralltcode")[0] != null && typeof x[i].getElementsByTagName("reactionmeddralltcode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddralltcode").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddralltcode")[0].childNodes[0] != null) {
							reactionmeddralltcodeTemp = x[i].getElementsByTagName("reactionmeddralltcode")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactionmeddraversionllt")[0] != null && typeof x[i].getElementsByTagName("reactionmeddraversionllt")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactionmeddraversionllt").length > 0 ) {
						if( x[i].getElementsByTagName("reactionmeddraversionllt")[0].childNodes[0] != null) {
							reactionmeddraversionlltTemp = x[i].getElementsByTagName("reactionmeddraversionllt")[0].childNodes[0].nodeValue;
						}
					}
				}

				// Validation Check
				if( termhighlightedTemp.length > 0 ) {
					if( termhighlightedTemp != "1" && termhighlightedTemp != "2" && termhighlightedTemp != "3" && termhighlightedTemp != "4" ) {
						errorTemp = "1";
					}
				}

				if( whoartversionTemp == "" && whoartnameTemp == "" ) {
					if (reactionmeddralltTemp.length == 0 && reactionmeddraptTemp.length == 0 ) {
						errorTemp = "1";
					}
					if (reactionmeddralltTemp.length > 0) {
						if(reactionmeddraversionlltTemp == "" ){
							errorTemp = "1";
						} else {
							// MedDRA LLT 명칭 가져오기
							if( isNaN(reactionmeddralltTemp) == false )
							{
								var LLTName = getMedDRA(reactionmeddralltTemp, reactionmeddraversionlltTemp);
								if( LLTName != "ERROR" ) {
									reactionmeddralltcodeTemp = reactionmeddralltTemp;
									reactionmeddralltTemp = LLTName;
								} else {
									errorTemp = "1";
								}
							} else {
								//if( reactionmeddralltcodeTemp == "" ) sironge 20141001
								//	errorTemp = "1";					sironge 20141001
							}
						}
					}
					if (reactionmeddraptTemp.length > 0) {
						if(reactionmeddraversionptTemp == "" ){
							errorTemp = "1";
						} else {
							// MedDRA LLT 명칭 가져오기
							if( isNaN(reactionmeddraptTemp) == false )
							{
								var LLTName = getMedDRAPT(reactionmeddraptTemp, reactionmeddraversionptTemp);
								if( LLTName != "ERROR" ) {
									reactionmeddraptcodeTemp = reactionmeddraptTemp;
									reactionmeddraptTemp = LLTName;
								} else {
									errorTemp = "1";
								}
							} else {
								//if( reactionmeddraptcodeTemp == "" )	sironge 20141001
								//	errorTemp = "1";					sironge 20141001
							}
						}
					}
				}
				
				if (reactionstartdateTemp.length > 0) {
					if(reactionstartdateformatTemp == "" ){
						errorTemp = "1";
					} else if( reactionstartdateformatTemp != "102" && reactionstartdateformatTemp != "203" &&
							   reactionstartdateformatTemp != "602" && reactionstartdateformatTemp != "610" ) {
						errorTemp = "1";
					}
				}
				if (reactionenddateTemp.length > 0) {
					if(reactionenddateformatTemp == "" ){
						errorTemp = "1";
					} else if( reactionenddateformatTemp != "102" && reactionenddateformatTemp != "203" &&
							   reactionenddateformatTemp != "602" && reactionenddateformatTemp != "610" ) {
						errorTemp = "1";
					}
				}
				if (reactiondurationTemp.length > 5) {
					errorTemp = "1";
				}
				if (reactiondurationTemp.length > 0) {
					if(reactiondurationunitTemp == "" ){
						errorTemp = "1";
					} else if( reactiondurationunitTemp != "801" && reactiondurationunitTemp != "802" &&
							   reactiondurationunitTemp != "803" && reactiondurationunitTemp != "804" &&
							   reactiondurationunitTemp != "805" && reactiondurationunitTemp != "806" && 
							   reactiondurationunitTemp != "807" ) {
						errorTemp = "1";
					}
				}
				if (reactionfirsttimeTemp.length > 5) {
					errorTemp = "1";
				}
				if (reactionlasttimeTemp.length > 5) {
					errorTemp = "1";
				}
				if( reactionoutcomeTemp.length > 0 ) {
					if( reactionoutcomeTemp != "1" && reactionoutcomeTemp != "2" && reactionoutcomeTemp != "3" &&
						reactionoutcomeTemp != "4" && reactionoutcomeTemp != "5" && reactionoutcomeTemp != "6" ) {
						errorTemp = "1";
					}
				}
				
				var obj={	
						error : errorTemp,
						whoartcode : whoartcodeTemp,
						whoartname : whoartnameTemp,
						whoartversion : whoartversionTemp,
						reactionmeddralltcode : reactionmeddralltcodeTemp,
						reactionmeddrallt : reactionmeddralltTemp,
						reactionmeddraversionllt : reactionmeddraversionlltTemp,
						reactionmeddraptcode : reactionmeddraptcodeTemp,
						reactionmeddrapt : reactionmeddraptTemp,
						reactionmeddraversionpt : reactionmeddraversionptTemp,
						primarysourcereaction : primarysourcereactionTemp,
						termhighlighted : termhighlightedTemp,
						reactionoutcome : reactionoutcomeTemp,
						reactionstartdate : reactionstartdateTemp,
						reactionstartdateformat : reactionstartdateformatTemp,
						reactionenddate : reactionenddateTemp,
						reactionenddateformat : reactionenddateformatTemp,
						reactionduration : reactiondurationTemp,
						reactiondurationunit : reactiondurationunitTemp,
						reactionfirsttime : reactionfirsttimeTemp,
						reactionfirsttimeunit : reactionfirsttimeunitTemp,
						reactionlasttime : reactionlasttimeTemp,
						reactionlasttimeunit : reactionlasttimeunitTemp
					}
				arrReactionsEvents.push(obj);
			}
			fnDisplayReactionsEvents();
			
			rpt = xmlVal.documentElement.getElementsByTagName("test").length;
			x = xmlVal.documentElement.getElementsByTagName("test");
			
			for (i=0;i<rpt;i++){
				var testnameTemp = "";
				var testdateTemp = "";
				var testdateformatTemp = "";
				var moreinformationTemp = "";
				var testresultTemp = "";
				var testunitTemp = "";
				var lowtestrangeTemp = "";
				var hightestrangeTemp = "";
				var errorTemp = "0";

				if( x[i].getElementsByTagName("testunit")[0] != null && typeof x[i].getElementsByTagName("testunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("testunit").length > 0 ) {
						if( x[i].getElementsByTagName("testunit")[0].childNodes[0] != null) {
							testunitTemp = x[i].getElementsByTagName("testunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("testresult")[0] != null && typeof x[i].getElementsByTagName("testresult")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("testresult").length > 0 ) {
						if( x[i].getElementsByTagName("testresult")[0].childNodes[0] != null) {
							testresultTemp = x[i].getElementsByTagName("testresult")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("testname")[0] != null && typeof x[i].getElementsByTagName("testname")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("testname").length > 0 ) {
						if( x[i].getElementsByTagName("testname")[0].childNodes[0] != null) {
							testnameTemp = x[i].getElementsByTagName("testname")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("testdate")[0] != null && typeof x[i].getElementsByTagName("testdate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("testdate").length > 0 ) {
						if( x[i].getElementsByTagName("testdate")[0].childNodes[0] != null) {
							testdateTemp = x[i].getElementsByTagName("testdate")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("testdateformat")[0] != null && typeof x[i].getElementsByTagName("testdateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("testdateformat").length > 0 ) {
						if( x[i].getElementsByTagName("testdateformat")[0].childNodes[0] != null) {
							testdateformatTemp = x[i].getElementsByTagName("testdateformat")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("moreinformation")[0] != null && typeof x[i].getElementsByTagName("moreinformation")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("moreinformation").length > 0 ) {
						if( x[i].getElementsByTagName("moreinformation")[0].childNodes[0] != null) {
							moreinformationTemp = x[i].getElementsByTagName("moreinformation")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("lowtestrange")[0] != null && typeof x[i].getElementsByTagName("lowtestrange")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("lowtestrange").length > 0 ) {
						if( x[i].getElementsByTagName("lowtestrange")[0].childNodes[0] != null) {
							lowtestrangeTemp = x[i].getElementsByTagName("lowtestrange")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("hightestrange")[0] != null && typeof x[i].getElementsByTagName("hightestrange")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("hightestrange").length > 0 ) {
						if( x[i].getElementsByTagName("hightestrange")[0].childNodes[0] != null) {
							hightestrangeTemp = x[i].getElementsByTagName("hightestrange")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				// Validation Check
				if (testdateTemp.length > 0) {
					if(testdateformatTemp == "" ){
						errorTemp = "1";
					} else if( testdateformatTemp != "102" && testdateformatTemp != "602" && 
						testdateformatTemp != "610" ) {
						errorTemp = "1";
					}
				}

				if( testnameTemp.length > 100 ) {
					errorTemp = "1";
				}
				if( testresultTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( testunitTemp.length > 35 ) {
					errorTemp = "1";
				}
				if( lowtestrangeTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( hightestrangeTemp.length > 50 ) {
					errorTemp = "1";
				}

				var obj={
						error : errorTemp,
				 		testname : testnameTemp,
				 		testdate : testdateTemp,
				 		testdateformat : testdateformatTemp,
						lowtestrange : lowtestrangeTemp,
						hightestrange : hightestrangeTemp,
						testresult : testresultTemp,
						testunit : testunitTemp,
						moreinformation : moreinformationTemp
				}
				if( testnameTemp != "" ) {
					arrTestsAndProcedures.push(obj);
					$('#testnametoresultsoftestshowhide').show();
				}
			}
			fnDisplayTestsAndProcedures();		

			rpt = xmlVal.documentElement.getElementsByTagName("drug").length;
			x = xmlVal.documentElement.getElementsByTagName("drug");

			for (i=0;i<rpt;i++){
				var drugauthorizationholderTemp = "";
				var drugcharacterizationTemp = "";
				var unauthorizedproductTemp = "";
				var obtaindrugcountryTemp = "";
				var drugstructuredosagenumbTemp = "";
				var drugstructuredosageunitTemp = "";
				var drugseparatedosagenumbTemp = "";
				var drugintervaldosageunitnumbTemp = "";
				var drugintervaldosagedefinitionTemp = "";
				var drugdosagetextTemp = "";
				var drugdosageformTemp = "";
				var drugadministrationrouteTemp = "";
				var drugindicationmeddraversionTemp = "";
				var drugindicationcodeTemp = "";
				var drugindicationTemp = "";
				var drugtreatmentdurationTemp = "";
				var drugtreatmentdurationunitTemp = "";
				var actiondrugTemp = "";
				var drugcumulativedosagenumbTemp = "";
				var drugcumulativedosageunitTemp = "";
				var reactiongestationperiodTemp = "";
				var reactiongestationperiodunitTemp = "";
				var drugstartdateTemp = "";
				var drugstartdateformatTemp = "";
				var drugstartperiodTemp = "";
				var drugstartperiodunitTemp = "";
				var druglastperiodTemp = "";
				var druglastperiodunitTemp = "";
				var drugenddateformatTemp = "";
				var drugenddateTemp = "";
				var drugrecurreadministrationTemp = "";
				var medicinalproductTemp = "";
				var activesubstancenameTemp = "";
				var arrActive = [];
				var drugbatchnumbTemp = "";
				var drugauthorizationnumbTemp = "";
				var drugauthorizationcountryTemp = "";
				var drugparadministrationTemp = "";
				var drugrecuractionmeddraversionTemp = "";
				var drugrecuractionTemp = "";
				var drugrecuractioncodeTemp = "";
				var drugadditionalTemp = "";
				var errorTemp = "0";

				if( x[i].getElementsByTagName("drugauthorizationcountry")[0] != null && typeof x[i].getElementsByTagName("drugauthorizationcountry")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugauthorizationcountry").length > 0 ) {
						if( x[i].getElementsByTagName("drugauthorizationcountry")[0].childNodes[0] != null) {
							drugauthorizationcountryTemp = x[i].getElementsByTagName("drugauthorizationcountry")[0].childNodes[0].nodeValue;
						}
					}
				}

				// drugbatchnumb
				if( x[i].getElementsByTagName("drugbatchnumb")[0] != null && typeof x[i].getElementsByTagName("drugbatchnumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugbatchnumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugbatchnumb")[0].childNodes[0] != null) {
							drugbatchnumbTemp = x[i].getElementsByTagName("drugbatchnumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				// drugauthorizationnumb
				if( x[i].getElementsByTagName("drugauthorizationnumb")[0] != null && typeof x[i].getElementsByTagName("drugauthorizationnumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugauthorizationnumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugauthorizationnumb")[0].childNodes[0] != null) {
							drugauthorizationnumbTemp = x[i].getElementsByTagName("drugauthorizationnumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("medicinalproduct")[0] != null && typeof x[i].getElementsByTagName("medicinalproduct")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("medicinalproduct").length > 0 ) {
						if( x[i].getElementsByTagName("medicinalproduct")[0].childNodes[0] != null) {
							medicinalproductTemp = x[i].getElementsByTagName("medicinalproduct")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugenddate")[0] != null && typeof x[i].getElementsByTagName("drugenddate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugenddate").length > 0 ) {
						if( x[i].getElementsByTagName("drugenddate")[0].childNodes[0] != null) {
							drugenddateTemp = x[i].getElementsByTagName("drugenddate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugenddateformat")[0] != null && typeof x[i].getElementsByTagName("drugenddateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugenddateformat").length > 0 ) {
						if( x[i].getElementsByTagName("drugenddateformat")[0].childNodes[0] != null) {
							drugenddateformatTemp = x[i].getElementsByTagName("drugenddateformat")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("druglastperiodunit")[0] != null && typeof x[i].getElementsByTagName("druglastperiodunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("druglastperiodunit").length > 0 ) {
						if( x[i].getElementsByTagName("druglastperiodunit")[0].childNodes[0] != null) {
							druglastperiodunitTemp = x[i].getElementsByTagName("druglastperiodunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("druglastperiod")[0] != null && typeof x[i].getElementsByTagName("druglastperiod")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("druglastperiod").length > 0 ) {
						if( x[i].getElementsByTagName("druglastperiod")[0].childNodes[0] != null) {
							druglastperiodTemp = x[i].getElementsByTagName("druglastperiod")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugstartperiodunit")[0] != null && typeof x[i].getElementsByTagName("drugstartperiodunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstartperiodunit").length > 0 ) {
						if( x[i].getElementsByTagName("drugstartperiodunit")[0].childNodes[0] != null) {
							drugstartperiodunitTemp = x[i].getElementsByTagName("drugstartperiodunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugstartperiod")[0] != null && typeof x[i].getElementsByTagName("drugstartperiod")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstartperiod").length > 0 ) {
						if( x[i].getElementsByTagName("drugstartperiod")[0].childNodes[0] != null) {
							drugstartperiodTemp = x[i].getElementsByTagName("drugstartperiod")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugstartdate")[0] != null && typeof x[i].getElementsByTagName("drugstartdate")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstartdate").length > 0 ) {
						if( x[i].getElementsByTagName("drugstartdate")[0].childNodes[0] != null) {
							drugstartdateTemp = x[i].getElementsByTagName("drugstartdate")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("reactiongestationperiodunit")[0] != null && typeof x[i].getElementsByTagName("reactiongestationperiodunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactiongestationperiodunit").length > 0 ) {
						if( x[i].getElementsByTagName("reactiongestationperiodunit")[0].childNodes[0] != null) {
							reactiongestationperiodunitTemp = x[i].getElementsByTagName("reactiongestationperiodunit")[0].childNodes[0].nodeValue;
							$('#gestationperiodblock').show();
						}
					}
				}

				if( x[i].getElementsByTagName("reactiongestationperiod")[0] != null && typeof x[i].getElementsByTagName("reactiongestationperiod")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("reactiongestationperiod").length > 0 ) {
						if( x[i].getElementsByTagName("reactiongestationperiod")[0].childNodes[0] != null) {
							reactiongestationperiodTemp = x[i].getElementsByTagName("reactiongestationperiod")[0].childNodes[0].nodeValue;
							$('#gestationperiodblock').show();
						}
					}
				}

				if( x[i].getElementsByTagName("drugcumulativedosageunit")[0] != null && typeof x[i].getElementsByTagName("drugcumulativedosageunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugcumulativedosageunit").length > 0 ) {
						if( x[i].getElementsByTagName("drugcumulativedosageunit")[0].childNodes[0] != null) {
							drugcumulativedosageunitTemp = x[i].getElementsByTagName("drugcumulativedosageunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugcumulativedosagenumb")[0] != null && typeof x[i].getElementsByTagName("drugcumulativedosagenumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugcumulativedosagenumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugcumulativedosagenumb")[0].childNodes[0] != null) {
							drugcumulativedosagenumbTemp = x[i].getElementsByTagName("drugcumulativedosagenumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugauthorizationholder")[0] != null && typeof x[i].getElementsByTagName("drugauthorizationholder")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugauthorizationholder").length > 0 ) {
						if( x[i].getElementsByTagName("drugauthorizationholder")[0].childNodes[0] != null) {
							drugauthorizationholderTemp = x[i].getElementsByTagName("drugauthorizationholder")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("obtaindrugcountry")[0] != null && typeof x[i].getElementsByTagName("obtaindrugcountry")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("obtaindrugcountry").length > 0 ) {
						if( x[i].getElementsByTagName("obtaindrugcountry")[0].childNodes[0] != null) {
							obtaindrugcountryTemp = x[i].getElementsByTagName("obtaindrugcountry")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugcharacterization")[0] != null && typeof x[i].getElementsByTagName("drugcharacterization")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugcharacterization").length > 0 ) {
						if( x[i].getElementsByTagName("drugcharacterization")[0].childNodes[0] != null) {
							drugcharacterizationTemp = x[i].getElementsByTagName("drugcharacterization")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("unauthorizedproduct")[0] != null && typeof x[i].getElementsByTagName("unauthorizedproduct")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("unauthorizedproduct").length > 0 ) {
						if( x[i].getElementsByTagName("unauthorizedproduct")[0].childNodes[0] != null) {
							unauthorizedproductTemp = x[i].getElementsByTagName("unauthorizedproduct")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugstructuredosagenumb")[0] != null && typeof x[i].getElementsByTagName("drugstructuredosagenumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstructuredosagenumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugstructuredosagenumb")[0].childNodes[0] != null) {
							drugstructuredosagenumbTemp = x[i].getElementsByTagName("drugstructuredosagenumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugstructuredosageunit")[0] != null && typeof x[i].getElementsByTagName("drugstructuredosageunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstructuredosageunit").length > 0 ) {
						if( x[i].getElementsByTagName("drugstructuredosageunit")[0].childNodes[0] != null) {
							drugstructuredosageunitTemp = x[i].getElementsByTagName("drugstructuredosageunit")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugseparatedosagenumb")[0] != null && typeof x[i].getElementsByTagName("drugseparatedosagenumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugseparatedosagenumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugseparatedosagenumb")[0].childNodes[0] != null) {
							drugseparatedosagenumbTemp = x[i].getElementsByTagName("drugseparatedosagenumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugintervaldosageunitnumb")[0] != null && typeof x[i].getElementsByTagName("drugintervaldosageunitnumb")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugintervaldosageunitnumb").length > 0 ) {
						if( x[i].getElementsByTagName("drugintervaldosageunitnumb")[0].childNodes[0] != null) {
							drugintervaldosageunitnumbTemp = x[i].getElementsByTagName("drugintervaldosageunitnumb")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugintervaldosagedefinition")[0] != null && typeof x[i].getElementsByTagName("drugintervaldosagedefinition")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugintervaldosagedefinition").length > 0 ) {
						if( x[i].getElementsByTagName("drugintervaldosagedefinition")[0].childNodes[0] != null) {
							drugintervaldosagedefinitionTemp = x[i].getElementsByTagName("drugintervaldosagedefinition")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugdosagetext")[0] != null && typeof x[i].getElementsByTagName("drugdosagetext")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugdosagetext").length > 0 ) {
						if( x[i].getElementsByTagName("drugdosagetext")[0].childNodes[0] != null) {
							drugdosagetextTemp = x[i].getElementsByTagName("drugdosagetext")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugdosageform")[0] != null && typeof x[i].getElementsByTagName("drugdosageform")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugdosageform").length > 0 ) {
						if( x[i].getElementsByTagName("drugdosageform")[0].childNodes[0] != null) {
							drugdosageformTemp = x[i].getElementsByTagName("drugdosageform")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugadministrationroute")[0] != null && typeof x[i].getElementsByTagName("drugadministrationroute")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugadministrationroute").length > 0 ) {
						if( x[i].getElementsByTagName("drugadministrationroute")[0].childNodes[0] != null) {
							drugadministrationrouteTemp = x[i].getElementsByTagName("drugadministrationroute")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugparadministration")[0] != null && typeof x[i].getElementsByTagName("drugparadministration")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugparadministration").length > 0 ) {
						if( x[i].getElementsByTagName("drugparadministration")[0].childNodes[0] != null) {
							drugparadministrationTemp = x[i].getElementsByTagName("drugparadministration")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugindicationmeddraversion")[0] != null && typeof x[i].getElementsByTagName("drugindicationmeddraversion")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugindicationmeddraversion").length > 0 ) {
						if( x[i].getElementsByTagName("drugindicationmeddraversion")[0].childNodes[0] != null) {
							drugindicationmeddraversionTemp = x[i].getElementsByTagName("drugindicationmeddraversion")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugindicationcode")[0] != null && typeof x[i].getElementsByTagName("drugindicationcode")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugindicationcode").length > 0 ) {
						if( x[i].getElementsByTagName("drugindicationcode")[0].childNodes[0] != null) {
							drugindicationcodeTemp = x[i].getElementsByTagName("drugindicationcode")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugindication")[0] != null && typeof x[i].getElementsByTagName("drugindication")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugindication").length > 0 ) {
						if( x[i].getElementsByTagName("drugindication")[0].childNodes[0] != null) {
							drugindicationTemp = x[i].getElementsByTagName("drugindication")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("drugstartdateformat")[0] != null && typeof x[i].getElementsByTagName("drugstartdateformat")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugstartdateformat").length > 0 ) {
						if( x[i].getElementsByTagName("drugstartdateformat")[0].childNodes[0] != null) {
							drugstartdateformatTemp = x[i].getElementsByTagName("drugstartdateformat")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugtreatmentduration")[0] != null && typeof x[i].getElementsByTagName("drugtreatmentduration")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugtreatmentduration").length > 0 ) {
						if( x[i].getElementsByTagName("drugtreatmentduration")[0].childNodes[0] != null) {
							drugtreatmentdurationTemp = x[i].getElementsByTagName("drugtreatmentduration")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				if( x[i].getElementsByTagName("drugtreatmentdurationunit")[0] != null && typeof x[i].getElementsByTagName("drugtreatmentdurationunit")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugtreatmentdurationunit").length > 0 ) {
						if( x[i].getElementsByTagName("drugtreatmentdurationunit")[0].childNodes[0] != null) {
							drugtreatmentdurationunitTemp = x[i].getElementsByTagName("drugtreatmentdurationunit")[0].childNodes[0].nodeValue;
						}
					}
				}

				if( x[i].getElementsByTagName("actiondrug")[0] != null && typeof x[i].getElementsByTagName("actiondrug")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("actiondrug").length > 0 ) {
						if( x[i].getElementsByTagName("actiondrug")[0].childNodes[0] != null) {
							actiondrugTemp = x[i].getElementsByTagName("actiondrug")[0].childNodes[0].nodeValue;
						}
					}
				}

				var rpt2 = x[i].getElementsByTagName("activesubstance").length;
				var y = x[i].getElementsByTagName("activesubstance");

				for (j=0;j<rpt2;j++){
					if( y[j].getElementsByTagName("activesubstancename") != null ) {
						if( y[j].getElementsByTagName("activesubstancename")[0] != null ) {
							if( typeof y[j].getElementsByTagName("activesubstancename")[0] != "undefined" && y[j].getElementsByTagName("activesubstancename")[0].childNodes[0] != null ) {
								if( y[j].getElementsByTagName("activesubstancename").length > 0 ) {
									if( typeof y[j].getElementsByTagName("activesubstancename")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("activesubstancename")[0].childNodes[0] != null ) {
										//activesubstancenameTemp = y[j].getElementsByTagName("activesubstancename")[0].childNodes[0].nodeValue;
										arrActive[j] = y[j].getElementsByTagName("activesubstancename")[0].childNodes[0].nodeValue
										if( j == 0 )
											activesubstancenameTemp = arrActive[j];
										else {
											if( gStatus == "30" && arrActive[j] == null ) {
												
											} else {
												activesubstancenameTemp += "+" + arrActive[j];
											}
										}
									}
								}
							}
						}
					}
				}

				if( x[i].getElementsByTagName("drugrecurreadministration") != null && typeof x[i].getElementsByTagName("drugrecurreadministration")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugrecurreadministration").length > 0 ) {
						if( typeof x[i].getElementsByTagName("drugrecurreadministration")[0].childNodes[0] != "undefined" && x[i].getElementsByTagName("drugrecurreadministration")[0].childNodes[0] != null )
							drugrecurreadministrationTemp = x[i].getElementsByTagName("drugrecurreadministration")[0].childNodes[0].nodeValue;
					}
				}

				if( x[i].getElementsByTagName("drugadditional") != null && typeof x[i].getElementsByTagName("drugrecurreadministration")[0] != "undefined" ) {
					if( x[i].getElementsByTagName("drugadditional").length > 0 ) {
						if( typeof x[i].getElementsByTagName("drugadditional")[0].childNodes[0] != "undefined" && x[i].getElementsByTagName("drugadditional")[0].childNodes[0] != null )
							drugadditionalTemp = x[i].getElementsByTagName("drugadditional")[0].childNodes[0].nodeValue;
					}
				}
				
				// 배열 안에 갯수를 정확히 가져온다.
				var y = x[i].getElementsByTagName("drugrecurrence");

				for (j=0;j< y.length; j++){
					if( y[j].getElementsByTagName("drugrecuractionmeddraversion") != null && typeof y[j].getElementsByTagName("drugrecuractionmeddraversion")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugrecuractionmeddraversion").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugrecuractionmeddraversion")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugrecuractionmeddraversion")[0].childNodes[0] != null )
								drugrecuractionmeddraversionTemp = y[j].getElementsByTagName("drugrecuractionmeddraversion")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugrecuraction") != null && typeof y[j].getElementsByTagName("drugrecuraction")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugrecuraction").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugrecuraction")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugrecuraction")[0].childNodes[0] != null )
								drugrecuractionTemp = y[j].getElementsByTagName("drugrecuraction")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugrecuractioncode") != null && typeof y[j].getElementsByTagName("drugrecuractioncode")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugrecuractioncode").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugrecuractioncode")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugrecuractioncode")[0].childNodes[0] != null )
								drugrecuractioncodeTemp = y[j].getElementsByTagName("drugrecuractioncode")[0].childNodes[0].nodeValue;
						}
					}
				}
				
				// 배열 안에 갯수를 정확히 가져온다.
				y = x[i].getElementsByTagName("drugreactionrelatedness");

				for (j=0;j< y.length; j++){
					var drugreactionassesmeddraversionTemp = "";
					var drugreactionassescodeTemp = "";
					var drugreactionassesTemp = "";
					var drugassessmentsourceTemp = "";
					var drugassessmentmethodTemp = "";
					var drugresultTemp = "";
					var errorTemp1 = "0";

					if( y[j].getElementsByTagName("drugreactionassesmeddraversion") != null && typeof y[j].getElementsByTagName("drugreactionassesmeddraversion")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugreactionassesmeddraversion").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugreactionassesmeddraversion")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugreactionassesmeddraversion")[0].childNodes[0] != null )
								drugreactionassesmeddraversionTemp = y[j].getElementsByTagName("drugreactionassesmeddraversion")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugreactionassescode") != null && typeof y[j].getElementsByTagName("drugreactionassescode")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugreactionassescode").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugreactionassescode")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugreactionassescode")[0].childNodes[0] != null )
								drugreactionassescodeTemp = y[j].getElementsByTagName("drugreactionassescode")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugreactionasses") != null && typeof y[j].getElementsByTagName("drugreactionasses")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugreactionasses").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugreactionasses")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugreactionasses")[0].childNodes[0] != null )
								drugreactionassesTemp = y[j].getElementsByTagName("drugreactionasses")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugassessmentsource") != null && typeof y[j].getElementsByTagName("drugassessmentsource")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugassessmentsource").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugassessmentsource")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugassessmentsource")[0].childNodes[0] != null )
								drugassessmentsourceTemp = y[j].getElementsByTagName("drugassessmentsource")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugresult") != null && typeof y[j].getElementsByTagName("drugresult")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugresult").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugresult")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugresult")[0].childNodes[0] != null )
								drugresultTemp = y[j].getElementsByTagName("drugresult")[0].childNodes[0].nodeValue;
						}
					}

					if( y[j].getElementsByTagName("drugassessmentmethod") != null && typeof y[j].getElementsByTagName("drugassessmentmethod")[0] != "undefined" ) {
						if( y[j].getElementsByTagName("drugassessmentmethod").length > 0 ) {
							if( typeof y[j].getElementsByTagName("drugassessmentmethod")[0].childNodes[0] != "undefined" && y[j].getElementsByTagName("drugassessmentmethod")[0].childNodes[0] != null )
								drugassessmentmethodTemp = y[j].getElementsByTagName("drugassessmentmethod")[0].childNodes[0].nodeValue;
						}
					}
					
					// Validation Check
					// 2014.9.15 에러체크 제거
					if (drugreactionassesTemp.length > 0) {
						if(drugreactionassesmeddraversionTemp == "" ){
							errorTemp1 = "1";
						} else {
							// MedDRA LLT 명칭 가져오기
							if( isNaN(drugreactionassesTemp) == false )
							{
								var LLTName = getMedDRA(drugreactionassesTemp, drugreactionassesmeddraversionTemp);
								if( LLTName != "ERROR" ) {
									drugreactionassescodeTemp = drugreactionassesTemp;
									drugreactionassesTemp = LLTName;
								}
							}
						}
					}
					
					if( drugreactionassesmeddraversionTemp.length > 8 ) {
						errorTemp = "1";
						errorTemp1 = "1";
					}
					if( drugreactionassesTemp.length > 250 ) {
						errorTemp = "1";
						errorTemp1 = "1";
					}
					if( drugassessmentsourceTemp.length > 60 ) {
						errorTemp = "1";
						errorTemp1 = "1";
					}
					if( drugassessmentmethodTemp.length > 35 ) {
						errorTemp = "1";
						errorTemp1 = "1";
					}
					if( drugresultTemp.length > 35 ) { //D20141023 || drugresultTemp.length < 1 ) {
						errorTemp = "1";
						errorTemp1 = "1";
					}

					var obj1={
						error : errorTemp1,
				 		drugreactionassesmeddraversion : drugreactionassesmeddraversionTemp,
						drugreactionassescode : drugreactionassescodeTemp,
						drugreactionasses : drugreactionassesTemp,
						drugassessmentsource : drugassessmentsourceTemp,
						drugassessmentmethod : drugassessmentmethodTemp,
						drugresult : drugresultTemp
					}

					arrRelatednessofdrugtoreactionsevents.push(obj1);
				}

				// Validation Check
				if ( drugcharacterizationTemp == "" ) {
					errorTemp = "1";
				} else if( drugcharacterizationTemp != "1" && drugcharacterizationTemp != "2" &&
						   drugcharacterizationTemp != "3" ) {
					errorTemp = "1";
				}
				if ( medicinalproductTemp == "" && activesubstancenameTemp == "" ) {
					errorTemp = "1";
				} 
				if (drugintervaldosageunitnumbTemp.length > 0) {
					if( drugintervaldosagedefinitionTemp == "" ) {
						errorTemp = "1";
					} else if( drugintervaldosagedefinitionTemp != "801" && drugintervaldosagedefinitionTemp != "802" &&
							   drugintervaldosagedefinitionTemp != "803" && drugintervaldosagedefinitionTemp != "804" && 
							   drugintervaldosagedefinitionTemp != "805" && drugintervaldosagedefinitionTemp != "806" &&
							   drugintervaldosagedefinitionTemp != "807" && drugintervaldosagedefinitionTemp != "810" &&
							   drugintervaldosagedefinitionTemp != "811" && drugintervaldosagedefinitionTemp != "812" &&
							   drugintervaldosagedefinitionTemp != "813" ) {
						errorTemp = "1";
					}
				}
				if( drugcumulativedosagenumbTemp.length > 0 ) {
					if( drugcumulativedosageunitTemp == "" || drugcumulativedosageunitTemp.length != 3 ) {
						errorTemp = "1";
					}
				}
				if( reactiongestationperiodTemp.length > 0 ) {
					if( reactiongestationperiodunitTemp == "" ) {
						errorTemp = "1";
					} else if( reactiongestationperiodunitTemp != "802" && reactiongestationperiodunitTemp != "803" &&
						reactiongestationperiodunitTemp != "804" && reactiongestationperiodunitTemp != "810" ) {
						errorTemp = "1";
					}
				}
				if( drugindicationTemp.length > 0 ) {
					if( drugindicationmeddraversionTemp == "" ) {
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(drugindicationTemp) == false )
						{
							var LLTName = getMedDRA(drugindicationTemp, drugindicationmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								drugindicationcodeTemp = drugindicationTemp;
								drugindicationTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					}
				}
				if( drugstartdateTemp.length > 0 ) {
					if( drugstartdateformatTemp == "" ) {
						errorTemp = "1";
					} else if( drugstartdateformatTemp != "102" &&
							   drugstartdateformatTemp != "610" && drugstartdateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}
				if( drugenddateTemp.length > 0 ) {
					if( drugenddateformatTemp == "" ) {
						errorTemp = "1";
					} else if( drugenddateformatTemp != "102" && drugenddateformatTemp != "203" &&
							   drugenddateformatTemp != "610" && drugenddateformatTemp != "602" ) {
						errorTemp = "1";
					}
				}

				if( drugstartperiodTemp.length > 0 ) {
					if( drugstartperiodunitTemp == "" ) {
						errorTemp = "1";
					} else if( drugstartperiodunitTemp != "801" && drugstartperiodunitTemp != "802" &&
							   drugstartperiodunitTemp != "803" && drugstartperiodunitTemp != "804" &&
							   drugstartperiodunitTemp != "805" && drugstartperiodunitTemp != "806" &&
							   drugstartperiodunitTemp != "807" ) {
						errorTemp = "1";
					}
				}

				if( druglastperiodTemp.length > 0 ) {
					if( druglastperiodunitTemp == "" ) {
						errorTemp = "1";
					} else if( druglastperiodunitTemp != "801" && druglastperiodunitTemp != "802" &&
							   druglastperiodunitTemp != "803" && druglastperiodunitTemp != "804" &&
							   druglastperiodunitTemp != "805" && druglastperiodunitTemp != "806" &&
							   druglastperiodunitTemp != "807" ) {
						errorTemp = "1";
					}
				}

				if( drugtreatmentdurationTemp.length > 0 ) {
					if( drugtreatmentdurationunitTemp == "" ) {
						errorTemp = "1";
					} else if( drugtreatmentdurationunitTemp != "801" && drugtreatmentdurationunitTemp != "802" &&
							   drugtreatmentdurationunitTemp != "803" && drugtreatmentdurationunitTemp != "804" &&
							   drugtreatmentdurationunitTemp != "805" && drugtreatmentdurationunitTemp != "806"  ) {
						errorTemp = "1";
					}
				}
				if( drugrecurreadministrationTemp == "1" ) {
					if( drugrecuractionTemp == "" ) {
						errorTemp = "1";
					} else if ( drugrecuractionmeddraversionTemp == "") {
						errorTemp = "1";
					} else {
						// MedDRA LLT 명칭 가져오기
						if( isNaN(drugrecuractionTemp) == false )
						{
							var LLTName = getMedDRA(drugrecuractionTemp, drugrecuractionmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								drugrecuractioncodeTemp = drugrecuractionTemp;
								drugrecuractionTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					}
				} else {
					if( drugrecuractionTemp != "" && drugrecuractionmeddraversionTemp != "" ) {
						if( isNaN(drugrecuractionTemp) == false )
						{
							var LLTName = getMedDRA(drugrecuractionTemp, drugrecuractionmeddraversionTemp);
							if( LLTName != "ERROR" ) {
								drugrecuractioncodeTemp = drugrecuractionTemp;
								drugrecuractionTemp = LLTName;
							} else {
								errorTemp = "1";
							}
						}
					}
				}
				// Start
				if( drugbatchnumbTemp.length > 35 ) {
					errorTemp = "1";
				}
				if( drugauthorizationnumbTemp.length > 35 ) {
					errorTemp = "1";
				}
				if( drugauthorizationholderTemp.length > 60 ) {
					errorTemp = "1";
				}
				if( drugstructuredosagenumbTemp.length > 8 ) {
					errorTemp = "1";
				}
				if( drugstructuredosageunitTemp.length > 0 &&
					drugstructuredosageunitTemp != "001" && drugstructuredosageunitTemp != "002" && drugstructuredosageunitTemp != "003" &&
					drugstructuredosageunitTemp != "004" && drugstructuredosageunitTemp != "005" && drugstructuredosageunitTemp != "006" &&
					drugstructuredosageunitTemp != "007" && drugstructuredosageunitTemp != "008" && drugstructuredosageunitTemp != "009" &&
					drugstructuredosageunitTemp != "010" && drugstructuredosageunitTemp != "011" && drugstructuredosageunitTemp != "012" && 
					drugstructuredosageunitTemp != "013" && drugstructuredosageunitTemp != "014" && drugstructuredosageunitTemp != "015" && 
					drugstructuredosageunitTemp != "016" && drugstructuredosageunitTemp != "017" && drugstructuredosageunitTemp != "018" && 
					drugstructuredosageunitTemp != "019" && drugstructuredosageunitTemp != "020" && drugstructuredosageunitTemp != "021" &&
					drugstructuredosageunitTemp != "022" && drugstructuredosageunitTemp != "023" && drugstructuredosageunitTemp != "024" &&
					drugstructuredosageunitTemp != "025" && drugstructuredosageunitTemp != "026" && drugstructuredosageunitTemp != "027" &&
					drugstructuredosageunitTemp != "028" && drugstructuredosageunitTemp != "029" && drugstructuredosageunitTemp != "030" &&
					drugstructuredosageunitTemp != "031" && drugstructuredosageunitTemp != "032" ) {
					errorTemp = "1";
				}
				if( drugseparatedosagenumbTemp.length > 3 ) {
					errorTemp = "1";
				}
				if( drugintervaldosageunitnumbTemp.length > 3 ) {
					errorTemp = "1";
				}
				if( drugcumulativedosagenumbTemp.length > 10 ) {
					errorTemp = "1";
				}
				if( drugcumulativedosageunitTemp.length > 3 ) {
					errorTemp = "1";
				}
				if( drugdosagetextTemp.length > 100 ) {
					errorTemp = "1";
				}
				if( drugdosageformTemp.length > 50 ) {
					errorTemp = "1";
				}
				if( drugadministrationrouteTemp.length > 0 &&
					drugadministrationrouteTemp != "001" && drugadministrationrouteTemp != "002" && drugadministrationrouteTemp != "003" &&
					drugadministrationrouteTemp != "004" && drugadministrationrouteTemp != "005" && drugadministrationrouteTemp != "006" &&
					drugadministrationrouteTemp != "007" && drugadministrationrouteTemp != "008" && drugadministrationrouteTemp != "009" &&
					drugadministrationrouteTemp != "010" && drugadministrationrouteTemp != "011" && drugadministrationrouteTemp != "012" && 
					drugadministrationrouteTemp != "013" && drugadministrationrouteTemp != "014" && drugadministrationrouteTemp != "015" && 
					drugadministrationrouteTemp != "016" && drugadministrationrouteTemp != "017" && drugadministrationrouteTemp != "018" && 
					drugadministrationrouteTemp != "019" && drugadministrationrouteTemp != "020" && drugadministrationrouteTemp != "021" &&
					drugadministrationrouteTemp != "022" && drugadministrationrouteTemp != "023" && drugadministrationrouteTemp != "024" &&
					drugadministrationrouteTemp != "025" && drugadministrationrouteTemp != "026" && drugadministrationrouteTemp != "027" &&
					drugadministrationrouteTemp != "028" && drugadministrationrouteTemp != "029" && drugadministrationrouteTemp != "030" &&
					drugadministrationrouteTemp != "031" && drugadministrationrouteTemp != "032" && drugadministrationrouteTemp != "033" &&
					drugadministrationrouteTemp != "034" && drugadministrationrouteTemp != "035" && drugadministrationrouteTemp != "036" &&
					drugadministrationrouteTemp != "037" && drugadministrationrouteTemp != "038" && drugadministrationrouteTemp != "039" &&
					drugadministrationrouteTemp != "040" && drugadministrationrouteTemp != "041" && drugadministrationrouteTemp != "042" && 
					drugadministrationrouteTemp != "043" && drugadministrationrouteTemp != "044" && drugadministrationrouteTemp != "045" && 
					drugadministrationrouteTemp != "046" && drugadministrationrouteTemp != "047" && drugadministrationrouteTemp != "048" && 
					drugadministrationrouteTemp != "049" && drugadministrationrouteTemp != "050" && drugadministrationrouteTemp != "051" &&
					drugadministrationrouteTemp != "052" && drugadministrationrouteTemp != "053" && drugadministrationrouteTemp != "054" &&
					drugadministrationrouteTemp != "055" && drugadministrationrouteTemp != "056" && drugadministrationrouteTemp != "057" &&
					drugadministrationrouteTemp != "058" && drugadministrationrouteTemp != "059" && drugadministrationrouteTemp != "060" && 
					drugadministrationrouteTemp != "061" && drugadministrationrouteTemp != "062" && drugadministrationrouteTemp != "063" &&
					drugadministrationrouteTemp != "064" && drugadministrationrouteTemp != "065" && drugadministrationrouteTemp != "066" &&
					drugadministrationrouteTemp != "067") {
					errorTemp = "1";
				}
				// ??? $('#gestationperiodblock').show();
				if( drugparadministrationTemp.length > 0 &&
					drugparadministrationTemp != "001" && drugparadministrationTemp != "002" && drugparadministrationTemp != "003" &&
					drugparadministrationTemp != "004" && drugparadministrationTemp != "005" && drugparadministrationTemp != "006" &&
					drugparadministrationTemp != "007" && drugparadministrationTemp != "008" && drugparadministrationTemp != "009" &&
					drugparadministrationTemp != "010" && drugparadministrationTemp != "011" && drugparadministrationTemp != "012" && 
					drugparadministrationTemp != "013" && drugparadministrationTemp != "014" && drugparadministrationTemp != "015" && 
					drugparadministrationTemp != "016" && drugparadministrationTemp != "017" && drugparadministrationTemp != "018" && 
					drugparadministrationTemp != "019" && drugparadministrationTemp != "020" && drugparadministrationTemp != "021" &&
					drugparadministrationTemp != "022" && drugparadministrationTemp != "023" && drugparadministrationTemp != "024" &&
					drugparadministrationTemp != "025" && drugparadministrationTemp != "026" && drugparadministrationTemp != "027" &&
					drugparadministrationTemp != "028" && drugparadministrationTemp != "029" && drugparadministrationTemp != "030" &&
					drugparadministrationTemp != "031" && drugparadministrationTemp != "032" && drugparadministrationTemp != "033" &&
					drugparadministrationTemp != "034" && drugparadministrationTemp != "035" && drugparadministrationTemp != "036" &&
					drugparadministrationTemp != "037" && drugparadministrationTemp != "038" && drugparadministrationTemp != "039" &&
					drugparadministrationTemp != "040" && drugparadministrationTemp != "041" && drugparadministrationTemp != "042" && 
					drugparadministrationTemp != "043" && drugparadministrationTemp != "044" && drugparadministrationTemp != "045" && 
					drugparadministrationTemp != "046" && drugparadministrationTemp != "047" && drugparadministrationTemp != "048" && 
					drugparadministrationTemp != "049" && drugparadministrationTemp != "050" && drugparadministrationTemp != "051" &&
					drugparadministrationTemp != "052" && drugparadministrationTemp != "053" && drugparadministrationTemp != "054" &&
					drugparadministrationTemp != "055" && drugparadministrationTemp != "056" && drugparadministrationTemp != "057" &&
					drugparadministrationTemp != "058" && drugparadministrationTemp != "059" && drugparadministrationTemp != "060" && 
					drugparadministrationTemp != "061" && drugparadministrationTemp != "062" && drugparadministrationTemp != "063" &&
					drugparadministrationTemp != "064" && drugparadministrationTemp != "065" && drugparadministrationTemp != "066" &&
					drugparadministrationTemp != "067") {
					errorTemp = "1";
				}
				if( reactiongestationperiodTemp.length > 3 ) {
					errorTemp = "1";
				}
				if( drugstartperiodTemp.length > 5 ) {
					errorTemp = "1";
				}
				if( druglastperiodTemp.length > 5 ) {
					errorTemp = "1";
				}
				if( drugtreatmentdurationTemp.length > 5 ) {
					errorTemp = "1";
				}
				if( drugrecuractionmeddraversionTemp.length > 8 ) {
					errorTemp = "1";
				}
				if( drugrecuractionTemp.length > 250 ) {
					errorTemp = "1";
				}
				if( drugadditionalTemp.length > 100 ) {
					errorTemp = "1";
				}
				if( actiondrugTemp.length > 0 ) {
					if( actiondrugTemp != "1" && actiondrugTemp != "2" && actiondrugTemp != "3" && actiondrugTemp != "4" && actiondrugTemp != "5" &&
					    actiondrugTemp != "6" ) {
						errorTemp = "1";
					}
				}
				// End
				
				//201419940086002142
				// 제품명 체크
				var strReplaceDrug = "";
				if( medicinalproductTemp.length > 0 && activesubstancenameTemp.length == 0 && unauthorizedproductTemp != "1" )
				{
					if( checkDrug(medicinalproductTemp) == "ERROR" )
					{
						strReplaceDrug = replaceDrug(medicinalproductTemp);
						if(strReplaceDrug != null && strReplaceDrug != "" && strReplaceDrug != "null" ){
							medicinalproductTemp = strReplaceDrug;
						}else{
							errorTemp = "1";
						}
					}
				}
				// 성분명 체크
				var strReplaceSubstance = "";
				if( medicinalproductTemp.length == 0 && activesubstancenameTemp.length > 0 && unauthorizedproductTemp != "1" )
				{
					
					//alert("TEST : " + strReplaceSubstance);
					for( j = 0; j < arrActive.length; j++ ) 
					{
						if( checkSubstance(arrActive[j]) == "ERROR" ){
							strReplaceSubstance = replaceSubstance(activesubstancenameTemp);
							if(strReplaceSubstance != null && strReplaceSubstance != ""){
								activesubstancenameTemp = strReplaceSubstance;
							}else{
								errorTemp = "1";
							}
						}
					}
					//if( checkSubstance(activesubstancenameTemp) == "ERROR" )
					//	errorTemp = "1";
				}
/*
				for( j = 0; j < arrActive.length; j++ ) 
				{
					if( j == 0 ) 
						activesubstancenameTemp = arrActive[j];
					else
						activesubstancenameTemp += "+" + arrActive[j];
					//if( checkDrugSubstance(medicinalproductTemp, arrActive[j]) == "ERROR" )
					//	errorTemp = "1";
				}
*/
				// 제품명 + 성분명 체크
				var strReplaceDR = "";
				var resultVal    = {};
				
				if( medicinalproductTemp.length > 0 && activesubstancenameTemp.length > 0 && unauthorizedproductTemp != "1" ) 
				{
					//for( j = 0; j < arrActive.length; j++ ) 
					//{
						if( checkDrugSubstance(medicinalproductTemp, activesubstancenameTemp) == "ERROR" ){
						//if( checkDrugSubstance(medicinalproductTemp, arrActive[j]) == "ERROR" ){
							strReplaceDR = replaceDrugSubstance(medicinalproductTemp, activesubstancenameTemp);
							//alert(strReplaceDR);
							//alert(medicinalproductTemp);
							//alert(activesubstancenameTemp);
							if(strReplaceDR != null && strReplaceDR != "" && strReplaceDR != "sironge"){
								resultVal = strReplaceDR.split("sironge");
								medicinalproductTemp = resultVal[0];
								//arrActive[j]         = resultVal[1];
								activesubstancenameTemp = resultVal[1];
							}else{
								errorTemp = "1";
							}
						}
					//}
					//if( checkDrugSubstance(medicinalproductTemp, activesubstancenameTemp) == "ERROR" )
					//	errorTemp = "1";
				}

				var obj={
						error : errorTemp,
				 		drugcharacterization : drugcharacterizationTemp,
						unauthorizedproduct : unauthorizedproductTemp,
						medicinalproduct : medicinalproductTemp,
						activesubstancename : activesubstancenameTemp,
						obtaindrugcountry : obtaindrugcountryTemp,
						drugbatchnumb : drugbatchnumbTemp,
						drugauthorizationnumb : drugauthorizationnumbTemp,
						drugauthorizationcountry : drugauthorizationcountryTemp,
						drugauthorizationholder : drugauthorizationholderTemp,
						drugstructuredosagenumb : drugstructuredosagenumbTemp,
						drugstructuredosageunit : drugstructuredosageunitTemp,
						drugseparatedosagenumb : drugseparatedosagenumbTemp,
						drugintervaldosageunitnumb : drugintervaldosageunitnumbTemp,
						drugintervaldosagedefinition : drugintervaldosagedefinitionTemp,
						drugcumulativedosagenumb : drugcumulativedosagenumbTemp,
						drugcumulativedosageunit : drugcumulativedosageunitTemp,
						drugdosagetext : drugdosagetextTemp,
						drugdosageform : drugdosageformTemp,
						drugadministrationroute : drugadministrationrouteTemp,
						drugparadministration : drugparadministrationTemp,
						reactiongestationperiod : reactiongestationperiodTemp,
						reactiongestationperiodunit : reactiongestationperiodunitTemp,						
						drugindicationmeddraversion : drugindicationmeddraversionTemp,			
						drugindicationcode : drugindicationcodeTemp,
						drugindication : drugindicationTemp,
						drugstartdate : drugstartdateTemp,
						drugstartdateformat : drugstartdateformatTemp,
						drugstartperiod : drugstartperiodTemp,
						drugstartperiodunit : drugstartperiodunitTemp,
						druglastperiod : druglastperiodTemp,
						druglastperiodunit : druglastperiodunitTemp,
						drugenddate : drugenddateTemp,
						drugenddateformat : drugenddateformatTemp,						
						drugtreatmentduration : drugtreatmentdurationTemp,						
						drugtreatmentdurationunit : drugtreatmentdurationunitTemp,
						actiondrug : actiondrugTemp,
						drugrecurreadministration : drugrecurreadministrationTemp,
						drugrecuractionmeddraversion : drugrecuractionmeddraversionTemp,
						drugrecuraction : drugrecuractionTemp,
						drugrecuractioncode : drugrecuractioncodeTemp,
						drugadditional : drugadditionalTemp,
						arrRelatednessofdrugtoreactionsevents : arrRelatednessofdrugtoreactionsevents
					}
					arrDrugs.push(obj);
					arrRelatednessofdrugtoreactionsevents = [];
				}
			
			fnDisplayDrugs();

			var narrativeincludeclinicalTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("narrativeincludeclinical")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("narrativeincludeclinical")[0].childNodes[0] != null) {
				narrativeincludeclinicalTemp = _fnReplaceOrigin(xmlVal.documentElement.getElementsByTagName("narrativeincludeclinical")[0].childNodes[0].nodeValue);
				$('#narrativeincludeclinical').val(narrativeincludeclinicalTemp);
				if( narrativeincludeclinicalTemp.length > 20000 )
					$("#narrativeincludeclinicalerror").html('<span class="has-error"><font color="red">Please enter no more than 20000 characters.</font></span>');
			}

			var reportercommentTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("reportercomment")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("reportercomment")[0].childNodes[0] != null) {
				//$('#reportercomment').val(xmlVal.documentElement.getElementsByTagName("reportercomment")[0].childNodes[0].nodeValue);
				reportercommentTemp = _fnReplaceOrigin(xmlVal.documentElement.getElementsByTagName("reportercomment")[0].childNodes[0].nodeValue);
				$('#reportercomment').val(reportercommentTemp);
				if( reportercommentTemp.length > 500 ) {
					$("#reportercommenterror").html('<span class="has-error"><font color="red">Please enter no more than 500 characters.</font></span>');
				}
			}

			var senderdiagnosiscodeTemp = "";
			var senderdiagnosisTemp = "";
			var senderdiagnosismeddraversionTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("senderdiagnosiscode")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderdiagnosiscode")[0].childNodes[0] != null) {
				$('senderdiagnosiscode').val(xmlVal.documentElement.getElementsByTagName("senderdiagnosiscode")[0].childNodes[0].nodeValue);
				senderdiagnosiscodeTemp = xmlVal.documentElement.getElementsByTagName("senderdiagnosiscode")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("senderdiagnosis")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderdiagnosis")[0].childNodes[0] != null) {
				$('#senderdiagnosis').val(xmlVal.documentElement.getElementsByTagName("senderdiagnosis")[0].childNodes[0].nodeValue);
				senderdiagnosisTemp = $('#senderdiagnosis').val();
				if( senderdiagnosisTemp.length > 250 ) {
					$("#senderdiagnosiserror").html('<span class="has-error"><font color="red">Please enter no more than 250 characters.</font></span>');
				}
			}

			if(xmlVal.documentElement.getElementsByTagName("senderdiagnosismeddraversion")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("senderdiagnosismeddraversion")[0].childNodes[0] != null) {
				$('#senderdiagnosismeddraversion').val(xmlVal.documentElement.getElementsByTagName("senderdiagnosismeddraversion")[0].childNodes[0].nodeValue);
				senderdiagnosismeddraversionTemp = xmlVal.documentElement.getElementsByTagName("senderdiagnosismeddraversion")[0].childNodes[0].nodeValue;
				if( senderdiagnosismeddraversionTemp.length > 8 ) {
					$("#senderdiagnosismeddraversionerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
				}
			}
			
			if( senderdiagnosisTemp.length > 0 ) {
				if( senderdiagnosismeddraversionTemp == "" ) {
					//errorTemp = "1";
				} else {
					// MedDRA LLT 명칭 가져오기
					if( isNaN(senderdiagnosisTemp) == false )
					{
						var LLTName = getMedDRA(senderdiagnosisTemp, senderdiagnosismeddraversionTemp);
						if( LLTName != "ERROR" ) {
							$('#senderdiagnosiscode').val(senderdiagnosisTemp);
							$('#senderdiagnosis').val(LLTName);
						} else {
							$("#senderdiagnosiserror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
						}
					}
				}
			}

			var sendercommentTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("sendercomment")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("sendercomment")[0].childNodes[0] != null) {
				$('#sendercomment').val(xmlVal.documentElement.getElementsByTagName("sendercomment")[0].childNodes[0].nodeValue);
				sendercommentTemp = xmlVal.documentElement.getElementsByTagName("sendercomment")[0].childNodes[0].nodeValue;
				if( sendercommentTemp.length > 2000 )
					$("#sendercommenterror").html('<span class="has-error"><font color="red">Please enter no more than 2000 characters.</font></span>');
			}

			// Validation Check
			if (senderdiagnosisTemp.length > 0) {
				if( senderdiagnosismeddraversionTemp == "" ) {
					$("#senderdiagnosismeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required.</font></span>');
				}
			}

			// File Upload
			var serverfilenameTemp = "";
			var realfilenamesTemp = "";
			if(xmlVal.documentElement.getElementsByTagName("serverfilename")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("serverfilename")[0].childNodes[0] != null) {
				$('#serverfilename').val(xmlVal.documentElement.getElementsByTagName("serverfilename")[0].childNodes[0].nodeValue);
				serverfilenameTemp = xmlVal.documentElement.getElementsByTagName("serverfilename")[0].childNodes[0].nodeValue;
			}

			if(xmlVal.documentElement.getElementsByTagName("realfilenames")[0] != null
					&& xmlVal.documentElement.getElementsByTagName("realfilenames")[0].childNodes[0] != null) {
				$('#realfilenames').val(xmlVal.documentElement.getElementsByTagName("realfilenames")[0].childNodes[0].nodeValue);
				realfilenamesTemp = xmlVal.documentElement.getElementsByTagName("realfilenames")[0].childNodes[0].nodeValue;

				//$("#realfilenamesdisplay").html("<a href='http://www.drugsafe.or.kr:7080/xdrp/uploadify/filedownload.jsp?ofname=" + realfilenamesTemp + "&fname=" + serverfilenameTemp + "'>" + realfilenamesTemp + "</a>");
				$("#realfilenamesdisplay").html("<a href='http://foreign.drugsafe.or.kr/js/xmle2b/filedownload.jsp?ofname=" + realfilenamesTemp + "&fname=" + serverfilenameTemp + "'>" + realfilenamesTemp + "</a>");
			}

			/*
			if( nNum.length > 1 ) {
				temp_validation('13', '13');
			} */
			/*}
	}*/
}

// Replace
function replace(url) {
	url= url.replace(/\%/g,"%25");
     url= url.replace(/&/g,"%26"); 
     url= url.replace(/\+/g,"%2B"); 
	 //url= url.replace(/\s+/g,"%20");
     return url;
}

// MedDRA 정보 설정
function getMedDRA(data1, data2){
	var Data = data1 + "," + data2;

	//Data = "10000292,16.0";
	var strReturn = "";

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxLlt.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		strReturn = json[0].name;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxLlt.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					strReturn = json[0].name;
				}
			}
		});
	}
	return strReturn;
}

// MedDRA PT 정보 설정
function getMedDRAPT(data1, data2){
	var Data = data1 + "," + data2;
	////Data = "10000292,16.0";
	var strReturn = "";

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxPt.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		strReturn = json[0].name;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxPt.do",
			data : {"sendData" : Data },
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					strReturn = json[0].name;
				}
			}
		});
	}

	return strReturn;
}

// 제품명 체크(OK or ERROR)
function checkDrug(data1){
	var Data = data1;

	// BLINDED 적용
    if (~Data.toUpperCase().indexOf('BLINDED ')) {
       Data = Data.substring(8);
    }

	var strReturn = "";
	
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9

	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrug.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		strReturn = json[0].name;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrug.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					strReturn = json[0].name;
				}
			}
		});
	}

	return strReturn;
}

// 제품명 WHO.DD 기준 replace
function replaceDrug(data1){
	var Data = data1;

	// BLINDED 적용
    if (~Data.toUpperCase().indexOf('BLINDED ')) {
       Data = Data.substring(8);
    }

	var strReturn = "";
	
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrugReplace.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")");
		if( json[0].name != "ERROR" )
			strReturn = json[0].rplVal;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrugReplace.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					if( json[0].name != "ERROR" )
						strReturn = json[0].rplVal;
				}
			}
		});
	}

	return strReturn;
}

// 제품명+성분명 체크
function checkDrugSubstance(data1,data2){
	// BLINDED 적용
	if (~data1.toUpperCase().indexOf('BLINDED ')) {
       data1 = data1.substring(8);
    }
	if (~data2.toUpperCase().indexOf('BLINDED ')) {
       data2 = data2.substring(8);
    }
	/* kkj 20151030 activesubstance replace ',' -> '[+]' 추가 */
	//data2 = data2.replace(',','+');
	var Data = data1 + "sironge" + data2;
	var strReturn = "";

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("POST", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrugSubstance.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		strReturn = json[0].name;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDrugSubstance.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					strReturn = json[0].name;
				}
			}
		});
	}

	return strReturn;
}

function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }

// 제품명 + 성분명 WHO.DD 기준 replace
function replaceDrugSubstance(data1,data2){

	// BLINDED 적용
	if (~data1.toUpperCase().indexOf('BLINDED ')) {
       data1 = data1.substring(8);
    }
	if (~data2.toUpperCase().indexOf('BLINDED ')) {
       data2 = data2.substring(8);
    }
	var Data = data1 + "sironge" + data2;
	var strReturn = "";

	var ua = window.navigator.userAgent;

	var msie = ua.indexOf("MSIE ");
	// IE 9
	if( isIE() == true || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("POST", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDSReplace.do?sendData=" + Data, false);
		xmlRequest.send(null);

		var json = eval("("+xmlRequest.ResponseText+")"); 
			
		if( json[0].name != "ERROR" ) {
			strReturn = json[0].rplVal + "sironge" + json[0].subVal;
		}
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxDSReplace.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					if( json[0].name != "ERROR" ) {
						strReturn = json[0].rplVal + "sironge" + json[0].subVal;
					}
				}
			}
		});
	}
	
	return strReturn;
}

// 성분명 체크
function checkSubstance(data1){
	// BLINDED 적용
	if (~data1.toUpperCase().indexOf('BLINDED ')) {
       data1 = data1.substring(8);
    }

	var Data = data1;
	var strReturn = "";

	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSubstance.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		strReturn = json[0].name;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSubstance.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					strReturn = json[0].name;
				}
			}
		});
	}

	return strReturn;
}

// 성분명 WHO.DD 기준 replace
function replaceSubstance(data1){
	var Data = data1;

	// BLINDED 적용
    if (~Data.toUpperCase().indexOf('BLINDED ')) {
       Data = Data.substring(8);
    }

	var strReturn = "";
	
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSubstanceReplace.do?sendData=" + Data, false);
		xmlRequest.send(null);
		var json = eval("("+xmlRequest.ResponseText+")"); 
		if( json[0].name != "ERROR" )
			strReturn = json[0].rplVal;
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSubstanceReplace.do",
			data : {"sendData" : Data },
			dataType : "json",
			async : false,
			success : function(data) {
			},
			error : function(xhr,status,error){
				if(xhr.status === 200){
					var json = eval("("+xhr.responseText+")"); 
					if( json[0].name != "ERROR" )
						strReturn = json[0].rplVal;
				}
			}
		});
	}

	return strReturn;
}

// 이메일 전송
function sendEmail(){
	if( nFileN.length <= 1 )
		return;

	var Data = nFileN;
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
	// IE 9
	if( parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 8 || parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 7) {
		Data = replace(Data);
		var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRequest.open("GET", "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSendMail.do?sendData=" + Data, false);
		xmlRequest.send(null);
		alert("Successfully reported.\n보고완료 되었습니다.");
		window.close();
	}
	else {
		$.ajax({
			type : "POST",
			url : "http://foreign.drugsafe.or.kr/xmle2b/EgovXmle2bAjaxSendMail.do",
			data : {"sendData" : Data},
			success : function(data) {
				alert("Successfully reported.\n보고완료 되었습니다.");
				//self.opener.window.location.reload();
				window.close();
			},
			error : function(xhr,status,error){
				alert("Successfully reported.\n보고완료 되었습니다.");
				//alert("이메일 전송 실패 code:"+error);
			}
		});
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function _fnGetParameter(valuename){
	var rtnval = "";
	//var nowAddress = unescape(location.href);
	var nowAddress = unescape(decodeURIComponent(location.href));
	var parameters = (nowAddress.slice(nowAddress.indexOf("?")+1,nowAddress.length)).split("&");

	for(var i = 0 ; i < parameters.length ; i++){
		var varName = parameters[i].split("=")[0];
		//if(varName.toUpperCase() == valuename.toUpperCase())
		if(varName == valuename)
		{
			rtnval = parameters[i].split("=")[1];
			break;
		}
	}
	return rtnval;
}

/* kkj 20151013 xmlDeclare 수정 */
function xmlDeclare(_href){
    var returnValue;
    returnValue='<?xml version="1.0" encoding="UTF-8"?>';
    /* 앞뒤 공백 제거 */
    returnValue= returnValue.replace(/(^\s*)|(\s*$)/gi, "") +_CrLf;
    if (_href) {		
		//returnValue+= '<?xml-stylesheet type="text/xsl" href="'+_href+'"?>'+_CrLf;
		returnValue += '<!DOCTYPE ichicsr SYSTEM "'+_href+'">'+_CrLf;
	}	
    return returnValue;
}

function xmlTag(tagName,tagValue,tagType){
    var returnValue;
    if(tagType=="close"){
      returnValue="</"+tagName+">";
    }else if(tagType=="open"){
      returnValue="<"+tagName+">";
    }else{
      returnValue="<"+tagName+">"+_fnReplaceBuildIn(tagValue)+"</"+tagName+">"; 
    }
    return returnValue;
} 
   
function _fnReduceBuildIn(_content){
   var _contentValue = _content;
   _contentValue = _contentValue.replace(/&amp;amp;/gm,'');
   _contentValue = _contentValue.replace(/&amp;lt;/gm,'');
   _contentValue = _contentValue.replace(/&amp;gt;/gm,'');
   _contentValue = _contentValue.replace(/&amp;/gm,'');
   _contentValue = _contentValue.replace(/&nbsp;/gm,'');
   _contentValue = _contentValue.replace(/&lt;/gm,'');
   _contentValue = _contentValue.replace(/&gt;/gm,'');
   _contentValue = _contentValue.replace(/&/gm,'');
   _contentValue = _contentValue.replace(/</gm,'');
   _contentValue = _contentValue.replace(/>/gm,'');
   _contentValue = _contentValue.replace(/'/gm,'');
   _contentValue = _contentValue.replace(/"/gm,'');

   return _contentValue;
}
 
function _fnReplaceBuildIn(_content){
   var _contentValue = _content;
   if(_contentValue != null){
	   /*_contentValue = _contentValue.replace(/&amp;amp;/gm,'&');
	   _contentValue = _contentValue.replace(/&amp;apos;/gm,"'");
	   _contentValue = _contentValue.replace(/&amp;quot;/gm,'"');
	   _contentValue = _contentValue.replace(/&amp;lt;/gm,'<');
	   _contentValue = _contentValue.replace(/&amp;gt;/gm,'>');
	   _contentValue = _contentValue.replace(/&amp;/gm,'&');
	   _contentValue = _contentValue.replace(/&/gm,'&amp;');
	   _contentValue = _contentValue.replace(/</gm,'&lt;');
	   _contentValue = _contentValue.replace(/>/gm,'&gt;');
	   _contentValue = _contentValue.replace(/'/gm,'&apos;');
	   _contentValue = _contentValue.replace(/"/gm,'&quot;');*/
	   _contentValue = _contentValue.replace(/%/gi  , "%25");
	   _contentValue = _contentValue.replace(/&/gi  , "%26");
	   _contentValue = _contentValue.replace(/'/gi  , "%27");
	   _contentValue = _contentValue.replace(/\\/gi , "%5C");
	   _contentValue = _contentValue.replace(/</gi  , "%3C");
	   _contentValue = _contentValue.replace(/>/gi  , "%3E");
	   _contentValue = _contentValue.replace(/\"/gi , "%22");
   	   _contentValue = _contentValue.replace(/#/gi  , "%23");
	   _contentValue = _contentValue.replace(/;/gi  , "%3B");
	   //_contentValue = _contentValue.replace("\n" , "%0A");
	   return _contentValue;
   }
   return "";
}

function _fnReplaceOrigin(_content){
   var _contentValue = _content;
   if(_contentValue != null){
	   _contentValue = _contentValue.replace(/%26/gi  , "&");
	   _contentValue = _contentValue.replace(/%27/gi  , "'");
	   _contentValue = _contentValue.replace(/%5C/gi  , "\\");
	   _contentValue = _contentValue.replace(/%3C/gi  , "<");
	   _contentValue = _contentValue.replace(/%3E/gi  , ">");
	   _contentValue = _contentValue.replace(/%22/gi  , "\"");
   	   _contentValue = _contentValue.replace(/%23/gi  , "#");
	   _contentValue = _contentValue.replace(/%3B/gi  , ";");
	   //_contentValue = _contentValue.replace("%0A"  , "\n");
	   _contentValue = _contentValue.replace(/&#13;/gi, "\n");
	   _contentValue = _contentValue.replace(/%25/gi  , "%");
	   return _contentValue;
   }
   return "";	
}

function _fnRestoreBuildIn(_content){ 
   var _contentValue = _content;
   _contentValue = _contentValue.replace(/&amp;apos;/gm,"'");
   _contentValue = _contentValue.replace(/&amp;quot;/gm,'"');
   _contentValue = _contentValue.replace(/&apos;/gm,"'");
   _contentValue = _contentValue.replace(/&quot;/gm,'"');
   _contentValue = _contentValue.replace(/&amp;amp;/gm,'&');
   _contentValue = _contentValue.replace(/&amp;/gm,'&');
   _contentValue = _contentValue.replace(/&lt;/gm,'<');
   _contentValue = _contentValue.replace(/&gt;/gm,'>');

   return _contentValue;
}
 
function encode_utf8(s) { 
    //return unescape(encodeURIComponent(s)); 
	return encodeURIComponent(s);
} 

var xmlRetFileName = "";

function _xmlUpload(_xmlFilePathName,_rstXml,_rptStatCd,_userId,_pharmacistCode,_pharmacistName,_saveType) {
	//alert(_rptStatCd+_userId+_pharmacistCode+_pharmacistName+_saveType);
	var _callMethodUrl = "xmlUploadForE2B.1.2.jsp";
	if (!$("#results").text().length) {
        alert('XML 생성을 먼저 해주세요!!');
        return false;
    }
	if( _xmlFilePathName == "" )
		_xmlFilePathName = xmlRetFileName;

	$(document).ready(function(){
		$.post(_callMethodUrl,{
			userId:_userId,
			pharmacistCode:_pharmacistCode,
			pharmacistName:_pharmacistName,
			xml_file_name: _xmlFilePathName,
			rpt_stat_cd: _rptStatCd,
			xmlString: encode_utf8(_rstXml),
			saveType: _saveType
		},function(data,status){
			if( data.substring(0, 7) == "success" )	//success201488888888000582
			{
				//alert(data.substring(7, 18+7));
				xmlRetFileName = data.substring(7, 18+7) + ".xml";
				if( gStatus == "13" ) {
					alert("Successfully saved.\n임시저장 되었습니다.");
					$("#TempBtn").removeAttr("disabled");
				}
				if( gStatus == "20" ) {
					alert("Successfully saved.\n보고대기 상태로 변경되었습니다.");
					//self.opener.window.location.reload();
					window.close();
				}
				if( gStatus == "30" ) {
					sendEmail();
				}

			} else {
				alert( "XML 저장 오류" );
			}
			//alert("Status: " + status);
		});
	});
  }
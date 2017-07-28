function temp_validation(beforeType, saveType) {
	if( iRunning == 1 )
		return;
	
	/* kkj 20151029 spinner 생성 */
	// 반투명막 생성
	wrapWindowByMask();
	// 로딩 스피너 호출
	loadingProgress();
	gStatus = saveType;
	var iRet = 0;
	var iMulti = 0;

	$("#linkreportnumberror").html('');

	// safetyreportversion(2AN)
	if( $('#safetyreportversion').val().length > 2 )
	{
		if( iRet == 0 )
			document.getElementById("safetyreportversion").focus(); 
		iRet = 1;
		$("#safetyreportversionerror").html('<span class="has-error"><font color="red">Please enter no more than 2 characters.</font></span>');
	}
	else {
		$("#safetyreportversionerror").html('');
	}

	// Report id 
	if( document.getElementById("safetyreportid").value.length == 0 )
	{
		if( iRet == 0 )
			document.getElementById("safetyreportid").focus(); 
		iRet = 1;
		$("#safetyreportiderror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	} else {
		if ( document.getElementById("safetyreportid").value.length > 100) {
			if( iRet == 0 )
				document.getElementById("safetyreportid").focus(); 
			iRet = 1;
			$("#safetyreportiderror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
		}
		else {
			$("#safetyreportiderror").html('');
		}
	}

	// Primary Source country
	if( document.getElementById("primarysourcecountry").value.length == 0 ) {
		if( iRet == 0 )
			document.getElementById("primarysourcecountry").focus(); 
		iRet = 1;
		$("#primarysourcecountryerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	}
	else {
		if( fncNation( document.getElementById("primarysourcecountry").value ) == false )
		{
			if( iRet == 0 )
				document.getElementById("primarysourcecountry").focus(); 
			iRet = 1;
			$("#primarysourcecountryerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		} else {
			$("#primarysourcecountryerror").html('');
		}
	}

	if( isLoad == true ) {
		$("#occurcountryerror").html('');
		if( document.getElementById("occurcountry").value.length > 0 ) {
			// occurcountry(2A)
			if( fncNation( document.getElementById("occurcountry").value ) == false )
			{
				if( iRet == 0 )
					document.getElementById("occurcountry").focus(); 
				iRet = 1;
				$("#occurcountryerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}
			else {
				$("#occurcountryerror").html('');
			}
		}
	}

	// transmissiondate
	$("#transmissiondateerror").html('');
	if( document.getElementById("transmissiondate").value.length == 0 ) {
		if( iRet == 0 )
			document.getElementById("transmissiondate").focus(); 
		iRet = 1;
		$("#transmissiondateerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	}
	// transmissiondateformat(102 - Format CCYYMMDD)

	if( isLoad == true ) {
		if( document.getElementById("transmissiondateformat").value.length == 0 )
		{
			iRet = 1;
			$("#transmissiondateerror").html('<span class="has-error"><font color="red">transmissiondateformat Mandatory field</font></span>');
		}
		if( document.getElementById("transmissiondateformat").value != "102" ) {
			iRet = 1;
			$("#transmissiondateerror").html('<span class="has-error"><font color="red">transmissiondateformat Invalid code</font></span>');
		}
	}

	// reporttype * (1N)
	if( document.getElementById("reporttype").value.length == 0 )
	{
		if( iRet == 0 )
			document.getElementById("reporttype").focus(); 
		iRet = 1;
		$("#reporttypeerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');

	} else if( document.getElementById("reporttype").value != "1" && document.getElementById("reporttype").value != "2" && document.getElementById("reporttype").value != "3" && document.getElementById("reporttype").value != "4" ) {
		if( iRet == 0 )
			document.getElementById("reporttype").focus(); 
		iRet = 1;
		$("#reporttypeerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
	}
	else {
		$("#reporttypeerror").html('');
	}
	
	// Serious
	$("#seriouserror").html('');
	if( $("input:radio[name='optionsRadios0']").is(":checked") == true )
	{
		if ( $('input:radio[name="optionsRadios0"]:checked').val() == "1" )
		{
			if( $('input#seriousnessdeath').is(':checked') == true )
				iMulti += 1;
			if( $('input#seriousnesslifethreatening').is(':checked') == true )
				iMulti += 1;
			if( $('input#seriousnesshospitalization').is(':checked') == true ) 
				iMulti += 1;
			if( $('input#seriousnessdisabling').is(':checked') == true )
				iMulti += 1;
			if( $('input#seriousnesscongenitalanomali').is(':checked') == true )
				iMulti += 1;
			if( $('input#seriousnessother').is(':checked') == true )
				iMulti += 1;
			if( iMulti == 0 ) {
				$("#seriouserror").html('<span class="has-error"><font color="red">There must be a reason for seriousness, if serious is yes</font></span>');
				iRet == 1;
			}
			iMulti = 0;
		}
	}
	else {
		iRet = 1;
		$("#seriouserror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	}
	//// sironge
	/*
	if( isLoad == true ) {
		// receivedateformat(102 - Format CCYYMMDD)
		if( document.getElementById("receivedateformat").value.length == 0 )
		{
			iRet = 1;
			$("#receivedateerror").html('<span class="has-error"><font color="red">receivedateformat Mandatory field</font></span>');
		}
		if( document.getElementById("receivedateformat").value != "102" ) {
			iRet = 1;
			$("#receivedateerror").html('<span class="has-error"><font color="red">receivedateformat Invalid code</font></span>');
		}
	} */

	// Receive Date
	if ( document.getElementById("receivedate").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("receivedate").focus(); 
		iRet = 1;
		$("#receivedateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#receivedateerror").html('');
	}

	// Receipt Date
	if ( document.getElementById("receiptdate").value.length == 0 ) {
		if( iRet == 0 )
			document.getElementById("receiptdate").focus(); 
		iRet = 1;
		$("#receiptdateerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	} else if ( document.getElementById("receiptdate").value.length > 8 ) {
		if( iRet == 0 )
			document.getElementById("receiptdate").focus(); 
		iRet = 1;
		$("#receiptdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	} else {
		$("#receiptdateerror").html('');
	}

	//if( isLoad == true ) {
		// oRadiosadditionaldocument1 is checked --> documentlist
		if (document.getElementById("oRadiosadditionaldocument1").checked) 
		{
			if (document.getElementById("documentlist").value == null 
				|| document.getElementById("documentlist").value == "") {
				if( iRet == 0 )
					document.getElementById("documentlist").focus(); 
				iRet = 1;

				$("#documentlisterror").html('<span class="has-error"><font color="red">Required field</font></span>');
			}
			else {
				$("#documentlisterror").html('');
			}
		}
		/* else {
			iRet = 1;
			$("#additionaldocumenterror").html('<span class="has-error"><font color="red">additionaldocument Invalid code</font></span>');
		} */
	//}

	if( isLoad == true ) {
		// fulfillexpeditecriteria
		if (document.getElementById("oRadiosfulfillexpeditecriteria1").checked || document.getElementById("oRadiosfulfillexpeditecriteria2").checked) 
		{
			$("#fulfillexpeditecriteriaerror").html('');
		}
		/* else {
			iRet = 1;
			$("#fulfillexpeditecriteriaerror").html('<span class="has-error"><font color="red">fulfillexpeditecriteria Invalid code</font></span>');
		} */
	}

	// authoritynumb (100AN)
	if ( document.getElementById("authoritynumb").value.length > 100) {
		if( iRet == 0 )
			document.getElementById("authoritynumb").focus(); 
		iRet = 1;
		$("#authoritynumberror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
	}
	else {
		$("#authoritynumberror").html('');
	}

	// companynumb (100AN)
	if ( document.getElementById("companynumb").value.length > 100) {
		if( iRet == 0 )
			document.getElementById("companynumb").focus(); 
		iRet = 1;
		$("#companynumberror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
	}
	else {
		$("#companynumberror").html('');
	}

	$("#duplicatesourceerror").html('');
	$("#duplicatenumberror").html('');

	// (duplicate) oRadiosduplicate1  duplicatesource  duplicatenumb
	if (document.getElementById("oRadiosduplicate1").checked)
	{
		if (arrReportDuplicate == null || arrReportDuplicate.length < 1) {
			if( iRet == 0 )
				document.getElementById("duplicatesource").focus(); 
			iRet = 1;
			$("#duplicatesourceerror").html('<span class="has-error"><font color="red">Required field</font></span>');
			$("#duplicatenumberror").html('<span class="has-error"><font color="red">Required field</font></span>');
		}
		else {
			//Patient Relevant Medical History Start 배열은 에러가 없을 때 성공하는 것으로
			if( arrRelevantMedicalHistory.length > 0 ) {
				$.each(arrRelevantMedicalHistory, function( index ) { 
					if( this.error == "1" )
					{
						iRet = 1;
						$("#duplicatesourceerror").html('<span class="has-error"><font color="red">Required field</font></span>');
						$("#duplicatenumberror").html('<span class="has-error"><font color="red">Required field</font></span>');
					}
				});
			}
		}
	}
	else {
		$("#duplicatesourceerror").html('');
		$("#duplicatenumberror").html('');
	}

	// #nullificationreason
	if ( document.getElementById("nullificationreason").value.length > 200) {
		if( iRet == 0 )
			document.getElementById("nullificationreason").focus(); 
		iRet = 1;
		$("#nullificationreasonerror").html('<span class="has-error"><font color="red">Please enter no more than 200 characters.</font></span>');
	}
	else {
		$("#nullificationreasonerror").html('');
	}

	if( isLoad == true ) {
		// medicallyconfirm 1=Yes 2=No
		/* if ( document.getElementById("oRadiosmedicallyconfirm1").checked == false && document.getElementById("oRadiosmedicallyconfirm2").checked == false )
		{
			iRet = 1;
			$("#medicallyconfirmerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		} */
	}

	var iStudyReport = 0;
	var iReportType = 0;
	var iObservestudytype = 0;

	// Primary Source Information Array Start
	$("#primarysourceinformationerror").html('');
	var arrPrimarySourceInformationTemp = [];
	if( arrPrimarySourceInformation.length <= 0 ) {
		iRet = 1;
		$("#primarysourceinformationerror").html('<span class="has-error"><font color="red">At least one of family name, organization, postcode, country of reporter, reporter qualification must be filled in</font></span><br /><br />');
	} else {
		iStudyReport = 0;

		// 스터디 확인 필요 creator 2014.12.11
		document.getElementById("reporttype").value
		$.each(arrPrimarySourceInformation, function( index ) { 
			if( this.observestudytype == "1" || this.observestudytype == "2" || this.observestudytype == "3" ) {
				iObservestudytype = 1;
			}
		});

		if( document.getElementById("reporttype").value == "2" && iObservestudytype == 0 ) {
			iRet = 1;
			$("#primarysourceinformationerror").html('<span class="has-error"><font color="red">Mandatory field if report is from study</font></span><br /><br />');
		}
		// 스터디 확인 필요

		/*
		$.each(arrPrimarySourceInformation, function( index ) { 
			if( this.observestudytype == "1" || this.observestudytype == "2" || this.observestudytype == "3" ) {
				iObservestudytype = 1;
			}
		});

		$.each(arrPrimarySourceInformation, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
			if( $("#reporttype").val() == "2" && iStudyReport == 0 ) {
				iRet = 1;
				this.error = "1";
			}
			arrPrimarySourceInformationTemp.push(this);
		});
		arrPrimarySourceInformation = arrPrimarySourceInformationTemp;
		fnDisplayPrimarySourceInformation();
		*/
	}
	// Primary Source Information Array End

	// Sender Type
	if( document.getElementById("sendertype").value == "" )
	{
		if( iRet == 0 )
			document.getElementById("sendertype").focus(); 
		iRet = 1;
		$("#sendertypeerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	} else if( document.getElementById("sendertype").value != "1" && document.getElementById("sendertype").value != "2" && document.getElementById("sendertype").value != "3" && document.getElementById("sendertype").value != "4" && document.getElementById("sendertype").value != "5" && document.getElementById("sendertype").value != "6" )
	{
		if( iRet == 0 )
			document.getElementById("sendertype").focus(); 
		iRet = 1;
		$("#sendertypeerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
	}
	else {
		$("#sendertypeerror").html('');
	}

	// Sender Organization
	if( document.getElementById("senderorganization").value == "" )
	{
		if( iRet == 0 )
			document.getElementById("senderorganization").focus(); 
		iRet = 1;
		$("#senderorganizationerror").html('<span class="has-error"><font color="red">Mandatory field</font></span>');
	} else if ( document.getElementById("senderorganization").value.length > 60) {
		if( iRet == 0 )
			document.getElementById("senderorganization").focus(); 
		iRet = 1;
		$("#senderorganizationerror").html('<span class="has-error"><font color="red">Please enter no more than 60 characters.</font></span>');
	}
	else {
		$("#senderorganizationerror").html('');
	}

	// Sender Department
	if ( document.getElementById("senderdepartment").value.length > 60) {
		if( iRet == 0 )
			document.getElementById("senderdepartment").focus(); 
		iRet = 1;
		$("#senderdepartmenterror").html('<span class="has-error"><font color="red">Please enter no more than 60 characters.</font></span>');
	}
	else {
		$("#senderdepartmenterror").html('');
	}

	// Sender Street Address
	if ( document.getElementById("senderstreetaddress").value.length > 100) {
		if( iRet == 0 )
			document.getElementById("senderstreetaddress").focus(); 
		iRet = 1;
		$("#senderstreetaddresserror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
	}
	else {
		$("#senderstreetaddresserror").html('');
	}

	// Sender City
	if ( document.getElementById("sendercity").value.length > 35) {
		if( iRet == 0 )
			document.getElementById("sendercity").focus(); 
		iRet = 1;
		$("#sendercityerror").html('<span class="has-error"><font color="red">Please enter no more than 35 characters.</font></span>');
	}
	else {
		$("#sendercityerror").html('');
	}

	// Sender State
	if ( document.getElementById("senderstate").value.length > 40) {
		if( iRet == 0 )
			document.getElementById("senderstate").focus(); 
		iRet = 1;
		$("#senderstateerror").html('<span class="has-error"><font color="red">Please enter no more than 40 characters.</font></span>');
	}
	else {
		$("#senderstateerror").html('');
	}

	// Sender Post Code
	if ( document.getElementById("senderpostcode").value.length > 15) {
		if( iRet == 0 )
			document.getElementById("senderpostcode").focus(); 
		iRet = 1;
		$("#senderpostcodeerror").html('<span class="has-error"><font color="red">Please enter no more than 15 characters.</font></span>');
	}
	else {
		$("#senderpostcodeerror").html('');
	}

	// Sender Tel
	if ( document.getElementById("sendertel").value.length > 10) {
		if( iRet == 0 )
			document.getElementById("sendertel").focus(); 
		iRet = 1;
		$("#sendertelerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
	}
	else {
		$("#sendertelerror").html('');
	}

	// Sender Tel Extension
	if ( document.getElementById("sendertelextension").value.length > 5) {
		if( iRet == 0 )
			document.getElementById("sendertelextension").focus(); 
		iRet = 1;
		$("#sendertelextensionerror").html('<span class="has-error"><font color="red">Please enter no more than 5 characters.</font></span>');
	}
	else {
		$("#sendertelextensionerror").html('');
	}

	// Sender Tel Country Code
	if ( document.getElementById("sendertelcountrycode").value.length > 3) {
		if( iRet == 0 )
			document.getElementById("sendertelcountrycode").focus(); 
		iRet = 1;
		$("#sendertelcountrycodeerror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
	}
	else {
		$("#sendertelcountrycodeerror").html('');
	}

	// Sender Fax
	if ( document.getElementById("senderfax").value.length > 10) {
		if( iRet == 0 )
			document.getElementById("senderfax").focus(); 
		iRet = 1;
		$("#senderfaxerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
	}
	else {
		$("#senderfaxerror").html('');
	}

	// Sender Fax Extension
	if ( document.getElementById("senderfaxextension").value.length > 5) {
		if( iRet == 0 )
			document.getElementById("senderfaxextension").focus(); 
		iRet = 1;
		$("#senderfaxextensionerror").html('<span class="has-error"><font color="red">Please enter no more than 5 characters.</font></span>');
	}
	else {
		$("#senderfaxextensionerror").html('');
	}

	// Sender Fax Country Code
	if ( document.getElementById("senderfaxcountrycode").value.length > 3) {
		if( iRet == 0 )
			document.getElementById("senderfaxcountrycode").focus(); 
		iRet = 1;
		$("#senderfaxcountrycodeerror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
	}
	else {
		$("#senderfaxcountrycodeerror").html('');
	}

	// Sender Email Address
	if ( document.getElementById("senderemailaddress").value.length > 100) {
		if( iRet == 0 )
			document.getElementById("senderemailaddress").focus(); 
		iRet = 1;
		$("#senderemailaddresserror").html('<span class="has-error"><font color="red">Please enter no more than 100 characters.</font></span>');
	}
	else if( validateEmail(document.getElementById("senderemailaddress").value) == false ) {
		if( iRet == 0 )
			document.getElementById("senderemailaddress").focus(); 
		iRet = 1;
		$("#senderemailaddresserror").html('<span class="has-error"><font color="red">Please enter a valid email address.</font></span>');
	} else {
		$("#senderemailaddresserror").html('');
	}

	// Patient Initial
	if ( document.getElementById("patientinitial").value.length > 10) {
		if( iRet == 0 )
			document.getElementById("patientinitial").focus(); 
		iRet = 1;
		$("#patientinitialerror").html('<span class="has-error"><font color="red">Please enter no more than 10 characters.</font></span>');
	}
	else {
		$("#patientinitialerror").html('');
	}

	// GP medical record number
	if ( document.getElementById("patientgpmedicalrecordnumb").value.length > 20) {
		if( iRet == 0 )
			document.getElementById("patientgpmedicalrecordnumb").focus(); 
		iRet = 1;
		$("#patientgpmedicalrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
	}
	else {
		$("#patientgpmedicalrecordnumberror").html('');
	}

	// Specialist record number
	if ( document.getElementById("patientspecialistrecordnumb").value.length > 20) {
		if( iRet == 0 )
			document.getElementById("patientspecialistrecordnumb").focus(); 
		iRet = 1;
		$("#patientspecialistrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
	}
	else {
		$("#patientspecialistrecordnumberror").html('');
	}

	// Hospital record number
	if ( document.getElementById("patienthospitalrecordnumb").value.length > 20) {
		if( iRet == 0 )
			document.getElementById("patienthospitalrecordnumb").focus(); 
		iRet = 1;
		$("#patienthospitalrecordnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
	}
	else {
		$("#patienthospitalrecordnumberror").html('');
	}

	// Investigation number
	if ( document.getElementById("patientinvestigationnumb").value.length > 20) {
		if( iRet == 0 )
			document.getElementById("patientinvestigationnumb").focus(); 
		iRet = 1;
		$("#patientinvestigationnumberror").html('<span class="has-error"><font color="red">Please enter no more than 20 characters.</font></span>');
	}
	else {
		$("#patientinvestigationnumberror").html('');
	}

	// Patient Date of birth(CCYYMMDD)
	if ( document.getElementById("patientbirthdate").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("patientbirthdate").focus(); 
		iRet = 1;
		$("#patientbirthdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#patientbirthdateerror").html('');
	} 

	// Age at time of onset
	if ( document.getElementById("patientonsetage").value.length > 5) {
		if( iRet == 0 )
			document.getElementById("patientonsetage").focus(); 
		iRet = 1;
		$("#patientonsetageerror").html('<span class="has-error"><font color="red">Please enter no more than 5 characters.</font></span>');
	}
	else {
		$("#patientonsetageerror").html('');
	} 

	// Age at time of onset Unit
	if( document.getElementById("patientonsetage").value.length > 0 ) {
		if( document.getElementById("patientonsetageunit").value.length <= 0 ) {
			$("#patientonsetageuniterror").html('<span class="has-error"><font color="red">Appropriate age unit required</font></span>');
		} else if( document.getElementById("patientonsetageunit").value != "800" && document.getElementById("patientonsetageunit").value != "801" && document.getElementById("patientonsetageunit").value != "802" &&
				   document.getElementById("patientonsetageunit").value != "803" && document.getElementById("patientonsetageunit").value != "804" && document.getElementById("patientonsetageunit").value != "805" ) {
			$("#patientonsetageuniterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		} else {
			$("#patientonsetageuniterror").html('');
		}
	}

	// Gestation period
	if ( document.getElementById("gestationperiod").value.length > 3) {
		if( iRet == 0 )
			document.getElementById("gestationperiod").focus(); 
		iRet = 1;
		$("#gestationperioderror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
	}
	else {
		$("#gestationperioderror").html('');
	} 

	// Gestation period Unit
	$("#gestationperioduniterror").html('');
	if( document.getElementById("gestationperiod").value.length > 0 ) {
		if( document.getElementById("gestationperiodunit").value.length <= 0 ) {
			if( iRet == 0 )
				document.getElementById("gestationperiodunit").focus(); 
			iRet = 1;
			$("#gestationperioduniterror").html('<span class="has-error"><font color="red">Appropriate period unit is required</font></span>');
		} else if( document.getElementById("gestationperiodunit").value != "802" && document.getElementById("gestationperiodunit").value != "803" && 
				   document.getElementById("gestationperiodunit").value != "804" && document.getElementById("gestationperiodunit").value != "810" ) {
			if( iRet == 0 )
				document.getElementById("gestationperiodunit").focus(); 
			iRet = 1;
			$("#gestationperioduniterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		}
	}

	// Patient age group
	if ( document.getElementById("patientagegroup").value.length > 3) {
		if( iRet == 0 )
			document.getElementById("patientagegroup").focus(); 
		iRet = 1;
		$("#patientagegrouperror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
	}
	else {
		$("#patientagegrouperror").html('');
	}

	// Patient Weight
	if ( document.getElementById("patientweight").value.length > 6) {
		if( iRet == 0 )
			document.getElementById("patientweight").focus(); 
		iRet = 1;
		$("#patientweighterror").html('<span class="has-error"><font color="red">Please enter no more than 6 characters.</font></span>');
	}
	else {
		$("#patientweighterror").html('');
	}

	// Patient Height
	if ( document.getElementById("patientheight").value.length > 3) {
		if( iRet == 0 )
			document.getElementById("patientheight").focus(); 
		iRet = 1;
		$("#patientheighterror").html('<span class="has-error"><font color="red">Please enter no more than 3 characters.</font></span>');
	}
	else {
		$("#patientheighterror").html('');
	}

	//other 
	// patientinitial is not null ==  patientbirthdate patientonsetage patientagegroup patientsex
	
	if ((document.getElementById("patientinitial").value == null
		|| document.getElementById("patientinitial").value == "")
		&&(document.getElementById("patientbirthdate").value == null
		|| document.getElementById("patientbirthdate").value == "")
		&&(document.getElementById("patientonsetage").value == null
		|| document.getElementById("patientonsetage").value == "")
		&&(document.getElementById("patientagegroup").value == null
		|| document.getElementById("patientagegroup").value == "")
		&&(document.getElementById("patientsex").value == null
		|| document.getElementById("patientsex").value == ""))
	{
		if( iRet == 0 )
			document.getElementById("patientinitial").focus(); 
		iRet = 1;
		
		$("#patientcharacteristicserror").html('<span class="has-error"><font color="red">At least one of patient initial, date of birth,  sex, onset age or age group must be filled in</font></span><br/><br/>');
	}
	else {
		$("#patientcharacteristicserror").html('');
	}

	if( isLoad == true ) {
		$("#patientsexerror").html('');
		if( document.getElementById("patientsex").value.length > 0 ) {
			// Patient Sex
			if( document.getElementById("patientsex").value != "1" && document.getElementById("patientsex").value != "2" ){
				if( iRet == 0 )
					document.getElementById("patientsex").focus(); 
				iRet = 1;
				$("#patientsexerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			}
		}
	}

	// Last menstrual period date
	if ( document.getElementById("patientlastmenstrualdate").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("patientlastmenstrualdate").focus(); 
		iRet = 1;
		$("#patientlastmenstrualdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#patientlastmenstrualdateerror").html('');
	} 

	// Last menstrual period date dateformat
	$("#lastmenstrualdateformaterror").html('');
	if( document.getElementById("patientlastmenstrualdate").value.length > 0 ) {
		if( document.getElementById("lastmenstrualdateformat").value.length <= 0 ) {
			if( iRet == 0 )
				document.getElementById("lastmenstrualdateformat").focus(); 
			iRet = 1;
			$("#lastmenstrualdateformaterror").html('<span class="has-error"><font color="red">Appropriate period unit is required</font></span>');
		} else if( document.getElementById("lastmenstrualdateformat").value != "102" && 
				   document.getElementById("lastmenstrualdateformat").value != "602" && document.getElementById("lastmenstrualdateformat").value != "610" ) {
			if( iRet == 0 )
				document.getElementById("lastmenstrualdateformat").focus(); 
			iRet = 1;
			$("#lastmenstrualdateformaterror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		}
	}

	// Medical history
	if (document.getElementById("patientepisodename").value != null
			&& document.getElementById("patientepisodename").value != "")
	{
		if (document.getElementById("patientepisodenamemeddraver").value == null
			|| document.getElementById("patientepisodenamemeddraver").value == "")
		{
			if( iRet == 0 )
				document.getElementById("patientepisodenamemeddraver").focus(); 
			iRet = 1;

			$("#patientepisodenamemeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
		}
		else {
			$("#patientepisodenamemeddraversionerror").html('');
		}
	}
	else {
		$("#patientepisodenamemeddraversionerror").html('');
	}
	
	
	//Start I20160221 creator
	if ( ( document.getElementById("patientdrugreactioncode").value != null && document.getElementById("patientdrugreactioncode").value != "" ) ||
		 ( document.getElementById("patientdrugreaction").value != null && document.getElementById("patientdrugreaction").value != "" ) ||
		 ( document.getElementById("patientdrgreactionmeddraver").value != null && document.getElementById("patientdrgreactionmeddraver").value != "" ) )
	{
		if ( document.getElementById("patientdrugreactioncode").value == null || document.getElementById("patientdrugreactioncode").value == "" )
		{
			$("#patientdrugreactionerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("patientdrugreaction").value == null || document.getElementById("patientdrugreaction").value == "" )
		{
			$("#patientdrugreactionerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("patientdrgreactionmeddraver").value == null || document.getElementById("patientdrgreactionmeddraver").value == "" )
		{
			$("#patientdrgreactionmeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
			iRet = 1;
		}
	}

	if ( ( document.getElementById("drugindicationcode").value != null && document.getElementById("drugindicationcode").value != "" ) ||
			 ( document.getElementById("drugindication").value != null && document.getElementById("drugindication").value != "" ) ||
			 ( document.getElementById("drugindicationmeddraversion").value != null && document.getElementById("drugindicationmeddraversion").value != "" ) )
	{
		if ( document.getElementById("drugindicationcode").value == null || document.getElementById("drugindicationcode").value == "" )
		{
			$("#drugindicationerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugindication").value == null || document.getElementById("drugindication").value == "" )
		{
			$("#drugindicationerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugindicationmeddraversion").value == null || document.getElementById("drugindicationmeddraversion").value == "" )
		{
			$("#drugindicationmeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
			iRet = 1;
		}
	}
	
	if ( ( document.getElementById("drugrecuractioncode").value != null && document.getElementById("drugrecuractioncode").value != "" ) ||
			 ( document.getElementById("drugrecuraction").value != null && document.getElementById("drugrecuraction").value != "" ) ||
			 ( document.getElementById("drugrecuractionmeddraversion").value != null && document.getElementById("drugrecuractionmeddraversion").value != "" ) )
	{
		if ( document.getElementById("drugrecuractioncode").value == null || document.getElementById("drugrecuractioncode").value == "" )
		{
			$("#drugrecuractionerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugrecuraction").value == null || document.getElementById("drugrecuraction").value == "" )
		{
			$("#drugrecuractionerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugrecuractionmeddraversion").value == null || document.getElementById("drugrecuractionmeddraversion").value == "" )
		{
			$("#drugrecuractionmeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
			iRet = 1;
		}
	}
	
	if ( ( document.getElementById("drugreactionassescode").value != null && document.getElementById("drugreactionassescode").value != "" ) ||
			 ( document.getElementById("drugreactionasses").value != null && document.getElementById("drugreactionasses").value != "" ) ||
			 ( document.getElementById("drugreactionassesmeddraversion").value != null && document.getElementById("drugreactionassesmeddraversion").value != "" ) )
	{
		if ( document.getElementById("drugreactionassescode").value == null || document.getElementById("drugreactionassescode").value == "" )
		{
			$("#drugreactionasseserror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugreactionasses").value == null || document.getElementById("drugreactionasses").value == "" )
		{
			$("#drugreactionasseserror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
			iRet = 1;
		}
		if ( document.getElementById("drugreactionassesmeddraversion").value == null || document.getElementById("drugreactionassesmeddraversion").value == "" )
		{
			$("#drugreactionassesmeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
			iRet = 1;
		}
	}
	//End I20160221 creator
	
	//Patient Relevant Medical History Start 배열은 에러가 없을 때 성공하는 것으로
	if( arrRelevantMedicalHistory.length > 0 ) {
		$.each(arrRelevantMedicalHistory, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Patient Relevant Medical History Array End

	// Text for relevant medical history and concurrent conditions
	if ( document.getElementById("patientmedicalhistorytext").value.length > 10000) {
		if( iRet == 0 )
			document.getElementById("patientmedicalhistorytext").focus(); 
		iRet = 1;
		$("#patientmedicalhistorytexterror").html('<span class="has-error"><font color="red">Please enter no more than 10000 characters.</font></span>');
	}
	else {
		$("#patientmedicalhistorytexterror").html('');
	}

	//Patient Relevant Medical History Start 배열은 에러가 없을 때 성공하는 것으로
	if( arrRelevantPastDrugTherapy.length > 0 ) {
		$.each(arrRelevantPastDrugTherapy, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Patient Relevant Medical History Array End

	if( document.getElementById("patientdeathdate").value.length > 0 ) {
		if (document.getElementById("patientdeathdateformat").value == null
			|| document.getElementById("patientdeathdateformat").value == "")
		{
			if( iRet == 0 )
				document.getElementById("patientdeathdateformat").focus(); 
			iRet = 1;
			
			$("#patientdeathdateformaterror").html('<span class="has-error"><font color="red">Appropriate date format is required</font></span>');
		}
		else {
			$("#patientdeathdateformaterror").html('');
		}
	}
	else {
		$("#patientdeathdateformaterror").html('');
	}

	if ( document.getElementById("parentbirthdate").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("parentbirthdate").focus(); 
		iRet = 1;
		$("#parentbirthdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#parentbirthdateerror").html('');
	}

	// Parent Age
	if ( document.getElementById("parentage").value.length > 2) {
		if( iRet == 0 )
			document.getElementById("parentage").focus(); 
		iRet = 1;
		$("#parentageerror").html('<span class="has-error"><font color="red">Please enter no more than 2 characters.</font></span>');
	}
	else {
		$("#parentageerror").html('');
	}

	// Parent Last menstrual period date(CCYYMMDD)
	if ( document.getElementById("parentlastmenstrualdate").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("parentlastmenstrualdate").focus(); 
		iRet = 1;
		$("#parentlastmenstrualdateerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#parentlastmenstrualdateerror").html('');
	}

/*	if( isLoad == true ) {
		// Parent Sex
		if ( document.getElementById("parentsex").value != "1" && document.getElementById("parentsex").value != "2" ) {
			if( iRet == 0 )
				document.getElementById("parentsex").focus(); 
			iRet = 1;
			$("#parentsexerror").html('<span class="has-error"><font color="red">Invalid code</font></span>');
		}
		else {
			$("#parentsexerror").html('');
		}
	} */
	//Parent Relevant Medical History

	//Parent Relevant Medical History Start 배열은 에러가 없을 때 성공하는 것으로
	if( arrParentRelevantMedicalHistory.length > 0 ) {
		$.each(arrParentRelevantMedicalHistory, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Parent Relevant Medical History Array End

	//Parent Relevant Medical History Start 배열은 에러가 없을 때 성공하는 것으로
	if( arrParentRelevantMedicalHistory.length > 0 ) {
		$.each(arrParentRelevantMedicalHistory, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Parent Relevant Medical History Array End

	// Parent Relevant Past Drug Therapy
	if( arrParentRelevantPastDrugTherapy.length > 0 ) {
		$.each(arrParentRelevantPastDrugTherapy, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Parent Relevant Past Drug Therapy Array End

	// Text for relevant Medical history of parent
	if ( document.getElementById("parentmedicalrelevanttext").value.length > 10000) {
		if( iRet == 0 )
			document.getElementById("parentmedicalrelevanttext").focus(); 
		iRet = 1;
		$("#parentmedicalrelevanttexterror").html('<span class="has-error"><font color="red">Please enter no more than 10000 characters.</font></span>');
	}
	else {
		$("#parentmedicalrelevanttexterror").html('');
	}

	// Reaction(s) / Event(s)
	// Reaction/event as reported by primary source
	if ( document.getElementById("primarysourcereaction").value.length > 200) {
		if( iRet == 0 )
			document.getElementById("primarysourcereaction").focus(); 
		iRet = 1;
		$("#primarysourcereactionerror").html('<span class="has-error"><font color="red">Please enter no more than 200 characters.</font></span>');
	}
	else {
		$("#primarysourcereactionerror").html('');
	}

	// Reactions & Events Array Start
	if( arrReactionsEvents.length <= 0 ) {
		$("#reportreactionseventserror").html('<span class="has-error"><font color="red">One of the reaction terms(WHO-ART or MedDRA) should be filled in</font></span>');
		iRet = 1;
	}else {
		$.each(arrReactionsEvents, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}
	// Reactions & Events Array End

	// Results of test and procedures
	if ( document.getElementById("resultstestsprocedures").value.length > 2000) {
		if( iRet == 0 )
			document.getElementById("resultstestsprocedures").focus(); 
		iRet = 1;
		$("#resultstestsprocedureserror").html('<span class="has-error"><font color="red">Please enter no more than 2000 characters.</font></span>');
	}
	else {
		$("#resultstestsprocedureserror").html('');
	}

	/* 이게 왜 들어가 있는지 확인해봐야 겠음
	if( arrDrugs.length > 0 && ( document.getElementById("drugcharacterization").value.length == 0 && document.getElementById("medicinalproduct").value.length == 0 && document.getElementById("activesubstancename").value.length == 0 )) {

		if( iRet == 0 )
			document.getElementById("drugcharacterization").focus(); 
		iRet = 1;
		$("#reportdrugserror").html('<span class="has-error"><font color="red">Drug name or Active drug substance name should be filled in</font></span><br /><br />');
	} */

	if( arrDrugs.length > 0 ) {
		$.each(arrDrugs, function( index ) { 
			if( this.error == "1" )
			{
				iRet = 1;
			}
		});
	}

	if( arrDrugs.length == 0 ) {
		$("#reportdrugserror").html('<span class="has-error"><font color="red">Drug name or Active drug substance name should be filled in</font></span><br /><br />');
		iRet = 1;
	}

	// Reaction assessed에 에러가 있을 때는 진행 안됨
	if( arrRelatednessofdrugtoreactionsevents.length > 0 ) {
		$.each(arrRelatednessofdrugtoreactionsevents, function( index ) { 
			if( this.error == "1" )
				iRet = 1;
		});
	}

	// Case narrative
	if ( document.getElementById("narrativeincludeclinical").value.length > 20000) {
		if( iRet == 0 )
			document.getElementById("narrativeincludeclinical").focus(); 
		iRet = 1;
		$("#narrativeincludeclinicalerror").html('<span class="has-error"><font color="red">Please enter no more than 20000 characters.</font></span>');
	}
	else {
		$("#narrativeincludeclinicalerror").html('');
	}

	// Reporter's comments
	if ( document.getElementById("reportercomment").value.length > 500) {
		if( iRet == 0 )
			document.getElementById("reportercomment").focus(); 
		iRet = 1;
		$("#reportercommenterror").html('<span class="has-error"><font color="red">Please enter no more than 500 characters.</font></span>');
	}
	else {
		$("#reportercommenterror").html('');
	}

	// MedDRA Version for Sender’s diagnosis
	if ( document.getElementById("senderdiagnosismeddraversion").value.length > 8) {
		if( iRet == 0 )
			document.getElementById("senderdiagnosismeddraversion").focus(); 
		iRet = 1;
		$("#senderdiagnosismeddraversionerror").html('<span class="has-error"><font color="red">Please enter no more than 8 characters.</font></span>');
	}
	else {
		$("#senderdiagnosismeddraversionerror").html('');
	}

	// Sender's diagnosis/syndrome and/or reclassification of reaction/event
	if ( document.getElementById("senderdiagnosis").value.length > 250) {
		if( iRet == 0 )
			document.getElementById("senderdiagnosis").focus(); 
		iRet = 1;
		$("#senderdiagnosiserror").html('<span class="has-error"><font color="red">Please enter no more than 250 characters.</font></span>');
	}
	else {
		$("#senderdiagnosiserror").html('');
	}

	// Sender Comment
	if ( document.getElementById("sendercomment").value.length > 2000) {
		if( iRet == 0 )
			document.getElementById("sendercomment").focus(); 
		iRet = 1;
		$("#sendercommenterror").html('<span class="has-error"><font color="red">Please enter no more than 2000 characters.</font></span>');
	}
	else {
		$("#sendercommenterror").html('');
	}

	if ( document.getElementById("senderdiagnosiscode").value.length > 0 && document.getElementById("senderdiagnosismeddraversion").value.length == 0 ) {
		if( iRet == 0 )
			document.getElementById("senderdiagnosismeddraversion").focus(); 
		iRet = 1;
		$("#senderdiagnosismeddraversionerror").html('<span class="has-error"><font color="red">MedDRA version is required</font></span>');
	}
	else {
		$("#senderdiagnosismeddraversionerror").html('');
	}

	/*
	if( iRet == 0 )
		alert('OK!!');
	else
		alert('ERROR!!');
	*/

	/*
	if( saveType == "13" ) 
		return; */

	// 에러가 있다면
	if( iRet == 1 ) {
		alertMsg("1");
		/* kkj 20151029 spinner 종료 */
		stopSpinner();
		return;
	}

	iRunning = 1;
	if (saveType == null || saveType == "")
	{
		_genXML_ichicsr(saveType);
		
	} else if (saveType == "13" ||saveType == "20" || saveType == "30")
	{
		//보고대기 or 일반 저장 20, 보고완료 30
		_genXML_ichicsr(beforeType, saveType);
	}
}
var userid = "";
var getMMID="";
var accountnumber = "";
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$.urlParam = function (name) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}


//function view theme from SqlServer Database.
function viewTheme() {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName('userid');
    console.log("User ID:" + userid);
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/ViewTheme",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_ViewTheme,
          error: OnErrorCall
      });
    console.log("viewTheme--Outside Ajax..!!");
    viewFundsTransfer();
}

var db_fundsTransfer = "";
var userid = "";
var hasFundsTransfer = "";
var no_ministatmnets = "";
var select_theme = "";

function OnSuccessCall_ViewTheme(response) {
    $.mobile.hidePageLoadingMsg();
    //console.log(response.d);
    select_theme = response.d;
    console.log("Viewed Theme from DB :" + select_theme);
}
function checkMMID() {
    accountnumber = getParameterByName('AccountNumber');
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'accountnumber':'" + accountnumber + "'}";
    console.log("Posted Params :" + Paramsdata);
    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/checkMMID",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_checkMMID,
          error: OnErrorCall
      });
    console.log("Outside Ajax..!!");
}
function submitMpin() {

    $.mobile.showPageLoadingMsg();
    var cc = sessionStorage.getItem("customercode");
    console.log("Inside submitIMPSDetails()");
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'customercode':'" + cc + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/getMPIN",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCallIMPSDetails,
          error: OnErrorCall
      });
    console.log("Outside Ajax..!!");
}

function OnSuccessCallIMPSDetails(response) {
    var getMPIN;
    getMPIN = response.d
    var userMPIN = $('#txtmpin').val();
    console.log("MPIN from database :" + getMPIN);
    if (userMPIN != getMPIN) {
        $('#lbldisplayMMID').html("Invalid MPIN");
        $('#lbldisplayMMID').show();
    }
    else {
        checkMMID();
        $('#lbldisplayMMID').html("MMID for account number " + accountnumber + "is " +getMMID);
        $('#lbldisplayMMID').show();
        //setTimeout(function () {
        //    $("#popupaskMPIN").popup("close");
        //}, 4000);
    }
    $.mobile.hidePageLoadingMsg();
}
function OnSuccessCall_checkMMID(response) {

    //alert(response.d)
    console.log("Checked MMMMMID:" + response.d);
    getMMID = response.d;
    if (response.d == "nommid")
    {
        $('#btn_retrieve-mmid').button('disable');
    }
    else {
        $('#btn_generate_mmid').button('disable')
    }
    $.mobile.hidePageLoadingMsg();
}
function generateMPIN() {
    $.mobile.showPageLoadingMsg();
    var cc = sessionStorage.getItem("customercode");
    console.log("Inside generateMPIN()");
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'customercode':'" + cc + "','generateMPIN':'" + userMPIN + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/generateMPIN",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCallgenerateMPIN,
          error: OnErrorCall
      });
}

function OnSuccessCallgenerateMPIN(response)
{
    console.log(response.d);
    $.mobile.hidePageLoadingMsg();
    $('#popupgenerate_MPIN').popup("close");
    $().toastmessage('showToast', {
        text: 'Your MPIN is generated successfully.',
        sticky: false,
        position: 'middle-center',
        type: 'success'
    });
    $.mobile.hidePageLoadingMsg();
}
//function to update/change/modify the theme in SqlServer Database.
function updateTheme(theme_update) {
    userid = getParameterByName('userid');
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','select_theme':'" + theme_update + "'}";
    console.log("Posted Params :" + Paramsdata);
    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/updateTheme",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_UpdateTheme,
          error: OnErrorCall_UpdateTheme
      });
    console.log("Outside Ajax..!!");
}

function OnSuccessCall_UpdateTheme(response) {
    $.mobile.hidePageLoadingMsg();
}

function updateMinistatment(ministmt_update) {
    userid = getParameterByName('userid');
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','no_ministatmnets':'" + ministmt_update + "'}";
    console.log("Posted Params :" + Paramsdata);
    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/updateMinistatement",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_UpdateMiniStmt,
          error: OnErrorCall
      });
    console.log("Outside Ajax..!!");
}

function OnSuccessCall_UpdateMiniStmt(response) {
    $.mobile.hidePageLoadingMsg();
}

//function to update the funds Transfer in Sql Server Database.
function updateFundsTransfer(fundstransfer_update) {
    userid = getParameterByName('userid');
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','HasFundsTransfer':'" + fundstransfer_update + "'}";
    console.log("Posted Params :" + Paramsdata);
    $.ajax(
     {

         type: "POST",
         url: pageUrl + "/updateFundsTransfer",
         data: Paramsdata,
         contentType: "application/json;charset=utf-8",
         dataType: "json",
         success: OnSuccessCall_UpdateFundsTransfer,
         error: OnErrorCall
     });
}

function OnSuccessCall_UpdateFundsTransfer(response) {
    $.mobile.hidePageLoadingMsg();
}
//function to view funds transfer from the Sql Server Database.

function viewFundsTransfer() {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName('userid');
    console.log("User ID:" + userid);
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/ViewFundsTransfer",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_ViewFundsTransfer,
          error: OnErrorCall
      });
    console.log("viewFundsTransfer -completed --Outside Ajax..!!");
}
function OnSuccessCall_ViewFundsTransfer(response) {

    db_fundsTransfer = response.d;
    console.log("Viewed Funds Transfer from DB:" + db_fundsTransfer);
    var fts = $('#flip-c');
    if ($.trim(db_fundsTransfer) == "off") {
        fts.val('off').slider("refresh");
        $('#fund_transfer').button('disable');
        $('#btn_generate_mmid').button('disable')
        $('#generate_mpin').button('disable')
        $('#reset_mpin').button('disable')
        $('#btn_retrieve-mmid').button('disable')
    }
    else {
        fts.val('on').slider("refresh");
    }
    $.mobile.hidePageLoadingMsg();
}

function generateMMID() {
    $.mobile.showPageLoadingMsg();
    accountnumber = getParameterByName('AccountNumber');
    console.log("accountnumber:" + accountnumber);
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'accountnumber':'" + accountnumber + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/generateMMID",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_generateMMID,
          error: OnErrorCall
      });
}

function OnSuccessCall_generateMMID(response) {

    $.mobile.hidePageLoadingMsg();
    $('#btn_generate_mmid').button('disable');
    $().toastmessage('showToast', {
        text: 'Your MMID is created successfully.',
        sticky: false,
        position: 'middle-center',
        type: 'success'
    });

    $("#btn_retrieve-mmid").button('enable');

}
function setTheme() {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName('userid');
    console.log("User ID:" + userid);
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/ViewTheme",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_SetTheme,
          error: OnErrorCall
      });
    console.log("SetTheme--Outside Ajax..!!");
}

function OnSuccessCall_SetTheme(response) {
    $.mobile.hidePageLoadingMsg();
    select_theme = response.d;
    console.log("Viewed Theme from DB :" + select_theme);
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                      .addClass('ui-body-' + select_theme)
                      .attr('data-theme', select_theme);

}

function OnErrorCall(response)
{
    $.mobile.hidePageLoadingMsg();
    $().toastmessage('showToast', {
        text: 'Error in Network connection.',
        sticky: false,
        position: 'middle-center',
        type: 'error'
    });
}
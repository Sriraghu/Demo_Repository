var userid = "";
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
    userid = getParameterByName("userid");
  //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
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
    viewFundsTransfer(); 
}

var db_fundsTransfer="";
var userid = "";
var hasFundsTransfer = "";
var no_ministatmnets = "";
var select_theme = "";

function OnSuccessCall_ViewTheme(response) {
    $.mobile.hidePageLoadingMsg();
    select_theme = response.d;
}

//function to update/change/modify the theme in SqlServer Database.
function updateTheme(theme_update) {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
   //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','select_theme':'" + theme_update + "'}";
    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/updateTheme",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_UpdateTheme,
          error: OnErrorCall
      });

}

function OnSuccessCall_UpdateTheme(response) {
    $.mobile.hidePageLoadingMsg();
}

function updateMinistatment(ministmt_update) {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','no_ministatmnets':'" + ministmt_update + "'}";

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
  
}

function OnSuccessCall_UpdateMiniStmt(response) {
    $.mobile.hidePageLoadingMsg();
}

//function to update the funds Transfer in Sql Server Database.
function updateFundsTransfer(fundstransfer_update)
{
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "','HasFundsTransfer':'" + fundstransfer_update + "'}";

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

function OnSuccessCall_UpdateFundsTransfer(response)
{
    $.mobile.hidePageLoadingMsg();
}
//function to view funds transfer from the Sql Server Database.
function viewFundsTransfer()
{
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
     //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid': '"+ userid +"' }";
    console.log(Paramsdata)
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
}
function OnSuccessCall_ViewFundsTransfer(response) {  
 
     db_fundsTransfer = response.d;
     var fts = $('#flip-c');
     if ($.trim(db_fundsTransfer) == "off")
    {
         fts.val('off').slider("refresh");
         $('#fund_transfer').button('disable');
         $('#btn_generate_mmid').button('disable')
    }
    else
    {
         fts.val('on').slider("refresh");  
    }
    $.mobile.hidePageLoadingMsg();
}

function setTheme()
{
    $.mobile.showPageLoadingMsg();
   //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
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
}

function OnSuccessCall_SetTheme(response) {
    $.mobile.hidePageLoadingMsg();
    select_theme = response.d;
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                      .addClass('ui-body-' + select_theme)
                      .attr('data-theme', select_theme);

}
function OnErrorCall(response) {
    $.mobile.hidePageLoadingMsg();
    $().toastmessage('showToast', {
        text: 'Network Error.',
        sticky: false,
        position: 'middle-center',
        type: 'error'
    });
}
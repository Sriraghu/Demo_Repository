var userid = "";
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
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
    viewMinistatement();
}

var db_fundsTransfer="";
var userId = "";
var hasFundsTransfer = "";
var no_ministatmnets = "";
var select_theme = "";
var update_theme = ""

function OnSuccessCall_ViewTheme(response) {
    $.mobile.hidePageLoadingMsg();
    select_theme = response.d;
    if($.trim(select_theme)=="a")
    {
        $('#radio-choice-21').attr("checked", true).checkboxradio("refresh");
        $('#radio-choice-22').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-23').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-24').attr("checked", false).checkboxradio("refresh");
    }
    else if ($.trim(select_theme) == "b")
    {
        $('#radio-choice-21').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-22').attr("checked", true).checkboxradio("refresh");
        $('#radio-choice-23').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-24').attr("checked", false).checkboxradio("refresh");
    }
    else if ($.trim(select_theme) == "c") {
        $('#radio-choice-21').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-22').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-23').attr("checked", true).checkboxradio("refresh");
        $('#radio-choice-24').attr("checked", false).checkboxradio("refresh");
    }
    else {

        $('#radio-choice-21').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-22').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-23').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-24').attr("checked", true).checkboxradio("refresh");
    }
}
//function to update/change/modify the theme in SqlServer Database.
function updateTheme(theme_update) {
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
    update_theme = theme_update;
}

function OnSuccessCall_UpdateTheme(response) {
    $.mobile.showPageLoadingMsg("Updating theme..");
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                  .addClass('ui-body-' + update_theme)
                  .attr('data-theme', update_theme);
    $.mobile.hidePageLoadingMsg("Theme is applied successfully..");
}

function updateMinistatment(ministmt_update) {
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
 
}

//function to update the funds Transfer in Sql Server Database.
function updateFundsTransfer(fundstransfer_update)
{
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

}

//function to view funds transfer from the Sql Server Database.
function viewFundsTransfer()
{
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
  //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
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
    }
    else
    {
         fts.val('on').slider("refresh");
    }
    $.mobile.hidePageLoadingMsg();
}

function viewMinistatement() {
    $.mobile.showPageLoadingMsg();
    userid = getParameterByName("userid");
    //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
    var Paramsdata = "{'userid':'" + userid + "'}";
    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/ViewMinistatement",
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall_viewMinistatement,
          error: OnErrorCall
      });
}

function OnSuccessCall_viewMinistatement(response) {

    no_ministatmnets = response.d;
    if ($.trim(no_ministatmnets) == 5) {
        $('#radio-choice-1').attr("checked", true).checkboxradio("refresh");
        $('#radio-choice-2').attr("checked", false).checkboxradio("refresh");
    }
    else {
        $('#radio-choice-1').attr("checked", false).checkboxradio("refresh");
        $('#radio-choice-2').attr("checked", true).checkboxradio("refresh");
    }
    $.mobile.hidePageLoadingMsg();
}
function setTheme() {
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
          success: OnSuccessCall_SetTheme,
          error: OnErrorCall
      });
}

function OnSuccessCall_SetTheme(response) {
    $.mobile.hidePageLoadingMsg();
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                      .addClass('ui-body-' + select_theme)
                      .attr('data-theme', select_theme);

}
function OnErrorCall(response) {
    $().toastmessage('showToast', {
        text: 'Network Error.',
        sticky: false,
        position: 'middle-center',
        type: 'error'
    });
    $.mobile.hidePageLoadingMsg();
}
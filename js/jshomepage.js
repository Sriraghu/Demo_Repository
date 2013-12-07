
var userid = "";
  //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
$(document).ready(function() {
    $.mobile.showPageLoadingMsg();
    $.ajax({
        type: "POST",
        url: pageUrl + "/GetCustomerDetails",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCall,
        error: OnErrorCall
    });
});
//--on success handle the respose data
function OnSuccessCall(response) {
    var res = response.d;
    $('#lblBankName').html($.evalJSON(res).BankName+"," + "<br>" + $.evalJSON(res).BranchName);
    $('#txtcustname').text($.evalJSON(res).customername);
    $('#txtcustcode').text($.evalJSON(res).customercode);
    sessionStorage.setItem("customercode", ($.evalJSON(res).customercode));
    var cc = sessionStorage.getItem("customercode");
    //send a ajax request to server to get Schemes and account details of the customer 
    $.ajax({
        type: "POST",
        url: pageUrl + "/GetSchemes",
        data: "{}",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: OnSuccessListSchemes,
        error: OnErrorCall
    });
    $.mobile.hidePageLoadingMsg();
}
//-----this function is copied from jquery.json-2.3.js --for temparory
$.evalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function(src) {
		    return eval('(' + src + ')');
		};
//--------------------------------------------------------------------

function OnErrorCall(response) {
    $().toastmessage('showToast', {
        text: 'Network Error.',
        sticky: false,
        position: 'middle-center',
        type: 'error'
    });
    $.mobile.hidePageLoadingMsg();
}
//---------------process the recived information
var arrSchemecode = [];
var arrSchemeName = [];
var arrAccountNumber = [];
var tmp = 0;
function OnSuccessListSchemes(response) {
    //get value from json that return from the server
    $.each($.evalJSON(response.d), function(rec) {
        arrSchemecode.push(this.schemecode);
        arrSchemeName.push(this.SchemeNames);
        arrAccountNumber.push(this.AccountNumber);
    });
     
   // for (var key in arrSchemecode) {
    for (var i = 0; i < arrAccountNumber.length; i++) {
        if (arrAccountNumber[i] != null) {
            if (tmp != arrSchemecode[i]) {
                tmp = arrSchemecode[i]; //to avoid scheme duplication while displaying
                if (arrSchemeName[i] != " ") {
                    creatediv("schemelist", arrSchemecode[i], arrSchemeName[i], AppAccounts(arrSchemecode[i], arrSchemecode, arrAccountNumber));
                }
                //alert(arrSchemeName[key])
            }
        }
    }
    $.mobile.hidePageLoadingMsg();
}

// the below function will create collapsible set for each scheme of Particular Customer
function creatediv(app, id, schemename,p) {
    var div = $("'<div id='" + id + "'  data-theme='b' data-content-theme='c' data-inset='true' data-corners='true' data-mini='true' >'").append
    ("<h6>" + schemename + "</h6>" + p).collapsible();
    $("#" + app).append(div);
}
// The Fucntion appends Account NUmber to a particular Schemes
function AppAccounts(key,arrSchemecode, arrAccountNumber) {
    var p = "";
    p = "<ul style='padding:10px 5px 10px 5px;' data-role='listview' data-theme='c' data-inset='true' class='ui-listview' data-mini='true' style='width:100%'>";
    for (var i in arrSchemecode) {
        if (arrSchemecode[i] == key) {
            p = p + "<li data-mini='true' data-corners='true' data-mini='true' data-shadow='false'  data-wrapperels='div'   data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#' id='" + arrAccountNumber[i] + "' class='ui-link-inherit' style='font-size:12px ;height:12px' onclick='redirectpage(this.id)'> " + arrAccountNumber[i] + "</a></div></div></li>";
        }
    }
    p = p + "</ul>";
return p;
}

function redirectpage(id) {
    var accountnumber = id;
    userid = getParameterByName("userid");
    document.location = "optionspage.html?AccountNumber=" + accountnumber + "&userid=" + userid + "";
}

var params = "";
var AcNo = "";
var no_of_entries;

  //var pageUrl = 'http://180.92.173.235/BSMobileWS/service1.asmx';
    var pageUrl = 'http://localhost/BankSoftWS/service1.asmx';
    //var pageUrl = 'http://192.168.1.49/BankSoftWS/service1.asmx';
function getdata() {
    $.mobile.showPageLoadingMsg();

    viewMiniStatement();

    var params = getParams();
    //AcNo = getParameterByName("AccountNumber");
    AcNo = decodeURIComponent((params["AccountNumber"]));
     console.log("Received Account No :" + AcNo);
     var uSERId = getParameterByName("userid");
     console.log("Received USER ID :" + uSERId);
    //AcNo = params["AccountNumber"]
    $.ajax({
        type: "POST",
        url: pageUrl + "/getTransactions",
        data: "{'AccountNumber':'" + AcNo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCall,
        error: OnErrorCall
    });
    
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
var userid = "";
function viewMiniStatement() {
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
          success: OnSuccessCall_viewMiniStatement,
          error: OnErrorCall
      });
}
    function OnSuccessCall_viewMiniStatement(response) {  
        $.mobile.hidePageLoadingMsg();
        no_of_entries = response.d;
    }
    function OnErrorCall(response) {
        $.mobile.hidePageLoadingMsg();
    }
//-----this function is copied from jquery.json-2.3.js --for temparory
$.evalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function(src) {
		    return eval('(' + src + ')');
		};
//--------------------------------------------------------------------
function OnSuccessCall(response) {
    $.mobile.hidePageLoadingMsg();
    var balance;
    arrTransactiondate = [];
    arrDescription = [];
    arrCreditBal = [];
    arrDEbitBal = [];
    arrAccountNumber = [];
    var closingbal = 0;

    $.each($.evalJSON(response.d), function(rec) {
        arrAccountNumber.push(this.AccountNumber);
        arrTransactiondate.push(this.Transactiondate);    
        arrDescription.push(this.Description);
        arrCreditBal.push(this.CreditBal);
        arrDEbitBal.push(this.DebitBal);
        closingbal = this.Closingbal;

    });

    sessionStorage.setItem('accountbalance', closingbal);
    var accBal = sessionStorage.getItem('accountbalance');
    if (closingbal == undefined) {
        balance = "0";
    }
    else {
        balance = closingbal;
    }
   
    $('#tblacdetails').append("<tr><td style='font-size:smaller;'>Account Number :</td><td style='font-size:smaller;'>" + arrAccountNumber[0] + "</td></tr><tr><td style='font-size:smaller;'> Available  Balance :</td><td style='font-size:smaller;'>" + "Rs." + balance + "</td></tr>");

    for (var i = 0; i < no_of_entries; i++) {
        $('#tbltrans').append("<tr><td style='font-size:smaller;width:30%;'>" + arrTransactiondate[i].substr(0, 10) + "</td><td style='font-size:smaller;width:40%;'>" + arrDescription[i] + "</td><td style='font-size:smaller;width:15%;'>" + arrCreditBal[i] + "</td><td style='font-size:smaller;width:15%;'>" + arrDEbitBal[i] + "</td></tr>");
        //  transdata = transdata + "<tr><td>" + arrTransactiondate[key] + "</td><td>" + arrDescription[key] + "</td><td>" + arrCreditBal[key] + "</td><td>" + arrDEbitBal[key] + "</td><td></tr>"
    }
}
function OnErrorCall(response) {
    $.mobile.hidePageLoadingMsg();
    $().toastmessage('showToast', {
        text: ' Network Error.',
        sticky: false,
        position: 'middle-center',
        type: 'error'
    }); 
}
function getParams() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
        for (var i = 0; i < pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    return params;
}


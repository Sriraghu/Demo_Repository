$(document).delegate('[data-role="page"]', 'pagecreate', function (e) {
    var selectedtheme = localStorage.getItem("theme");
    console.log("Selected theme :" + selectedtheme)

    $(this).removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                       .addClass('ui-body-' + selectedtheme)
                       .attr('data-theme', selectedtheme);
});


    $(document).ready(function () {
        $('#txtuid').focus();
    });

function DisplayMessageCall(userid,pwd) {
    $.mobile.showPageLoadingMsg();
    //document.location = "Hoomepage.html";
    console.log("Inside DisplayMessageCall()");

    // var pageUrl = 'http://180.92.173.235/bsservice/Service.asmx';
    var pageUrl = 'http://localhost/CBSService/Service.asmx';
    var Paramsdata = "{'username':'" + userid + "','password':'" + pwd + "'}";
    console.log("Posted Params :" + Paramsdata);

    $.ajax(
      {
          type: "POST",
          url: pageUrl + "/ServiceAuth",
          //data: "{'username':'" + $("#txtuid").val() + "','password':'" + $("#txtpwd").val() + "'}", 
          data: Paramsdata,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: OnSuccessCall,
          error: OnErrorCall
      });
    console.log("Outside Ajax..!!");
}

function OnSuccessCall(response) {
    console.log('Response:' + response);

    if (response.d == true) {
        console.log("Ur Inside..!!");
        document.location = "userdetailspage.html";
    } else {
        runtimePopup("Invalid Login details..!!", '');
    }
    $.mobile.hidePageLoadingMsg();
}


function OnErrorCall(response) {
    runtimePopup('Error in Network connection.!', '');
    $.mobile.hidePageLoadingMsg();
}



function runtimePopup(message, popupafterclose) {
    console.log("Inside POPUP");
    var template = "<div data-role='popup' class='ui-content messagePopup' data-overlay-theme='a' data-theme='e' "
                  + "style='max-width:300px' class='ui-corner-all'>"
                  //+ "<a href='#' data-role='button' data-theme='g' data-icon='delete' data-iconpos='notext' "
                  //+ " class='ui-btn-right closePopup'>Close</a> "
                  + "<span style='color:red;'> "
                  + message + "</span>"
                  + " <div class='ui-grid-b' align='center' >"
                  + "<button type='button' data-mini='true' data-theme='a' data-corners='false' data-rel='back' onclick='btnOk()'>Ok</a>"
                  + "</div> "
                  + " </div>";

    //<button type="button" id="btnCancelDialog"  data-theme="a" data-mini="true"  data-corners="false" data-rel="back">Cancel</button>
    popupafterclose = popupafterclose ? popupafterclose : function () { };

    $.mobile.activePage.append(template).trigger("create");

    $.mobile.activePage.find(".closePopup").bind("tap", function (e) {
        $.mobile.activePage.find(".messagePopup").popup("close");
    });

    $.mobile.activePage.find(".messagePopup").popup().popup("open").bind({
        popupafterclose: function () {
            $(this).unbind("popupafterclose").remove();
            popupafterclose();
        }
    });
}


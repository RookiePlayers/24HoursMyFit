var fullphone="";
var telInput = $("#phone"),

errorMsg = $("#error-msg"),
validMsg = $("#valid-msg");
var countryCode;
// initialise plugin
telInput.intlTelInput({

allowExtensions: true,
formatOnDisplay: true,
autoFormat: true,
autoHideDialCode: true,
autoPlaceholder: true,
defaultCountry: "auto",
ipinfoToken: "yolo",

nationalMode: false,
numberType: "MOBILE",
//onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
preferredCountries: ['sa', 'ae', 'qa','om','bh','kw','ma'],
preventInvalidNumbers: true,
separateDialCode: true,
initialCountry: "auto",
geoIpLookup: function(callback) {
$.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
   countryCode = (resp && resp.country) ? resp.country : "";
  
  callback(countryCode);
});
},
 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function() {
telInput.removeClass("error");
errorMsg.addClass("hide");
validMsg.addClass("hide");
};

// on blur: validate
telInput.blur(function() {
reset();



if ($.trim(telInput.val())) {
  if (telInput.intlTelInput("isValidNumber")) {
    
  
    fullphone=getFullphone(document.getElementsByClassName("selected-dial-code")[0].textContent,$.trim(telInput.val()));
    
    console.log(fullphone);
    validMsg.removeClass("hide");
  } else {
    telInput.addClass("error");
    errorMsg.removeClass("hide");
  }
}
});
function getFullphone(CC,phone){
if(phone.startsWith("0")){
  return CC+phone.substring(1,phone.length)
}
return CC+phone;
}
// on keyup / change flag: reset
telInput.on("keyup", reset);
telInput.on("change", reset);





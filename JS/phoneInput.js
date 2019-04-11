var fullphone="";
var telInput = $("#phone"),
telInput2 = $("#phone2"),

errorMsg = $("#error-msg"),
validMsg = $("#valid-msg");
errorMsg2 = $("#error-msg2"),
validMsg2 = $("#valid-msg2");
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
  console.log();
  
  callback(countryCode);
});
},
 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function() {
telInput.removeClass("error");
errorMsg.addClass("hide");
validMsg.addClass("hide");
telInput2.removeClass("error");
errorMsg2.addClass("hide");
validMsg2.addClass("hide");
document.getElementById("phone2").value=telInput.val();
};
var validtelephonenumber=false;
// on blur: validate
telInput.blur(function() {
reset();



if ($.trim(telInput.val())) {
  if (telInput.intlTelInput("isValidNumber")) {
    
  
    fullphone=getFullphone(document.getElementsByClassName("selected-dial-code")[0].textContent,$.trim(telInput.val()));
    
    console.log(fullphone);
    validtelephonenumber=true;
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





telInput2.intlTelInput({

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
    telInput2.removeClass("error");
    errorMsg2.addClass("hide");
    validMsg2.addClass("hide");
  };
  
  // on blur: validate
  telInput2.blur(function() {
  reset();
  
  
  
  if ($.trim(telInput2.val())) {
    if (telInput2.intlTelInput("isValidNumber")) {
      
    
      fullphone=getFullphone(document.getElementsByClassName("selected-dial-code")[0].textContent,$.trim(telInput2.val()));
      validtelephonenumber=true;
      console.log(fullphone);
      validMsg.removeClass("hide");
    } else {
      telInput2.addClass("error");
      errorMsg.removeClass("hide");
    }
  }
  });
  telInput2.on("keyup", reset);
  telInput2.on("change", reset);
  
  
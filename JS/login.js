    var username="";
    var password="";
    var email="";
    
    (function ($) {
        "use strict";
    
    document.getElementById('loginbtn').onclick=function(){
        signIn()
    };


    
    function signIn(){
      
    
    if( document.getElementById('input').value.includes("@")){
        email= document.getElementById('input').value;
        username=email;
    } 
    else {
        email="";
        username= document.getElementById('input').value;
    }
   
    password= document.getElementById('input2').value;
    if(validateFields())
        {  console.log("username: "+username);
            firebase.auth().signInWithEmailAndPassword(username, password)
        .catch(function(err) {
        // Handle errors
        console.log(err.message());
        
        return false;
        });
        location.replace("../HTML/Homepage/home.html");
        return true;
    }
    }
    function validateFields()
    {
        if(username!=''){
            removeValidate(document.getElementById('input'))
        }else showValidate(document.getElementById('input'))

        if(password!=''){
            removeValidate(document.getElementById('input2'));
            return true;
        }else showValidate(document.getElementById('input2'))


    }
    function showValidate(input) {
        var thisAlert = $(input).parent();

        

        $(thisAlert).addClass('alert-validate');
    }
    function removeValidate(input) {
        var thisAlert = $(input).parent();

        

        $(thisAlert).removeClass('alert-validate');
    }
    function getEmailfromUsername(username){
        
        return "";
    }
})(jQuery);
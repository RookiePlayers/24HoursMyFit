    var username="";
    var password="";
    var email="";
    
    (function ($) {
        "use strict";
    
    document.getElementById('loginbtn').onclick=function(){
      
        if(signIn()){
            //
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    location.replace("../HTML/Homepage/home.html"); //After successful login, user will be redirected to home.html
                }
              });
        }else{
            alert("Try Again!");
        }
    };


    
    function signIn(){
      removeValidate(document.getElementById('input'));
      removeValidate(document.getElementById('input2'));
    
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
        console.log(err.code);
        if(err.code==="auth/invalid-email")
        showValidate(document.getElementById('input'));
        else     if(err.code==="auth/invalid-email")  showValidate(document.getElementById('input'));
        else 
        showValidate(document.getElementById('input2'));
        
        return false;
        });
        
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
    function userNotFound(){
        
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
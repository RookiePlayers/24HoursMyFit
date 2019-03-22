
function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        
        document.getElementById("avatar-holder").innerHTML=" <span class='regform-avatar'><img src="+ reader.result+" height='200px' width='200px'></span>"
 
    }

    if (file) {
        document.getElementById("imgbtn").style.border="2px solid green;";
        reader.readAsDataURL(file); //reads the data as a URL
      
         
    } else {
      
        document.getElementById("avatar-holder").innerHTML="<span class='reg-form-avtar2'><i class='fa fa-user' id='userIcon'></i></span>"
    }
}

previewFile();  //calls the function named previewFile()

function genRandUsername()
{
    var rand=Math.floor(Math.random()*20000);
 
    document.getElementById("uname").value=names[rand];
    document.getElementById("uname").style.top="-15px";
    //validate if unique


}
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.inputr').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            console.log("not empty");
            
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .inputr');

    $('.regform').on('submit',function(){
        var check = true;
 
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        console.log("Name: "+$("#uname").val()+"\n"+"Email: "+$("#email").val()+"\nPhone: "+$("#phone").val());
        if($("#uname").val()!=''&&$("#pword").val()!=''&&$("#email").val()&&$("#phone").val()!='')
        {
            console.log("Sending email..");
            sendEmail($("#email").val())
            document.getElementById("emailVarification").innerHTML="Waiting for email varification";
           
            check=false;
        }
        else{
           
            check=false;
        }
        return check;
    });

    $('#email').change(function(){
        
  
        if(!validate(input[0]))
        {
            showValidate(input[0]);
             
        }else {
            hideValidate(input[0]);
        }
    });
    $('#uname').change(function(){
        
  
        if(!validate(input[1]))
        {
            showValidate(input[1]);
             
        }else {
            hideValidate(input[1]);
        }
    });
    $('#pword').change(function(){
        
  
        if(!validate(input[2]))
        {
            showValidate(input[2]);
             
        }else {
            hideValidate(input[2]);
        }
    });
    $('#phone').change(function(){
        
  
        if(!validate(input[3]))
        {
            showValidate(input[3]);
             
        }else {
            hideValidate(input[3]);
        }
    });



    $('.validate-form .inputr').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        
    console.log(validateEmail($(input).val()));
    
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            
          
              
                return validateEmail($(input).val().trim());
           
        }
       else if($(input).attr('type') == 'password' || $(input).attr('name') == 'pword') {
             return validatePassword($(input).val().trim());
        }
    
        else {
            if($(input).val().trim() != ''){
                return true;
            }else return false;
        } 
    }
    function validateEmail(email){
    
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        if (email == '' || !re.test(email))
        {
       
            return false;
        }
        else return true;
    }
    function validatePassword(password){
        var re=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (password == '' || !re.test(password))
        {
       
            return false;
        }
        else return true;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        

        $(thisAlert).addClass('alert-validate');
        switch($(input).attr('id')){
            case "email": {
                $("#emailValid").removeClass('focus-input');
                $("#emailValid").removeClass('focus-input-correct');
                $("#emailValid").addClass('focus-input-incorrect');

            }break;
            case "uname": {
                $("#unameValid").removeClass('focus-input');
                $("#unameValid").removeClass('focus-input-correct');
                $("#unameValid").addClass('focus-input-incorrect');

            }break;
            case "pword": {
                $("#pwordValid").removeClass('focus-input');
                $("#pwordValid").removeClass('focus-input-correct');
                $("#pwordValid").addClass('focus-input-incorrect');

            }break;
            case "phone": {
                $("#phoneValid").removeClass('focus-input');
                $("#phoneValid").removeClass('focus-input-correct');
                $("#phoneValid").addClass('focus-input-incorrect');

            }break;
        }
        
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
        switch($(input).attr('id')){
            case "email": {
                $("#emailValid").removeClass('focus-input');
                $("#emailValid").removeClass('focus-input-incorrect');
                $("#emailValid").addClass('focus-input-correct');

            }break;
            case "uname": {
                $("#unameValid").removeClass('focus-input');
                $("#unameValid").removeClass('focus-input-incorrect');
                $("#unameValid").addClass('focus-input-correct');

            }break;
            case "pword": {
                $("#pwordValid").removeClass('focus-input');
                $("#pwordValid").removeClass('focus-input-incorrect');
                $("#pwordValid").addClass('focus-input-correct');

            }break;
            case "phone": {
                $("#phoneValid").removeClass('focus-input');
                $("#phoneValid").removeClass('focus-input-incorrect');
                $("#phoneValid").addClass('focus-input-correct');

            }break;
        }

    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('fa-eye');
            $(this).find('i').removeClass('fa-eye-slash');
            showPass = 0;
        }
        
    });
    $('.btn-rand-name').on('click', function(){
        genRandUsername();
        
    });




    if (typeof(Storage) !== "undefined") {
      
        // Retrieve
      
    
     fitnessGoalphysical=localStorage.getItem("fitnessGoalphysical");
     fitnessGoaldiet=localStorage.getItem("fitnessGoaldiet");

     firstName=localStorage.getItem("fn");
     lastName=localStorage.getItem("ln");
     dob=localStorage.getItem("dob");
     gender=localStorage.getItem("gender");
    
     bodyType=localStorage.getItem("bodyType");
     height=localStorage.getItem("height");
     weight=localStorage.getItem("weight");
      }
   
    
    var fitnessGoalphysical;
    var fitnessGoaldiet;

    var firstName="";
    var lastName="";
    var dob="";
    var gender="male";
    
    var bodyType="ectomorph";
    var height="3.5";
    var weight="50";
    

  function sendEmail(email){
var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    //url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.

    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };
  console.log("started process");
  
 // Confirm the link is a sign-in with email link.
//if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
      window.localStorage.setItem('emailForSignIn',email);
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, actionCodeSettings)
      .then(function(result) {
        // Clear email from storage.
        document.getElementById("emailVarification").innerHTML="Email sent";
           
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  //}
  //else{
  //  console.log("faluire");
  //}
}

    var UserInformation={
        loginDetails:{email:"",username:"",phone:"",profileImg:"",terms:false},
        basicDetails:{firstName:"",lastName:"",dob:"",gender:""},
        physicalDetails:{bodyType:"",height:0.0,weight:0.0},
        goals:[{fitnessGoal:{physical:"",diet:""}}]
        }
    function saveUserInfo(username,email,password,phone,imgurl){
        UserInformation={
            loginDetails:{email:email,username:username,phone:phone,profileImg:imgurl,terms:true},
            basicDetails:{firstName:firstName,lastName:lastName,dob:dob,gender:gender},
            physicalDetails:{bodyType:bodyType,height:height,weight:weight},
            goals:[{fitnessGoal:{physical:fitnessGoalphysical,diet:fitnessGoaldiet}}]
            };
            //sign Up New User
            signUpNewUser(email,password);

            //wait for email confirmation
            //sign To Database
            //navigate Home



    }
    function signUpNewUser(email,password){

    }
    function signToDatabase(userinformation){

    }
    

   
    
    /**SIGN UP USER */

    //GOALS
   
    
    //BASIC DETAILS
    //PHYSICAL DETAILS
    //LOGIN DETAILS


})(jQuery);
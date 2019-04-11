

var imgurl = "";
var file;

var Achievements={
    Diamonds:[{name:"Shine Bright Like A Diamond",description:"Completed Your First WorkoutPlan",date:new Date().getTime(),img:"",rarity:"Common"}],
    Ruby:[{name:"Stunned",description:"Like 40 Picture",date:new Date().getTime(),img:"",rarity:"Common"}],
    Emerald:[{name:"Lights, Camera, Action",description:"Upload your First Video",img:"",date:new Date().getTime(),rarity:"Common"}],
    Onyx:[{name:"Oou, That Felt Gooood",description:"Complete A full Stretch",img:"",date:new Date().getTime(),rarity:"Common"}],
    Quarts:[{name:"And So It Begins",description:"Use MyFit For The First Time",img:"",date:new Date().getTime(),rarity:"Common"}]
}
var bio= "Welcome to MyFit";
var jcole="WDSFER43f56353433c5";
var Gallery={uid:"D31d34f45f56g",pId:"edcd3d342f45f67",vId:"",type:"photo"}
var Profile={
    Achievements:Achievements,
    FitPoint:200,
    Bio:bio,
    Followers:[jcole],
    Following:[jcole],
    MyGallery:[Gallery],
    Chats:[],
    Favourite:[],
    SavedWorkouts:[],
    SavedWorkoutPlans:[],
    SavedVideo:[],
    SavedMealPlans:[],
    SavedArticles:[],
    Groups:[],
}


function addProfiletoDB(userId){
    var db = firebase.firestore();
    db.collection("MyFit").doc(userId).set({Profile:Profile})
    .then(function(docRef) {
        window.location.replace("../HTML/Homepage/home.html")
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function signToDatabase(userinformation,userId) {
      
    console.log("adding to DB");
    
    firebase.database().ref('Users/' + userId).set(userinformation);
    addProfiletoDB(userId);
  
}
function previewFile() {
    var preview = document.querySelector('img'); //selects the query named img
    file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {

        document.getElementById("avatar-holder").innerHTML = " <span class='regform-avatar'><img src=" + reader.result + " id='profileImg'></span>"

    }

    if (file) {
        document.getElementById("imgbtn").style.border = "2px solid green;";
        reader.readAsDataURL(file); //reads the data as a URL
        imgurl = reader.result;

    } else {

        document.getElementById("avatar-holder").innerHTML = "<span class='reg-form-avtar2'><i class='fa fa-user' id='userIcon'></i></span>"
    }
}
//var oldEmails=localStorage.getItem("oldEmails");
//if(oldEmails==null)
 var oldEmails=[];
previewFile();  //calls the function named previewFile()

function genRandUsername() {
    var rand = Math.floor(Math.random() * 20000);

    document.getElementById("uname").value = names[rand];
    document.getElementById("uname").style.top = "-15px";
    //validate if unique


}
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.inputr').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
                console.log("not empty");

            }
            else {
                $(this).removeClass('has-val');
                
            }
        })
    })

    function phonevarification(){
        if (isCaptchaOK() && isPhoneNumberValid()) {
            window.signingIn = true;
            updateSignInButtonUI();
            // [START signin]
            var phoneNumber = getPhoneNumberFromUserInput();
            var appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).
                  window.confirmationResult = confirmationResult;
                  // [START_EXCLUDE silent]
                  window.signingIn = false;
                  updateSignInButtonUI();
                  updateVerificationCodeFormUI();
                  updateVerifyCodeButtonUI();
                  ///updateSignInFormUI();
                  // [END_EXCLUDE]
                }).catch(function (error) {
                  // Error; SMS not sent
                  // [START_EXCLUDE]
                  console.error('Error during signInWithPhoneNumber', error);
                  window.alert('Error during signInWithPhoneNumber:\n\n'
                      + error.code + '\n\n' + error.message);
                  window.signingIn = false;
                  //updateSignInFormUI();
                  updateSignInButtonUI();
                  // [END_EXCLUDE]
                });
            // [END signin]
          }
    }
    function phonevarificationsetup(){
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // [START_EXCLUDE]
              updateSignInButtonUI();
              // [END_EXCLUDE]
            },
            'expired-callback': function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // [START_EXCLUDE]
              updateSignInButtonUI();
              // [END_EXCLUDE]
            }
          });
          // [END appVerifier]
          
          // [START renderCaptcha]
        recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
      // [END renderCaptcha]
    };
    
  function isCaptchaOK() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      // [START getRecaptchaResponse]
      var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
      // [END getRecaptchaResponse]
      return recaptchaResponse !== '';
    }
    return false;
  }
  
  /**
   * Function called when clicking the "Verify Code" button.
   */
  function onVerifyCodeSubmit(e) {
    e.preventDefault();
    if (!!getCodeFromUserInput()) {
      window.verifyingCode = true;
      updateVerifyCodeButtonUI();
      // [START verifyCode]
      var code = getCodeFromUserInput();
      confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        // [START_EXCLUDE]
        window.verifyingCode = false;
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
        // [END_EXCLUDE]
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // [START_EXCLUDE]
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
            + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
      //  updateSignInButtonUI();
        updateVerifyCodeButtonUI();
        // [END_EXCLUDE]
      });
      // [END verifyCode]
    }
  }
  /**
   * Updates the Verify-code button state depending on form values state.
   */
  function updateVerifyCodeButtonUI() {
    document.getElementById('verify-code-button').disabled =
        !!window.verifyingCode
        || !getCodeFromUserInput();
  }

  /**
   * Re-initializes the ReCaptacha widget.
   */
  function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      grecaptcha.reset(window.recaptchaWidgetId);
    }
  }
  /**?Dont implement */
  function updateSignInFormUI() {
    if (firebase.auth().currentUser || window.confirmationResult) {
      document.getElementById('sign-in-form').style.display = 'none';
    } else {
      resetReCaptcha();
      document.getElementById('sign-in-form').style.display = 'block';
    }
  }
  /**
   * Updates the state of the Verify code form.
   */
  function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
        $(".v-codebox").show();
        $(".phonebox").hide();
    } else {
        $(".phonebox").show();
        $(".v-codebox").hide()
    }
  }
  function getCodeFromUserInput() {
    return  $("#verificationcode").val();
  }
  /**
   * Reads the phone number from the user input.
   */
  function getPhoneNumberFromUserInput() {
    return fullphone;
  }
  /**
   * Returns true if the phone number is valid.
   */
  function isPhoneNumberValid() {
    return isPhoneNumberValid;
  }
 /**
   * Cancels the verification code input.
   */
  function cancelVerification(e) {
    e.preventDefault();
    window.confirmationResult = null;
    updateVerificationCodeFormUI();
   
  }

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .inputr');
    document.getElementById("uname").value = localStorage.getItem("fn") + Math.floor(Math.random() * 2400)
    $("#uname").addClass("has-val")
 //  $("#verificationcode").addClass("has-val");
    $('.reg-form-btn').on('click', function () {
        clearInterval(timeout);
        var check = true;

        for (var i = 1; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        if(check==true){
            console.log(fullphone);
            
           var email=$("#email").val();
           console.log(document.getElementsByClassName("reg-form-btn")[0].textContent.toLowerCase().trim());
           if(document.getElementsByClassName("reg-form-btn")[0].textContent.toLowerCase().trim().includes("Sign")&&!oldEmails.includes($("#uname").val()))
            createNewUser(email, $("#pword").val()).then(()=>{
                    $('.email-confirmationBox').show();
           // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            sendEmail();
            //var provider = new firebase.auth.PhoneAuthProvider();
             /*   provider.verifyPhoneNumber(fullphone, window.recaptchaVerifier) 
            .then(function(confirmationResult) { 
                var verificationCode = window.prompt('Please enter the verification ' +
                'code that was sent to your mobile device.');
                $(".v-codebox").show();
                $(".phonebox").hide();
            return firebase.auth.PhoneAuthProvider.credential(verificationId,
                verificationCode);
          });*/
          phonevarificationsetup();
            }).catch((e)=>{
                console.log(e);
                //alert(e.message)
            });
            else
            continueReg().then(()=>{
                $('.email-confirmationBox').show();
        //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        sendEmail();
        phonevarificationsetup();
        }).catch((e)=>{
            console.log(e);
          //  alert(e.message)
        });
        
        }else{
            $('#exampleModal').hide();
            $('.modal-backdrop').hide();
        }
       
    });
    
    $(".firebaseui-id-secondary-link").on("click",function () 
    {
        $(".v-codebox").hide();
        $(".phonebox").show();  
    })
    $(".firebaseui-id-submit").on("click",function () 
    {
        if(validtelephonenumber){
            confirmcode();
        }    
    })
    function confirmcode() { 
      

        window.confirmationResult.confirm(document.getElementById("verificationcode").value) 
        .then(function(result) { 
       // alert('login process successfull!\n redirecting');
       // alert('<a href="javascript:alert(\'hi\');">alert</a>')
       // window.location.href="details.html";
        }, function(error) { 
        alert(error); 
        }); 
    }
        $('#email').on("keyup",(function () {
            if(!oldEmails.includes($("#uname").val())){
                document.getElementsByClassName("reg-form-btn")[0].textContent="Sign up";
            }
            else document.getElementsByClassName("reg-form-btn")[0].textContent="Re-Verify"
        }));
    $('#email').change(function () {


        if (!validate(input[1])) {
            showValidate(input[1]);



        } else {
            hideValidate(input[1]);
        }
    });
    $('#uname').change(function () {


        if (!validate(input[2])) {
            showValidate(input[2]);

        } else {
            hideValidate(input[2]);
        }
    });
    $('#pword').change(function () {


        if (!validate(input[3])) {
            showValidate(input[3]);

        } else {
            hideValidate(input[3]);
        }
    });
    $('#phone').change(function () {


        if (!validate(input[4])) {
            showValidate(input[4]);

        } else {
            hideValidate(input[4]);
        }
    });
    $('#phone2').change(function () {


        if (!validate(input[0])) {
            showValidate(input[0]);

        } else {
            hideValidate(input[0]);
        }
    });



    $('.validate-form .inputr').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {

        console.log(validateEmail($(input).val()));

        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {



            return validateEmail($(input).val().trim());

        }
        else if ($(input).attr('type') == 'password' || $(input).attr('name') == 'pword') {
            return validatePassword($(input).val().trim());
        }

        else {
            if ($(input).val().trim() != '') {
                return true;
            } else return false;
        }
    }
    function validateEmail(email) {

        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        if (email == '' || !re.test(email)) {

            return false;
        }
        else return true;
    }
    function validatePassword(password) {
     
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (password == '' || !re.test(password)) {

            return false;
        }
        else return true;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();



        $(thisAlert).addClass('alert-validate');
        switch ($(input).attr('id')) {
            case "email": {
                $("#emailValid").removeClass('focus-input');
                $("#emailValid").removeClass('focus-input-correct');
                $("#emailValid").addClass('focus-input-incorrect');

            } break;
            case "uname": {
                $("#unameValid").removeClass('focus-input');
                $("#unameValid").removeClass('focus-input-correct');
                $("#unameValid").addClass('focus-input-incorrect');

            } break;
            case "pword": {
                $("#pwordValid").removeClass('focus-input');
                $("#pwordValid").removeClass('focus-input-correct');
                $("#pwordValid").addClass('focus-input-incorrect');

            } break;
            case "phone":case "phone2": {
                $("#phoneValid").removeClass('focus-input');
                $("#phoneValid").removeClass('focus-input-correct');
                $("#phoneValid").addClass('focus-input-incorrect');

            } break;
        }

    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
        switch ($(input).attr('id')) {
            case "email": {
                $("#emailValid").removeClass('focus-input');
                $("#emailValid").removeClass('focus-input-incorrect');
                $("#emailValid").addClass('focus-input-correct');

            } break;
            case "uname": {
                $("#unameValid").removeClass('focus-input');
                $("#unameValid").removeClass('focus-input-incorrect');
                $("#unameValid").addClass('focus-input-correct');

            } break;
            case "pword": {
                $("#pwordValid").removeClass('focus-input');
                $("#pwordValid").removeClass('focus-input-incorrect');
                $("#pwordValid").addClass('focus-input-correct');

            } break;
            case "phone":case "phone2": {
                $("#phoneValid").removeClass('focus-input');
                $("#phoneValid").removeClass('focus-input-incorrect');
                $("#phoneValid").addClass('focus-input-correct');

            } break;
        }

    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('fa-eye');
            $(this).find('i').removeClass('fa-eye-slash');
            showPass = 0;
        }

    });
    $('.btn-rand-name').on('click', function () {
        genRandUsername();

    });




   

    var fitnessGoalphysical;
    var fitnessGoaldiet;

    var firstName = "";
    var lastName = "";
    var dob = "";
    var gender = "male";

    var problemAreas = [];
    var height = "3.5";
    var weight = "50";
    if (typeof (Storage) !== "undefined") {

            // Retrieve


            fitnessGoalphysical = localStorage.getItem("fitnessGoalphysical");
            fitnessGoaldiet = localStorage.getItem("fitnessGoaldiet");

            firstName = localStorage.getItem("fn");
            lastName = localStorage.getItem("ln");
            dob = localStorage.getItem("dob");
            gender = localStorage.getItem("gender");

            problemAreas = localStorage.getItem("problemAreas");
            height = localStorage.getItem("height");
            weight = localStorage.getItem("weight");
        }


    function sendEmail() {
        if(timeout!=null)
        clearInterval(timeout);
        var newuser = "";
        firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
            if (user) {
                // User is signed in.
                newuser = user;
                user.sendEmailVerification().then(function () {
                    emailConfirmThread();
                    // sent email.
                   // $("#emailVarification").html("<p>An Email was sent to: " + email + "<br>for Security reasons please go to your email and verify<br>Didn't see it? <button style='background-color:transparent;border:0px;font-size:12px;color:teal'>Resend</button></p>");
                   // alert("an email was sent to: " + email + "please varify");
                }).catch(function (error) {
                    // An error happened.
                });
            } else {
                // No user is signed in.
                newuser = "guest"
            }
        });

    }
    $(".resend").on("click",function name(params) {
        if(timeout!=null)
        clearInterval(timeout);
        sendEmail();
    })
    var timeout;
    function emailConfirmThread(){
        timeout=setInterval(() => {
            var user = firebase.auth().currentUser;
                var credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                $("#pword").val()
                );
            user.reauthenticateAndRetrieveDataWithCredential(credentials);
            firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
                console.log("Email Varified: "+user.emailVerified);
            if (user) {
                if(user.emailVerified){
                    $('.email-waiting').hide();
                    $(".email-confirm").show();
                    $(".resend").hide();
                    clearInterval(timeout);
                }
                else{
                    $('.email-waiting').show();
                    $(".email-confirm").hide();
                   
                }
             // User is signed in.
            } else {
            // No user is signed in.
            }
            });
        }, 1000);
    }

    var UserInformation = {
          }
    function saveUserInfo(username, email, password,phoneNat, phone, imgurl) {
        //TODO: change image value to acctual download link
       var profileCover={color:"#1E2328",image:"../../Resources/Backgrounds/stars.jpg",effect:"color-dodge"}
                             
        UserInformation = {
            LoginDetails: { email: email, username: username,phoneNumber:phoneNat, phone: phone, profileImg: imgurl, terms: true },
            UserDetails: { firstName: firstName, lastName: lastName, dob: dob, gender: gender },
            PhysicalDetails: { problemAreas: problemAreas, height: height, weight: weight },
            OverallFocus: [{ fitnessGoal: { physicalGoal: fitnessGoalphysical, dietGoal: fitnessGoaldiet } }],
            Cover:profileCover
        };
        //sign Up New User
       
      
            
        /**profileimg */

        firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
            if (user) {
                // User is signed in.
                if (file) {
                    var metadata = {
                        name: imgurl,
                        contentType: 'image/jpeg'

                    };
                    var storage = firebase.storage();
                    var storageRef = storage.ref();
                    
                    // Upload file and metadata to the object 'images/mountains.jpg'
                    var uploadTask = storageRef.child("Users/"+user.uid + '/images/' + file.name).put(file, metadata);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        function (snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    console.log('Upload is paused');
                                    break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    console.log('Upload is running');
                                    break;
                            }
                        }, function (error) {

                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;

                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;

                                case 'storage/unknown':
                                    // Unknown error occurred, inspect error.serverResponse
                                    break;
                            }
                        }, function () {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                user.updateProfile({photoURL: downloadURL});
                                imgurl=downloadURL;
                                console.log(imgurl);
                                user.updateProfile({displayName:username});
                                signToDatabase(UserInformation,user.uid);
                

                            });

                            

                        });  /*---------- */


                    
                }else
            {
                user.updateProfile({displayName:username});
                signToDatabase(UserInformation,user.uid);
            }
                
               
                


            } else {
                // No user is signed in.
            }
        });
    
        //wait for email confirmation
        //sign To Database
        //navigate Home



    }
    function continueReg(){
        return new Promise(function (resolve, reject) {

            setTimeout(function() {
               
                   reject("E500: OOps an Error occured");
                });
               
                resolve();
               
              },100);
           
        
    }
    function createNewUser(email,password){
    return new Promise(function (resolve, reject) {

        setTimeout(function() {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if(errorCode=="auth/email-already-in-use"){
                    userExists=true;
                   // $("#emailVarification").html("<p>Sorry this user already has an Account <br><button style='background-color:transparent;border:0px;font-size:12px;color:teal'>Login in Here</button></p>");
                  //  alert("Sorry User Already has an account")
                }
                console.log(errorCode);
                alert(error.message);
                $('#exampleModal').hide();
                $('.modal-backdrop').hide();
               reject(error);
            });
            oldEmails.push($("#email").val());
            localStorage.setItem("oldEmails",oldEmails);
            $('#exampleModal').show();
            $('.modal-backdrop').show();
            document.getElementsByClassName("reg-form-btn")[0].textContent="RE-Verify";
            resolve();
           
          },100);
       
    });
   
    }



    /**SIGN UP USER */

    //GOALS


    //BASIC DETAILS
    //PHYSICAL DETAILS
    //LOGIN DETAILS
var userExists=false;
$(".btnz").on("click",function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }
    console.log("Name: " + $("#uname").val() + "\n" + "Email: " + $("#email").val() + "\nPhone: " + $("#phone").val());
    if ($("#uname").val() != '' && $("#pword").val() != '' && $("#email").val() && $("#phone").val() != '') {
       
firebase.auth().signOut().then(function() {
    // Sign-out successful. 
    saveUserInfo(
            $("#uname").val(),
            $("#email").val(),
            $("#pword").val(),
            $("#phone").val(),
           fullphone,
            imgurl
        )
    }).catch(function(error) {
    // An error happened.
    });
    

        check = false;
    }
    else {

        check = false;
    }
    return check;    
})
$('.email-confirmationBox').hide();
$(".email-confirm").hide();
$(".v-codebox").hide();
$(".phonebox").show();
})(jQuery);
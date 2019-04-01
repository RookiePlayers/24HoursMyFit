

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


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .inputr');
    document.getElementById("uname").value = localStorage.getItem("fn") + Math.floor(Math.random() * 2400)
    $("#uname").addClass("has-val")
    $('.reg-form-btn').on('click', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
       
    });

    $('#email').change(function () {


        if (!validate(input[0])) {
            showValidate(input[0]);



        } else {
            hideValidate(input[0]);
        }
    });
    $('#uname').change(function () {


        if (!validate(input[1])) {
            showValidate(input[1]);

        } else {
            hideValidate(input[1]);
        }
    });
    $('#pword').change(function () {


        if (!validate(input[2])) {
            showValidate(input[2]);

        } else {
            hideValidate(input[2]);
        }
    });
    $('#phone').change(function () {


        if (!validate(input[3])) {
            showValidate(input[3]);

        } else {
            hideValidate(input[3]);
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
            case "phone": {
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
            case "phone": {
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


    function sendEmail(email) {
        /*var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: window.location.href,
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
          //}*/

        var newuser = "";
        firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
            if (user) {
                // User is signed in.
                newuser = user;
                user.sendEmailVerification().then(function () {
                    // sent email.
                    $("#emailVarification").html("<p>An Email was sent to: " + email + "<br>for Security reasons please go to your email and verify<br>Didn't see it? <button style='background-color:transparent;border:0px;font-size:12px;color:teal'>Resend</button></p>");
                    alert("an email was sent to: " + email + "please varify");
                }).catch(function (error) {
                    // An error happened.
                });
            } else {
                // No user is signed in.
                newuser = "guest"
            }
        });

    }

    var UserInformation = {
          }
    function saveUserInfo(username, email, password,phoneNat, phone, imgurl) {
        UserInformation = {
            LoginDetails: { email: email, username: username,phoneNumber:phoneNat, phone: phone, profileImg: imgurl, terms: true },
            UserDetails: { firstName: firstName, lastName: lastName, dob: dob, gender: gender },
            PhysicalDetails: { problemAreas: problemAreas, height: height, weight: weight },
            OverallFocus: [{ fitnessGoal: { physicalGoal: fitnessGoalphysical, dietGoal: fitnessGoaldiet } }]
        };
        //sign Up New User
        signUpNewUser(email, password);
      
            sendEmail(email);
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
    function signUpNewUser(email, password) {

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if(errorCode=="auth/email-already-in-use"){
                userExists=true;
                $("#emailVarification").html("<p>Sorry this user already has an Account <br><button style='background-color:transparent;border:0px;font-size:12px;color:teal'>Login in Here</button></p>");
                alert("Sorry User Already has an account")
            }
            console.log(errorCode);
            
            return false;
        });
        
        return true;
    }
    function signToDatabase(userinformation,userId) {
      
    
            firebase.database().ref('Users/' + userId).set(userinformation);
            addProfiletoDB(userId);
          
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
})(jQuery);
    var username="";
    var password="";
    var email="";
    var provider = new firebase.auth.GoogleAuthProvider();
    var provider2 = new firebase.auth.FacebookAuthProvider();
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


    document.getElementById('input').addEventListener("change",function () {
        if( document.getElementById('input').value.includes("@")){
            email= document.getElementById('input').value;
            username=email;
        } 
        else {
            email="";
            username= document.getElementById('input').value+"@gmail.com";
            document.getElementById('input').value=username;
        }
       
    })
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
    document.getElementById('orG').onclick=function(){
        console.log("signing via google");
        
        LoginWithGoogle();
    }
    document.getElementById('orF').onclick=function(){
        console.log("signing via Facebook");
        
        LoginWithFacebook();
    }
    function userNotFound(){
        
    }
    function LoginWithUsername(username){
        
    }
    function LoginWithGoogle(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

        checkIfUserExistsOnDB(user.uid,user)
        
      
             /*   firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    location.replace("../HTML/Homepage/home.html"); //After successful login, user will be redirected to home.html
                }
              });*/
            // ...
          }).catch(function(error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            
            // ...
          });
    }
    function checkIfUserExistsOnDB(uid,user){
        console.log("Quering batabase...");
        var id="";
        var ref = firebase.database().ref("Users");
        ref.orderByKey().equalTo(uid).on("child_added", function(snapshot) {
        id=snapshot.key;
        console.log(">"+id);
        });
        setTimeout(() => {
            console.log(">"+id);
            
            if(id!="")
            {
                firebase.auth().onAuthStateChanged(user => {
                    if(user) {
                        location.replace("../HTML/Homepage/home.html"); //After successful login, user will be redirected to home.html
                    }
                  });
            }
            else{
                signToDatabase(saveUserInfo(user.displayName,user.email,user.phone,user.phone,user.photoURL,user),user.uid);
            }
        }, 1000);
    }
    function LoginWithFacebook(){
        firebase.auth().signInWithPopup(provider2).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
        checkIfUserExistsOnDB(user.uid,user)
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(errorCode+"\n"+credential);
            alert("Oops Sorry for the Inconvienience. Something went wrong please try again later.");
            
          });
    }
    function signToDatabase(userinformation,userId) {
      
        console.log("adding to DB");
        
        firebase.database().ref('Users/' + userId).set(userinformation);
        addProfiletoDB(userId);
      
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
           
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    function saveUserInfo(username, email,phoneNat, phone, imgurl,user) {
        console.log(phone);
        
        var UserInformation = {
            LoginDetails: { email: email, username: username,phoneNumber:phone+"", phone: phone+"", profileImg: "", terms: true },
            UserDetails: { firstName: "", lastName: "", dob: 631155660000, gender: "" },
            PhysicalDetails: { problemAreas: "", height: "", weight: "" },
            OverallFocus: [{ fitnessGoal: { physicalGoal: "", dietGoal: "" } }]
        };
       sendEmail(email,user);

       return UserInformation;

    }
    function sendEmail(email,user) {
      
        
                user.sendEmailVerification().then(function () {
                    // sent email.
                       alert("an email was sent to: " + email + "please varify");
                }).catch(function (error) {
                    // An error happened.
                });
    } 
      

    
})(jQuery);
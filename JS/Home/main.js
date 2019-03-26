var username="";
var email="";
(function($){
    "use strict";
    firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
        if (user) {
         // User is signed in.
         email=user.email;
         console.log(email);
         
        } else {
        // No user is signed in.
           email="Guest";
           
        }
        document.getElementById("email").innerHTML="Email:"+email;
        
        })
   
})(jQuery);
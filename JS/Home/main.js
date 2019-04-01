var UserInformation={};
var LoginDetails={};
var PhysicalDetails={};
var OverallFocus={};
var UserDetail={};

var Achievements={}

var Gallery={}
var Profile={}


firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
if (user) {
 // User is signed in.
 firebase.database().ref('Users/' + user.uid).once('value').then(function(snapshot) {
  
   LoginDetails=snapshot.val().LoginDetails;
   PhysicalDetails=snapshot.val().PhysicalDetails;
   OverallFocus=snapshot.val().OverallFocus;
   UserDetail=snapshot.val().UserDetails;
   UserInformation = {
    LoginDetails:LoginDetails,
    UserDetails:UserDetail,
    PhysicalDetails:PhysicalDetails,
    OverallFocus: OverallFocus
};
    // ...
    console.log(UserInformation);
    
    document.getElementById("uname").innerHTML=(UserInformation.LoginDetails.username);
    let db = firebase.firestore();
  UserInformation.LoginDetails.profileImg!=""?document.getElementById("profilePicture").src=UserInformation.LoginDetails.profileImg:document.getElementById("profilePicture").src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg";
  db.collection("MyFit").doc(user.uid)
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        Profile=doc.data();
        document.getElementById("fitPoints").innerHTML=Profile.Profile.FitPoint + "<sub>Fp</sub>";
        document.getElementById("followersCount").innerHTML=Profile.Profile.Followers.length +" Followers";
        document.getElementById("followingCount").innerHTML=Profile.Profile.Following.length+" Following";
    });

  });
  
} else {
// No user is signed in.
window.location.replace("../../HTML/login2.html")
}
});
$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  
  
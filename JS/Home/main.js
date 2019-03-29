var UserInformation={};
firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
if (user) {
 // User is signed in.
 firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
    UserInformation = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
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
  
  
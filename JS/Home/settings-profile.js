
/** HANDLE PROFILE PICTURE */
initEffect();
loadCover();
$(".fname-Edit").hide();
$(".lname-Edit").hide();
document.getElementsByClassName("username")[0].innerHTML=(localStorage.getItem("Username"));
document.getElementById("fpoints").innerHTML=(localStorage.getItem("fitPoints"));
document.getElementById("follow").innerHTML=(localStorage.getItem("followersCount"));
document.getElementById("follows").innerHTML=(localStorage.getItem("followingCount"));
document.getElementsByClassName("fname1")[0].innerHTML=localStorage.getItem("fname");
document.getElementsByClassName("lname1")[0].innerHTML=localStorage.getItem("lname");

$(".e-fname").on("click",()=>{
    $(".fname-Normal").hide();
    $(".fname-Edit").show();
})

$(".e-lname").on("click",()=>{
    $(".lname-Normal").hide();
    $(".lname-Edit").show();
})


$("#close-fn").on("click",()=>{
    $(".fname-Normal").show();
    $(".fname-Edit").hide();
})

$("#close-ln").on("click",()=>{
    $(".lname-Normal").show();
    $(".lname-Edit").hide();
})

$("#save-fn").on("click",()=>{
    var s=$("#new-fn").val();
    if(s!=""||s!=null)
    {

        firebase.database().ref('Users/' + currentuser.uid+"/LoginDetails/firstName").set(s);
        document.getElementsByClassName("fname")[0].innerHTML=s

    }
    $(".fname-Normal").show();
    $(".fname-Edit").hide();
})
    
$("#save-ln").on("click",()=>{
    var s=$("#new-ln");
    if(s!="")
    {

        firebase.database().ref('Users/' + currentuser.uid+"/LoginDetails/lastName").set(s);
        document.getElementsByClassName("lname")[0].innerHTML=s

    }
    $(".lname-Normal").show();
    $(".lname-Edit").hide();
})
    

$(".progress").hide();
$(".success-checkmark2").hide();
var imgurl,coverurl="";
$('#closeNewPhoto').removeClass("btn-primary")
$('#saveNewPhoto').removeClass("btn-secondary")
$('#saveNewPhoto').addClass("btn-primary")
$('#closeNewPhoto').addClass("btn-secondary")
$('#closeCover').removeClass("btn-primary")
$('#saveCover').removeClass("btn-secondary")
$('#saveCover').addClass("btn-primary")
$('#closeCover').addClass("btn-secondary")
$(".success-checkmark").hide();
document.getElementById("newPhoto").src="../../Resources/icons/camera-ic.png"
$("#imgbtn1").on("click",function () {
    console.log("click");
    
    $('#closeNewPhoto').removeClass("btn-primary")
    $('#saveNewPhoto').removeClass("btn-secondary")
    $('#saveNewPhoto').addClass("btn-primary")
    $('#closeNewPhoto').addClass("btn-secondary")
        $("#saveNewPhoto").removeAttr("disabled");
        $(".success-checkmark").hide();
})
function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }
function previewFile(event) {
    $('#closeNewPhoto').removeClass("btn-primary")
    $('#saveNewPhoto').removeClass("btn-secondary")
    $('#saveNewPhoto').addClass("btn-primary")
    $('#closeNewPhoto').addClass("btn-secondary")
        $("#saveNewPhoto").removeAttr("disabled");
        $(".success-checkmark").hide();
    var preview = document.querySelector('img'); //selects the query named img
     file = event.target.files[0];//sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
      
        document.getElementById("newPhoto").src=reader.result;

    }

    if (file) {
        document.getElementById("imgbtn").style.border = "2px solid green;";
        reader.readAsDataURL(file); //reads the data as a URL
        imgurl = reader.result;

    } 
}
var myfile
$("#coverImgBtn").on("change",function(evt){
   var reader = new FileReader();
    reader.onerror = errorHandler;
     myfile=evt.target.files[0];
    reader.onload = function(e) {
        // Ensure that the progress bar displays 100% at the end.
        console.log("loaded");
        $('.bgAdd').css("backgroundImage","url("+reader.result+")");
        coverurl = reader.result;
              
    }
    if(myfile){
        reader.readAsDataURL(myfile); //reads the data as a URL
       
    }

});
(function($){
"use Strict";

$("#saveNewPhoto").on("click",function () {
 
    //show progress
    //upload to firebase
    firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            try {
                
            
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
                        
                        progress=Math.floor(progress);
                        console.log('Upload is ' + progress + '% done');
                        $(".progress").show();
                        $("#progressPic").attr("aria-valuenow",progress);
                        $("#progressPic").html(progress+"%");
                        $("#progressPic").css("width",progress+"%");
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
                        $('#saveNewPhoto').removeClass("btn-primary")
                        $('#closeNewPhoto').removeClass("btn-secondary")
                        $('#closeNewPhoto').addClass("btn-primary")
                        $('#saveNewPhoto').addClass("btn-secondary")
                        $("#saveNewPhoto").attr("disabled", true);
                        $(".progress").hide();
                        $(".success-checkmark").show();
                        /*$(".progress").html(
                            "<div class='success-checkmark'><div class='check-icon'><span class='icon-line line-tip'></span><span class='icon-line line-long'></span><div class='icon-circle'></div><div class='icon-fix'></div></div></div>"
                        );*/
                        $(".check-icon").hide();
                        setTimeout(function () {
                          $(".check-icon").show();
                        }, 10);

                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            user.updateProfile({photoURL: downloadURL});
                            imgurl=downloadURL;
                            UserInformation.LoginDetails.profileImg=imgurl;
                            //Store in DB
                            console.log(imgurl);
                            firebase.database().ref('Users/' + user.uid+"/LoginDetails/profileImg").set(imgurl);
                            userInfoThread()
                        });
                    });  /*---------- */  
            }
         else {
            // No user is signed in.
        }
    } catch (error) {
            alert("No Changes Made!\n"+error.message);
           $('#closeNewPhoto').removeClass("btn-primary")
           $('#saveNewPhoto').removeClass("btn-secondary")
           $('#saveNewPhoto').addClass("btn-primary")
           $('#closeNewPhoto').addClass("btn-secondary")
           $("#saveNewPhoto").attr("disabled", false);
    }
}
});
})
$('[data-toggle="tooltip"]').tooltip()
userInfoThread();
$("#changeAvatar").on("click",function () {
    
$(".progress").hide();
});
var ready=false;
function userInfoThread(){
    var x= setInterval(() => {
        
         
        try {
            console.log(2);
            
            UserInformation.LoginDetails.profileImg!=""?document.getElementById("changeAvatar").src=UserInformation.LoginDetails.profileImg:UserInformation.UserDetails.gender.toLowerCase()=="female"?document.getElementById("changeAvatar").src="http://primacollisionrepairs.co.nz/wp-content/uploads/2018/06/user-female-icon.png":document.getElementById("changeAvatar").src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg";
          
            clearInterval(x)
        } catch (error) {
            console.log(error);
            
        }
    }, 500);
}
})(jQuery);

/** HANDLE PROFILE COVER  */
//get selected color
var profileCover={};



var newCoverGeneratedCss=localStorage.getItem("CoverUrl");
var generatedColor=localStorage.getItem("CoverColor");
var generatedImg=localStorage.getItem("CoverUrl");
updateCoverCss();
updateMainCoverCss();
function  updateCoverCss(){
   
   if(generatedColor.includes("gradient")&&generatedImg=="") 
    {
        $(".coverSample").css("backgroundColor","");
        $(".coverSample").css("background",generatedColor);
        
    }
        else 
    {
        $(".coverSample").css("background","");
        $(".coverSample").css("backgroundColor",generatedColor); 
        $(".coverSample").css("backgroundImage","url("+generatedImg+")");
    }
  
    $(".coverSample").css("backgroundBlendMode",effect);
  
    initEffect();
}

function  updateMainCoverCss(){
   
    if(generatedColor.includes("gradient")&&generatedImg=="") 
     {
         $(".profileheader").css("backgroundColor","");
         $(".profileheader").css("background",generatedColor);
         
     }
         else 
     {
         $(".profileheader").css("background","");
         $(".profileheader").css("backgroundColor",generatedColor); 
         $(".profileheader").css("backgroundImage","url("+generatedImg+")");
     }
   
     $(".profileheader").css("backgroundBlendMode",effect);
   
     initEffect();
 }

var colors=document.getElementsByName("colors");
var imgs=document.getElementsByName("imgs");

var effect=localStorage.getItem("CoverEffect");
colors.forEach((color)=>{
    color.addEventListener("click",function(){
        var c=getColorCode();
        if(c.includes("gradient")) 
        {
            generatedImg="";
        }
        console.log("chosen color is: "+getColorCode());
        generatedColor=c;
        updateCoverCss();
    })
})
function getColorCode(){
    
    for(var i=0;i<colors.length;i++){

        if(colors[i].checked){
               switch(i){
            case 0:{
                     return "#1d1d1d";
                }
                case 1:{
                    return "#374140";
               }
               case 2:{
                    return "#2e333c";
                }
                case 3:{
                    return "#3a4d56";
               }
               case 4:{
                    return "#46454c";
                }
                case 5:{
                    return "#ececec";
               }
               case 6:{
                return "linear-gradient(100deg,#ff9a96,#fad0c4)";
           }
           case 7:{
            return "linear-gradient(100deg,#ffecd2,#fcb69f)";
       }
       case 8:{
        return "linear-gradient(100deg,#ff9a9e,#fecfef)";
   }
   case 9:{
    return "linear-gradient(100deg,#a1c4fd,#c2e9fb)";
}
case 10:{
    return "linear-gradient(100deg,#cfd9df,#e2ebf0)";
}
case 11:{
    return "linear-gradient(100deg,#667eea,#764ba2)";
}
case 12:{
    return "linear-gradient(90deg,#48cdef,#6f86d6)";
}
case 13:{
    return "linear-gradient(100deg,#e65d4b,#ff1563)";
}
case 14:{
    return "linear-gradient(100deg,#434343,#000000)";
}
case 15:{
    return "linear-gradient(100deg,#29323c,#485563)";
}


            }
        }
       
    }
    console.log("Default choice was chosen due to an unforseen error/choice");
    
    return "#1d1d1d"
    
}
imgs.forEach((img)=>{
    img.addEventListener("click",function(){
        $(".coverSample").css("background","");
        var c=getimgCode();
       console.log("chosen img is: "+getimgCode());
        generatedImg=c;
        updateCoverCss();
    })
})
effects.forEach((fx)=>{
  
    fx.addEventListener("click",function () {
        $(".coverSample").css("background","");
        console.log("clicked**");
        var e=getFXCode();
        effect=e;
        updateCoverCss();
    })
});
var effects;
function initEffect(){
    effects=document.getElementsByName("fx");
    var i=0;
    effects.forEach((fx)=>{
        var f=document.getElementsByClassName("fxbox")[i];
     //   console.log(f);
        
        f.style.backgroundColor=generatedColor;
        f.style.backgroundImage="url("+generatedImg+")";
        switch(i){
            case 0:{
                f.style.backgroundBlendMode="normal";
            }break;
            case 1:{
                f.style.backgroundBlendMode="color-burn";
            }break;
            case 2:{
                f.style.backgroundBlendMode="color-dodge";
            }break;
            case 3:{
                f.style.backgroundBlendMode="darken";

            }break;
            case 4:{
                f.style.backgroundBlendMode="difference";
            }break;
            case 5:{
                f.style.backgroundBlendMode="exclusion";
            }break;
            case 6:{
                f.style.backgroundBlendMode="hard-light";
            }break;
            case 7:{
                f.style.backgroundBlendMode="hue";
            }break;
            case 8:{
                f.style.backgroundBlendMode="inherit";
            }break;
            case 9:{
                f.style.backgroundBlendMode="initial";
            }break;
            case 10:{
                f.style.backgroundBlendMode="lighten";
            }break;
            case 11:{
                f.style.backgroundBlendMode="luminosity";
            }break;
            case 12:{
                f.style.backgroundBlendMode="multiply";
            }break;
            case 13:{
                f.style.backgroundBlendMode="overlay";
            }break;
            case 14:{
                f.style.backgroundBlendMode="saturation";
            }break;
            case 15:{
                f.style.backgroundBlendMode="soft-light";
            }break;
            case 16:{
                f.style.filter="blur(8px)";
            }break;

            default:break;
        }
        i++;
       
    });
   


}

function getFXCode(){
    
    
    for(var i=0;i<effects.length;i++){

        if(effects[i].checked){
               switch(i){
                   case 0:{
                    return "normal"
                   }
            case 1:{
                     return "color-burn";
                }
                case 2:{
                    return  "color-dodge";
               }
               case 3:{
                    return  "darken";
                }
                case 4:{
                    return  "difference";
               }
               case 5:{
                    return "exclusion";
                }
                case 6:{
                    return "hard-light";
               }
                 case 7:{
                    return "hue";
               }
               case 8:{
                  return "inherit";
             }
             case 9:{
                return "initial";
           }
           case 10:{
              return "lighten";
         }
         case 11:{
            return "luminosity";
       }
       case 12:{
          return "multiply";
     }
     case 13:{
        return "overlay";
   }
   case 14:{
      return "saturation";
 }
 case 15:{
    return "soft-light";
}
case 16:{
   return "unset";
}
               
            }
        }
       
    }
    return "normal";
}
function getimgCode(){
    
    
    for(var i=0;i<imgs.length;i++){

        if(imgs[i].checked){
               switch(i){
                   case 0:{
                    return ""
                   }
            case 1:{
                     return "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fstars.jpg?alt=media&token=77233c38-b585-4a61-907f-c7876228eb4e";
                }
                case 2:{
                    return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2F15002.jpg?alt=media&token=4374eec1-7b38-41c6-9a5a-cfdc9c4fda83";
               }
               case 3:{
                    return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2FAbstract-Multicolor-Patterns.jpg?alt=media&token=444f9246-6a60-4e5a-90f6-2933e71f1e00";
                }
                case 4:{
                    return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fwooman-runner-geting-ready.jpg?alt=media&token=ef3c6fbb-d2d5-4e87-bef4-d651bbe83ad4";
               }
               case 5:{
                   return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2F3-cover-letter-keys.jpg?alt=media&token=344a1e24-ba8f-41d6-8801-59d086f9260c";
              }
              case 6:{
                  return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fabstract2.jpg?alt=media&token=a79f1431-1d28-47bf-8489-8998ec3924b7";
             }
             case 7:{
                 return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fabstract-art-blur-1455986.jpg?alt=media&token=ac072d1a-ef5b-4f0d-8bf4-6e2a43b4ac99";
            }
            case 8:{
                return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fcards-cover.gif.6d2812d119af26877c7e7a26a6cef57f.gif?alt=media&token=ccb60909-c868-4823-b31e-cd22e9b68168";
           }
           case 9:{
               return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Flscape-blur.jpg?alt=media&token=347e2124-a6d2-4318-b77b-e268eb845b25";
          }
          case 10:{
              return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fcards-cover.gif.6d2812d119af26877c7e7a26a6cef57f.gif?alt=media&token=ccb60909-c868-4823-b31e-cd22e9b68168";
         }
         case 11:{
             return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Ffball.jpg?alt=media&token=30697acb-2ea0-44fa-9b77-9d889139c3c4";
        }
        case 12:{
            return  "https://firebasestorage.googleapis.com/v0/b/hours-db878.appspot.com/o/myFit%2FBackground_Images%2Fbball.jpeg?alt=media&token=7b332cb4-3793-48b8-aee9-c6ea6966a07e";
       }

               case 13:{
                    return coverurl;
                }
                case 14:{
                    return "#ececec";
               }
            }
        }
       
    }
    console.log("Default choice was chosen due to an unforseen error/choice");
    
    return "../../Resources/Backgrounds/stars.jpg";
    
}
function saveCover()
{
    saveImg();
    SaveToDB();
    ReloadCover();
}
function ReloadCover(){
    localStorage.setItem("CoverUrl",generatedImg);
    localStorage.setItem("CoverColor",generatedColor);
    localStorage.setItem("CoverEffect",effect);

  
    updateMainCoverCss();
}
var uid;
function savingCover(){
    console.log(uid);
    
    //firebase.database().ref('Users/'+uid+"/LoginDetails/Cover").set(profileCover)
return new Promise(function(resolve, reject) {
    setTimeout(function() {
         resolve();
    }, 500);
  });
}

function SaveToDB(){
     console.log(profileCover);
    firebase.database().ref('Users/'+uid+"/Cover/").set(profileCover)
    savingCover().then(()=>{
     mainThread();
       ReloadCover();
    })
    
    
}
function saveImg(){
    var coverimg = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    coverimg = xmlhttp.response;
    return coverimg;
  }
};
xmlhttp.open("GET",generatedImg,true);
xmlhttp.send();
return null;
}
    $("#saveCover").on("click",function () {
        var imgfile;
        if(generatedImg.includes("https://"))
       {
           coverurl=generatedImg;
        
           $('#saveCover').removeClass("btn-primary")
           $('#closeCover').removeClass("btn-secondary")
           $('#closeCover').addClass("btn-primary")
           $('#saveCover').addClass("btn-secondary")
           $("#saveCover").attr("disabled", true);
     }
        else imgfile=myfile;

        console.log("file: "+imgfile);
        
        //show progress

        //upload to firebase
        firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
            if (user) {
                // User is signed in.
                 uid=user.uid;
                try {
                    
                
                if (imgfile&&generatedImg!="") {
                    var metadata = {
                        name: coverurl,
                        contentType: 'image/jpeg'
    
                    };
                    var storage = firebase.storage();
                    var storageRef = storage.ref();
                    
                    // Upload file and metadata to the object 'images/mountains.jpg'
                    var uploadTask = storageRef.child("Users/"+user.uid + '/images/' + imgfile.name).put(imgfile, metadata);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        function (snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            
                            progress=Math.floor(progress);
                            console.log('Upload is ' + progress + '% done');
                            $(".progress").show();
                            $("#progressPic").attr("aria-valuenow",progress);
                            $("#progressPic").html(progress+"%");
                            $("#progressPic").css("width",progress+"%");
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
                            $('#saveCover').removeClass("btn-primary")
                            $('#closeCover').removeClass("btn-secondary")
                            $('#closeCover').addClass("btn-primary")
                            $('#saveCover').addClass("btn-secondary")
                            $("#saveCover").attr("disabled", true);
                            $(".progress").hide();
                            $(".success-checkmark2").show();
                            /*$(".progress").html(
                                "<div class='success-checkmark'><div class='check-icon'><span class='icon-line line-tip'></span><span class='icon-line line-long'></span><div class='icon-circle'></div><div class='icon-fix'></div></div></div>"
                            );*/
                            $(".check-icon").hide();
                            setTimeout(function () {
                              $(".check-icon").show();
                            }, 10);
    
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                               
                                coverurl=downloadURL;
                                
                                //Store in DB
                            
                                profileCover={color:generatedColor,image:coverurl,effect:effect}
                                SaveToDB();

                            });
                        });  /*---------- */  
                }
             else {
                                console.log("saving...");
                                clearInterval(maintimeout)
                                //Store in DB
                                profileCover={color:generatedColor,image:coverurl,effect:effect}
                                SaveToDB();
            }
        } catch (error) {
                alert("No Changes Made!\n"+error.message);
               $('#closeCover').removeClass("btn-primary")
               $('#saveCover').removeClass("btn-secondary")
               $('#saveCover').addClass("btn-primary")
               $('#closeCover').addClass("btn-secondary")
               $("#saveCover").attr("disabled", false);
        }
    }
    });
    })
function loadCover(){
    
    generatedImg=localStorage.getItem("CoverUrl");
    generatedColor=localStorage.getItem("CoverColor");
    effect=localStorage.getItem("CoverEffect");

    if(generatedImg!=""||generatedColor!=""||effect!=""){
    if(generatedColor.includes("gradient")&&generatedImg=="") 
    {
        $(".coverSample").css("backgroundColor","");
        $(".coverSample").css("background",generatedColor);
        
    }
        else 
    {
        $(".coverSample").css("background","");
        $(".coverSample").css("backgroundColor",generatedColor); 
        $(".coverSample").css("backgroundImage","url("+generatedImg+")");
    }
  
    $(".coverSample").css("backgroundBlendMode",effect);
  
    initEffect();
}
   
}

$('.ml3').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
    $('.ml6 .letters').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    $('.ml7 .letters').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

  anime.timeline({loop: false})
    .add({
      targets: '.ml3 .letter',
      opacity: [0,1],
      easing: "easeInOutQuad",
      duration: 1010,
      delay: function(el, i) {
        return 150 * (i+1)
      }
    }).add({
      targets: '.ml3',
      opacity: 1,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    })

    anime.timeline({loop: false})
    .add({
        delay:(1000)
    })
      .add({
        targets: '.ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: function(el, i) {
          return 50 * i;
        }
      }).add({
        targets: '.ml6',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 3000
      });

    
        anime.timeline({loop: false})
        .add({
            delay:(1000)
        })
          .add({
            targets: '.ml7 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: function(el, i) {
              return 50 * i;
            }
          }).add({
            targets: '.ml7',
            opacity: 1,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 3000
          });
        
     
      
     // anime.timeline({loop: true})
     
    /**SLIDERS */
   /* $('#range').on("input", function() {
      $('.output').val(this.value +"  ft" );
      }).trigger("change");*/

      //weight
      var rangeSlider = document.getElementById("rs-range-line");
      var rangeBullet = document.getElementById("rs-bullet");
      
      rangeSlider.addEventListener("input", showSliderValue, false);
      
      function showSliderValue() {
        rangeBullet.innerHTML = rangeSlider.value;
        var bulletPosition = (rangeSlider.value /rangeSlider.max);
        rangeBullet.style.left = (bulletPosition * 56) + "vw";
      }
      
     //height
 var elem = document.querySelector('#heightScale');
 var height=3.5;
var rangeValue = function(){
  var newValue = height=elem.value;
  var target = document.querySelector('.value');
  target.innerHTML = newValue+" \"";
}

elem.addEventListener("input", rangeValue);

/*** animate onm scroll */
var $window = $(window);
var $elem1=$("#basicDetails");
var $elem2=$("#physicalDetails");




    function isScrolledIntoView($elem, $window,bottomOffset) {
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();


        
        
        console.log("Top: ");
        
        console.log(elemTop+"\n"+docViewTop);

        console.log("Bottom: ");
        
        console.log(elemBottom+"\n"+docViewBottom);
        
        return ((elemBottom <= (docViewBottom+bottomOffset)) && (elemTop <= docViewTop));
    }


$(document).on("scroll", function () {
      // console.log("now you see me"); 
      if (isScrolledIntoView($elem1, $window,0)) {
        document.getElementById("cover2").style.backgroundColor="rgba(0, 0, 0, 0.8);";
     console.log("now you see me");
    }

});


$(document).on("scroll", function () {
 
 if (isScrolledIntoView($elem2, $window,$elem2.height())) {
   document.getElementById("cover2").style.backgroundColor="black";
console.log("now you see me");
}


});





function getRadioVal(form, name) {
  var val;
  // get list of radio buttons with specified name
  var radios = form.elements[name];
  
  // loop through list of radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) { // radio checked?
          val = radios[i].value; // if so, hold its value in val
          break; // and break out of for loop
      }
  }
  return val; // return value of checked radio or undefined if none checked
}
runThread();
var fname=document.getElementById("input");
var lname=document.getElementById("input2");
var dob=document.getElementById("datepicker");
var gender=document.getElementById("genderPicked");
var fullnameelem=document.getElementById("fullname");
var dobelem=document.getElementById("dob");
var genderelem=document.getElementById("sex");
var bt=document.getElementById("bt");
var bodytype=document.getElementById("mbodytype");
var heightelem=document.getElementById("tall");
var weightelem=document.getElementById("weigh");
 var f=l="";
 var userGender="";
 var userBodyType="";
function runThread(){
  var x= setInterval(() => {
 
  if(fname.value!="")
    {
      document.getElementById("fn").innerHTML="Alright, "+fname.value
      f=fname.value;
      if(lname.value!="")
      l=lname.value;

      fullnameelem.innerHTML= f +" "+l;
    }
    
    else{
      document.getElementById("fn").innerHTML="Alright, ";
    
      fullnameelem.innerHTML="?";
    }
    
    if(dob.value!=""){
      dobelem.innerHTML=dob.value;
    }
    else{
      dobelem.innerHTML="?";
    }
  
    userGender=getRadioVal(document.getElementById("genderform"),'radio');
      switch(getRadioVal(document.getElementById("genderform"),'radio')){
        case "Male":genderelem.innerHTML="a Man";break;
        case "Female":genderelem.innerHTML="a Woman";break;
        default: genderelem.innerHTML="";break;
      }
    
   
     
   
     userBodyType=getRadioVal(document.getElementById("btForm"),'bodyType');
       switch(getRadioVal(document.getElementById("btForm"),'bodyType')){
         case "Endomorph":bt.innerHTML="Endomorph";break;
         case "Mesomorph":bt.innerHTML="Mesomorph";break;
         default: bt.innerHTML="Ectomorph";break;
       }

       
     weightelem.innerHTML=rangeSlider.value;
     heightelem.innerHTML=height;
    

    if(fname.value!=""&&dob.value!=""){
     document.getElementById("nextBox").classList.add("next1");
    }
  }, 1000);
document.getElementById("btn2").addEventListener("click",function (){
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("fn",f);
    localStorage.setItem("ln",l);
    localStorage.setItem("dob",dob.value);
    localStorage.setItem("gender",userGender);

    localStorage.setItem("bodyType",userBodyType);
    localStorage.setItem("height",height);
    localStorage.setItem("weight",rangeSlider.value);

  
    // Retrieve
   
  }
});

}
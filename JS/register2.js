
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
      
     // rangeSlider.addEventListener("input", showSliderValue, false);
      
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

//elem.addEventListener("input", rangeValue);

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
}
/*document.getElementById("btn2").addEventListener("click",function (){
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

}*/


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
  });



var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
(function () {
  $(document).ready(function () {
    var is_dragging;
    is_dragging = false;
    $(document).on("mousedown touchstart", ".circle", function (e) {
      return is_dragging = true;
    });
    $(document).on("mouseup touchend", function (e) {
      return is_dragging = false;
    });
    return $(window).on("mousemove touchmove", function (e) {
      var angle, center_x, center_y, circle, delta_x, delta_y, pos_x, pos_y, touch;
      if (is_dragging) {
        circle = $(".circle");
        touch = void 0;
        if (e.originalEvent.touches) {
          touch = e.originalEvent.touches[0];
        }
        center_x = $(circle).outerWidth() / 2 + $(circle).offset().left;
        center_y = $(circle).outerHeight() / 2 + $(circle).offset().top;
        pos_x = e.pageX || touch.pageX;
        pos_y = e.pageY || touch.pageY;
        delta_y = center_y - pos_y;
        delta_x = center_x - pos_x;
        angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI); // Calculate Angle between circle center and mouse pos
        angle -= 90;
        if (angle < 0) {
          angle = 360 + angle; // Always show angle positive
        }
        angle = Math.round(angle);
        $(".dot").css("transform", "rotate(" + angle + "deg)");
        return $(".debug").html(angle + "<sub style='font-size: 18px'>kg</sub>");
      }
    });
  });

}).call(this);

//# sourceURL=coffeescript
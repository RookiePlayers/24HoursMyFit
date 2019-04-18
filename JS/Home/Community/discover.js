(function($){
    "use strict";
    var newsboard=[{
        //img
        //link
        //heading
        //subheading
        img:"../../../Resources/Backgrounds/wooman-runner-geting-ready.jpg",
        link:"",
        heading:"This is Community",
        subheading:"Discover"
    }]
  //  $(window).load(function() {
        // executes when complete page is fully loaded, including all frames, objects and images
       console.log("18");  addNewSlide(newsboard[0],3)
    //   });
       function addNewSlide(newsItem,index){
          
           
        var ol = document.getElementsByClassName("carousel-indicators")[0];
          var li = document.createElement("li");
        li.setAttribute('data-target',"#carouselExampleCaptions");
        li.setAttribute('data-slide-to',index+"");
        ol.appendChild(li);

        var newslide=document.createElement("div");
        newslide.setAttribute("class","carusel-item");
        newslide.innerHTML=
        " <img src="+newsItem.img+" class='d-block w-100' alt='...'>"+
        "<div class='carousel-caption d-none d-md-block'>"+
        "<h5>"+newsItem.heading+"</h5>"+
        "<p>"+newsItem.subheading+"</p>"+
        "</div>"
        document.getElementsByClassName("carousel-inner")[0].appendChild(newslide);
       }

})(jQuery);
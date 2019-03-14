$('.ml3').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
    $('.ml6 .letters').each(function(){
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
  
      
     // anime.timeline({loop: true})
     
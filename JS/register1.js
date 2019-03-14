// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText,openContentText2, pageIsOpen = false,
    openContentImage,openContentImage2,openContentHeading, closeContent, windowWidth, windowHeight, currentCard;
// initiate the process
init2();

function init2() {
 
  selectElements2();
  attachListeners2();
}

// select all the elements in the DOM that are going to be used
function selectElements2() {
  cards = document.getElementsByClassName('card2'),
  nCards = cards.length;


}
function getCardElement2(el) {
    if (el.className.indexOf('card2') > -1) return el;
    else return getCardElement2(el.parentElement);
  }
  function attachListeners2() {
    for (var i = 0; i < nCards; i++) {
      attachListenerToCard2(i);
    }
    closeContent.addEventListener('click', onCloseClick);
    window.addEventListener('resize', resize);
  }
  
  function attachListenerToCard2(i) {
    cards[i].addEventListener('click', function(e) {
      var card = getCardElement2(e.target);
      onCardClick2(card, i);
    })
  }
  
  /* When a card is clicked */
  function onCardClick2(card, i) {
    // set the current card
    userData.dietType=card.children[1].textContent;
    console.log(userData.mainGoal+"\n"+userData.dietType);
    
    currentCard = card;
    // add the 'clicked' class to the card, so it animates out
    currentCard.className += ' clicked';
    // animate the card 'cover' after a 500ms delay
    window.location.href = '../HTML/register2.html';
  }
  
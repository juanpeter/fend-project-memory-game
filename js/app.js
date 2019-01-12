/*
 * Create a list that holds all of your cards
 */

//Defines card
var card = $('.card');
//Makes card Array
var cardArray = jQuery.makeArray(card);
//Array of open cards
var openCards = [];

//What if appending elements in a openCards array that have the class ('open')?
card.on('click', function(){
    //Adds classes open and show
    $(this).addClass("open show");
    //Appends those elements to the openCards array
    openCards.push($(this));
    //If two cards have been open, check if they have the same icon
    if (openCards.length >=2) {
        //if they have the same icon class, it's a match
        if (openCards[0].html() == openCards[1].html()) {
            console.log("match!");
        }
        else {
            console.log('no match :c');
        }

    }
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Create a list that holds all of your cards
 */

//Defines card
var card = $('.card');
//Array of open cards
var openCards = [];
//stars
var starArray = jQuery.makeArray($('i.fa.fa-star'));
//moves
var moves = 0;

card.on('click', function(){
    //Adds classes open and show
    $(this).addClass("open show");
    //Adds a 'move' counter
    moves +=1;
    //Print the number of moves the player did
    $('.moves').text(moves);
    //Change full stars to white stars on threshold
    if (moves >= 20) {
        $(starArray[0]).removeClass('fa');
        $(starArray[0]).addClass('far');
    }
    if (moves >= 30) {
        $(starArray[1]).removeClass('fa');
        $(starArray[1]).addClass('far');
    }
    if (moves >= 40) {
        $(starArray[2]).removeClass('fa');
        $(starArray[2]).addClass('far');
    }
    //Appends those elements to the openCards array
    openCards.push($(this));
    //If two cards have been open, check if they have the same icon
    if (openCards.length >=2) {
        //if they have the same icon class, it's a match
        if (openCards[0].html() == openCards[1].html()) {
            //Adds class ('match') for all openCards Elemments
            openCards[0].addClass("match");
            openCards[1].addClass("match");
            //Removes classes ('open show') from all openCards Elements
            openCards[0].removeClass("open show");
            openCards[1].removeClass("open show");
            //Remove elements from array after done
            openCards.splice(0,2);
        }
        else {
            //Timer of 0.75 seconds so people can see the chosen cards
            setTimeout(() => {
                //Removes classes ('open show') from all openCards Elements
                openCards[0].removeClass("open show");
                openCards[1].removeClass("open show");
                //Remove elements from array after done
                openCards.splice(0,2);
            }, 750); 
        }
    }

    /*The function works well, but removeClass
     and addClass could be optimized with loops*/

     //if all cards have the class 'match', the game is over and the player wins
     if ($('.match').length == 16) {
        //Print stars on the "you won" modal;
        $('#final-score').append(starArray);
        //print message
        if (moves <= 20) {
            $('#final-score').append("<br><p>You got all three stars woooooo!</p>");
        }
        else if (moves >= 20 && moves < 30) {
            $('#final-score').append("<br><p>You got two stars, good job!</p>");
        }
        else if (moves >= 30 && moves < 40) {
            $('#final-score').append("<br><p>You got one star, don't give up!</p>");
        }
        else if (moves >= 40) {
            $('#final-score').append("<br><p>You got no stars, but you can do it next time!</p>");
        }
        //Calls the modal
        $('#modal').modal();
     }
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
    Even though the shuffle is working, cards are not changing place
    Use a building page function like html() to build a custom page every load
    Deleting the cards makes cardArray empty, gotta work on it

    Create a card element that can be multiplied and be sure it has two of the classes
    selected randomly
*/

$(window).on('load', function(){
    //Make cards
    for (let i = 0; i < 16; i++){
        $('.deck').append("<li class='card'><i class='fa'></i></li>");
    }   
});

//Makes card Array
var cardArray = jQuery.makeArray(card);

//randomize cards on document load
window.onload = shuffle(cardArray)

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

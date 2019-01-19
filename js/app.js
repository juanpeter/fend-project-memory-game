/*
 * Create a list that holds all of your cards
 */

//Defines a single card
const card = $('.card');
//Array of open cards
const openCards = [];
//stars
const starArray = jQuery.makeArray($('i.fa.fa-star'));
//moves
let moves = 0;
//variable for minutes
let m = 0;
//variable for seconds
let s = 0;
//timer variable, to be stopped with clearTimeout();
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

$(window).on('load', newGame());
//Function to shuffle cards and start a new game
function newGame() {
    //var with all card types
    const type = ['fa-gem','fa-gem','fa-paper-plane','fa-paper-plane','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
    //reset the values of s and m;
    s = 0;
    m = 0;
    //reset the clock
    clearTimeout(timer);
    //start the clock function again
    startTime();
    //make all stars black again
    $(starArray).removeClass('far');
    $(starArray).addClass('fa');
    //adds stars again
    $('.stars').append(starArray);
    //makes the cardArray
    const cardArray = jQuery.makeArray($('.deck li i.fa'));
    //remove classes from all card elements
    $('.card').removeClass('match');
    //remove all classes from cards
    $('.card i').removeClass('fa-gem fa-paper-plane fa-anchor fa-bolt fa-cube fa-leaf fa-bicycle fa-bomb');
    //resets moves counter
    moves = 0;
    //pushes the 0 moves to the html
    $('.moves').text(moves);
    //shuffle card types
    for (let i = 0; i < 16; i++) {
        //shuffles the class
        const cardType = shuffle(type);
        //ads class to the card
        $(cardArray[i]).addClass(cardType[0]);
        //remove that element from cardType array
        cardType.shift();
    };
}

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

card.on('click', function() {
    //Adds classes open and show
    $(this).addClass("open show");
    //Adds a 'move' counter
    moves +=1;
    //Print the number of moves the player did
    $('.moves').text(moves);
    //Change full stars to white stars on threshold
    if (moves >= 25) {
        $(starArray[0]).removeClass('fa');
        $(starArray[0]).addClass('far');
    }
    if (moves >= 35) {
        $(starArray[1]).removeClass('fa');
        $(starArray[1]).addClass('far');
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
        //Stop the timer
        clearTimeout(timer);
        $('#final-score').append(starArray);
        //print message
        if (moves < 25) {
            $('#final-score').append("<br><p>You got all three stars, congratulations!</p>");
        }
        else if (moves >= 25 && moves < 35) {
            $('#final-score').append("<br><p>You got two stars, good job!</p>");
        }
        else if (moves > 35) {
            $('#final-score').append("<br><p>You got one star, don't give up!</p>");
        }
        //Append the time won
        $('#final-time').append($('.time').html())
        //Calls the modal
        $('#modal').modal();
     }
});

function startTime() {
    //Every second that passes, add 1 to seconds
    s += 1;
    //if 60 seconds have passed, add a minute to the counter
    if (s >= 60) {
        s = 0;
        m += 1;
    }
    //if the ammount of time is less than 10 seconds, add a 0 at the beginning of html
    if (s < 10) {
        $('.time').html("<p>Time: 0"+m+":0"+s+"</p>");
    }
    //if the ammount of time is higher than 10 seconds, remove 0 from s
    if (s >= 10) {
        $('.time').html("<p>Time: 0"+m+":"+s+"</p>");
    }
    //if the ammount of time is higher than 10 minutes, remove 0 from m
    if (m >= 10) {
        $('.time').html("<p>Time: "+m+":"+s+"</p>");
    }
    timer = setTimeout(function(){startTime()},1000);
}
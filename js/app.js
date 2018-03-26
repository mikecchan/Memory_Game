/*
In the beginning of my JavaScript file, I am initially setting up allowed
important variables that will be globally scoped (meaning to be used in
multiple classes or at later times in the code).

'comparison_card' is the first card the player picked.  It will be compared later
to the second card the player will pick.

'found_count' will be the number of matched pair cards the player found.  When
'found_count' equals to 8, the game ends and the player wins.

'stars' obtains the number of stars.  When the number of stars is zero, then
the game ends and the player losses.  However, when the player finds a match,
the stars will automatically refill itself.

'continue_game'lets the player keep playing or not.

'time_started' allows the player to see the timer.

'header_tag' allows us to append the timer.

'comparing_wait' pauses the game for a couple of seconds to let the players
see they picked the wrong pairs.

'moves' keeps track of all the moves.

'deck_class' lets us append cards and see them later on.

'list' has all the cards to populate the game board.
*/
let comparison_card;
let found_count = 0;
let stars = document.getElementsByClassName("stars");
let continue_game = true;
let time_started = false;
let header_tag = document.getElementsByTagName("header")[0];
let comparing_wait = false;
let moves = parseInt(document.getElementsByClassName("moves")[0].innerHTML);
let deck_class = document.getElementsByClassName("deck")[0];
let stars_qty = 8;
const list =  ["fa fa-diamond",
            "fa fa-paper-plane-o",
            "fa fa-anchor",
            "fa fa-bolt",
            "fa fa-cube",
            "fa fa-anchor",
            "fa fa-leaf",
            "fa fa-bicycle",
            "fa fa-diamond",
            "fa fa-bomb",
            "fa fa-leaf",
            "fa fa-bomb",
            "fa fa-bolt",
            "fa fa-bicycle",
            "fa fa-paper-plane-o",
            "fa fa-cube"];

//setup() let's us setup the game onload.
function setup(){
  console.log("setup()");
  refill_stars();
  let array = shuffle(list);
  createHTML(array);
  console.log(document.getElementsByClassName("container"));
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  console.log("shuffle()");
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//createHTML() function lets us take the list of cards and create HTML elements
// out of them.
function createHTML(list){
  console.log("createHTML()");
  for (i of list) {
    let li_node = document.createElement("li");
    let li_node_att = document.createAttribute("class");
    li_node_att.value = "card";
    li_node.setAttributeNode(li_node_att);

    //creating the 'i' element next
    let i_node = document.createElement("i");
    let i_node_att = document.createAttribute("class");
    i_node_att.value = i;
    i_node.setAttributeNode(i_node_att);

    //append the 'i' node under the 'li' node
    li_node.append(i_node);

    //set up the event listener for the 'li' i_node
    li_node.addEventListener("click", card_clicked, false);

    //append the 'li' node to the 'deck' element
    deck_class.append(li_node);
  }
  console.log("displaying the nodes created under the 'deck' node");
  console.log(deck_class);
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

/*
  card_clicked() is triggered when the user clicks on a card.
  1. it activates the timer once the user clicks on any card.
  2. it finds out whether it was the first or second card picked and then
      proceeds based off of that.
*/
 function card_clicked(){
   console.log("card_clicked()");
   if (time_started == false){
     start_time();
     time_started = true;
   }
   if (continue_game && !comparing_wait){
     console.log( "this.getAttribute('class') is " + this.getAttribute("class"));
     if (this.getAttribute("class") == "card"){
       console.log("true");
       this.setAttribute("class", "card open show");
       if (!comparison_card){
         comparison_card = this;
       }
       else{
         check_cards(this);
       }
     }
   }
 }

/*
  check_cards() checks to see if there is a match between the two picked cards
  and then performs certain actions.
*/
function check_cards(card){
   console.log("check_cards()");
   let childNode = card.children[0];
   moves += 1;
   document.getElementsByClassName("moves")[0].innerHTML = moves;
   if (comparison_card.firstElementChild.getAttribute("class") == childNode.getAttribute("class")){
     console.log("matches!");
     card.setAttribute("class", "card match");
     comparison_card.setAttribute("class", "card match");
     comparison_card = null;
     found_count += 1;
     stars_qty -= 1;
     refill_stars();
     console.log("found_count length is " + found_count);
     if (found_count == 8){
       final_score(true);
     }
   }
   else{
     comparing_wait = true;
     for (i=0 ; i < deck_class.children.length; i++){
       deck_class.children[i].style.cursor = "not-allowed";
     }
     comparison_card.setAttribute("class", "card wrong");
     card.setAttribute("class", "card wrong");
     window.setTimeout(function(){
       console.log("settimeout");
       comparison_card.setAttribute("class", "card");
       card.setAttribute("class", "card");
       comparison_card = null;
       remove_star();
       comparing_wait = false;
       for (i=0 ; i < deck_class.children.length; i++){
         deck_class.children[i].style.cursor = "";
       }
     }, 2000);
   }
 }

 /*
    remove_star() removes a star when the player picked the wrong pairs.
 */
 function remove_star(){
   console.log("remove_star()");
   console.log(stars);
   stars[0].removeChild(stars[0].lastElementChild);
   console.log(stars);
   if (stars[0].childElementCount == 0){
     final_score(false);
   }
 }

/*
  final_score() displays a pop up to let users know they won or lost and if they
  would like to play again.
*/
 function final_score(win){
   document.getElementById("basicUsage").id = "freeze_time";
   let final_time = document.getElementById("freeze_time").outerText;
   //let playAgain = false;
   let modal = document.getElementById("myModal");
   //let span = document.getElementsByClassName("close")[0];
   let p = document.getElementById("p-modal-text");
   let retry_btn = document.getElementById("retry_btn");
   let cancel_btn = document.getElementById("cancel_btn");
   retry_btn.onclick = function(){
     restart();
   }
   cancel_btn.onclick = function(){
     modal.style.display = "none";
   }
   window.onclick = function(event) {
    if (event.target == modal) {
            modal.style.display = "none";
        }
    }
   let textNode;
   if (win){
     textNode = document.createTextNode("You Won with finished time of " + final_time + " and with " + moves + " moves.  Play Again?");
     //playAgain = confirm("You Won with finished time of " + final_time + " and with " + moves + " moves.  Play Again?");
   }
   else{
     textNode = document.createTextNode("You lose.  Play Again?");
     //playAgain = confirm("You lose.  Play Again?");
   }
   p.appendChild(textNode);
   //modal.appendChild(p);
   modal.style.display = "block";
   continue_game = false;
  }

/*
  refill_stars() When the player picks a pair, then the number of stars will
  go back to 14.
*/
 function refill_stars(){
   console.log("fill_back_stars()");
   console.log(document.getElementsByClassName("score-panel"));
   console.log(stars[0].childElementCount);
   if (stars[0].childElementCount > stars_qty){
     while (stars[0].childElementCount > stars_qty){
       stars[0].removeChild(stars[0].lastElementChild);
       console.log(stars[0].childElementCount);
     }
   }
   else if (stars[0].childElementCount < stars_qty) {
     while (stars[0].childElementCount < stars_qty){
       let i_node = document.createElement("i");
       let i_node_att = document.createAttribute("class");
       i_node_att.value = "fa fa-star";
       i_node.setAttributeNode(i_node_att);
       let li_node = document.createElement("li");
       li_node.append(i_node);
       stars[0].append(li_node)
     }
   }
   console.log(stars[0]);
 }

 //restart() restarts the game by refreshing the page.
  function restart(){
    location.reload();
  }

  /*
  start_time() allows the clock to be set once the user clicks on any cards
  at the beginning of the game.
  */
  function start_time(){
    console.log("start_time()");
    let div_node = document.createElement("div");
    div_node.setAttribute("id", "basicUsage");
    div_node.value = "00:00:00";
    let h2_node = document.createElement("h2");
    h2_node.append(div_node);
    header_tag.appendChild(h2_node);
    console.log(document.getElementsByTagName("header"));
  }

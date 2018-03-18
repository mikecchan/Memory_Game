import Timer from '/easytimer/easytimer';

var comparison_card;
var found_count = 0;
var stars;
var continue_game = true;
var time_started = false;

function setup(){
  console.log("setup()");
  stars = document.getElementsByClassName("stars");
  var array = shuffle(list);
  createHTML(array);
}

/*
 * Create a list that holds all of your cards
 */
var list =  ["fa fa-diamond",
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  console.log("shuffle()");
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

function createHTML(list){
  console.log("createHTML()");
  var deck_class = document.getElementsByClassName("deck")[0];
  for (var i of list) {
    var li_node = document.createElement('li');
    var li_node_att = document.createAttribute('class');
    li_node_att.value = "card";
    li_node.setAttributeNode(li_node_att);

    //creating the 'i' element next
    var i_node = document.createElement('i');
    var i_node_att = document.createAttribute('class');
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

 function card_clicked(){
   console.log("card_clicked()");
   if (time_started == false){
     start_time();
   }
   if (continue_game){
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

 function check_cards(card){
   console.log("check_cards()");
   var childNode = card.children[0];
   var moves = parseInt(document.getElementsByClassName("moves")[0].innerHTML) + 1;
   document.getElementsByClassName("moves")[0].innerHTML = moves;
   console.log(moves);
   console.log(comparison_card.firstElementChild.getAttribute("class"));
   console.log(childNode.getAttribute("class"));
   if (comparison_card.firstElementChild.getAttribute("class") == childNode.getAttribute("class")){
     console.log("matches!");
     card.setAttribute("class", "card match");
     comparison_card.setAttribute("class", "card match");
     found_count += 1;
     refill_stars();
     console.log("found_count length is " + found_count);
     if (found_count == 8){
       final_score();
     }
   }
   else{
     comparison_card.setAttribute("class", "card");
     card.setAttribute("class", "card");
     remove_star();
   }
   comparison_card = "";
 }

 function remove_star(){
   console.log("remove_star()");
   stars[0].removeChild(stars[0].firstElementChild);
   console.log(stars[0]);
   if (stars[0].childElementCount == 0){
     alert("you lose");
     continue_game = false;
   }
 }

 function refill_stars(){
   console.log("fill_back_stars()");
   while (stars[0].childElementCount < 3){
     var i_node = document.createElement('i');
     var i_node_att = document.createAttribute('class');
     i_node_att.value = "fa fa-star";
     i_node.setAttributeNode(i_node_att);

     var li_node = document.createElement('li');

     li_node.append(i_node);

     stars[0].append(li_node)
   }
   console.log(stars[0]);
 }

 function final_score(){
    alert("You Won!");
  }

  function restart(){
    location.reload();
  }

  function start_time(){
    console.log("start_time()");
    var timer = new Timer();
    timer.start();
    timer.addEventListener('secondsUpdated', function (e) {
        $('#basicUsage').html(timer.getTimeValues().toString());
    });
    time_started = true;
  }

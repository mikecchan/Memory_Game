function setup(){
  console.log("setup()");
  moves = document.getElementsByClassName("moves").innerHTML;
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
  console.log(list);
  var deck_class = document.getElementsByClassName("deck")[0];
  for (var i of list) {
    //creating the 'li' element first
    console.log(i);
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
    console.log(deck_class);

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

 var comparison_card;
 var found_count = 0;
 var moves;
 var stars;

 function card_clicked(){
   console.log("card_clicked()");
   console.log("displaying this...");
   console.log(this);
   var li_class= this.getAttribute("class");
   //Can only check card if it is in face down.
   //Can't do anything when it is faced up.
   if (!li_class.includes("open")){
     this.setAttribute("class", "card open show");
     if (!comparison_card){
       //If there is no card to compare, make it the compare card.
       comparison_card = this;
     }
     else{
       check_cards(this);
     }
   }
 }

 function check_cards(card){
   console.log("check_cards()");
   var childNode = card.children[0];
   console.log(childNode);
   var i_class = childNode.getAttribute("class");
   console.log(i_class);
   moves = moves + 1;

   if (comparison_card == i_class){
     console.log("matches!");
     found_list.push(comparison_card);

     card.setAttribute("class", "card match");
     comparison_card.setAttribute("class", "card match");
     found_count += 1;
     if (found_list.length == 16){
       final_score();
     }
   }
   else{
     console.log("BOO!!");
     comparison_card.setAttribute("class", "card");
     card.setAttribute("class", "card");
     remove_star();
   }
   comparison_card = "";
 }

 function remove_star(){
   console.log("remove_star()");
   console.log(stars[0].childNodes[1]);
   //LEFT OFF HERE!!!
   stars[0].childNodes[1].remove();
   console.log("removed");
   console.log(stars[0]);
   var li_count = stars[0].length;
   console.log(li_count);
   if (li_count == 0){
     alert("you lose");
   }
 }

 function final_score(){
    console.log("final_score()");
    alert("You Won!");
  }

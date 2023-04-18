let card1 = null;
let card2 = null;

let card1Image, card2Image;
let cardsClicked = 0;
let openCards = 0;

function restart() {
    localStorage.setItem("score", 100000000);
}

let arrayOfImages = [
    "images/bird.png", // 0
    "images/bird.png", // 1
    "images/cat.png", // 2
    "images/cat.png",// 3
    "images/dog.png", // 4
    "images/dog.png", // 5
    "images/fox.png", // 6
    "images/fox.png", // 7
    "images/giraffe.png", // 8
    "images/giraffe.png", // 9
    "images/koala.png", // 10
    "images/koala.png", // 11
    "images/lion.png", // 12
    "images/lion.png", // 13
    "images/zebra.png", // 14
    "images/zebra.png" // 15
];

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function createDivsForImages() {
    shuffle(arrayOfImages);

    let gameContainerDiv = document.getElementById("game-container");

    for (let a = 0; a < arrayOfImages.length; a += 4) {

        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        for (let i = a; i < a + 4; i++) {

            let gameCardDiv = document.createElement("div");
            gameCardDiv.classList.add("game-card");

            let imageDiv = document.createElement("img");
            imageDiv.src = arrayOfImages[i];

            let topLayerDiv = document.createElement("div");
            topLayerDiv.classList.add("top-layer");

            gameCardDiv.addEventListener("click", handleCardClick);

            gameCardDiv.appendChild(imageDiv);
            gameCardDiv.appendChild(topLayerDiv);
            rowDiv.appendChild(gameCardDiv);
        }

        gameContainerDiv.appendChild(rowDiv);
    }

}


function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    cardsClicked++;
    document.getElementById("click-count").innerHTML = "Clicks: " + cardsClicked;
    let currentCard = event.target.parentElement;

    if (card1 == null) {
        card1 = currentCard;
        card1Image = currentCard.children[0].src;
        currentCard.children[1].style.visibility = "hidden";
    }

    else if (card2 == null) {
        card2 = currentCard;
        card2Image = currentCard.children[0].src;
        currentCard.children[1].style.visibility = "hidden";
    }

    // if both cards are flipped 
    if (card1 != null && card2 != null && card1Image == card2Image) {
        // alert("it's a match!");
        card1.children[1].remove();
        card2.children[1].remove();
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        openCards += 2;

        card1 = null;
        card2 = null;
    }
    else {
        setTimeout(function () {
            if (card1 != null) {
                card1.children[1].style.visibility = "visible";
                card1 = null;
            }

            if (card2 != null) {
                card2.children[1].style.visibility = "visible";
                card2 = null;
            }
        }, 2000);
    }

    if (openCards == arrayOfImages.length) {
        // game over
        openCards = 0;
        showStartScreen();
    }
}


function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("content").style.visibility = "visible";
    createDivsForImages();
}

function showStartScreen() {
    card1 = null;
    card2 = null;
    card1Image = null;
    card2Image = null;
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("game-container").innerHTML = "";
    document.getElementById("click-count").innerHTML = "Clicks: --";
    document.getElementById("content").style.visibility = "hidden";
    if (cardsClicked < localStorage.getItem("score")) {
        localStorage.setItem("score", cardsClicked);
    }
    document.getElementById("best-score").innerHTML = "Best score: " + localStorage.getItem("score");
    cardsClicked = 0;
}
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach((game) => {
        const newGame = document.createElement("div");
        newGame.classList.add("game-card");
        const newHTML = `
        <img src="${game.img}" alt="${game.name} image" class="game-img">
        <p>${game.name}</p>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        `
        newGame.innerHTML = newHTML;

        gamesContainer.appendChild(newGame);
    })
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

let localizedContribution = totalContributions.toLocaleString("en-US");

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `<p>${localizedContribution}</p>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

let localizedRaised = totalRaised.toLocaleString("en-US");

// set inner HTML using template literal

raisedCard.innerHTML = `<p>$${localizedRaised}</p>`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter((game) =>{
        return game.pledged < game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const funded = GAMES_JSON.filter((game) =>{
        return game.pledged >= game.goal;
    })

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(funded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfunded = GAMES_JSON.filter((game) =>{
    return game.pledged < game.goal;
});

const numUnfunded = unfunded.length;

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = 
`A total of $${localizedRaised} has been raised for ${GAMES_JSON.length - numUnfunded} ${GAMES_JSON.length - numUnfunded == 1 ? "game" : "games"}. Currently, ${numUnfunded} ${numUnfunded == 1 ? "game remains" : "games remain"} unfuned. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container

const newDescription = document.createElement("p");
newDescription.innerHTML = displayStr;
descriptionContainer.appendChild(newDescription);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

let topGame = document.createElement("p")
topGame.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(topGame);

// do the same for the runner up item

let runnerGame = document.createElement("p");
runnerGame.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(runnerGame);


//Search button for game

// <div class="game-search">
//     <input class="game-search-input" type="text">
//     <button class="game-search-button">Search</button>
// </div>

const search_input = document.getElementById("game-search-input");
console.log(search_input);
let search_query = "";
search_input.addEventListener("input", () => {
    search_query = search_input.value;
});

function filterSearch() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const searched = GAMES_JSON.filter((game) =>{
        let temp_name = game.name.toLowerCase();
        let search_name = search_query.toLowerCase();
        if(temp_name.includes(search_name)){
            return game;
        }
    })

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(searched);

}

const search_button = document.getElementById("game-search-button");
search_button.addEventListener("click", filterSearch);
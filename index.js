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

function addGamesToPage(games) {
    // loop over each item in the data
    for (const game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the div's class list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()} / $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

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

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// use reduce() to find the total amount raised
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal and toLocaleString for formatting
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of unfunded games
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
} 

filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);


    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    console.log("Number of funded games:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to get a list of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
// The number of unfunded games is the length of the unfundedGames array
const numberOfUnfundedGames = unfundedGames.length;
const numberOfFundedGames = fundedGames.length

// create a string that explains the number of unfunded games using the ternary operator
const totalAmountRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const unfundedGamesMessage = numberOfUnfundedGames === 1 
    ? `A total of $${totalAmountRaised.toLocaleString()} has been raised for ${numberOfUnfundedGames+numberOfFundedGames} games. Currently, 1 game remains unfunded. We need your help to fund these amazing games!` 
    : `A total of $${totalAmountRaised.toLocaleString()} has been raised for ${numberOfUnfundedGames+numberOfFundedGames} games. Currently, ${numberOfUnfundedGames} games remain unfunded. We need your help to fund these amazing games!`;

console.log(unfundedGamesMessage)

// create a new DOM element containing the template string and append it to the description container
const messageElement = document.createElement('p');
messageElement.innerHTML = unfundedGamesMessage;
descriptionContainer.appendChild(messageElement);

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
const [mostFundedGame, secondMostFundedGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item

const mostFundedGameElement = document.createElement('p');
mostFundedGameElement.textContent = `${mostFundedGame.name}`;
firstGameContainer.appendChild(mostFundedGameElement);

// Create a new element for the second most funded game
const secondMostFundedGameElement = document.createElement('p');
secondMostFundedGameElement.textContent = `${secondMostFundedGame.name}`;
secondGameContainer.appendChild(secondMostFundedGameElement);


// Customization 2
// What if a user discovers the site and wants to search for a specific game they have heard of?

// Add an event listener to the form
const gameSearchForm = document.getElementById("game-search-form");
gameSearchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the user's search input
    const searchInput = document.getElementById("game-search-input").value.toLowerCase();

    // Call a function to perform the search and display the results
    searchForGame(searchInput);
});

function searchForGame(query) {
    // Filter games that match the query
    const searchResults = GAMES_JSON.filter((game) => {
        return game.name.toLowerCase().includes(query);
    });

    // Display the search results to the user
    // You can add the results to the gamesContainer or create a new section for search results
    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    // Clear the current game list (if any)
    deleteChildElements(gamesContainer);

    // Loop through the search results and add them to the gamesContainer
    addGamesToPage(results);
}

window.addEventListener("load", showAllGames);
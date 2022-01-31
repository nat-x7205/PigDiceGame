/*
/////////////////////////
// GAME RULES //
/////////////////////////

The game is for two players, playing in rounds.

Set the WINNING score. By default the winning score is 100.

In each turn, a player rolls a dice as many times as he/she whishes. 
Each result get added to his ROUND score.

If the player rolls 1, all his ROUND score gets lost. 
After that, it's the next player's turn.

The player can choose to 'Hold', which means that his ROUND score 
gets added to his TOTAL score. After that, it's the next player's turn.

The first player to reach WINNING score on TOTAL score wins the game.
*/

let totalScores, roundScore, activePlayer, winningScore, dice, diceDOM, gamePlaying;

diceDOM = document.querySelector('.dice');
beginning();

/**********************************************/
// Click on the 'ROLL dice' button
/**********************************************/

document.getElementById('roll-dice-BTN').addEventListener('click', function () {
    // Check if the game playing
    if (gamePlaying) {
        // Generate a random integer 1-6
        dice = Math.floor(Math.random() * 6 + 1);

        diceDOM.classList.remove('display-none');
        diceDOM.src = 'images/Dice-' + dice + '.png';

        if (dice === 1) {
            diceDOM.classList.add('dice-1-pop');

            // Set time out
            window.setTimeout(() => { 
                diceDOM.classList.remove('dice-1-pop');
                nextPlayer()}, 450);
            
        } else {
            // Calculate and display the 'current' score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        };
    };
});



/**********************************************/
// Click on the 'HOLD' button
/**********************************************/

document.getElementById('hold-BTN').addEventListener('click', function () {

    if (gamePlaying) {
        // Add the 'round score' to the player's 'total score'
        totalScores[activePlayer] += roundScore;

        // Display the 'total score';
        document.getElementById('total-' + activePlayer).textContent = totalScores[activePlayer];
        
        // Get the winning score number
        let scoreInput = document.getElementById('winning-score').value;

        // Undefined, 0, null or "" are COERCED as false 
        // Anything else is COERCED as true
        if (scoreInput) {
            winningScore = scoreInput;
        } else {
            winningScore = 100;
        };

        // Check if the player has won
        if (totalScores[activePlayer] >= winningScore) {
            // Remove ACTIVE class from both panels
            document.querySelector('.player-0-pannel').classList.remove('active');
            document.querySelector('.player-1-pannel').classList.remove('active');

            // Hide the dice image
            diceDOM.classList.add('display-none'); 
            
            // Current score to 0
            document.getElementById('current-' + activePlayer).textContent = '0';

            // Display the WINNER word in the UI
            let winnerDOM = document.getElementById('player-' + activePlayer);
            winnerDOM.textContent = 'WINNER!';
            winnerDOM.classList.add('winner');

            gamePlaying = false;

        } else {
            // Next player turn
            nextPlayer();
        }
    }
});



/**********************************************/
// Click on the 'NEW-GAME' button
/**********************************************/

document.getElementById('new-game-BTN').addEventListener('click', beginning);



/**********************************************/
// Click on the 'GAME-RULES' button
/**********************************************/

document.getElementById('game-rules-BTN').addEventListener('click', function() {
    // console.log('The button was clicked.');
    document.querySelector('.game-rules-window').classList.add('opened-window')
});

// Close 'GAME RULES' window
document.getElementById('close-icon').addEventListener('click', function() {
    // console.log('The button was clicked.');
    document.querySelector('.game-rules-window').classList.remove('opened-window')
});



/**********************************************/
// 'Next player turn' function
/**********************************************/

function nextPlayer() {
    // Change the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Change CURRENT scores to 0, update the UI
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Hide the dice image
    diceDOM.classList.add('display-none'); 
 
    // Toggle the active class to the players' pannels
    document.querySelector('.player-0-pannel').classList.toggle('active');
    document.querySelector('.player-1-pannel').classList.toggle('active');
};



/**********************************************/
// 'Initial conditions' function
/**********************************************/

function beginning() {
    totalScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // Empty and focus the winning-score field
    document.getElementById('winning-score').value = '';
    document.getElementById('winning-score').focus();

    // Hide the dice image
    diceDOM.classList.add('display-none');

    // Return 'Player 1' and 'Player 2' labels
    document.getElementById('player-0').textContent = 'Player 1';
    document.getElementById('player-1').textContent = 'Player 2';

    // Set to zero initial scores
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('total-0').textContent = '0';
    document.getElementById('total-1').textContent = '0';
    
    // Remove 'Winning' class
    document.getElementById('player-0').classList.remove('winner');
    document.getElementById('player-1').classList.remove('winner');
    
    // Set the correct 'active' class
    document.querySelector('.player-0-pannel').classList.remove('active');
    document.querySelector('.player-1-pannel').classList.remove('active');
    document.querySelector('.player-0-pannel').classList.add('active');
};

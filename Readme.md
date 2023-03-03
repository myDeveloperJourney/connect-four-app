# Connect Four Notes

## Part 1 - Overview
Goals: Code along with the game build - this process will be useful when building out your own game for your unit 1 project. 
1. Analyze the functionality
2. Design the look and feel
3. Create a wireframe
4. Pseudocode
5. Identify the applications state 
   1. What values will we need to store / update for the game to run in the console.
6. Setup up your project's file structure
7. Provide outline for JS sections

### Functionality


### PseudoCode 
- The page will load and the game will start automatically 
- When the game starts game state will be initilialized
- The game will have two players (purple and gold)
- When the game starts a game board will display
- When the game starts a player will be able to click one of 7 columns
- Gameplay Loop - 
- Players will take turns until a winner is determined
    - Player Turn starts - 
    - The current player player will 'drop' discs into one of 7 columns (gameboard) 
    - A user will click to 'drop a disc' ie update game board
    - A state change will occur
    - A win condition will be evaluated - did the event cause the current player to win?
    - A win message will display if the current player wins or the current player will to the other player/color 
    - A render / update to the game board will process to update the players about current turn and game state (colored discs)

- Determining a "Win" condition - a player wins if they have four discs of the same color in a row 
- A row can be horizontal, vertical, left diagonal, or right diagonal
- If no spaces are available to drop a disc the game is a tie

### Setup Gameboard

Create HTML, CSS, JS
Setup boilerplate and make sure JS is connected 
- Provide starter wild card and body font family along with commented flex container 
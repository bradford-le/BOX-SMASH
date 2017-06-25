#BOX SMASH
##BCN Ironhack Game - Project 1

##Game Objectives

Player uses arrows keys to navigate on the board to the desired "box" to SMASH. Once all boxes on the board are cleared, additional time is added and player can move on to the next level

##Types of Boxes
1.) **KEY:** This box will have a keyboard value and number value to indicate the number of times the player must enter to *smash* the box
  * Example, a box with "KEY: ENTER" 10 means the player must select the box and click "ENTER" 10 times to smash the box

2.) **MATH:** Answer the simple math question

3.) **RIDDLE:** Solve the riddle to *smash*
* Example, 10to1 means input in numbers from 10 to 1

4.) **BLOCK:** These are obstacles the player will have to navigate around, making it more difficult to reach the box

5.) **FREEZE:** These are blocks that will not allow the user to move for a period of times

6.) **DEATH:** Leads to immediate loss of Game


Pseudo ```
1. Create board (done 10x10; may choose to expand as levels get harder)
2. Create the divs for squares in board (done)
3. Create the obstacles first! start with KEY box (done)
4. Generate KEY box then generate Player to not collide with KEY box (done)
5. Assign keys to player to move with arrow keys
6. Have KEY box recognize with player is on KEY box
-Before every level
  * Generate obstacles
  * Display obstacles
  * Generate player
  * Display Player  
  * Player moves on click event  
  * Verify if player on a box   
  * Update board (like snake)
```

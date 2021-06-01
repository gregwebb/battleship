const xyaxis = ['xaxis', 'yaxis'];

const players = {
    user: {
        ships: {
            carrier: {name:"carrier", size: 5, coordinates: [], orientation: "", sunk: false},
            battleship: {name:"battleship", size: 4, coordinates: [], orientation: "", sunk: false},
            destroyer: {name:"destroyer", size: 3, coordinates: [], orientation: "", sunk: false},
            submarine: {name:"submarine", size: 3, coordinates: [], orientation: "", sunk: false},
            patrolBoat: {name:"patrol boat", size: 2, coordinates: [], orientation: "", sunk: false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: []
        }
    },
     ai: {
        ships: {
            carrier: {name:"carrier", size: 5, coordinates: [], orientation: "", sunk: false},
            battleship: {name:"battleship", size: 4, coordinates: [], orientation: "", sunk: false},
            destroyer: {name:"destroyer", size: 3, coordinates: [], orientation: "", sunk: false},
            submarine: {name:"submarine", size: 3, coordinates: [], orientation: "", sunk: false},
            patrolBoat: {name:"patrol boat", size: 2, coordinates: [], orientation: "", sunk: false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: []
        } 
    }
}
//define where ships are placed for ai (random)
function aiShipPlacement(){
    for (let ship in players.ai.ships) {
        if (players.ai.ships[ship].coordinates.length === 0) {
            players.ai.ships[ship].orientation = xyaxis[Math.floor(Math.random()*2)];
            if (players.ai.ships[ship].orientation === "xaxis") {
                let xValue = Math.floor(Math.random()*(11-players.ai.ships[ship].size));
                let yValue = Math.floor(Math.random()*10);
                let shipArray = [];
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    shipArray.push(new coordinate(xValue+i,yValue));
                    if (JSON.stringify(players.ai.board.coordinatesAvailable).includes(JSON.stringify(shipArray[i]))) {
                    }   
                    else {
                      aiShipPlacement();
                    }
                }
                players.ai.ships[ship].coordinates = shipArray;
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    players.ai.board.coordinatesAvailable.pop(shipArray[i]);
                }
            }
            else 
            {
                let yValue = Math.floor(Math.random()*(11-players.ai.ships[ship].size));
                let xValue = Math.floor(Math.random()*10);
                let shipArray = [];
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    shipArray.push(new coordinate(xValue,yValue+i));
                    if (JSON.stringify(players.ai.board.coordinatesAvailable).includes(JSON.stringify(shipArray[i]))) {
                    }   
                    else 
                    {
                        aiShipPlacement();
                    }
                }
                players.ai.ships[ship].coordinates = shipArray;
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    players.ai.board.coordinatesAvailable.pop(shipArray[i]);
                }
            }
        }
    }
}
    
// all coordinates loaded into the available array, coordinates burned cleared
function clearBoard(){
    let coordinatesBurned = [];
    for (let player in players) {
      players[player].board.coordinatesAvailable = new Array();
      for (i=0;i<10;i++) {
          for (j=0;j<10;j++){
              players[player].board.coordinatesAvailable.push(new coordinate(i, j));
          }
      }
    }
}
// coordinate setup
function coordinate(x,y){
    this.x = x;
    this.y = y;
}

//start/restart logic - board is cleared for a new game
function init(){
    clearBoard();
}

//turn logic - player selects using GUI, AI is random based on avaible coordinates that an available ship can be
function turn(){
    checkSunk();
}
//turn logic if computer hits ship - computer should target surrounding coordinates and continue until ship is sunk
function hitShipTurn(){
    checkSunk();
}

//checks if a remaining ship has been sunk
function checkSunk(){
    shipSunk()
}

//alert that a ship has been sunk
function shipSunk(){
    console.log("yes");
}

//event listeners
document.querySelector('div').addEventListener('click', checkSunk);
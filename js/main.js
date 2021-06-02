const xyaxis = ['xaxis', 'yaxis'];
const message = document.getElementById('message');
const players = {
    user: {
        ships: {
            carrier: {name:'carrier', size:5, coordinates: [], orientation:'', hitCount:0, sunk:false},
            battleship: {name:'battleship', size:4, coordinates:[], orientation:'',hitCount:0, sunk:false},
            destroyer: {name:'destroyer', size:3, coordinates:[], orientation:'',hitCount:0, sunk:false},
            submarine: {name:'submarine', size:3, coordinates:[], orientation:'',hitCount:0, sunk:false},
            patrolBoat: {name:'patrol boat', size:2, coordinates:[], orientation:'',hitCount:0, sunk:false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: [],
            targetArray: []
        }
    },
     ai: {
        ships: {
            carrier: {name:'carrier', size:5, coordinates: [], orientation:'', hitCount:0, sunk:false},
            battleship: {name:'battleship', size:4, coordinates:[], orientation:'',hitCount:0, sunk:false},
            destroyer: {name:'destroyer', size:3, coordinates:[], orientation:'',hitCount:0, sunk:false},
            submarine: {name:'submarine', size:3, coordinates:[], orientation:'',hitCount:0, sunk:false},
            patrolBoat: {name:'patrol boat', size:2, coordinates:[], orientation:'',hitCount:0, sunk:false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: [],
            targetArray: []
        } 
    }
}

function playerShipPlacement(){
    for (let ship in players.user.ships) {
        if (players.user.ships[ship].coordinates.length === 0) {
            players.user.ships[ship].orientation = xyaxis[Math.floor(Math.random()*2)];
            if (players.user.ships[ship].orientation === "xaxis") {
                let xValue = Math.floor(Math.random()*(11-players.user.ships[ship].size));
                let yValue = Math.floor(Math.random()*10);
                let shipArray = [];
                for (i=0;i<players.user.ships[ship].size;i++) {
                    shipArray.push(new coordinate(xValue+i,yValue));
                    if (!JSON.stringify(players.user.board.coordinatesBurned).includes(JSON.stringify(shipArray[i]))) {
                    }   
                    else {
                      playerShipPlacement();
                    }
                }
                players.user.ships[ship].coordinates = shipArray;
                for (i=0;i<players.user.ships[ship].size;i++) {
                    players.user.board.coordinatesBurned.push(shipArray[i]);
                }
            }
            else 
            {
                let yValue = Math.floor(Math.random()*(11-players.user.ships[ship].size));
                let xValue = Math.floor(Math.random()*10);
                let shipArray = [];
                for (i=0;i<players.user.ships[ship].size;i++) {
                    shipArray.push(new coordinate(xValue,yValue+i));
                    if (!JSON.stringify(players.user.board.coordinatesBurned).includes(JSON.stringify(shipArray[i]))) {
                        if (i === players.user.ships[ship].size) {
                        players.user.board.coordinatesBurned.push(shipArray)
                        }
                    }   
                    else 
                    {
                        playerShipPlacement();
                    }
                }
                players.user.ships[ship].coordinates = shipArray;
            }
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
                    if (!JSON.stringify(players.ai.board.coordinatesBurned).includes(JSON.stringify(shipArray[i]))) {
                        if (i === players.ai.ships[ship].size) {
                            players.ai.board.coordinatesBurned.push(shipArray);
                            }
                    }   
                    else {
                      aiShipPlacement();
                    }
                }
                players.ai.ships[ship].coordinates = shipArray;
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    players.ai.board.coordinatesBurned.push(shipArray[i]);
                }
            }
            else 
            {
                let yValue = Math.floor(Math.random()*(11-players.ai.ships[ship].size));
                let xValue = Math.floor(Math.random()*10);
                let shipArray = [];
                for (i=0;i<players.ai.ships[ship].size;i++) {
                    shipArray.push(new coordinate(xValue,yValue+i));
                    if (!JSON.stringify(players.ai.board.coordinatesBurned).includes(JSON.stringify(shipArray[i]))) {
                        if (i === players.ai.ships[ship].size) {
                        players.ai.board.coordinatesBurned.push(shipArray);
                        }
                    }   
                    else 
                    {
                        aiShipPlacement();
                    }
                }
                players.ai.ships[ship].coordinates = shipArray;
            }
        }
    }
}
    
// all coordinates loaded into the available array, coordinates burned cleared
function clearBoard(){
    for (let player in players) {
      players[player].board.coordinatesBurned = [];
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
    resetShips();
    aiShipPlacement();
    clearBoard();
    console.log("this was started");
    playerShipPlacement();
    message.innerHTML = "Alright! Let's get started. Please click the squares where you would like to place the Carrier."
}

function resetShips(){
    for (let ship in players.ai.ships) {
        ship.coordinates = [];
        ship.orientation = "";
        ship.hitCount = "0"; 
        ship.sunk = false;
    }
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
    for (let ship in players.ai.ships) {
        for (i=0; i < players.ai.ships[ship].size; i++) {
            if (JSON.stringify(players.ai.board.targetArray).includes(JSON.stringify(players.ai.ships[ship].coordinates[i]))) {
                players.ai.ships[ship].hitCount = ++players.ai.ships[ship].hitCount;
                message.innerHTML = `You hit the AI's ${players.ai.ships[ship].name}!!!`;
        if (players.ai.ships[ship].hitCount === players.ai.ships[ship].size) {
            message.innerHTML = `The AI's ${players.ai.ships[ship].name} has been sunk!!!`;
                players.ai.ships[ship].sunk = true;
                players.ai.ships[ship].hitCount = 0;
            }
        } 
        }
    }
    
}

//event listeners
const availableTargets = document.querySelectorAll('.available');
availableTargets.forEach(function(el) {
    el.addEventListener('click', takeTurn);
});

document.querySelector('button').addEventListener('click', init);



function takeTurn(fire){
players.ai.board.targetArray = [];
fire.target.setAttribute("class", "fired_at");
coordinatesFiredAt = Array.from(fire.target.id.toString()).map(Number);
players.ai.board.targetArray.push(new coordinate(coordinatesFiredAt[0],coordinatesFiredAt[1]));
console.log(players.ai.board.targetArray);
players.ai.board.coordinatesBurned.push(players.ai.board.targetArray[0]);
for (let ship in players.ai.ships) {
if (JSON.stringify(players.ai.ships[ship].coordinates).includes(JSON.stringify(players.ai.board.targetArray[0]))) {
    fire.target.setAttribute("class", "hit");
    hitShipTurn();
}

}



//clickedSquare.setAttribute("style", "background-color: red;");
//console.log(clickedSquare);
}

/*----- constants -----*/
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

    //for each ai ship, orientation random, check index coordinates where size can be met, pick one at random. NE orientation >>> or ^^^
      for (let ship in players.ai.ships) {
      players.ai.ships[ship].orientation = xyaxis[Math.floor(Math.random()*2)];
      players.ai.ships[ship].coordinates = players.ai.board.coordinatesAvailable[Math.floor(Math.random()*(players.ai.board.coordinatesAvailable.length-1))];
           
        xValue = players.ai.ships[ship].coordinates.x;
        yValue = players.ai.ships[ship].coordinates.y;
        shipArray = [];
        shipArray.push(new coordinate(xValue,yValue));
        const find = JSON.stringify(players.ai.board.coordinatesAvailable).includes(JSON.stringify(shipArray[0]));
        console.log(find);
        
     /// need to add code here to identify index coordinate and pick at random
     // if xaxis, random coordinate then check if .size is available for example x: 1, y:1 we would need to check x:1-5 at y:1


     // if yaxis, random coordinate then check if .size is available for example x: 1, y:1 we would need to check y:1-5 at x:1
     // if ship is placed, need to remove from shipPlacementCoordinates so that another ship cant use same coordinates 
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
/* coordinate setup
coordinate { x: 0, y: 0 },
    coordinate { x: 0, y: 1 },
    coordinate { x: 0, y: 2 },
    coordinate { x: 0, y: 3 },
    coordinate { x: 0, y: 4 },
    coordinate { x: 0, y: 5 },
    coordinate { x: 0, y: 6 },
    coordinate { x: 0, y: 7 },
    coordinate { x: 0, y: 8 },
    coordinate { x: 0, y: 9 },
    coordinate { x: 1, y: 0 },
    coordinate { x: 1, y: 1 },
    coordinate { x: 1, y: 2 },
    coordinate { x: 1, y: 3 },
    coordinate { x: 1, y: 4 },
    coordinate { x: 1, y: 5 },
    coordinate { x: 1, y: 6 },
    coordinate { x: 1, y: 7 },
    coordinate { x: 1, y: 8 },
    coordinate { x: 1, y: 9 },
    coordinate { x: 2, y: 0 },
    */
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
}
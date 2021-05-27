/*----- constants -----*/
const players = {
    user: {
        ships: {
            carrier: {size: 5, coordinateIndex: "", orientation: "", sunk: false},
            battleship: {size: 4, coordinateIndex: "", orientation: "", sunk: false},
            destroyer: {size: 3, coordinateIndex: "", orientation: "", sunk: false},
            submarine: {size: 3, coordinateIndex: "", orientation: "", sunk: false},
            patrolBoat: {size: 2, coordinateIndex: "", orientation: "", sunk: false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: []
        }
    },
     ai: {
        ships: {
            carrier: {size: 5, coordinateIndex: "", orientation: "", sunk: false},
            battleship: {size: 4, coordinateIndex: "", orientation: "", sunk: false},
            destroyer: {size: 3, coordinateIndex: "", orientation: "", sunk: false},
            submarine: {size: 3, coordinateIndex: "", orientation: "", sunk: false},
            patrolBoat: {size: 2, coordinateIndex: "", orientation: "", sunk: false}
        },
        board: {
            coordinatesAvailable: [],
            coordinatesBurned: []
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
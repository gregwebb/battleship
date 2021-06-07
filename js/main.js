const xyaxis = ["xaxis", "yaxis"];
const message = document.getElementById("message");
const messageTwo = document.getElementById("message_two");
const startButton = document.getElementById("start_button");
const players = {
  user: {
    ships: {
      carrier: {
        name: "carrier",
        size: 5,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      battleship: {
        name: "battleship",
        size: 4,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      destroyer: {
        name: "destroyer",
        size: 3,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      submarine: {
        name: "submarine",
        size: 3,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      patrolBoat: {
        name: "patrol boat",
        size: 2,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
    },
    board: {
      coordinatesAvailable: [],
      coordinatesBurned: [],
      targetArray: [],
    },
  },
  ai: {
    ships: {
      carrier: {
        name: "carrier",
        size: 5,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      battleship: {
        name: "battleship",
        size: 4,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      destroyer: {
        name: "destroyer",
        size: 3,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      submarine: {
        name: "submarine",
        size: 3,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
      patrolBoat: {
        name: "patrol boat",
        size: 2,
        coordinates: [],
        orientation: "",
        hitCount: 0,
        sunk: false,
      },
    },
    board: {
      coordinatesAvailable: [],
      coordinatesBurned: [],
      targetArray: [],
    },
  },
};

function playerShipPlacement() {
  for (let ship in players.user.ships) {
    if (
      players.user.ships[ship].coordinates.length !==
      players.user.ships[ship].size
    ) {
      players.user.ships[ship].orientation =
        xyaxis[Math.floor(Math.random() * 2)];
      if (players.user.ships[ship].orientation === "xaxis") {
        let xValue = Math.floor(
          Math.random() * (11 - players.user.ships[ship].size)
        );
        let yValue = Math.floor(Math.random() * 10);
        let shipArray = [];
        for (i = 0; i < players.user.ships[ship].size; i++) {
          shipArray.push(new coordinate(xValue + i, yValue));
          if (
            !JSON.stringify(players.user.board.coordinatesBurned).includes(
              JSON.stringify(shipArray[i])
            )
          ) {
            if (i === players.user.ships[ship].size - 1) {
              for (i = 0; i < players.user.ships[ship].size; i++) {
                players.user.board.coordinatesBurned.push(shipArray[i]);
              }
              players.user.ships[ship].coordinates = shipArray;
            }
          }
        }
        playerShipPlacement();
      }
      if (players.user.ships[ship].orientation === "yaxis") {
        {
          let yValue = Math.floor(
            Math.random() * (11 - players.user.ships[ship].size)
          );
          let xValue = Math.floor(Math.random() * 10);
          let shipArray = [];
          for (i = 0; i < players.user.ships[ship].size; i++) {
            shipArray.push(new coordinate(xValue, yValue + i));
            if (
              !JSON.stringify(players.user.board.coordinatesBurned).includes(
                JSON.stringify(shipArray[i])
              )
            ) {
              if (i === players.user.ships[ship].size - 1) {
                for (i = 0; i < players.user.ships[ship].size; i++) {
                  players.user.board.coordinatesBurned.push(shipArray[i]);
                }
                players.user.ships[ship].coordinates = shipArray;
              }
            }
          }
          playerShipPlacement();
        }
      }
    }
  }
}

function aiShipPlacement() {
  for (let ship in players.ai.ships) {
    if (
      players.ai.ships[ship].coordinates.length !== players.ai.ships[ship].size
    ) {
      players.ai.ships[ship].orientation =
        xyaxis[Math.floor(Math.random() * 2)];
      if (players.ai.ships[ship].orientation === "xaxis") {
        let xValue = Math.floor(
          Math.random() * (11 - players.ai.ships[ship].size)
        );
        let yValue = Math.floor(Math.random() * 10);
        let shipArray = [];
        for (i = 0; i < players.ai.ships[ship].size; i++) {
          shipArray.push(new coordinate(xValue + i, yValue));
          if (
            !JSON.stringify(players.ai.board.coordinatesBurned).includes(
              JSON.stringify(shipArray[i])
            )
          ) {
            if (i === players.ai.ships[ship].size - 1) {
              for (i = 0; i < players.ai.ships[ship].size; i++) {
                players.ai.board.coordinatesBurned.push(shipArray[i]);
              }
              players.ai.ships[ship].coordinates = shipArray;
            }
          }
        }
        aiShipPlacement();
      }
      if (players.ai.ships[ship].orientation === "yaxis") {
        {
          let yValue = Math.floor(
            Math.random() * (11 - players.ai.ships[ship].size)
          );
          let xValue = Math.floor(Math.random() * 10);
          let shipArray = [];
          for (i = 0; i < players.ai.ships[ship].size; i++) {
            shipArray.push(new coordinate(xValue, yValue + i));
            if (
              !JSON.stringify(players.ai.board.coordinatesBurned).includes(
                JSON.stringify(shipArray[i])
              )
            ) {
              if (i === players.ai.ships[ship].size - 1) {
                for (i = 0; i < players.ai.ships[ship].size; i++) {
                  players.ai.board.coordinatesBurned.push(shipArray[i]);
                }
                players.ai.ships[ship].coordinates = shipArray;
              }
            }
          }
          aiShipPlacement();
        }
      }
    }
  }
}

function clearBoard() {
  let tiles = document.querySelectorAll(".fired_at");
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].setAttribute("class", "available");
  }
  tiles = document.querySelectorAll(".hit");
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].setAttribute("class", "available");
  }
  for (let player in players) {
    players[player].board.coordinatesBurned = [];
    players[player].board.coordinatesAvailable = new Array();
    for (i = 0; i < 10; i++) {
      for (j = 0; j < 10; j++) {
        players[player].board.coordinatesAvailable.push(new coordinate(i, j));
      }
    }
  }
}

function coordinate(x, y) {
  this.x = x;
  this.y = y;
}

function init() {
  clearBoard();
  resetShips();
  aiShipPlacement();
  playerShipPlacement();
  clearBoard();
  message.innerHTML = "Click a square to fire!";
  messageTwo.innerHTML = "Sink some ships!";
  startButton.innerHTML = "Restart Game";
}

function resetShips() {
  for (let ship in players.ai.ships) {
    ship.coordinates = [];
    ship.orientation = "";
    ship.hitCount = "0";
    ship.sunk = false;
  }
  for (let ship in players.user.ships) {
    ship.coordinates = [];
    ship.orientation = "";
    ship.hitCount = "0";
    ship.sunk = false;
  }
}

function userWins() {
  messageTwo.innerHTML = "You won!";
}

function aiWins() {
  messageTwo.innerHTML = "AI wins!";
}

function checkWin() {
  if (
    players.ai.ships.carrier.sunk &&
    players.ai.ships.battleship.sunk &&
    players.ai.ships.destroyer.sunk &&
    players.ai.ships.submarine.sunk &&
    players.ai.ships.patrolBoat.sunk
  ) {
    userWins();
  }
  if (
    players.user.ships.carrier.sunk &&
    players.user.ships.battleship.sunk &&
    players.user.ships.destroyer.sunk &&
    players.user.ships.submarine.sunk &&
    players.user.ships.patrolBoat.sunk
  ) {
    aiWins();
  }
}

function hitShip() {
  for (let ship in players.ai.ships) {
    for (i = 0; i < players.ai.ships[ship].size; i++) {
      if (
        JSON.stringify(players.ai.board.targetArray).includes(
          JSON.stringify(players.ai.ships[ship].coordinates[i])
        )
      ) {
        players.ai.ships[ship].hitCount = ++players.ai.ships[ship].hitCount;
        message.innerHTML = "You hit an AI ship!";
        if (players.ai.ships[ship].hitCount === players.ai.ships[ship].size) {
          message.innerHTML = `The AI's ${players.ai.ships[ship].name} has been sunk!!!`;
          players.ai.ships[ship].sunk = true;
          let sunkShip = `ai${players.ai.ships[ship].name}`;
          let pClass = document.getElementById(sunkShip);
          pClass.innerHTML = " ";
          checkWin();
        }
      }
    }
  }
}

function aiHitShip() {
  for (let ship in players.user.ships) {
    for (i = 0; i < players.user.ships[ship].size; i++) {
      if (
        JSON.stringify(players.user.board.targetArray).includes(
          JSON.stringify(players.user.ships[ship].coordinates[i])
        )
      ) {
        players.user.ships[ship].hitCount++;
        messageTwo.innerHTML = `Your ${players.user.ships[ship].name} has been hit!!!`;
      }
    }
    if (players.user.ships[ship].hitCount === players.user.ships[ship].size) {
      messageTwo.innerHTML = `Your ${players.user.ships[ship].name} has been sunk!!!`;
      players.user.ships[ship].sunk = true;
      let sunkShip = players.user.ships[ship].name;
      let pClass = document.getElementById(sunkShip);
      pClass.innerHTML = " ";
      checkWin();
    }
  }
}

const availableTargets = document.querySelectorAll(".available");
availableTargets.forEach(function (el) {
  el.addEventListener("click", takeTurn);
});

const startGamee = document
  .querySelector("button")
  .addEventListener("click", init);

function takeTurn(fire) {
  players.ai.board.targetArray = [];
  fire.target.setAttribute("class", "fired_at");
  coordinatesFiredAt = Array.from(fire.target.id.toString()).map(Number);
  players.ai.board.targetArray.push(
    new coordinate(coordinatesFiredAt[0], coordinatesFiredAt[1])
  );
  players.ai.board.coordinatesBurned.push(players.ai.board.targetArray[0]);
  console.log(players.ai.board.targetArray[0]);
  for (let ship in players.ai.ships) {
    if (
      JSON.stringify(players.ai.ships[ship].coordinates).includes(
        JSON.stringify(players.ai.board.targetArray[0])
      )
    ) {
      fire.target.setAttribute("class", "hit");
      hitShip();
    }
  }
  aiTurn();
}

function aiTurn() {
  players.user.board.targetArray = [];
  players.user.board.targetArray.push(
    players.user.board.coordinatesAvailable[
      Math.floor(Math.random() * players.user.board.coordinatesAvailable.length)
    ]
  );
  removeCoordinate = players.user.board.coordinatesAvailable.indexOf(
    players.user.board.targetArray[0]
  );
  players.user.board.coordinatesAvailable.splice(removeCoordinate, 1);
  console.log(players.user.board.targetArray);
  console.log(players.user.board.coordinatesAvailable.length);
  let aiTargetArray = JSON.stringify(players.user.board.targetArray[0]).split(
    ""
  );
  let aiTarget = `ai${aiTargetArray[5]}${aiTargetArray[11]}`;
  let aiTargetGridElement = document.getElementById(aiTarget);
  console.log(aiTarget);
  aiTargetGridElement.setAttribute("class", "fired_at_ai");
  for (let ship in players.user.ships) {
    if (
      JSON.stringify(players.user.ships[ship].coordinates).includes(
        JSON.stringify(players.user.board.targetArray[0])
      )
    ) {
      aiTargetGridElement.setAttribute("class", "hit_ai");
      aiHitShip();
    }
  }
}

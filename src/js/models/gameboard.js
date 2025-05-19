import { Ship, HORIZONTAL, VERTICAL } from "js/models/ship";

const HIT = "HIT";
const MISS = "MISS";

function Gameboard(shipArr) {
  const board = new Array(10).fill().map(() => new Array(10).fill("0"));

  const defaultShips = [Ship("Carrier", 5), Ship("Battleship", 4), Ship("Cruiser", 3), Ship("Submarine", 3), Ship("Destroyer", 2)];
  const ships = shipArr ? shipArr : defaultShips;

  if (!shipArr) {
    shuffleBoard();
  }

  function shuffleBoard() {
    ships.sort((ship1, ship2) => ship2.length - ship1.length);
    for (const ship of ships) {
      ship.direction = Math.round(Math.random()) ? HORIZONTAL : VERTICAL;
      
      let placed = false;
      while (!placed) {
        let x = 10;
        let y = 10;
        if (ship.direction === HORIZONTAL) {
          x = Math.floor(Math.random() * (11 - ship.length));
          y = Math.floor(Math.random() * 10);
        } else {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (11 - ship.length));
        }

        if (ship.position) {
          removeShip(ship);
        }
        placed = placeShipAt(ship, [x, y]);
      }
    }
  }

  function isValidCoord([x, y]) {
    return x < 10 && x >= 0 && y < 10 && y >= 0;
  }

  function getShipRange(ship, [x, y]) {
    let shipRange = [];
    if (ship.direction === HORIZONTAL) {
      shipRange = [...Array(ship.length).keys()].map((i) => {
        if (!isValidCoord([x + i, y]))
          throw new Error("[ERROR] Coordinates are out of bounds.");
        return [x + i, y];
      });
    } else if (ship.direction === VERTICAL) {
      shipRange = [...Array(ship.length).keys()].map((i) => {
        if (!isValidCoord([x, y + i]))
          throw new Error("[ERROR] Coordinates are out of bounds.");
        return [x, y + i];
      });
    }

    return shipRange;
  }

  function getShip(id) {
    return ships.find((ship) => ship.id === Number(id));
  }

  function placeShipAt(ship, [x, y]) {
    if (!getShip(ship.id))
      throw new Error("[ERROR] Ship is not part of the board");
      
    const shipRange = getShipRange(ship, [x, y]);
    for (const [shipX, shipY] of shipRange) {
      if (board[shipY][shipX] !== "0") return false;
    }
    for (const [shipX, shipY] of shipRange) {
      board[shipY][shipX] = ship.id.toString();
    }
    if (ship.position) {
      removeShip(ship);
    }
    
    ship.position = [x, y];

    return true;
  }

  function removeShip(ship) {
    if (!getShip(ship.id))
      throw new Error("[ERROR] Ship is not part of the board");
    const shipRange = getShipRange(ship, ship.position);
    for (const [shipX, shipY] of shipRange) {
      if (board[shipY][shipX] !== ship.id.toString()) return false;
      board[shipY][shipX] = "0";
    }
    ship.position = null;

    return true;
  }

  function hasShipAt(ship, [x, y]) {
    if (!getShip(ship.id))
      throw new Error("[ERROR] Ship is not part of the board");
    const shipRange = getShipRange(ship, [x, y]);
    for (const [shipX, shipY] of shipRange) {
      if (board[shipY][shipX] !== ship.id.toString()) return false;
    }

    return true;
  }

  function receiveAttackAt([x, y]) {
    if (!isValidCoord([x, y]))
      throw new Error("[ERROR] Coordinates are out of bounds.");

    let result = MISS;

    const ship = getShip(board[y][x]);
    if (ship) {
      ship.hit();
      result = HIT;
    }

    board[y][x] += "+";
    return result;
  }

  function allShipsSunk() {
    for (const ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }

  return {
    get state() {
      return board;
    },
    shuffleBoard,
    getShip,
    placeShipAt,
    hasShipAt,
    receiveAttackAt,
    allShipsSunk,
  };
}

export { Gameboard, HIT, MISS };

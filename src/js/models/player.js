import { Gameboard } from "js/models/gameboard";

const HUMAN = "HUMAN";
const COMPUTER = "COMPUTER";

function Player(playerName, playerType, board = null) {
  const gameboard = board ? board : Gameboard();

  function placeShipAt(ship, [x, y]) {
    return gameboard.placeShipAt(ship, [x, y]);
  }

  function receiveAttackAt([x, y]) {
    return gameboard.receiveAttackAt([x, y]);
  }

  function allShipsSunk() {
    return gameboard.allShipsSunk();
  }
  
  return {
    get name() {
      return playerName;
    },
    get type() {
      return playerType;
    },
    placeShipAt,
    receiveAttackAt,
    allShipsSunk,
  }
}

export { Player, HUMAN, COMPUTER };
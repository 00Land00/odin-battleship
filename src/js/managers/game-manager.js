import { Player, HUMAN, COMPUTER } from "js/models/player";
import { Gameboard, HIT, MISS } from "js/models/gameboard";
import { Ship, HORIZONTAL, VERTICAL } from "js/models/ship";

const PLAYER1 = "PLAYER 1";
const PLAYER2 = "PLAYER 2";

function _GameManager() {
  let player1, player2;
  let currentPlayer = PLAYER1;
  let missedFlag = false;

  function init(p1, p2) {
    player1 = p1;
    player2 = p2;

    currentPlayer = PLAYER1;
  }

  function receiveAttackAt([x, y]) {
    if (missedFlag) throw new Error(`[ERROR] ${currentPlayer} has already missed a shot.`);
    const result = currentPlayer === PLAYER1 ? player2.receiveAttackAt([x, y]) : player1.receiveAttackAt([x, y]);
    missedFlag = result === MISS;

    return result;
  }

  function endTurn() {
    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    missedFlag = false;
  }

  function isGameOver() {
    let otherPlayer = currentPlayer === PLAYER1 ? player2 : player1;
    return otherPlayer.allShipsSunk();
  }

  return {
    get turn() {
      return currentPlayer;
    },
    get hasMissed() {
      return missedFlag;
    },
    init,
    receiveAttackAt,
    endTurn,
    isGameOver,
  };
}

const GameManager = _GameManager();

export { GameManager, PLAYER1, PLAYER2 };
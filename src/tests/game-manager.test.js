import { GameManager, PLAYER1, PLAYER2 } from "js/managers/game-manager";
import { Player, HUMAN, COMPUTER } from "js/models/player";
import { Gameboard, HIT, MISS } from "js/models/gameboard";
import { Ship, HORIZONTAL, VERTICAL } from "js/models/ship";

test("should have complete game loop", () => {
  const ship = Ship("SHIP", 1, HORIZONTAL);
  const board1 = Gameboard([ship]);
  board1.placeShipAt(ship, [0, 0]);
  const board2 = Gameboard([]);
  const humanPlayer = Player("Player 1", HUMAN, board1);
  const computerPlayer = Player("Player 2", COMPUTER, board2);
  GameManager.init(humanPlayer, computerPlayer);
  expect(GameManager.turn).toBe(PLAYER1);
  expect(GameManager.receiveAttackAt([1, 0])).toBe(MISS);
  expect(GameManager.hasMissed).toBe(true);
  GameManager.endTurn();
  expect(GameManager.hasMissed).toBe(false);
  expect(GameManager.turn).toBe(PLAYER2);
  expect(GameManager.receiveAttackAt([0, 0])).toBe(HIT);
  expect(GameManager.isGameOver()).toBe(true);
});
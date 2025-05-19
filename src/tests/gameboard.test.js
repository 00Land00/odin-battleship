import { Gameboard } from "js/models/gameboard";
import { Ship, HORIZONTAL, VERTICAL } from "js/models/ship";

test("should be able to place ships at only valid positions", () => {
  const ship1 = Ship("SHIP 1", 3, HORIZONTAL);
  const ship2 = Ship("SHIP 2", 3, VERTICAL);
  const ship3 = Ship("SHIP 3", 3, VERTICAL);
  const gameboard = Gameboard([ship1, ship2, ship3]);
  
  gameboard.placeShipAt(ship1, [0, 0]);
  gameboard.placeShipAt(ship2, [0, 0]);
  gameboard.placeShipAt(ship3, [5, 5]);

  expect(gameboard.hasShipAt(ship1, [0, 0])).toBe(true);
  
  expect(gameboard.hasShipAt(ship2, [0, 0])).toBe(false);
  
  expect(() => gameboard.placeShipAt(ship3, [9, 9])).toThrow("[ERROR] Coordinates are out of bounds.");
});

test("should be able to record and process attacks", () => {
  const ship = Ship("SHIP", 1, HORIZONTAL);
  const gameboard = Gameboard([ship]);
  
  gameboard.placeShipAt(ship, [9, 9]);
  gameboard.receiveAttackAt([9, 9]);
  expect(ship.isSunk()).toBe(true);
});

test("should know when all ships sunk", () => {
  const ship1 = Ship("SHIP 1", 1, HORIZONTAL);
  const ship2 = Ship("SHIP 2", 1, HORIZONTAL);
  const gameboard = Gameboard([ship1, ship2]);

  gameboard.placeShipAt(ship1, [9, 9]);
  gameboard.placeShipAt(ship2, [0, 0]);
  
  gameboard.receiveAttackAt([9, 9]);
  expect(gameboard.allShipsSunk()).toBe(false);

  gameboard.receiveAttackAt([0, 0]);
  expect(gameboard.allShipsSunk()).toBe(true);
});

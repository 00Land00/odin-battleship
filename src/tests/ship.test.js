import { Ship, HORIZONTAL, VERTICAL } from "js/models/ship";

test("should be able to set orientation of ship", () => {
  const horizontalShip = Ship("HORIZONTAL SHIP", 1, HORIZONTAL);
  expect(horizontalShip.direction).toBe(HORIZONTAL);

  const verticalShip = Ship("VERTICAL SHIP", 1, VERTICAL);
  expect(verticalShip.direction).toBe(VERTICAL);
});

test("should sink after enough hits", () => {
  const ship = Ship("SHIP", 3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("should have correct length", () => {
  const ship = Ship("SHIP", 3);
  expect(ship.length).toBe(3);
});
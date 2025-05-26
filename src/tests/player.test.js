import { Player, HUMAN, COMPUTER } from "js/models/player";

test("should be able to create a human or computer player", () => {
  const humanPlayer = Player("Player 1", HUMAN);
  expect(humanPlayer.type).toBe(HUMAN);
  expect(humanPlayer.name).toBe("Player 1");

  const computerPlayer = Player("Player 2", COMPUTER);
  expect(computerPlayer.type).toBe(COMPUTER);
  expect(computerPlayer.name).toBe("Player 2");
});

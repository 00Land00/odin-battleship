let nextId = 1;

const HORIZONTAL = "HORIZONTAL";
const VERTICAL = "VERTICAL";

function Ship(shipName, len, dir = HORIZONTAL) {
  const currentId = nextId++;
  let hits = 0;
  let pos = null;

  function hit() {
    hits++;
  }

  function isSunk() {
    return hits >= len;
  }

  return {
    get id() {
      return currentId;
    },
    get name() {
      return shipName;
    },
    get length() {
      return len;
    },
    get position() {
      return pos;
    },
    set position(newPos) {
      if (newPos !== null) {
        if (!Array.isArray(newPos) || newPos.length !== 2) {
          throw new Error("[ERROR] Invalid position given");
        }
      }

      pos = newPos;
    },
    get direction() {
      return dir;
    },
    set direction(newDir) {
      if (newDir !== HORIZONTAL && newDir !== VERTICAL) {
        throw new Error("[ERROR] Invalid direction given");
      }
      dir = newDir;
    },
    hit,
    isSunk,
  };
}

export { Ship, HORIZONTAL, VERTICAL };

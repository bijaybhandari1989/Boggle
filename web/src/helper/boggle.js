export class Boogle {
  constructor(char, row, col, isActive) {
    this.char = char.toUpperCase();
    this.row = row;
    this.col = col;
    this.isActive = isActive;
  }
}

export function getBoggleBoard(words) {
  let rowNumber = 1;
  let board = [];
  for (let i = 0; i < words.length; i += 4) {
    let colNumber = 1;
    for (let j = i; j < i + 4; j++) {
      board[j] = new Boogle(words[j], rowNumber, colNumber, false);
      colNumber++;
    }
    rowNumber++;
  }
  return board;
}

export function selectBoardDice(dice, board) {
  return board.map((diceMain) =>
    diceMain.char === dice.char &&
    diceMain.row === dice.row &&
    diceMain.col == dice.col
      ? new Boogle(dice.char, dice.row, dice.col, true)
      : diceMain
  );
}

export function deselectBoardDice(board) {
  return board.map((dice) => {
    var updatedDice = Object.assign({}, dice);
    if (updatedDice.isActive) {
      updatedDice.isActive = false;
    }
    return updatedDice;
  });
}

export class Boogle {
  constructor(char, row, col, isActive) {
    this.char = char.toUpperCase();
    this.row = row;
    this.col = col;
    this.isActive = isActive;
  }
}

export function getBoggleBoard(words) {
  let rowNumber = 0;
  let board = [];
  for (let i = 0; i < words.length; i += 4) {
    let colNumber = 0;
    for (let j = i; j < i + 4; j++) {
      board[j] = new Boogle(words[j], rowNumber, colNumber, false);
      colNumber++;
    }
    rowNumber++;
  }
  return board;
}

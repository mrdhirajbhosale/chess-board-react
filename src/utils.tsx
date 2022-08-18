import { ICell, IPiece } from "./svg/Piece";

export function king_movement(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
    let moves: ICell[] = [];
    moves.push({row: cell.row, column: cell.column+1})
    moves.push({row: cell.row, column: cell.column-1})
    moves.push({row: cell.row+1, column: cell.column})
    moves.push({row: cell.row-1, column: cell.column})
    moves.push({row: cell.row+1, column: cell.column+1})
    moves.push({row: cell.row+1, column: cell.column-1})
    moves.push({row: cell.row-1, column: cell.column-1})
    moves.push({row: cell.row-1, column: cell.column+1})
    return moves.filter(
      move =>
        (0 <= move.row && move.row <= 7) && (0 <= move.column && move.column <= 7) && !(pieces[move.row][move.column]?.color === color)
    ).filter((check, index, checks_list) => checks_list.indexOf(check) !== index );
}

export function pawn_movement(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
  const moves: ICell[] = []
  if (color === 'white') {
    if (cell.row === 1 && pieces[cell.row + 2][cell.column] === undefined) {
      moves.push({ row: cell.row + 2, column: cell.column })
    }
    if (pieces[cell.row + 1][cell.column] === undefined) {
      moves.push({ row: cell.row + 1, column: cell.column })
    }
    if (pieces[cell.row + 1][cell.column + 1]?.color === 'black') {
      moves.push({ row: cell.row + 1, column: cell.column + 1 })
    }
    if (pieces[cell.row + 1][cell.column - 1]?.color === 'black') {
      moves.push({ row: cell.row + 1, column: cell.column - 1 })
    }
  } else {
    if (cell.row === 6 && pieces[cell.row - 2][cell.column] === undefined) {
      moves.push({ row: cell.row - 2, column: cell.column })
    }
    if (pieces[cell.row - 1][cell.column] === undefined) {
      moves.push({ row: cell.row - 1, column: cell.column })
    }
    if (pieces[cell.row - 1][cell.column - 1]?.color === 'white') {
      moves.push({ row: cell.row - 1, column: cell.column - 1 })
    }
    if (pieces[cell.row - 1][cell.column + 1]?.color === 'white') {
      moves.push({ row: cell.row - 1, column: cell.column + 1 })
    }
  }
  return moves;
}

export function knight_movement(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
  const moves: ICell[] = [];
  moves.push({ row: cell.row - 1, column: cell.column - 2 })
  moves.push({ row: cell.row - 1, column: cell.column + 2 })
  moves.push({ row: cell.row + 1, column: cell.column - 2 })
  moves.push({ row: cell.row + 1, column: cell.column + 2 })
  moves.push({ row: cell.row - 2, column: cell.column - 1 })
  moves.push({ row: cell.row - 2, column: cell.column + 1 })
  moves.push({ row: cell.row + 2, column: cell.column - 1 })
  moves.push({ row: cell.row + 2, column: cell.column + 1 })
  return moves.filter(move => (0 <= move.row && move.row <= 7) && (0 <= move.column && move.column <= 7) && !(pieces[move.row][move.column]?.color === color));
}

export function move_diagonally(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
  const moves: ICell[] = [];
  const stop: string[] = [];
  for (let toCell = 1; toCell <= 7; toCell++) {
    if (!stop.includes('plus_plus') && cell.row + toCell <= 7 && cell.column + toCell <= 7) {
      if (pieces[cell.row + toCell][cell.column + toCell]?.color === color) {
        stop.push('plus_plus');
      } else if (pieces[cell.row + toCell][cell.column + toCell]?.color !== undefined && pieces[cell.row + toCell][cell.column + toCell]?.color !== color) {
        moves.push({ row: cell.row + toCell, column: cell.column + toCell })
        stop.push('plus_plus');
      } else {
        moves.push({ row: cell.row + toCell, column: cell.column + toCell })
      }
    }
    if (!stop.includes('plus_minus') && cell.row + toCell <= 7 && cell.column - toCell >= 0) {
      if (pieces[cell.row + toCell][cell.column - toCell]?.color === color) {
        stop.push('plus_minus');
      } else if (pieces[cell.row + toCell][cell.column - toCell]?.color !== undefined && pieces[cell.row + toCell][cell.column - toCell]?.color !== color) {
        moves.push({ row: cell.row + toCell, column: cell.column - toCell })
        stop.push('plus_minus');
      } else {
        moves.push({ row: cell.row + toCell, column: cell.column - toCell })
      }
    }
    if (!stop.includes('minus_plus') && cell.row - toCell >= 0 && cell.column + toCell <= 7) {
      if (pieces[cell.row - toCell][cell.column + toCell]?.color === color) {
        stop.push('minus_plus');
      } else if (pieces[cell.row - toCell][cell.column + toCell]?.color !== undefined && pieces[cell.row - toCell][cell.column + toCell]?.color !== color) {
        moves.push({ row: cell.row - toCell, column: cell.column + toCell })
        stop.push('minus_plus');
      } else {
        moves.push({ row: cell.row - toCell, column: cell.column + toCell })
      }
    }
    if (!stop.includes('minus_minus') && cell.row - toCell >= 0 && cell.column - toCell <= 7) {
      if (pieces[cell.row - toCell][cell.column - toCell]?.color === color) {
        stop.push('minus_minus');
      } else if (pieces[cell.row - toCell][cell.column - toCell]?.color !== undefined && pieces[cell.row - toCell][cell.column - toCell]?.color !== color) {
        moves.push({ row: cell.row - toCell, column: cell.column - toCell })
        stop.push('minus_minus');
      } else {
        moves.push({ row: cell.row - toCell, column: cell.column - toCell })
      }
    }
  }
  return moves;
}

export function move_straight(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
  const moves: ICell[] = [];
  const stop: string[] = [];
  for (let toCell = 1; toCell <= 7; toCell++) {
    if (!stop.includes('plus_') && cell.row + toCell <= 7) {
      if (pieces[cell.row + toCell][cell.column]?.color === color) {
        stop.push('plus_');
      } else if (pieces[cell.row + toCell][cell.column]?.color !== undefined && pieces[cell.row + toCell][cell.column]?.color !== color) {
        moves.push({ row: cell.row + toCell, column: cell.column })
        stop.push('plus_');
      } else {
        moves.push({ row: cell.row + toCell, column: cell.column })
      }
    }
    if (!stop.includes('_minus') && cell.column - toCell >= 0) {
      if (pieces[cell.row][cell.column - toCell]?.color === color) {
        stop.push('_minus');
      } else if (pieces[cell.row][cell.column - toCell]?.color !== undefined && pieces[cell.row][cell.column - toCell]?.color !== color) {
        moves.push({ row: cell.row, column: cell.column - toCell })
        stop.push('_minus');
      } else {
        moves.push({ row: cell.row, column: cell.column - toCell })
      }
    }
    if (!stop.includes('_plus') && cell.column + toCell <= 7) {
      if (pieces[cell.row][cell.column + toCell]?.color === color) {
        stop.push('_plus');
      } else if (pieces[cell.row][cell.column + toCell]?.color !== undefined && pieces[cell.row][cell.column + toCell]?.color !== color) {
        moves.push({ row: cell.row, column: cell.column + toCell })
        stop.push('_plus');
      } else {
        moves.push({ row: cell.row, column: cell.column + toCell })
      }
    }
    if (!stop.includes('minus_') && cell.row - toCell >= 0) {
      if (pieces[cell.row - toCell][cell.column]?.color === color) {
        stop.push('minus_');
      } else if (pieces[cell.row - toCell][cell.column]?.color !== undefined && pieces[cell.row - toCell][cell.column]?.color !== color) {
        moves.push({ row: cell.row - toCell, column: cell.column })
        stop.push('minus_');
      } else {
        moves.push({ row: cell.row - toCell, column: cell.column })
      }
    }
  }
  return moves;
}

export function check_king_check(cell: ICell, pieces: (IPiece | undefined)[][], color: string) {
  let checks: ICell[] = [];
  const kingMoves = king_movement(cell, pieces, color).filter(check => pieces[check.row][check.column]?.name === 'king');
  checks = checks.concat(kingMoves);
  const pawnMoves = pawn_movement(cell, pieces, color).filter(check => pieces[check.row][check.column]?.name === 'pawn');
  checks = checks.concat(pawnMoves);
  const knightMoves = knight_movement(cell, pieces, color).filter(check => pieces[check.row][check.column]?.name === 'knight')
  checks = checks.concat(knightMoves);
  const diagonally_moves = move_diagonally(cell, pieces, color).filter(check => ['bishop', 'queen'].includes(pieces[check.row][check.column]?.name|| ''))
  checks = checks.concat(diagonally_moves);
  const straight_moves = move_straight(cell, pieces, color).filter(check => ['rook', 'queen'].includes(pieces[check.row][check.column]?.name|| ''))
  checks = checks.concat(straight_moves);
  return checks.filter(check =>
    !(pieces[check.row][check.column]?.color === undefined || pieces[check.row][check.column]?.color === color)
  );
}

function get_moves_towords_king(king_cell: ICell, other_cell: ICell) {
  let startMove = 0;
  let endMove = 0;
  let diff_x = 0;
  let diff_y = 0;
  let incr = 0;
  var x1 = king_cell.row;
  var y1 = king_cell.column;
  var x2 = other_cell.row;
  var y2 = other_cell.column;
  const moves: ICell[] = []
  if (x1!==x2) {
    diff_x = x1 - x2 > 0? 1: -1;
    incr =  diff_x;
    startMove = x2;
    endMove = x1;
  }
  if (y1 !== y2) {
    diff_y = y1 - y2 > 0? 1: -1;
    incr = diff_y;
    startMove = y2;
    endMove = y1;
  }
  while(startMove !== endMove) {
    x2+=diff_x
    y2+=diff_y
    moves.push({row: x2, column: y2})
    startMove+=incr
  }
  return moves;
}

export function moves_in_king_and_opponent(cell: ICell, king_checks: ICell[], pieces: (IPiece | undefined)[][]) {
  const moves: ICell[][] = [];
  king_checks.forEach((check)=> {
    switch(pieces[check.row][check.column]?.name) {
      case 'king':
      case 'knight':
      case 'pawn':
        moves.push(king_checks);
        break;
      case 'bishop':
      case 'rook':
      case 'queen':
        moves.push(get_moves_towords_king(cell, check));
        break;
      default:
        moves.push([]);
    }
  })
  return moves;
}

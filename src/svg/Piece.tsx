import { ReactNode } from "react";

export interface ICell {
  row: number;
  column: number;
}

export interface IPiece {
  name: string;
  color: string;
  movement: (cell: ICell, pieces: (IPiece | undefined)[][]) => ICell[];
  icon: () => ReactNode;
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
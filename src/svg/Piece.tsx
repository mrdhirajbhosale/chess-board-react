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
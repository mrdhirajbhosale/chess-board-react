import styled from "styled-components";
import { move_straight } from "../utils";
import { ICell, IPiece } from "./Piece";

const SVG = styled.svg`
  opacity:1;
  fill:${props => (props.color === `black` ? `#000000` : `#ffffff;`)};
  fill-opacity:1; fill-rule:evenodd; 
  stroke:${props => (props.color === `black` ? `#ffffff` : `#000000;`)}; 
  stroke-width:1.5;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-miterlimit:4;
  stroke-dasharray:none;
  stroke-opacity:1;
`;

const PathUpper = styled.path`
  stroke-linecap:butt;
`;

const PathMiddle = styled(PathUpper)`
  stroke-linejoin:miter;
`;


const PathBttom = styled.path`
  fill:none;
  stroke:${props => (props.color === `black` ? `#ffffff` : `#000000;`)};
  stroke-linejoin:miter;
`;


export class Rook implements IPiece {

  color: string;
  name: string;

  constructor(color: string) {
    this.color = color;
    this.name = 'rook';
  }

  movement(cell: ICell, pieces: (IPiece | undefined)[][]) {
    return move_straight(cell, pieces, this.color);
  }

  icon() {
    return (
      <SVG xmlns="http://www.w3.org/2000/svg" version="1.1" width="45" height="45" color={this.color}>
        <g transform="translate(0,0.3)">
          <PathUpper color={this.color}
            d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " />
          <PathUpper color={this.color}
            d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " />
          <PathUpper color={this.color}
            d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
          <path
            d="M 34,14 L 31,17 L 14,17 L 11,14" />
          <PathMiddle
            d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
          <path
            d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
          <PathBttom d="M 11,14 L 34,14" />
        </g>
      </SVG>

    );
  }
}
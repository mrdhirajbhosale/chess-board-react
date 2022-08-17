import styled from "styled-components";
import { king_movement } from "../utils";
import { ICell, IPiece } from "./Piece";

const SVG = styled.svg`
  fill: none;
  fill-opacity: 1; 
  fill-rule: evenodd; 
  stroke: ${props => (props.color === `black` ? `#ffffff` : `#000000;`)};
  stroke-width: 1.5; 
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 4;
  stroke-dasharray: none;
  stroke-opacity: 1;
`;

const PathUpper = styled.path`
  fill: none;
  stroke: ${props => (props.color === `black` ? `#ffffff` : `#000000;`)};
  stroke-linejoin: miter;
`;

const PatchMiddleBottom = styled.path`
  fill: ${props => (props.color === `black` ? `#000000` : `#ffffff;`)};
  stroke: ${props => (props.color === `black` ? `#ffffff` : `#000000;`)};
`;

const PatchMiddleUpper = styled(PatchMiddleBottom)`
  stroke-linecap: butt; 
  stroke-linejoin: miter;
`;

const PathBottom = styled.path`
  fill: none; 
  stroke: ${props => (props.color === `black` ? `#ffffff` : `#000000;`)};
`

export class King implements IPiece {

  color: string;
  name: string;

  constructor(color: string) {
    this.color = color;
    this.name = 'king';
  }

  movement(cell: ICell, pieces: (IPiece | undefined)[][]) {
    return king_movement(cell, pieces, this.color);
  }

  icon() {
    return (
      <SVG xmlns="http: //www.w3.org/2000/svg" version="1.1" width="45" height="45" color={this.color}>
        <PathUpper d="M 22.5,11.63 L 22.5,6" color={this.color} />
        <PathUpper d="M 20,8 L 25,8" color={this.color} />
        <PatchMiddleUpper color={this.color}
          d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" />
        <PatchMiddleBottom color={this.color}
          d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" />
        <PathBottom color={this.color} d="M 12.5,30 C 18,27 27,27 32.5,30" />
        <PathBottom color={this.color} d="M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5" />
      </SVG>
    );
  }
}
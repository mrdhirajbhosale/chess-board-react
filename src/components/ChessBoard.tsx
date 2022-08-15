import React from 'react';
import styled from 'styled-components';
import { Bishop } from '../svg/Bishop';
import { King } from '../svg/King';
import { Knight } from '../svg/Knight';
import { Pawn } from '../svg/Pawn';
import { ICell, IPiece } from '../svg/Piece';
import { Queen } from '../svg/Queen';
import { Rook } from '../svg/Rook';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 80px;
`;

const ChessContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.button<{ color?: string, borderColor?: string, borderSize?: string }>`
  width: 50px;
  height: 50px;
  border: ${({borderSize}) => (borderSize ? borderSize : `1px`)} solid ${({borderColor}) => (borderColor ? borderColor : `#a79d9d`)};
  background-color: ${({color}) => (color ? color : `black`)};
  padding: 2px;
`;

const DeathPiece = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 405px;
  flex-wrap: wrap;
`

const RowFlex = styled.div`
  display: flex;
`

type ISelected = {
  row: number,
  column: number,
  piece: IPiece | undefined
}

type IState = {
  pieces: (IPiece | undefined)[][];
  selected: ISelected;
  deathPieces: IPiece[];
  turn: 'white' | 'black';
  posibleMoves: ICell[];
}

class ChessBoard extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      pieces: Array.from({ length: 8 }, (__, j) => Array.from({ length: 8 }, (_, i) => undefined)),
      selected: { row: -1, column: -1, piece: undefined },
      deathPieces: [],
      turn: 'white',
      posibleMoves: []
    }
  }

  initialPices(): void {
    const { pieces } = this.state;
    const blackKing = new King('black');
    const whiteKing = new King('white');
    const blackQueen = new Queen('black');
    const whiteQueen = new Queen('white');
    const blackBishop = new Bishop('black');
    const whiteBishop = new Bishop('white');
    const blackKnight = new Knight('black');
    const whiteKnight = new Knight('white');
    const blackRook = new Rook('black');
    const whiteRook = new Rook('white');

    pieces[0] = [
      whiteRook,
      whiteKnight,
      whiteBishop,
      whiteKing,
      whiteQueen,
      whiteBishop,
      whiteKnight,
      whiteRook
    ]

    const whitePawn = new Pawn('white');
    const blackPawn = new Pawn('black');
    pieces[1] = Array.from({ length: 8 }, (_, i) => whitePawn);
    pieces[7] = [
      blackRook,
      blackKnight,
      blackBishop,
      blackKing,
      blackQueen,
      blackBishop,
      blackKnight,
      blackRook
    ]
    pieces[6] = Array.from({ length: 8 }, (_, i) => blackPawn);
    this.setState({
      pieces
    })
  }

  componentDidMount() {
    this.initialPices();
  }

  isCellPresent(row: number, column: number) {
    return this.state.posibleMoves.filter(move => move.row === row && move.column === column ).length > 0;
  }

  onClickCell(row: number, column: number, piece: IPiece| undefined) {
    const { pieces, selected, deathPieces } = this.state;
    let turn = this.state.turn;
    if (piece && selected.piece && piece.color !== selected.piece.color) {
      deathPieces.push(piece);
      pieces[row][column] = selected.piece;
      pieces[selected.row][selected.column] = undefined;
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      this.setState({ selected, deathPieces, pieces, turn, posibleMoves: [] });
    } else if (piece) {
      selected.row = row;
      selected.column = column;
      selected.piece = piece;
      this.setState({ 
        selected, 
        posibleMoves: this.state.pieces[row][column]?.movement({ row, column }, this.state.pieces) || []
      });
    } else {
      pieces[row][column] = selected.piece;
      pieces[selected.row][selected.column] = undefined
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      this.setState({ selected, pieces, turn, posibleMoves: [] });
    }
  }


  render() {
    return (
      <div>
        <MainContainer>
          <DeathPiece>
            {
              this.state.deathPieces.filter(piece => piece.color === 'white').map((piece, _) => piece.icon()
              )}
          </DeathPiece>
          <ChessContainer>
            {
              [...Array(8)].map((x, row) =>
                <RowFlex>
                  {
                    [...Array(8)].map((y, column) =>
                      <Box onClick={() => this.onClickCell(row, column, this.state.pieces[row][column])}
                        color={(row + column) % 2 === 0 ? '#a96868' : '#d9c8c8'}
                        borderColor={this.isCellPresent(row, column)? '#df1616': '#a79d9d'}
                        borderSize={this.isCellPresent(row, column)? '2px': '1px'}
                        disabled={
                          (!this.isCellPresent(row, column) && this.state.selected.piece !== undefined && 
                          this.state.pieces[row][column]?.color !== this.state.turn ) ||
                          (this.state.selected.piece === undefined &&
                          this.state.pieces[row][column]?.color !== this.state.turn)
                        }
                      >
                        {this.state.pieces[row][column]?.icon()}
                      </Box>
                    )
                  }
                </RowFlex>
              )}
          </ChessContainer>
          <DeathPiece>
            {
              this.state.deathPieces.filter(piece => piece.color === 'black').map((piece, _) => piece.icon()
              )}
          </DeathPiece>
        </MainContainer>
        {/* <button onClick={this.initialPices} >Reset</button>  */}
      </div>
    );
  }
}

export default ChessBoard;

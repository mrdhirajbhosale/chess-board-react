import React from 'react';
import styled from 'styled-components';
import { Bishop } from '../svg/Bishop';
import { King } from '../svg/King';
import { Knight } from '../svg/Knight';
import { Pawn } from '../svg/Pawn';
import { ICell, IPiece } from '../svg/Piece';
import { Queen } from '../svg/Queen';
import { Rook } from '../svg/Rook';
import { check_king_check, clone, moves_in_king_and_opponent } from '../utils';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;

const ChessContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.button<{ color?: string, borderColor?: string, borderSize?: string }>`
  width: 50px;
  height: 50px;
  border: ${({ borderSize }) => (borderSize ? borderSize : `1px`)} solid ${({ borderColor }) => (borderColor ? borderColor : `#a79d9d`)};
  background-color: ${({ color }) => (color ? color : `black`)};
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

const ActionContainer = styled(RowFlex)`
  height: 60px;
  justify-content: center;
  align-item: center;
`;

const TimeContainer = styled.div`
  margin: 10px;
  width: 100px;
  height: 40px;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Button = styled.button`
  height: 40px;
  width: 70px;
  margin: 10px;
`;

type ISelected = {
  row: number,
  column: number,
  piece: IPiece | undefined
}

type IKingCell = {
  [key: string]: ICell
}

type IKingChecks = {
  [key: string]: ICell[]
}

export type IState = {
  pieces: (IPiece | undefined)[][];
  selected: ISelected;
  deathPieces: IPiece[];
  turn: 'white' | 'black';
  posibleMoves: ICell[];
  kingChecks: IKingChecks;
  kingCell: IKingCell;
  afterCheckMoves: ICell[][];
  timer: string;
  timerStart: Boolean;
  id: number;
}

const COLOR_SIZE: { [key: number]: { color: string, size: string } } = {
  1: { color: '#df1616', size: '2px' },
  2: { color: '#4d79ff', size: '2px' },
  3: { color: '#a79d9d', size: '1px' },
  4: { color: '#df1616', size: '1px' },
}

class ChessBoard extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      pieces: Array.from({ length: 8 }, (__, j) => Array.from({ length: 8 }, (_, i) => undefined)),
      selected: { row: -1, column: -1, piece: undefined },
      deathPieces: [],
      turn: 'white',
      posibleMoves: [],
      kingChecks: {},
      kingCell: { white: { row: 0, column: 0 }, black: { row: 0, column: 0 } },
      afterCheckMoves: [],
      timer: '00:00:00:00',
      timerStart: true,
      id: 0
    }
  }

  updateTimer(): void {
    const countDownDate: number = new Date().getTime();
    setInterval(() => {
      const now: number = new Date().getTime();
      const timeleft: number = now - countDownDate;
      const days: number = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes: number = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((timeleft % (1000 * 60)) / 1000);
      const timer = `${days > 9 ? days : '0' + days.toString()}:` +
        `${hours > 9 ? hours : '0' + hours.toString()}:` +
        `${minutes > 9 ? minutes : '0' + minutes.toString()}:` +
        `${seconds > 9 ? seconds : '0' + seconds.toString()}`;
      this.setState({ timer });
    }, 1000);
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
      pieces,
      kingCell: {
        white: { row: 0, column: 3 },
        black: { row: 7, column: 3 }
      },
      id: 0
    })
    this.props.initialListHandler(clone({...this.state, pieces, id: 0 }));
  }

  componentDidMount() {
    this.initialPices();
    this.updateTimer();
  }

  isCellPresent(row: number, column: number, cells: ICell[]) {
    return cells.filter(cell => cell.row === row && cell.column === column).length > 0;
  }

  getKingChecks() {
    const { kingCell, kingChecks } = this.state;
    let afterCheckMoves: ICell[][] = [];
    kingChecks['white'] = check_king_check(kingCell.white, this.state.pieces, 'white');
    kingChecks['black'] = check_king_check(kingCell.black, this.state.pieces, 'black');
    afterCheckMoves = moves_in_king_and_opponent(kingCell.white, kingChecks['white'], this.state.pieces);
    afterCheckMoves = afterCheckMoves.concat(moves_in_king_and_opponent(kingCell.black, kingChecks['black'], this.state.pieces));
    this.setState({ kingChecks, afterCheckMoves });
  }

  onClickCell(row: number, column: number, piece: IPiece | undefined) {
    const { pieces, selected, deathPieces, kingCell, id } = this.state;
    console.log('id', id);
    let turn = this.state.turn;
    console.log(this.props);
    if (piece && selected.piece && piece.color !== selected.piece.color) {
      deathPieces.push(piece);
      pieces[row][column] = selected.piece;
      pieces[selected.row][selected.column] = undefined;
      if (selected.piece?.name === 'king') {
        kingCell[selected.piece?.color] = { row, column }
      }
      this.getKingChecks();
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      this.setState({ selected, deathPieces, pieces, turn, posibleMoves: [], id: id + 1 });
      this.props.addToListHandler(clone({...this.state, selected, pieces, turn, posibleMoves: [], id: id + 1 }));
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
      if (selected.piece?.name === 'king') {
        kingCell[selected.piece?.color] = { row, column }
      }
      this.getKingChecks();
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      this.setState({ selected, pieces, turn, posibleMoves: [], id: id + 1 });
      this.props.addToListHandler(clone({...this.state, selected, pieces, turn, posibleMoves: [], id: id + 1 }));
    }
  }

  getBorderColor(row: number, column: number) {
    if (Object.values(this.state.kingChecks).filter(moves => this.isCellPresent(row, column, moves)).length > 0) {
      return 1;
    }
    if (this.state.afterCheckMoves.filter(moves => this.isCellPresent(row, column, moves)).length > 0) {
      return 4;
    }
    if (this.isCellPresent(row, column, this.state.posibleMoves)) {
      return 2;
    }
    return 3;
  }

  onClickPre() {
    console.log(this.state.id);
    console.log(this.props.data.chessBoardItems);
    this.setState(this.props.data.chessBoardItems[this.state.id-1]);
  }

  onClickNext() {
    console.log(this.state.id);
    console.log(this.props.data.chessBoardItems);
    this.setState(this.props.data.chessBoardItems[this.state.id+1]);
  }

  render() {
    return (
      <>
        <ActionContainer>
          <TimeContainer>
            {this.state.timer}
          </TimeContainer>
        </ActionContainer>
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
                        borderColor={COLOR_SIZE[this.getBorderColor(row, column)].color}
                        borderSize={COLOR_SIZE[this.getBorderColor(row, column)].size}
                        disabled={
                          (!this.isCellPresent(row, column, this.state.posibleMoves) && this.state.selected.piece !== undefined &&
                            this.state.pieces[row][column]?.color !== this.state.turn) ||
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
        <ActionContainer>
          <Button onClick={() => this.onClickPre()}>Previous</Button>
          <Button onClick={() => this.onClickNext()}>Next</Button>
        </ActionContainer>
        {/* <button onClick={this.initialPices} >Reset</button> */}
      </>
    );
  }
}

export default ChessBoard;

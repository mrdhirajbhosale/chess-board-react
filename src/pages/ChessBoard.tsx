import React from 'react';
import styled from 'styled-components';
import PopUp from '../components/PopUp';
import { IKingChecks } from '../service/reducers/chessBoardItems';
import { Bishop } from '../svg/Bishop';
import { King } from '../svg/King';
import { Knight } from '../svg/Knight';
import { Pawn } from '../svg/Pawn';
import { ICell, IPiece } from '../svg/Piece';
import { Queen } from '../svg/Queen';
import { Rook } from '../svg/Rook';
import { check_king_check, clone, get_king_positions, moves_in_king_and_opponent } from '../utils';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;

const ChessContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 7px;
`;

const Box = styled.button<{ color?: string, borderColor?: string, borderSize?: string }>`
  width: 50px;
  height: 50px;
  border: ${({ borderSize }) => (borderSize ? borderSize : `1px`)} solid ${({ borderColor }) => (borderColor ? borderColor : `#a79d9d`)};
  background-color: ${({ color }) => (color ? color : `black`)};
  padding: 2px;
`;

const PopUpContainer = styled.div`
  width: auto;
  height: auto;
  border: 4px solid #a79d9d;
  padding: 50px;
`
const DeathPiece = styled.div<{ borderColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 405px;
  flex-wrap: wrap;
  border: 4px solid ${({ borderColor }) => (borderColor ? borderColor : `#a79d9d`)};
  border-style: double;
  margin: 0 10px;
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

type IPromotePwan = {
  cell: ICell,
  color: 'black' | 'white'
}

export type IState = {
  timer: string;
  showPopup: boolean;
  pramotePawn: IPromotePwan | undefined;
}

const COLOR_SIZE: { [key: number]: { color: string, size: string } } = {
  1: { color: '#df1616', size: '2px' },
  2: { color: '#4d79ff', size: '2px' },
  3: { color: '#a79d9d', size: '1px' },
  4: { color: '#df1616', size: '1px' },
}

class ChessBoard extends React.Component<any, IState> {

  promotePawn: { white: IPiece[], black: IPiece[] }
  constructor(props: any) {
    super(props);
    this.state = {
      timer: '00:00:00:00',
      showPopup: true,
      pramotePawn: undefined
    }
    this.onClickClose = this.onClickClose.bind(this);
    this.onPramotePawn = this.onPramotePawn.bind(this);
    this.promotePawn = {
      white: [new Queen('white'), new Bishop('white'), new Knight('white'), new Rook('white')],
      black: [new Queen('black'), new Bishop('black'), new Knight('black'), new Rook('black')]
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

  async initialPices() {
    let pieces: (IPiece | undefined)[][] = Array.from({ length: 8 }, (__, j) => Array.from({ length: 8 }, (_, i) => undefined));
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
    await this.props.initialListHandler(clone({
      pieces,
      deathPieces: [],
      turn: 'white',
      kingChecks: {
        black: [],
        white: []
      }
    }));
  }

  componentDidMount() {
    this.initialPices();
    this.updateTimer();
  }

  isCellPresent(row: number, column: number, cells: ICell[]) {
    return cells.filter(cell => cell.row === row && cell.column === column).length > 0;
  }

  async getKingChecks(pieces: (IPiece | undefined)[][]) {
    const { kingChecks } = clone(this.props.data.chessBoardItems.current);
    const kingCell = get_king_positions(pieces);
    let afterCheckMoves: ICell[][] = [];
    kingChecks['white'] = check_king_check(kingCell.white, pieces, 'white');
    kingChecks['black'] = check_king_check(kingCell.black, pieces, 'black');
    afterCheckMoves = moves_in_king_and_opponent(kingCell.white, kingChecks['white'], pieces);
    afterCheckMoves = afterCheckMoves.concat(moves_in_king_and_opponent(kingCell.black, kingChecks['black'], pieces));
    await this.props.updatePredictHandler({ ...this.props.data.chessboardPredict, afterCheckMoves })
    return kingChecks;
  }

  async onClickCell(row: number, column: number, piece: IPiece | undefined) {
    const { selected } = this.props.data.chessboardPredict;
    const { pieces, deathPieces } = clone(this.props.data.chessBoardItems.current);
    let kingChecks: IKingChecks = {}
    let turn = this.props.data.chessBoardItems.current.turn;
    if (piece && selected.piece && piece.color !== selected.piece.color) {
      deathPieces.push(piece);
      pieces[row][column] = selected.piece;
      pieces[selected.row][selected.column] = undefined;
      kingChecks = await this.getKingChecks(pieces);
      if (kingChecks[turn].length > 0) {
        return;
      }
      if ((row === 7 || row === 0) && selected.piece.name === 'pawn') {
        this.setState({
          pramotePawn: {
            cell: {row, column}, color: selected.piece?.color
          },
          showPopup: true
        }) 
      }
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      await this.props.updatePredictHandler(clone({ ...this.props.data.chessboardPredict, selected, posibleMoves: [] }))
      await this.props.addToListHandler(clone({ ...this.props.data.chessBoardItems.current, kingChecks, pieces, turn, deathPieces }));
    } else if (piece) {
      selected.row = row;
      selected.column = column;
      selected.piece = piece;
      await this.props.updatePredictHandler(clone({
        ...this.props.data.chessboardPredict,
        selected,
        posibleMoves: this.props.data.chessBoardItems.current.pieces[row][column]?.movement({ row, column }, this.props.data.chessBoardItems.current.pieces) || []
      }))
    } else {
      pieces[row][column] = selected.piece;
      pieces[selected.row][selected.column] = undefined
      kingChecks = await this.getKingChecks(pieces);
      if (kingChecks[turn].length > 0) {
        return;
      }
      if ((row === 7 || row === 0) && selected.piece.name === 'pawn') {
        this.setState({
          pramotePawn: {
            cell: {row, column}, color: selected.piece.color
          },
          showPopup: true
        }) 
      }
      selected.row = -1;
      selected.column = -1;
      selected.piece = undefined;
      if (turn === 'black') {
        turn = 'white';
      } else {
        turn = 'black'
      }
      await this.props.updatePredictHandler(clone({ ...this.props.data.chessboardPredict, selected, posibleMoves: [] }))
      await this.props.addToListHandler(clone({ ...this.props.data.chessBoardItems.current, kingChecks, pieces, turn }));
    }
  }

  getBorderColor(row: number, column: number) {
    if (Object.values(this.props.data.chessBoardItems.current.kingChecks).filter(moves => this.isCellPresent(row, column, moves as ICell[])).length > 0) {
      return 1;
    }
    if (this.props.data.chessboardPredict.afterCheckMoves.filter((moves: ICell[]) => this.isCellPresent(row, column, moves)).length > 0) {
      return 4;
    }
    if (this.isCellPresent(row, column, this.props.data.chessboardPredict.posibleMoves)) {
      return 2;
    }
    return 3;
  }

  async resetPredictState() {
    await this.getKingChecks(this.props.data.chessBoardItems.current.pieces);
    await this.props.updatePredictHandler(clone({
      ...this.props.data.chessboardPredict,
      selected: { row: -1, column: -1, piece: undefined },
      posibleMoves: []
    }))
  }

  async onClickPre() {
    if (this.props.data.chessBoardItems.previous.length === 0) {
      return;
    }
    await this.props.previousStateHandler();
    await this.resetPredictState();
  }

  async onClickNext() {
    if (this.props.data.chessBoardItems.next.length === 0) {
      return;
    }
    await this.props.nextStateHandler();
    await this.resetPredictState();
  }

  onClickClose() {
    this.setState({
      showPopup: false
    });
  }

  onPramotePawn(piece: IPiece) {
    if(this.state.pramotePawn !== undefined) {
      const { pieces } = this.props.data.chessBoardItems.current;
      const { row, column } = this.state.pramotePawn.cell;
      pieces[row][column] = piece;
    }
    this.setState({
      pramotePawn: undefined,
      showPopup: false
    });
  }

  render() {
    return (
      <>
        <ActionContainer>
          <TimeContainer>
            {this.state.timer}
          </TimeContainer>
        </ActionContainer>
        {
          this.props.data.chessBoardItems.current !== undefined &&
          <MainContainer>
            <DeathPiece borderColor='#d9c8c8'>
              {
                this.props.data.chessBoardItems.current.deathPieces &&
                this.props.data.chessBoardItems.current.deathPieces.filter((piece: IPiece) => piece.color === 'white').map((piece: IPiece, _: number) => piece.icon())
              }
            </DeathPiece>
            <ChessContainer>
              {
                [...Array(8)].map((x, row) =>
                  <RowFlex>
                    {
                      [...Array(8)].map((y, column) =>
                        <Box onClick={() => this.onClickCell(row, column, this.props.data.chessBoardItems.current.pieces[row][column])}
                          color={(row + column) % 2 === 0 ? '#a96868' : '#d9c8c8'}
                          borderColor={COLOR_SIZE[this.getBorderColor(row, column)].color}
                          borderSize={COLOR_SIZE[this.getBorderColor(row, column)].size}
                          disabled={
                            (!this.isCellPresent(row, column, this.props.data.chessboardPredict.posibleMoves) && this.props.data.chessboardPredict.selected.piece !== undefined &&
                              this.props.data.chessBoardItems.current.pieces[row][column]?.color !== this.props.data.chessBoardItems.current.turn) ||
                            (this.props.data.chessboardPredict.selected.piece === undefined &&
                              this.props.data.chessBoardItems.current.pieces[row][column]?.color !== this.props.data.chessBoardItems.current.turn)
                          }
                        >
                          {this.props.data.chessBoardItems.current.pieces[row][column]?.icon()}
                        </Box>
                      )
                    }
                  </RowFlex>
                )}
            </ChessContainer>
            <DeathPiece borderColor='#a96868'>
              {
                this.props.data.chessBoardItems.current.deathPieces &&
                this.props.data.chessBoardItems.current.deathPieces.filter((piece: IPiece) => piece.color === 'black').map((piece: IPiece, _: number) => piece.icon())
              }
            </DeathPiece>
          </MainContainer>
        }
        <ActionContainer>
          <Button onClick={() => this.onClickPre()}>Previous</Button>
          <Button onClick={() => this.onClickNext()}>Next</Button>
        </ActionContainer>
        {
          this.state.showPopup && this.state.pramotePawn !== undefined &&
          <PopUp>
            <PopUpContainer>
            <RowFlex>
              {
                this.promotePawn[this.state.pramotePawn?.color].map((piece, _) =>
                  <Box onClick={() => this.onPramotePawn(piece)}
                    color={'#a96868'}
                    borderColor={COLOR_SIZE[3].color}
                    borderSize={COLOR_SIZE[3].size}
                  >
                    {piece?.icon()}
                  </Box>
                )
              }
            </RowFlex>
            </PopUpContainer>
          </PopUp>
        }
      </>
    );
  }
}

export default ChessBoard;

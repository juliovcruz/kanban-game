import GlobalStyle from "./styles/global";
import { CardBoard, Column } from "./components/cardBoard";
import { HeaderBoard } from "./components/headerBoard";
import { useState } from "react";
import { ActionType } from "./model/ActionType";
import { generateColumns } from "./data/mock";
import { CardTaskClass } from "./model/CardTask";

export class PlayerRoundPoints {
  analysis!: number;
  develop!: number;
  test!: number;

  clear() {
    this.analysis = 0;
    this.develop = 0;
    this.test = 0;
  }

  // TODO: receive player info
  nextRound() {
    // Math.floor(Math.random() * (max - min + 1) + min)
    this.analysis = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    this.develop = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    this.test = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  }
}

export class BoardInfo {
  columns!: Column[];
}

export class RoundInfo {
  number!: number;
  playerRoundPoints!: PlayerRoundPoints;

  nextRound() {
    this.number++;
    this.playerRoundPoints.nextRound();
  }

  getDayName(): string {
    if (this.number == 0) {
      return "";
    }

    switch (this.number % 10) {
      case 0:
        return "Sexta-Feira";
      case 1:
        return "Segunda-Feira";
      case 2:
        return "Terça-Feira";
      case 3:
        return "Quarta-Feira";
      case 4:
        return "Quinta-Feira";
      case 5:
        return "Sexta-Feira";
      case 6:
        return "Segunda-Feira";
      case 7:
        return "Terça-Feira";
      case 8:
        return "Quarta-Feira";
      case 9:
        return "Quinta-Feira";
      case 10:
        return "Sexta-Feira";
    }
    return "";
  }

  todayCanBeDeploy(): Boolean {
    const day = this.number % 10;
    if (day == 2 || day == 4 || day == 7 || day == 10) return true;
    return false;
  }
}

export type ErrorState = {
  bool: Boolean;
  message: string;
};

export default function App() {
  const [round, setRound] = useState<RoundInfo>();
  const [board, setBoard] = useState<BoardInfo>();

  function getColumnsRight(columns: Column[]): Column[] {
    let result: Column[] = []

    columns.forEach( (val) => {
      result.push({
        ...val,
        cards: getCardsRight(val.cards)
      })
    })

    return result
  }

  function getCardsRight(cards: CardTaskClass[]): CardTaskClass[] {
    let result: CardTaskClass[] = []

    cards.forEach( (val) => {
      result.push({
        ...val,
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
      })
    })

    return result
  }

  if ( round == undefined) {
    const dataRound = localStorage.getItem('round')

    if(dataRound != null) {
      const parsed: RoundInfo = JSON.parse(dataRound)

      const roundInfo: RoundInfo = {
        ...parsed,
        nextRound: RoundInfo.prototype.nextRound,
        getDayName: RoundInfo.prototype.getDayName,
        todayCanBeDeploy: RoundInfo.prototype.todayCanBeDeploy,
        playerRoundPoints: {
          ...parsed.playerRoundPoints,
          clear: PlayerRoundPoints.prototype.clear,
          nextRound: PlayerRoundPoints.prototype.nextRound,
        }
      }
      setRound(roundInfo)

      localStorage.setItem('round', JSON.stringify(roundInfo))
    } else{
      const roundInfo = {
        number: 0,
        nextRound: RoundInfo.prototype.nextRound,
        getDayName: RoundInfo.prototype.getDayName,
        todayCanBeDeploy: RoundInfo.prototype.todayCanBeDeploy,
        playerRoundPoints: {
          analysis: 0,
          develop: 0,
          test: 0,
          clear: PlayerRoundPoints.prototype.clear,
          nextRound: PlayerRoundPoints.prototype.nextRound,
        },
      }
      setRound(roundInfo)

    localStorage.setItem('round', JSON.stringify(roundInfo))
    }
  }

  if(board == undefined) {
    const dataColumns = localStorage.getItem('columns')

    if(dataColumns != null) {
      const boardInfo: BoardInfo = {
        columns: JSON.parse(dataColumns)
      }

      boardInfo.columns = getColumnsRight(boardInfo.columns)

      const boardRight: BoardInfo = {
        columns: getColumnsRight(boardInfo.columns)
      }

      setBoard(boardRight)
      return
    } else{
      const boardInfo = {columns: generateColumns()}
      setBoard(boardInfo)

    localStorage.setItem('columns', JSON.stringify(boardInfo.columns))
    }
  }

  const nextRound = () => {
    const newRound = Object.assign({}, round);
    newRound.playerRoundPoints.clear();
    newRound.nextRound();

    if(board != undefined) localStorage.setItem('columns', JSON.stringify(board.columns))
    localStorage.setItem('round', JSON.stringify(newRound))

    setRound(newRound);
  };

  const usePoint = (type: ActionType) => {
    const newRound = Object.assign({}, round);
    
    switch (type) {
      case ActionType.PRODUCT_OWNER:
        if (newRound.playerRoundPoints.analysis <= 0) {
          return false;
        }
        newRound.playerRoundPoints.analysis--;
        break;
      case ActionType.DEVELOPER:
        if (newRound.playerRoundPoints.develop <= 0) {
          return false;
        }
        newRound.playerRoundPoints.develop--;
        break;
      case ActionType.QUALITY_ASSURANCE:
        if (newRound.playerRoundPoints.test <= 0) {
          return false;
        }
        newRound.playerRoundPoints.test--;
        break;
    }

    if(board != undefined) localStorage.setItem('columns', JSON.stringify(board.columns))

    setRound(newRound);
    return true;
  };

  return (
    <>
      <HeaderBoard roundInfo={round!} nextRoundAction={nextRound}></HeaderBoard>
      <CardBoard
        roundInfo={round!}
        usePoint={usePoint}
        paramsColumns={board?.columns}
      ></CardBoard>
      <GlobalStyle />
    </>
  );
}

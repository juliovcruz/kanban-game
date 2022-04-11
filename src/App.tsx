import GlobalStyle from "./styles/global";
import { CardBoard, CardColumn } from "./components/cardBoard";
import { HeaderBoard } from "./components/headerBoard";
import { useState } from "react";
import { ActionType } from "./model/ActionType";
import { generateColumns, generateEmployeeColumns, startRound } from "./data/mock";
import { Database } from "./data/database";
import { CardTaskClass } from "./model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { EmployeeBoard } from "./components/employeeBoard";

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
  columns!: CardColumn[];

  newCards(cards: CardTaskClass[]) {
    cards.forEach( (card) => {
      this.columns[0].cards.push(card)
    })
  }
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

export type Params = {
  database: Database
}

export const App: React.FC<Params> = ({database}) => {
  const [round, setRound] = useState<RoundInfo>();
  const [board, setBoard] = useState<BoardInfo>();

  if ( round == undefined) {
    const dataRound = database.getRound()

    if(dataRound != null) {
      setRound(dataRound)
      return
    } else {
      const roundInfo = startRound()

      setRound(roundInfo)
      database.setRound(roundInfo)
    }
  }

  if(board == undefined) {
    const dataColumns = database.getColumns()

    if(dataColumns != null) {
      const boardInfo: BoardInfo = {
        columns: dataColumns,
        newCards: BoardInfo.prototype.newCards,
      }

      setBoard(boardInfo)
      return
    } else {
      const boardInfo = {columns: generateColumns(), newCards: BoardInfo.prototype.newCards,}
      setBoard(boardInfo)

      database.setColumns(boardInfo.columns)
    }
  }

  const nextRound = () => {
    const newRound = Object.assign({}, round);
    newRound.playerRoundPoints.clear();
    newRound.nextRound();

    if(board != undefined) database.setColumns(board.columns)
    database.setRound(newRound)

    

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

    if(board != undefined) database.setColumns(board.columns)

    setRound(newRound);
    return true;
  };

  return (
    <>
      <HeaderBoard roundInfo={round!} nextRoundAction={nextRound}></HeaderBoard>
      <EmployeeBoard
        roundInfo={round!}
        paramsColumns={generateEmployeeColumns()}
        database={database}
      ></EmployeeBoard>
      <CardBoard
        roundInfo={round!}
        usePoint={usePoint}
        paramsColumns={board?.columns}
        database={database}
      ></CardBoard>
      <GlobalStyle />
    </>
  );
}

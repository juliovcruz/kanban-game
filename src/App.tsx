import GlobalStyle from "./styles/global";
import { CardBoard, CardColumn } from "./components/cardBoard";
import { HeaderBoard } from "./components/headerBoard";
import { useState } from "react";
import { ActionType } from "./model/ActionType";
import { generateColumns, generateEmployeeColumns, startRound } from "./data/mock";
import { Database } from "./data/database";
import { CardTaskClass } from "./model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { EmployeeBoard, EmployeeColumn } from "./components/employeeBoard";

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
  nextRound(employeeColumns: EmployeeColumn[]) {
    const analysis = employeeColumns.filter((x) => x.type == ActionType.PRODUCT_OWNER)[0].employees.length;
    const develop = employeeColumns.filter((x) => x.type == ActionType.DEVELOPER)[0].employees.length;
    console.log(develop)
    const test = employeeColumns.filter((x) => x.type == ActionType.QUALITY_ASSURANCE)[0].employees.length;

    // Math.floor(Math.random() * (max - min + 1) + min)
    this.analysis = Math.floor(Math.random() * ( (4 * analysis) - analysis + 1) + analysis);
    this.develop = Math.floor(Math.random() * ( (4*develop) - develop + 1) + develop);
    this.test = Math.floor(Math.random() * ( (4*test) - test + 1) + test);
  }
}

export class PlayerInfo {
  lastPrice!: number;
  actualPrice!: number;
}

export class BoardInfo {
  cardColumns!: CardColumn[];
  employeeColumns!: EmployeeColumn[];
  playerInfo!: PlayerInfo

  newCards(cards: CardTaskClass[]) {
    cards.forEach( (card) => {
      this.cardColumns[0].cards.push(card)
    })
  }
}

export class RoundInfo {
  number!: number;
  playerRoundPoints!: PlayerRoundPoints;

  nextRound(employeeColumns: EmployeeColumn[]) {
    this.number++;
    this.playerRoundPoints.nextRound(employeeColumns);
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
    const cardColumns = database.getCardColumns()
    const employeeColumns = database.getEmployeeColumns()
    const playerInfo = database.getPlayerInfo()

    if(cardColumns != null && employeeColumns != null && playerInfo != null) {
      const boardInfo: BoardInfo = {
        cardColumns: cardColumns,
        employeeColumns: employeeColumns,
        playerInfo: playerInfo,
        newCards: BoardInfo.prototype.newCards,
      }

      setBoard(boardInfo)
      return
    } else {
      const boardInfo = {
        cardColumns: generateColumns(), 
        employeeColumns: generateEmployeeColumns(),
        playerInfo: {
          lastPrice: 0,
          actualPrice: 0
        },
        newCards: BoardInfo.prototype.newCards
      }
      setBoard(boardInfo)

      database.setCardColumns(boardInfo.cardColumns)
      database.setEmployeeColumns(boardInfo.employeeColumns)
      database.setPlayerInfo(boardInfo.playerInfo)
    }
  }

  const nextRound = () => {
    const newRound = Object.assign({}, round);
    newRound.playerRoundPoints.clear();
    // TODO: melhorar esse lógica e não consultar do database
    const employeeColumns = database.getEmployeeColumns()!;
    newRound.nextRound(employeeColumns != null? employeeColumns: board!.employeeColumns);

    if(board != undefined) {
      board.playerInfo.lastPrice = board.playerInfo.actualPrice
      board.playerInfo.actualPrice += getEmployeePrice(employeeColumns)

      setBoard(board)
      database.setCardColumns(board.cardColumns)
      database.setPlayerInfo(board.playerInfo)
    }
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

    if(board != undefined) database.setCardColumns(board.cardColumns)

    setRound(newRound);
    return true;
  };

  return (
    <>
      <HeaderBoard roundInfo={round!} nextRoundAction={nextRound} playerInfo={board?.playerInfo}></HeaderBoard>
      <EmployeeBoard
        roundInfo={round!}
        paramsColumns={board?.employeeColumns}
        database={database}
      ></EmployeeBoard>
      <CardBoard
        employeesDeploy={board?.employeeColumns[3].employees}
        roundInfo={round!}
        usePoint={usePoint}
        paramsColumns={board?.cardColumns}
        database={database}
      ></CardBoard>
      <GlobalStyle />
    </>
  );
}

function getEmployeePrice(columns: EmployeeColumn[]) {
  let price: number = 0

  columns.forEach((column) => {
    column.employees.forEach((employee) => {
      price+= employee.price
    })
  })

  return price
}
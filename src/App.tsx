import GlobalStyle from "./styles/global";
import { CardBoard, CardColumn } from "./components/cardBoard";
import { HeaderBoard } from "./components/headerBoard";
import { useState } from "react";
import { ActionType } from "./model/ActionType";
import { generateCardPowerUp, generateColumns, generateEmployeeByMainAction, generateEmployeeColumns, generateProjectColumns, startRound } from "./data/mock";
import { Database } from "./data/database";
import { CardTaskClass } from "./model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { EmployeeBoard, EmployeeColumn } from "./components/employeeBoard";
import { ProjectBoard, ProjectColumn } from "./components/projectBoard";
import IconButton from '@material-ui/core/IconButton';
import FlagBR from './assets/flags/br.svg'
import FlagUS from './assets/flags/us.svg'
import { Language } from "./model/Language";
import { getPriceByPowerUp } from "./components/shopDrawer";

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

export enum PlayerPowerUps {
  AUTOMATION, // não precisa ninguem no deploy
  CI_CD, // pode realizar deploy todo dia
  NEW_DEV,
  NEW_PO,
  NEW_QA,
  TRAIN_DEV_TO_ACTION_PO,
  TRAIN_DEV_TO_ACTION_QA,
  TRAIN_PO_TO_ACTION_QA,
  TRAIN_QA_TO_ACTION_PO,
  TRAIN_QA_TO_ACTION_DEV
}

export type PlayerInfo = {
  lastPrice: number;
  actualPrice: number;
  powerUps: PlayerPowerUps[]
  language: Language
  lastBuy: number
}

export class BoardInfo {
  cardColumns!: CardColumn[];
  employeeColumns!: EmployeeColumn[];
  projectColumns!: ProjectColumn[];
  playerInfo!: PlayerInfo;

  newCards(cards: CardTaskClass[]) {
    cards.forEach( (card) => {
      this.cardColumns[0].cards.push(card)
    })
  }

  buyPowerUp(roundInfo: RoundInfo) {
    this.playerInfo =  {
      ...this.playerInfo,
      lastBuy: roundInfo.number
    }
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
  const [round, setRound] = useState<RoundInfo>(startStateRound());
  const [board, setBoard] = useState<BoardInfo>(startBoard());

  function startStateRound(): RoundInfo {
    const dataRound = database.getRound()

    if(dataRound != null) {
      return dataRound
    } else {
      const roundInfo = startRound()

      database.setRound(roundInfo)

      return roundInfo
    }
  }

  function startBoard(): BoardInfo {
    const cardColumns = database.getCardColumns()
    const employeeColumns = database.getEmployeeColumns()
    const projectColumns = database.getProjectColumns()
    const playerInfo = database.getPlayerInfo()

    if(cardColumns != null && employeeColumns != null && playerInfo != null && projectColumns != null) {
      return {
        cardColumns: cardColumns,
        employeeColumns: employeeColumns,
        playerInfo: playerInfo,
        projectColumns: projectColumns,
        newCards: BoardInfo.prototype.newCards,
        buyPowerUp: BoardInfo.prototype.buyPowerUp
      }
    } else {
      const boardInfo = {
        cardColumns: generateColumns(), 
        employeeColumns: generateEmployeeColumns(),
        projectColumns: generateProjectColumns(),
        playerInfo: {
          lastPrice: 0,
          actualPrice: 0,
          powerUps: [],
          language: Language.BR,
          lastBuy: 0
        },
        newCards: BoardInfo.prototype.newCards,
        buyPowerUp: BoardInfo.prototype.buyPowerUp,
      }

      database.setCardColumns(boardInfo.cardColumns)
      database.setEmployeeColumns(boardInfo.employeeColumns)
      database.setPlayerInfo(boardInfo.playerInfo)
      database.setProjectColumns(boardInfo.projectColumns)

      return boardInfo
    }
  }

  const nextRound = () => {
    const newRound = Object.assign({}, round);
    newRound.playerRoundPoints.clear();
    // TODO: melhorar esse lógica e não consultar do database
    // const employeeColumns = database.getEmployeeColumns()!;
    //const cardColumns = database.getCardColumns()!;
    newRound.nextRound(board!.employeeColumns);

    if(board != undefined) {
      board.playerInfo.lastPrice = board.playerInfo.actualPrice
      board.playerInfo.actualPrice += getEmployeePrice(board.employeeColumns)
      board.playerInfo.actualPrice += getCardPrice(board.cardColumns)
      board.playerInfo.actualPrice += getProjectPrice(board.projectColumns, newRound)

      setBoard(board)
      database.setCardColumns(board.cardColumns)
      database.setPlayerInfo(board.playerInfo)
    }
    database.setRound(newRound)

    setRound(newRound);
  };

  const updateCardColumns = (cardColumns: CardColumn[]) => {
    setBoard(
      {
      ...board,
      cardColumns: cardColumns,
      playerInfo: board!.playerInfo,
      employeeColumns: board!.employeeColumns,
      projectColumns: board!.projectColumns,
      newCards: BoardInfo.prototype.newCards,
      buyPowerUp: BoardInfo.prototype.buyPowerUp,
      }
    )
  }

  const updateProjectColumns = (projectColumns: ProjectColumn[]) => {
    setBoard(
      {
      ...board,
      projectColumns: projectColumns,
      playerInfo: board!.playerInfo,
      employeeColumns: board!.employeeColumns,
      cardColumns: board!.cardColumns,
      newCards: BoardInfo.prototype.newCards,
      buyPowerUp: BoardInfo.prototype.buyPowerUp,
      }
    )
  }

  const updateEmployeeColumns = (employeeColumns: EmployeeColumn[]) => {
    setBoard(
      {
      ...board,
      employeeColumns: employeeColumns,
      cardColumns: board!.cardColumns,
      playerInfo: board!.playerInfo,
      projectColumns: board!.projectColumns,
      newCards: BoardInfo.prototype.newCards,
      buyPowerUp: BoardInfo.prototype.buyPowerUp,
      }
    )
  }

  const updateLanguage = (language: Language) => {
    setBoard(
      {
      ...board,
      employeeColumns: board!.employeeColumns,
      cardColumns: board!.cardColumns,
      playerInfo: {
        ...board!.playerInfo,
        language: language
      },
      projectColumns: board!.projectColumns,
      newCards: BoardInfo.prototype.newCards,
      buyPowerUp: BoardInfo.prototype.buyPowerUp,
      }
    )
  }

  const addNewCards = (cards: CardTaskClass[]) => {
    board!.newCards(cards)

    setBoard(board)
    database.setCardColumns(board!.cardColumns)
  }

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

  const finishPowerUp = (powerUp: PlayerPowerUps) => {
    switch (powerUp) {
      case PlayerPowerUps.NEW_DEV: {
        const columns = board!.employeeColumns
        const newDevColumn = board!.employeeColumns[1].employees
        newDevColumn.push(generateEmployeeByMainAction(ActionType.DEVELOPER))
        columns[1].employees = newDevColumn
  
        board!.buyPowerUp(round!)

        setBoard(
          {
            ...board,
            employeeColumns: columns,
            cardColumns: board!.cardColumns,
            playerInfo: board!.playerInfo,
            projectColumns: board!.projectColumns,
            newCards: BoardInfo.prototype.newCards,
            buyPowerUp: BoardInfo.prototype.buyPowerUp,
            }
        )
      }
    }
  }

  const newPowerUp = (powerUp: PlayerPowerUps) => {
    if(board!.playerInfo.lastBuy == round!.number) {
      return
    }

    board!.playerInfo.lastPrice = board!.playerInfo.actualPrice
    board!.playerInfo.actualPrice += getPriceByPowerUp(powerUp)

    if(powerUp == PlayerPowerUps.NEW_DEV) {
      const columns = board!.cardColumns
      const newBacklogColumn = board!.cardColumns[0].cards
      newBacklogColumn.push(generateCardPowerUp(powerUp))
      columns[0].cards = newBacklogColumn

      board?.buyPowerUp(round!)
      
      setBoard(
        {
          ...board,
          cardColumns: columns,
          playerInfo: board!.playerInfo,
          employeeColumns: board!.employeeColumns,
          projectColumns: board!.projectColumns,
          newCards: BoardInfo.prototype.newCards,
          buyPowerUp: BoardInfo.prototype.buyPowerUp,
          }
      )

      database.setCardColumns(board!.cardColumns)
    }
  }

  return (
    <>
      <HeaderBoard 
      roundInfo={round!} 
      nextRoundAction={nextRound} 
      playerInfo={board!.playerInfo}
      newPowerUp={newPowerUp}></HeaderBoard>
      <ProjectBoard
      roundInfo={round!}
      paramsColumns={board?.projectColumns}
      updateProjectColumns={updateProjectColumns}
      addNewCards={addNewCards}
      database={database}
      ></ProjectBoard>
      <EmployeeBoard
        roundInfo={round!}
        paramsColumns={board?.employeeColumns}
        updateEmployeeColumns={updateEmployeeColumns}
        database={database}
      ></EmployeeBoard>
      <CardBoard
        employeesDeploy={board?.employeeColumns[3].employees}
        roundInfo={round!}
        usePoint={usePoint}
        paramsColumns={board?.cardColumns}
        updateCardColumns={updateCardColumns}
        database={database}
        finishPowerUp={finishPowerUp}
      ></CardBoard>
      {board!.playerInfo.language == Language.BR ? <img src={FlagBR} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.EN)}></img> : <img src={FlagUS} style={{ height: 53, width: 36 }} onClick={() => updateLanguage(Language.BR)}></img>}
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

function getCardPrice(columns: CardColumn[]) {
  let price: number = 0

  columns.forEach((column) => {
    column.cards.forEach((card) => {
      if(card.roundEnded == null) price+= card.price
    })
  })

  return price
}

function getProjectPrice(columns: ProjectColumn[], roundInfo: RoundInfo) {
  let price: number = 0

  columns.forEach((column) => {
    column.projects.forEach((project) => {
      if(project.roundStarted != null && project.roundEnded == null) price+= project.price
      if(project.deadLine > roundInfo.number) price+= project.price
    })
  })

  return price
}
import { PlayerInfo, RoundInfo } from "../App";
import { CardColumn } from "../components/cardBoard";
import { EmployeeColumn } from "../components/employeeBoard";
import { CardTaskClass } from "../model/CardTask";
import { Employee } from "../model/Employee";

export interface Database {
    getCardColumns(): CardColumn[] | null
    setCardColumns(columns: CardColumn[]): void

    getRound(): RoundInfo | null
    setRound(roundInfo: RoundInfo): void

    getEmployeeColumns(): EmployeeColumn[] | null
    setEmployeeColumns(columns: EmployeeColumn[]): void

    setPlayerInfo(playerInfo: PlayerInfo): void
    getPlayerInfo(): PlayerInfo | null
}


export function getEmployeeColumnsAfterParse(columns: EmployeeColumn[]): EmployeeColumn[] {
  let result: EmployeeColumn[] = [];

  columns.forEach((val) => {
    result.push({
      ...val,
      employees: getEmployeeAfterParse(val.employees),
    });
  });

  return result;
}

function getEmployeeAfterParse(cards: Employee[]): Employee[] {
  let result: Employee[] = [];

  cards.forEach((val) => {
    result.push({
      ...val,
      canBeMoveTo: Employee.prototype.canBeMoveTo,
    });
  });

  return result;
}


export function getCardColumnsAfterParse(columns: CardColumn[]): CardColumn[] {
    let result: CardColumn[] = [];
  
    columns.forEach((val) => {
      result.push({
        ...val,
        cards: getCardsRight(val.cards),
      });
    });
  
    return result;
  }
  
  function getCardsRight(cards: CardTaskClass[]): CardTaskClass[] {
    let result: CardTaskClass[] = [];
  
    cards.forEach((val) => {
      result.push({
        ...val,
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
      });
    });
  
    return result;
  }
  
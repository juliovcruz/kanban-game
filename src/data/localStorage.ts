import { PlayerRoundPoints, RoundInfo } from "../App";
import { CardColumn } from "../components/cardBoard";
import { EmployeeColumn } from "../components/employeeBoard";
import { Database, getCardColumnsAfterParse, getEmployeeColumnsAfterParse } from "./database";

export class LocalStorage implements Database {
  getCardColumns(): CardColumn[] | null {
    const dataColumns = localStorage.getItem("columns");

    if (dataColumns != null) {
      return getCardColumnsAfterParse(JSON.parse(dataColumns));
    }

    return null;
  }
  
  setCardColumns(columns: CardColumn[]): void {
    localStorage.setItem("columns", JSON.stringify(columns));
  }

  getEmployeeColumns(): EmployeeColumn[] | null {
    const dataColumns = localStorage.getItem("employees");

    if (dataColumns != null) {
      return getEmployeeColumnsAfterParse(JSON.parse(dataColumns))
    }

    return null;
  }

  setEmployeeColumns(columns: EmployeeColumn[]): void {
    localStorage.setItem("employees", JSON.stringify(columns));
  }

  getRound(): RoundInfo | null {
    const dataRound = localStorage.getItem("round");

    if (dataRound != null) {
      const parsed: RoundInfo = JSON.parse(dataRound);

      return {
        ...parsed,
        nextRound: RoundInfo.prototype.nextRound,
        getDayName: RoundInfo.prototype.getDayName,
        todayCanBeDeploy: RoundInfo.prototype.todayCanBeDeploy,
        playerRoundPoints: {
          ...parsed.playerRoundPoints,
          clear: PlayerRoundPoints.prototype.clear,
          nextRound: PlayerRoundPoints.prototype.nextRound,
        },
      };
    }
    return null;
  }

  setRound(roundInfo: RoundInfo): void {
    localStorage.setItem("round", JSON.stringify(roundInfo));
  }
}

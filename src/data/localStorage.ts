import { PlayerRoundPoints, RoundInfo } from "../App";
import { Column } from "../components/cardBoard";
import { Database, getColumnsRight } from "./database";

export class LocalStorage implements Database {
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

  getColumns(): Column[] | null {
    const dataColumns = localStorage.getItem("columns");

    if (dataColumns != null) {
      return getColumnsRight(JSON.parse(dataColumns));
    }

    return null;
  }

  setColumns(columns: Column[]): void {
    localStorage.setItem("columns", JSON.stringify(columns));
  }
}

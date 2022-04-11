import { RoundInfo } from "../App";
import { Column } from "../components/cardBoard";
import { CardTaskClass } from "../model/CardTask";

export interface Database {
    getColumns(): Column[] | null
    setColumns(columns: Column[]): void

    getRound(): RoundInfo | null
    setRound(roundInfo: RoundInfo): void
}


export function getColumnsRight(columns: Column[]): Column[] {
    let result: Column[] = [];
  
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
  
import { RoundInfo } from "../App";
import { CardColumn } from "../components/cardBoard";
import { CardTaskClass } from "../model/CardTask";

export interface Database {
    getColumns(): CardColumn[] | null
    setColumns(columns: CardColumn[]): void

    getRound(): RoundInfo | null
    setRound(roundInfo: RoundInfo): void
}


export function getColumnsRight(columns: CardColumn[]): CardColumn[] {
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
  
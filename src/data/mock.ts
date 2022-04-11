import { Column } from "../components/cardBoard";
import { ActionType } from "../model/ActionType";
import { CardTaskClass } from "../model/CardTask";

export function generateColumns(): Column[] {
    return [
      {
        id: uuidv4(),
        name: "Backlog",
        cards: generateCards(),
        type: ActionType.BACKLOG,
      },
      {
        id: uuidv4(),
        name: "Em análise",
        cards: [],
        type: ActionType.PRODUCT_OWNER,
      },
      {
        id: uuidv4(),
        name: "Em desenvolvimento",
        cards: [],
        type: ActionType.DEVELOPER,
      },
      {
        id: uuidv4(),
        name: "Em testes",
        cards: [],
        type: ActionType.QUALITY_ASSURANCE,
      },
      {
        id: uuidv4(),
        name: "Aguardando deploy",
        cards: [],
        type: ActionType.DEPLOY,
      },
      {
        id: uuidv4(),
        name: "Em produção",
        cards: [],
        type: ActionType.PRODUCTION,
      },
    ];
  }
  
  export function generateCards(): CardTaskClass[] {
    return [
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        lastMove: -1,
        name: "UST01",
        index: 1,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 1,
            needed: 4,
          },
          develop: {
            inserted: 3,
            needed: 5,
          },
          test: {
            inserted: 4,
            needed: 5,
          },
        },
      },
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        lastMove: -1,
        name: "UST02",
        index: 2,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 1,
            needed: 4,
          },
          develop: {
            inserted: 3,
            needed: 5,
          },
          test: {
            inserted: 4,
            needed: 5,
          },
        },
      },
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        lastMove: -1,
        name: "UST03",
        index: 4,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 1,
            needed: 4,
          },
          develop: {
            inserted: 3,
            needed: 5,
          },
          test: {
            inserted: 4,
            needed: 5,
          },
        },
      },
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        lastMove: -1,
        name: "UST04",
        index: 5,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 1,
            needed: 4,
          },
          develop: {
            inserted: 3,
            needed: 5,
          },
          test: {
            inserted: 4,
            needed: 5,
          },
        },
      },
    ];
  }

function uuidv4(): string {
    throw new Error("Function not implemented.");
}
  
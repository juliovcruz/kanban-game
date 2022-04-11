import { CardColumn } from "../components/cardBoard";
import { ActionType } from "../model/ActionType";
import { CardTaskClass } from "../model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { PlayerRoundPoints, RoundInfo } from "../App";
import { EmployeeColumn } from "../components/employeeBoard";
import { Employee } from "../model/Employee";

export function startRound(): RoundInfo {
  return {
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
}

export function generateColumns(): CardColumn[] {
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
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        name: "UST01",
        index: 1,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 0,
            needed: 4,
          },
          develop: {
            inserted: 0,
            needed: 5,
          },
          test: {
            inserted: 0,
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
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        name: "UST02",
        index: 2,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 0,
            needed: 4,
          },
          develop: {
            inserted: 0,
            needed: 5,
          },
          test: {
            inserted: 0,
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
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        name: "UST03",
        index: 4,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 0,
            needed: 4,
          },
          develop: {
            inserted: 0,
            needed: 5,
          },
          test: {
            inserted: 0,
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
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        name: "UST04",
        index: 5,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 0,
            needed: 4,
          },
          develop: {
            inserted: 0,
            needed: 5,
          },
          test: {
            inserted: 0,
            needed: 5,
          },
        },
      },
    ];
  }

  export function generateEmployeeColumns(): EmployeeColumn[] {
    return [
      {
        employees: [
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.PRODUCT_OWNER],
            id: uuidv4(),
            name: 'Tali'
          }
        ],
        id: uuidv4(),
        name: 'PO',
        type: ActionType.PRODUCT_OWNER
      },
      {
        employees: [
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.DEVELOPER, ActionType.DEPLOY],
            id: uuidv4(),
            name: 'Dani'
          },
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.DEVELOPER, ActionType.DEPLOY, ActionType.QUALITY_ASSURANCE],
            id: uuidv4(),
            name: 'Esther'
          },
        ],
        id: uuidv4(),
        name: 'DEV',
        type: ActionType.DEVELOPER
      },
      {
        employees: [
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.QUALITY_ASSURANCE],
            id: uuidv4(),
            name: 'Gui'
          }
        ],
        id: uuidv4(),
        name: 'QA',
        type: ActionType.QUALITY_ASSURANCE
      },
      {
        employees: [],
        id: uuidv4(),
        name: 'DEPLOY',
        type: ActionType.DEPLOY
      }
    ]
  }

  function generateEmployeeCards(): Employee[] {
    return [
      {
        canBeMoveTo: Employee.prototype.canBeMoveTo,
        actions: [ActionType.PRODUCT_OWNER],
        id: uuidv4(),
        name: 'Joao'
      },
      {
        canBeMoveTo: Employee.prototype.canBeMoveTo,
        actions: [ActionType.PRODUCT_OWNER, ActionType.DEVELOPER],
        id: uuidv4(),
        name: 'Pedro'
      }
    ]
  }
import { CardColumn } from "../components/cardBoard";
import { ActionType } from "../model/ActionType";
import { CardTaskClass } from "../model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { Day, PlayerPowerUps, PlayerRoundPoints, RoundInfo } from "../App";
import { EmployeeColumn } from "../components/employeeBoard";
import { Employee } from "../model/Employee";
import { Project, ProjectDifficulty, ProjectStatus } from "../model/Project";
import { ProjectColumn } from "../components/projectBoard";
import { getText, Language, LanguageText } from "../model/Language";

export function startRound(): RoundInfo {
  return {
    number: 0,
    day: Day.MONDAY,
    nextRound: RoundInfo.prototype.nextRound,
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
        name: getText(LanguageText.BACKLOG, Language.EN),
        cards: [],
        type: ActionType.BACKLOG,
      },
      {
        id: uuidv4(),
        name: getText(LanguageText.IN_ANALYSIS, Language.EN),
        cards: [],
        type: ActionType.PRODUCT_OWNER,
      },
      {
        id: uuidv4(),
        name: getText(LanguageText.IN_DEVELOPMENT, Language.EN),
        cards: [],
        type: ActionType.DEVELOPER,
      },
      {
        id: uuidv4(),
        name: getText(LanguageText.IN_TESTS, Language.EN),
        cards: [],
        type: ActionType.QUALITY_ASSURANCE,
      },
      {
        id: uuidv4(),
        name: getText(LanguageText.WAITING_DEPLOY, Language.EN),
        cards: [],
        type: ActionType.DEPLOY,
      },
      {
        id: uuidv4(),
        name: getText(LanguageText.IN_PRODUCTION, Language.EN),
        cards: [],
        type: ActionType.PRODUCTION,
      },
    ];
  }
  
  export function generateCards(project: Project): CardTaskClass[] {
    return [
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        projectId: project.id,
        projectName: project.name,
        price: 0,
        cardBug: false,
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
        projectId: project.id,
        projectName: project.name,
        price: 0,
        cardBug: false,
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
        projectId: project.id,
        projectName: project.name,
        price: 1000,
        cardBug: true,
        index: 4,
        id: uuidv4(),
        number: 3,
        pontuation: {
          analysis: {
            inserted: 0,
            needed: 1,
          },
          develop: {
            inserted: 0,
            needed: 1,
          },
          test: {
            inserted: 0,
            needed: 1,
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
        projectId: project.id,
        projectName: project.name,
        price: 1000,
        cardBug: true,
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
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        projectId: project.id,
        projectName: project.name,
        price: 1000,
        cardBug: true,
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
      {
        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
        addPointTest: CardTaskClass.prototype.addPointTest,
        setLastMove: CardTaskClass.prototype.setLastMove,
        start: CardTaskClass.prototype.start,
        end: CardTaskClass.prototype.end,
        lastMove: -1,
        projectId: project.id,
        projectName: project.name,
        price: 1000,
        cardBug: true,
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
            mainAction: ActionType.PRODUCT_OWNER,
            name: 'Tali',
            roundMovedToDeploy: 0,
            price: 100
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
            mainAction: ActionType.DEVELOPER,
            name: 'Dani',
            roundMovedToDeploy: 0,
            price: 100
          },
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.DEVELOPER, ActionType.DEPLOY, ActionType.QUALITY_ASSURANCE],
            id: uuidv4(),
            name: 'Esther',
            mainAction: ActionType.DEVELOPER,
            roundMovedToDeploy: 0,
            price: 100
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
            name: 'Gui',
            mainAction: ActionType.QUALITY_ASSURANCE,
            roundMovedToDeploy: 0,
            price: 100
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

export function generateProjectColumns(): ProjectColumn[] {
  return [
    {
      id: uuidv4(),
      name: getText(LanguageText.BACKLOG, Language.EN),
      status: ProjectStatus.TO_DO,
      projects: generateProjects()
    },
    {
      id: uuidv4(),
      name: getText(LanguageText.IN_DEVELOPMENT, Language.EN),
      status: ProjectStatus.IN_PROGRESS,
      projects: []
    },
    {
      id: uuidv4(),
      name: getText(LanguageText.DONE, Language.EN),
      status: ProjectStatus.DONE,
      projects: []
    }
  ]
}

function generateProjects(): Project[] {
  return [
    {
      id: uuidv4(),
      name: 'A',
      status: ProjectStatus.TO_DO,
      difficulty: ProjectDifficulty.EASY,
      price: 250,
      deadLine: 10,
      start: Project.prototype.start,
      end: Project.prototype.end,
      generateCards: Project.prototype.generateCards,
      canBeDone: Project.prototype.canBeDone
    },
    {
      id: uuidv4(),
      name: 'B',
      status: ProjectStatus.TO_DO,
      difficulty: ProjectDifficulty.MEDIUM,
      price: 250,
      deadLine: 10,
      start: Project.prototype.start,
      end: Project.prototype.end,
      generateCards: Project.prototype.generateCards,
      canBeDone: Project.prototype.canBeDone
    },
  ]
}

export function generateCardPowerUp(powerUp: PlayerPowerUps): CardTaskClass {
  return {
    canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
    addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
    addPointDevelop: CardTaskClass.prototype.addPointDevelop,
    addPointTest: CardTaskClass.prototype.addPointTest,
    setLastMove: CardTaskClass.prototype.setLastMove,
    start: CardTaskClass.prototype.start,
    end: CardTaskClass.prototype.end,
    lastMove: -1,
    name: PlayerPowerUps[powerUp],
    projectId: 'P',
    projectName: 'P',
    price: 0,
    cardBug: false,
    powerUp: powerUp,
    index: 4,
    id: uuidv4(),
    number: 3,
    pontuation: {
      analysis: {
        inserted: 0,
        needed: 1,
      },
      develop: {
        inserted: 0,
        needed: 1,
      },
      test: {
        inserted: 0,
        needed: 1,
      },
    },
  }
}

export function generateEmployeeByMainAction(action: ActionType): Employee {
  let name = 'Julin'

  return {
    canBeMoveTo: Employee.prototype.canBeMoveTo,
    actions: [action],
    id: uuidv4(),
    mainAction: action,
    name: name,
    roundMovedToDeploy: 0,
    price: 100
  }
}
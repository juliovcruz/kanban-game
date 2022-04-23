import { CardColumn } from "../components/cardBoard";
import { ActionType } from "../model/ActionType";
import { CardTaskClass } from "../model/CardTask";
import { v4 as uuidv4 } from "uuid";
import { Day, PlayerPowerUps, PlayerRoundPoints, RoundEvent, RoundInfo } from "../App";
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
        archived: false,
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
        archived: false,
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
        archived: false,
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
        archived: false,
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
        archived: false,
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
        archived: false,
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
            price: 150
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
            name: 'Julin',
            roundMovedToDeploy: 0,
            price: 120
          },
          {
            canBeMoveTo: Employee.prototype.canBeMoveTo,
            actions: [ActionType.DEVELOPER, ActionType.DEPLOY, ActionType.QUALITY_ASSURANCE],
            id: uuidv4(),
            name: 'Esther',
            mainAction: ActionType.DEVELOPER,
            roundMovedToDeploy: 0,
            price: 140
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
            price: 130
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
      price: 200,
      deadLine: 15,
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
      price: 200,
      deadLine: 15,
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
    archived: false,
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

export function generateEmployeeByMainAction(action: ActionType, cardRoundStart: number): Employee {
  return {
    canBeMoveTo: Employee.prototype.canBeMoveTo,
    actions: [action],
    id: uuidv4(),
    mainAction: action,
    name: getNameByRoundStart(cardRoundStart),
    roundMovedToDeploy: 0,
    price: 150
  }
}

function getNameByRoundStart(cardRoundStart: number): string {
  if(cardRoundStart < 6) return 'Fafa'
  if(cardRoundStart < 11) return 'Lucas'
  if(cardRoundStart < 16) return 'Dayane'
  if(cardRoundStart < 21) return 'Dani'
  if(cardRoundStart < 26) return 'Marcos'
  if(cardRoundStart < 31) return 'Lander'
  return 'Victor'
}

export function getRoundEvent(roundNumber: number): RoundEvent | undefined {
  const eventMap = new Map<number, RoundEvent>([
    [5,   {
      newProject: {
        id: uuidv4(),
        name: 'C',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.MEDIUM,
        price: 220,
        deadLine: 25,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
    [10,   {
      newProject: {
        id: uuidv4(),
        name: 'D',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.MEDIUM,
        price: 320,
        deadLine: 25,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
    [15,   {
      newProject: {
        id: uuidv4(),
        name: 'E',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.EASY,
        price: 400,
        deadLine: 25,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
    [25,   {
      newProject: {
        id: uuidv4(),
        name: 'F',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.HARD,
        price: 280,
        deadLine: 35,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
    [35,   {
      newProject: {
        id: uuidv4(),
        name: 'G',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.HARD,
        price: 280,
        deadLine: 45,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
    [45,   {
      newProject: {
        id: uuidv4(),
        name: 'H',
        status: ProjectStatus.TO_DO,
        difficulty: ProjectDifficulty.HARD,
        price: 500,
        deadLine: 50,
        start: Project.prototype.start,
        end: Project.prototype.end,
        generateCards: Project.prototype.generateCards,
        canBeDone: Project.prototype.canBeDone
      }
    }],
  ]);

  return eventMap.get(roundNumber)
}
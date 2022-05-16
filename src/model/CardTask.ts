import { PlayerInfo, PlayerPowerUps, RoundInfo } from "../App";
import { ActionType } from "./ActionType";
import { Employee } from "./Employee";
import { LanguageText } from "./Language";

export type BooleanResponse = {
  bool: Boolean;
  text?: LanguageText;
  message?: string;
};

export class CardTaskClass {
  id!: string;
  price: number = 0;
  cardBug: boolean = false
  projectId!: string;
  projectName!: string;
  name!: string;
  index!: number;
  number!: number;
  pontuation!: CardTaskPontuation;
  lastMove: number = -1;
  roundStarted?: number;
  roundEnded?: number;
  powerUp?: PlayerPowerUps
  archived: boolean = false

  setLastMove(roundInfo: RoundInfo) {
    this.lastMove = roundInfo.number
  }

  start(roundInfo: RoundInfo) {
    this.roundStarted = roundInfo.number
  }

  end(roundInfo: RoundInfo) {
    this.roundEnded = roundInfo.number
  }

  canBeMoveTo(
    destinationType: ActionType,
    actualColumnType: ActionType,
    deployDay: Boolean,
    employeesDeploy: Employee[] | undefined,
    roundInfo: RoundInfo,
    playerInfo: PlayerInfo
  ): BooleanResponse {
    switch (destinationType) {
      case ActionType.BACKLOG:
        return { bool: true };
      case ActionType.PRODUCT_OWNER:
        return { bool: true };
      case ActionType.DEVELOPER:
        return { 
            bool: this.pontuation.analysis.inserted == this.pontuation.analysis.needed,
            text: LanguageText.ERROR_CARD_MOVE_DEVELOPER_WRONG
          };
      case ActionType.QUALITY_ASSURANCE:
        return { 
          bool: this.pontuation.develop.inserted == this.pontuation.develop.needed,
          text: LanguageText.ERROR_CARD_MOVE_TEST_WRONG
        };
      case ActionType.DEPLOY:
        return { 
          bool: this.pontuation.test.inserted == this.pontuation.test.needed,
          text: LanguageText.ERROR_CARD_MOVE_DEPLOY_WRONG
        };
      case ActionType.PRODUCTION:
        if(this.pontuation.test.inserted != this.pontuation.test.needed) {
          return {bool: false, text: LanguageText.ERROR_CARD_PRODUCTION_NO_DAY}
        }

        if(playerInfo.powerUps.some(e => e === PlayerPowerUps.AUTOMATION) && deployDay) {
          return { bool: true }
        }

        if(playerInfo.powerUps.some(e => e === PlayerPowerUps.CI_CD)) {
          return { bool: true }
        }

        if(employeesDeploy == undefined || !ifCanBeDeploy(employeesDeploy, roundInfo.number)) {
          return { 
            bool: false,
            text: LanguageText.ERROR_CARD_PRODUCTION_NO_EMPLOYEE
          };
        }

        return { 
          bool: deployDay,
          text: LanguageText.ERROR_CARD_PRODUCTION_NO_DAY
        };
      case ActionType.ARCHIVED:
        return { bool: true };
    }
  }

  addPointAnalysis(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MOVED_THIS_ROUND
      }
    }

    if (actualColumnType != ActionType.PRODUCT_OWNER) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_COLUMN_WRONG
      }
    }

    if (this.pontuation.analysis.inserted == this.pontuation.analysis.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MAX_PONTUATION
      };
    }

    this.pontuation.analysis.inserted++;
    return { bool: true };
  }

  addPointDevelop(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MOVED_THIS_ROUND
      }
    }

    if (actualColumnType != ActionType.DEVELOPER) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_COLUMN_WRONG
      };
    }

    if (this.pontuation.develop.inserted == this.pontuation.develop.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MAX_PONTUATION
      };
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_NEED_ANALYSIS
      };
    }

    this.pontuation.develop.inserted++;
    return { bool: true };
  }

  addPointTest(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MOVED_THIS_ROUND
      }
    }

    if (actualColumnType != ActionType.QUALITY_ASSURANCE) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_COLUMN_WRONG
      };
    }

    if (this.pontuation.test.inserted == this.pontuation.test.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_MAX_PONTUATION
      };
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_NEED_ANALYSIS
      };
    }

    if (this.pontuation.develop.inserted != this.pontuation.develop.needed) {
      return {
        bool: false,
        text: LanguageText.ERROR_CARD_PONTUATION_NEED_DEVELOPMENT
      };
    }

    this.pontuation.test.inserted++;
    return { bool: true };
  }
}

export type CardTaskPontuation = {
  develop: Pontuation;
  analysis: Pontuation;
  test: Pontuation;
};

export type Pontuation = {
  needed: number;
  inserted: number;
};


function ifCanBeDeploy(employee: Employee[], roundNumber: number): Boolean {
  for(let i =0;i<employee.length ;i++) {
    if (employee[i].roundMovedToDeploy < roundNumber) return true
  }
  return false
}
import { RoundInfo } from "../App";
import { ActionType } from "./ActionType";
import { Employee } from "./Employee";

export type BooleanResponse = {
  bool: Boolean;
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

  setLastMove(roundInfo: RoundInfo) {
    this.lastMove = roundInfo.number
  }

  start(roundInfo: RoundInfo) {
    this.roundStarted = roundInfo.number
    console.log('started: ' + this.roundStarted)
  }

  end(roundInfo: RoundInfo) {
    this.roundEnded = roundInfo.number
    console.log('ended: ' + this.roundEnded)
  }

  canBeMoveTo(
    destinationType: ActionType,
    actualColumnType: ActionType,
    deployDay: Boolean,
    employeesDeploy: Employee[] | undefined,
    roundInfo: RoundInfo
  ): BooleanResponse {
    switch (destinationType) {
      case ActionType.BACKLOG:
        return { bool: true };
      case ActionType.PRODUCT_OWNER:
        return { bool: true };
      case ActionType.DEVELOPER:
        return { 
            bool: this.pontuation.analysis.inserted == this.pontuation.analysis.needed,
            message: 'Não é possível mover para desenvolvimento.'
          };
      case ActionType.QUALITY_ASSURANCE:
        return { 
          bool: this.pontuation.develop.inserted == this.pontuation.develop.needed,
          message: 'Não é possível mover para testes.'
        };
      case ActionType.DEPLOY:
        return { 
          bool: this.pontuation.test.inserted == this.pontuation.test.needed,
          message: 'Não é possível mover para deploy.'
        };
      case ActionType.PRODUCTION:
        if(employeesDeploy == undefined || !ifCanBeDeploy(employeesDeploy, roundInfo.number)) {
          console.log('here')
          return { 
            bool: false,
            message: 'Não é possível realizar o deploy, por que não foi alocado um funcionário para essa função.'
          };
        }
        return { 
          bool: actualColumnType == ActionType.DEPLOY &&
          deployDay &&
          this.pontuation.test.inserted == this.pontuation.test.needed,
          message: 'Não é possível mover para produção hoje.'
        };
      case ActionType.ARCHIVED:
        return { bool: true };
    }
  }

  addPointAnalysis(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        message: "Não é possível pontuar em uma tarefa que acabou de ser movida",
      }
    }

    if (actualColumnType != ActionType.PRODUCT_OWNER) {
      return {
        bool: false,
        message: "Não é possível utilizar nesta coluna.",
      }
    }

    if (this.pontuation.analysis.inserted == this.pontuation.analysis.needed) {
      return {
        bool: false,
        message: "O máximo de pontuação já foi utilizado.",
      };
    }

    this.pontuation.analysis.inserted++;
    return { bool: true };
  }

  addPointDevelop(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        message: "Não é possível pontuar em uma tarefa que acabou de ser movida",
      }
    }

    if (actualColumnType != ActionType.DEVELOPER) {
      return {
        bool: false,
        message: "Não é possível utilizar nesta coluna.",
      };
    }

    if (this.pontuation.develop.inserted == this.pontuation.develop.needed) {
      return {
        bool: false,
        message: "O máximo de pontuação já foi utilizado.",
      };
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      return {
        bool: false,
        message: "Necessário realizar a análise.",
      };
    }

    this.pontuation.develop.inserted++;
    return { bool: true };
  }

  addPointTest(actualColumnType: ActionType, roundInfo: RoundInfo): BooleanResponse {
    if(this.lastMove == roundInfo.number) {
      return {
        bool: false,
        message: "Não é possível pontuar em uma tarefa que acabou de ser movida",
      }
    }

    if (actualColumnType != ActionType.QUALITY_ASSURANCE) {
      return {
        bool: false,
        message: "Não é possível utilizar nesta coluna.",
      };
    }

    if (this.pontuation.test.inserted == this.pontuation.test.needed) {
      return {
        bool: false,
        message: "O máximo de pontuação já foi utilizado.",
      };
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      return {
        bool: false,
        message: "Necessário realizar a análise.",
      };
    }

    if (this.pontuation.develop.inserted != this.pontuation.develop.needed) {
      return {
        bool: false,
        message: "Necessário realizar o desenvolvimento.",
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
import { ActionType } from "./ActionType";

export type BooleanResponse = {
  bool: Boolean;
  message?: string;
};

export class CardTaskClass {
  name!: string;
  index!: number;
  id!: string;
  number!: number;
  pontuation!: CardTaskPontuation;

  canBeMoveTo(
    destinationType: ActionType,
    actualColumnType: ActionType,
    deployDay: Boolean
  ): Boolean {
    switch (destinationType) {
      case ActionType.BACKLOG:
        return true;
      case ActionType.PRODUCT_OWNER:
        return true;
      case ActionType.DEVELOPER:
        return (
          this.pontuation.analysis.inserted == this.pontuation.analysis.needed
        );
      case ActionType.QUALITY_ASSURANCE:
        return (
          this.pontuation.develop.inserted == this.pontuation.develop.needed
        );
      case ActionType.DEPLOY:
        return this.pontuation.test.inserted == this.pontuation.test.needed;
      case ActionType.PRODUCTION:
        return (
          actualColumnType == ActionType.DEPLOY &&
          deployDay &&
          this.pontuation.test.inserted == this.pontuation.test.needed
        );
      case ActionType.ARCHIVED:
        return true;
    }
  }

  addPointAnalysis(actualColumnType: ActionType): BooleanResponse {
    if (actualColumnType != ActionType.PRODUCT_OWNER) {
      return {
        bool: false,
        message: "Não é possível utilizar nesta coluna.",
      };
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

  addPointDevelop(actualColumnType: ActionType): BooleanResponse {
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

  addPointTest(actualColumnType: ActionType): BooleanResponse {
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

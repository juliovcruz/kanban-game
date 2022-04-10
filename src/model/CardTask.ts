import { ActionType } from "./ActionType";

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

  addPointAnalysis(actualColumnType: ActionType): Boolean {
    if (actualColumnType != ActionType.PRODUCT_OWNER) {
      console.log("column errada" + actualColumnType);
      return false;
    }

    if (this.pontuation.analysis.inserted == this.pontuation.analysis.needed) {
      console.log("chegou no limite");
      return false;
    }

    this.pontuation.analysis.inserted++;
    return true;
  }

  addPointDevelop(actualColumnType: ActionType): Boolean {
    if (actualColumnType != ActionType.DEVELOPER) {
      console.log("column errada" + actualColumnType);
      return false;
    }

    if (this.pontuation.develop.inserted == this.pontuation.develop.needed) {
      console.log("chegou no limite");
      return false;
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      console.log("necessário analisar primeiro");
      return false;
    }

    this.pontuation.develop.inserted++;
    return true;
  }

  addPointTest(actualColumnType: ActionType): Boolean {
    if (actualColumnType != ActionType.QUALITY_ASSURANCE) {
      console.log("column errada" + actualColumnType.toString);
      return false;
    }

    if (this.pontuation.test.inserted == this.pontuation.test.needed) {
      console.log("chegou no limite");
      return false;
    }

    if (this.pontuation.analysis.inserted != this.pontuation.analysis.needed) {
      console.log("necessário analisar primeiro");
      return false;
    }

    if (this.pontuation.develop.inserted != this.pontuation.develop.needed) {
      console.log("necessário desenvolver primeiro");
      return false;
    }

    this.pontuation.test.inserted++;
    return true;
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

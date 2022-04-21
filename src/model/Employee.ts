import { RoundInfo } from "../App";
import { ActionType } from "./ActionType";
import { BooleanResponse } from "./CardTask";
import { LanguageText } from "./Language";

export class Employee {
    id!: string
    name!: string
    mainAction!: ActionType
    actions!: ActionType[]
    roundMovedToDeploy: number = 0
    price!: number

    canBeMoveTo(
        destinationType: ActionType,
        actualColumnType: ActionType,
        roundInfo: RoundInfo
      ): BooleanResponse {
        if(!this.actions.some(item => item == destinationType)) {
            return {
                bool: false,
                text: LanguageText.ERROR_EMPLOYEE_ACTION_WRONG
            }
        }

        if(destinationType === ActionType.DEPLOY) this.roundMovedToDeploy = roundInfo.number

        return {bool: true}
      }
}

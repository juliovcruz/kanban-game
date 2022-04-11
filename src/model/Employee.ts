import { RoundInfo } from "../App";
import { ActionType } from "./ActionType";
import { BooleanResponse } from "./CardTask";

export class Employee {
    id!: string
    name!: string
    actions!: ActionType[]
    roundMovedToDeploy: number = 0

    canBeMoveTo(
        destinationType: ActionType,
        actualColumnType: ActionType,
        roundInfo: RoundInfo
      ): BooleanResponse {
        if(!this.actions.some(item => item == destinationType)) {
            return {
                bool: false,
                message: 'Esse funcionário não consegue relizar essa função.'
            }
        }

        if(destinationType === ActionType.DEPLOY) this.roundMovedToDeploy = roundInfo.number

        return {bool: true}
      }
}

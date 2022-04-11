import { ActionType } from "./ActionType";
import { BooleanResponse } from "./CardTask";

export class Employee {
    id!: string
    name!: string
    actions!: ActionType[]

    canBeMoveTo(
        destinationType: ActionType,
        actualColumnType: ActionType,
      ): BooleanResponse {


        if(!this.actions.some(item => item == destinationType)) {
            return {
                bool: false,
                message: 'Esse funcionário não consegue relizar essa função.'
            }
        }

        return {bool: true}
      }
}

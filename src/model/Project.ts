import { RoundInfo } from "../App"
import { CardColumn } from "../components/cardBoard"
import { generateCards } from "../data/mock"
import { CardTaskClass } from "./CardTask"
import { v4 as uuidv4 } from "uuid";

export class Project {
    id!: string
    name!: string
    status!: ProjectStatus
    difficulty!: ProjectDifficulty
    price!: number
    roundStarted?: number
    roundEnded?: number
    deadLine!: number

    start(roundInfo: RoundInfo, addNewCards: (cards: CardTaskClass[]) => void) {
        this.roundStarted = roundInfo.number
        addNewCards(this.generateCards())
    }

    end(roundInfo: RoundInfo, addNewCards: (cards: CardTaskClass[]) => void) {
        this.roundEnded = roundInfo.number
        addNewCards(this.generateCards())
    }

    generateCards(): CardTaskClass[] {
        switch(this.difficulty) {
            case ProjectDifficulty.EASY: {
                return generateCards(this)
            }
            case ProjectDifficulty.MEDIUM: {
                return [
                    {
                        canBeMoveTo: CardTaskClass.prototype.canBeMoveTo,
                        addPointAnalysis: CardTaskClass.prototype.addPointAnalysis,
                        addPointDevelop: CardTaskClass.prototype.addPointDevelop,
                        addPointTest: CardTaskClass.prototype.addPointTest,
                        setLastMove: CardTaskClass.prototype.setLastMove,
                        start: CardTaskClass.prototype.start,
                        end: CardTaskClass.prototype.end,
                        projectId: this.id,
                        projectName: this.name,
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
                ]
            }
        }
        return generateCards(this)
    }

    canBeDone(columns: CardColumn[]): Boolean {
        let bool: boolean = true
        columns.forEach((column) => {
          column.cards.forEach((card) => {
            const cardFinally = Object.assign({}, card);
            if(cardFinally.projectId == this.id && cardFinally.roundEnded == undefined) bool = false
          })
        })
        return bool
      }
}

export enum ProjectStatus {
    TO_DO,
    IN_PROGRESS,
    DONE
}

export enum ProjectDifficulty {
    EASY,
    MEDIUM,
    HARD
}


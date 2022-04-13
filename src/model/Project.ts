import { RoundInfo } from "../App"
import { CardColumn } from "../components/cardBoard"
import { generateCards } from "../data/mock"
import { CardTaskClass } from "./CardTask"

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
        }
        return generateCards(this)
    }

    canBeDone(columns: CardColumn[]): Boolean {
        columns.forEach((column) => {
          column.cards.filter((card) => {card.projectId == this.id}).forEach((card) => {
            if(card.roundEnded == null) return false
          })
        })
      
        return true
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


import { RoundInfo } from "../App"
import { CardColumn } from "../components/cardBoard"
import { generateCard, generateCards } from "../data/mock"
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
      const cards: CardTaskClass[] = []

      let cardsEasy = 0;
      let cardsMedium = 0;
      let cardsHard = 0;

        switch(this.difficulty) {
            case ProjectDifficulty.EASY: {
                cardsEasy = 3
                break;
            }
            case ProjectDifficulty.MEDIUM: {
              cardsEasy = 2
              cardsMedium = 2
              break;
            }
            case ProjectDifficulty.HARD: {
              cardsEasy = 1
              cardsMedium = 3
              cardsHard = 4
              break;
            }
        }

        for(let i = 1; i <= cardsEasy; i++) {
          cards.push(
            generateCard(this, 3, 1, "TST"+i)
          )
        }

        for(let i = 1; i <= cardsMedium; i++) {
          cards.push(
            generateCard(this, 8, 4, "TST"+i)
          )
        }

        for(let i = 1; i <= cardsHard; i++) {
          cards.push(
            generateCard(this, 15, 8, "TST"+i)
          )
        }

        return cards
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


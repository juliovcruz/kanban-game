export class Project {
    id!: string
    name!: string
    status!: ProjectStatus
    difficulty!: ProjectDifficulty
    price!: number
    roundStarted?: number
    roundEnded?: number
    deadLine!: number
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
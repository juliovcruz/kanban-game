export class Project {
    id!: string
    name!: string
    status!: ProjectStatus
    difficulty!: ProjectDifficulty
    price!: number
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
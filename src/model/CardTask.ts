export type CardTask = {
    name: string;
    index: number;
    id: string;
    number: number;
    pontuation: CardTaskPontuation;
}

export type CardTaskPontuation = {
    develop: Pontuation;
    analysis: Pontuation;
    test: Pontuation;
}

export type Pontuation = {
    needed: number;
    inserted: number;
}
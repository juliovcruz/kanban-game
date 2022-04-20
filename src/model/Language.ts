export enum Language {
    BR,
    EN
  }

export enum LanguageText {
    COST_TOTAL,
    POWER_UP_AUTOMATION,
    POWER_UP_CI_CD,
    POWER_UP_NEW_DEV,
    POWER_UP_NEW_PO,
    POWER_UP_NEW_QA,
    POWER_UP_TRAIN_DEV_TO_ACTION_PO,
    POWER_UP_TRAIN_DEV_TO_ACTION_QA,
    POWER_UP_TRAIN_PO_TO_ACTION_QA,
    POWER_UP_TRAIN_PO_TO_ACTION_DEV,
    POWER_UP_TRAIN_QA_TO_ACTION_PO,
    POWER_UP_TRAIN_QA_TO_ACTION_DEV,
    POWER_UP_AUTOMATION_DESCRIPTION,
    POWER_UP_CI_CD_DESCRIPTION,
    POWER_UP_NEW_DEV_DESCRIPTION,
    POWER_UP_NEW_PO_DESCRIPTION,
    POWER_UP_NEW_QA_DESCRIPTION,
    POWER_UP_TRAIN_DEV_TO_ACTION_PO_DESCRIPTION,
    POWER_UP_TRAIN_DEV_TO_ACTION_QA_DESCRIPTION,
    POWER_UP_TRAIN_PO_TO_ACTION_QA_DESCRIPTION,
    POWER_UP_TRAIN_PO_TO_ACTION_DEV_DESCRIPTION,
    POWER_UP_TRAIN_QA_TO_ACTION_PO_DESCRIPTION,
    POWER_UP_TRAIN_QA_TO_ACTION_DEV_DESCRIPTION,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SHOP,
    ROUND,
    NEXT_ROUND,
    DEPLOY_DAY,
    BACKLOG,
    IN_ANALYSIS,
    IN_DEVELOPMENT,
    IN_TESTS,
    WAITING_DEPLOY,
    IN_PRODUCTION,
    DONE,
    RESET_BOARD,
    RESET_BOARD_DESCRIPTION
}

export type LanguageResult = {
    br: string,
    en: string
}

const textMap = new Map<LanguageText, LanguageResult>([
    [LanguageText.COST_TOTAL, {br: 'Custo atual do projeto: $', en: 'Actual cost of project: $'}],
    [LanguageText.POWER_UP_AUTOMATION, {br: 'Automação', en: 'Automation'}],
    [LanguageText.POWER_UP_CI_CD, {br: 'Entrega conínua', en: 'Continuos Delivery'}],
    [LanguageText.POWER_UP_NEW_DEV, {br: 'Contratar DEV', en: 'To hire DEV'}],
    [LanguageText.POWER_UP_NEW_PO, {br: 'Contratar PO', en: 'To hire PO'}],
    [LanguageText.POWER_UP_NEW_QA, {br: 'Contratar QA', en: 'To hire QA'}],
    [LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_PO, {br: 'Treinar DEV como PO', en: 'Train DEV like PO'}],
    [LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_QA, {br: 'Treinar DEV como QA', en: 'Train DEV like QA'}],
    [LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_QA, {br: 'Treinar PO como QA', en: 'Train PO like QA'}],
    [LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_DEV, {br: 'Treinar PO como DEV', en: 'Train PO like DEV'}],
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_PO, {br: 'Treinar QA como PO', en: 'Train QA like PO'}],
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_DEV, {br: 'Treinar QA como DEV', en: 'Train QA like DEV'}],
    [LanguageText.POWER_UP_AUTOMATION_DESCRIPTION, {br: 'Ao comprar essa melhoria você automatiza seu processo.', en: 'in progress'}],
    [LanguageText.POWER_UP_CI_CD_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá realiar integrações contínuas.', en: 'in progress'}],
    [LanguageText.POWER_UP_NEW_DEV_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá contratar um novo desenvolvedor.', en: 'in progress'}],
    [LanguageText.POWER_UP_NEW_PO_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá contratar um novo product owner.', en: 'in progress'}],
    [LanguageText.POWER_UP_NEW_QA_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá contratar um novo quality assurance.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_PO_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um desenvolvedor para atuar como product owner.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_DEV_TO_ACTION_QA_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um desenvolvedor para atuar como quality assurance.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_QA_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um product owner para atuar como quality assurance.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_PO_TO_ACTION_DEV_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um product owner para atuar como desenvolvedor.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_PO_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um quality assurance para atuar como product owner.', en: 'in progress'}],
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_DEV_DESCRIPTION, {br: 'Ao comprar essa melhoria você irá treinar um quality assurance para atuar como desenvolvedor.', en: 'in progress'}],
    [LanguageText.MONDAY, {br: 'Segunda-feira', en: 'Monday'}],
    [LanguageText.TUESDAY, {br: 'Terça-feira', en: 'Tuesday'}],
    [LanguageText.WEDNESDAY, {br: 'Quarta-feira', en: 'Wednesday'}],
    [LanguageText.THURSDAY, {br: 'Quinta-feira', en: 'Thursday'}],
    [LanguageText.FRIDAY, {br: 'Sexta-feira', en: 'Friday'}],
    [LanguageText.SHOP, {br: 'LOJA', en: 'SHOP'}],
    [LanguageText.ROUND, {br: 'RODADA', en: 'ROUND'}],
    [LanguageText.NEXT_ROUND, {br: 'PRÓXIMA RODADA', en: 'NEXT ROUND'}],
    [LanguageText.DEPLOY_DAY, {br: 'Dia de Deploy', en: 'Deploy day'}],
    [LanguageText.BACKLOG, {br: 'A fazer', en: 'Backlog'}],
    [LanguageText.IN_ANALYSIS, {br: 'Em análise', en: 'In analysis'}],
    [LanguageText.IN_DEVELOPMENT, {br: 'Em desenvolvimento', en: 'Development'}],
    [LanguageText.IN_TESTS, {br: 'Em testes', en: 'Test'}],
    [LanguageText.WAITING_DEPLOY, {br: 'Aguardando deploy', en: 'Waiting Deploy'}],
    [LanguageText.IN_PRODUCTION, {br: 'Em produção', en: 'Production'}],
    [LanguageText.DONE, {br: 'Feito', en: 'Done'}],
    [LanguageText.RESET_BOARD, {br: 'Reiniciar jogo', en: 'Reset game'}],
    [LanguageText.RESET_BOARD_DESCRIPTION, {br: 'Todo o seu progresso será perdido, você tem certeza que deseja reiniciar o jogo?', en: 'Your progress will be lost, are you sure to restart the game?'}],
]);

export function getText(text: LanguageText, language: Language): string {
    const result = textMap.get(text)!
    if(language == Language.BR) return result.br
    return result.en
}
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
    POWER_UP_TRAIN_QA_TO_ACTION_PO,
    POWER_UP_TRAIN_QA_TO_ACTION_DEV
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
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_PO, {br: 'Treinar QA como PO', en: 'Train QA like PO'}],
    [LanguageText.POWER_UP_TRAIN_QA_TO_ACTION_DEV, {br: 'Treinar QA como DEV', en: 'Train QA like DEV'}],
]);

export function getText(text: LanguageText, language: Language): string {
    const result = textMap.get(text)!
    if(language == Language.BR) return result.br
    return result.en
}
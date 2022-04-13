export enum Language {
    BR,
    EN
  }

export enum LanguageText {
    COST_TOTAL
}

export type LanguageResult = {
    br: string,
    en: string
}

const textMap = new Map<LanguageText, LanguageResult>([
    [LanguageText.COST_TOTAL, {br: 'Custo atual do projeto: $', en: 'Actual cost of project: $'}],
]);

export function getText(text: LanguageText, language: Language): string {
    const result = textMap.get(text)!
    if(language == Language.BR) return result.br
    return result.en
}
import { ActionType } from "../model/ActionType"

export const base = {
    background: '#282A36',
    background_2: '#383A59',
    background_3: '#7159C1',
    purple: '#BD93F9',
    dark_purple: '#7C49A8',
    dark_purple_2: '#7B1FA2',
    dark_purple_3: '#6A1B9A',
    light_purple: '#E6A0FA',
    green: '#03D481',
    blue: '#B0DDE9',
    red: '#EF7064',
    grey: '#6A6577',
    white: '#FFFFFF',
    orange: '#FA3C16'
}

export function ColorByActionType(actionType: ActionType): string {
    if(actionType == ActionType.PRODUCT_OWNER) return base.green
    if(actionType == ActionType.DEVELOPER) return base.blue
    return base.red
}
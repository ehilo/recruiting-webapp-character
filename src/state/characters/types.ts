import { CLASS_LIST, SKILL_LIST } from '../../consts';

export const SKILL_NAMES = SKILL_LIST.map(s => s.name);
export const CLASS_NAMES = Object.keys(CLASS_LIST);

export interface Attribute {
    attribute: string,
    value: number,
    modifier: number
}

export interface Skill {
    skill: string,
    value: number,
    modifierPrefix: string,
    modifierValue: number
}

export interface CharacterClass {
    class: string,
    meetsRequirements: boolean
}

export interface Character {
    id: number,
    attributes: Attribute[],
    skills: Skill[],
    classes: CharacterClass[],
    maxSkillPoints: number,
    spentSkillPoints: number,
    spentAttributes: number
}

export interface CharacterState {
    characters: Character[],
    nextCharacterId: number,
    alertMessage: string
}

export interface UpdateCharacterAttributePayload {
    characterId: number,
    attribute: string,
    newValue: number
}

export interface UpdateCharacterSkillPayload {
    characterId: number,
    skill: string,
    newValue: number
}

export interface LoadCharactersResponse {
    statusCode: number,
    body: CharacterState
}

export interface SaveCharactersResponse {
    statusCode: number,
    body: string
}
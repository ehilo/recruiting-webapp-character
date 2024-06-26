import { ATTRIBUTE_LIST, SKILL_LIST } from "../../consts";
import { Character, Attribute, Skill, CharacterClass, CLASS_NAMES } from "./types";

export function createNewCharacter(newID: number): Character {
    const newCharacter: Character = {
        id: newID,
        attributes: [...defaultAttributes],
        skills: [...defaultSkills],
        classes: [...defaultClasses],
        maxSkillPoints: 10,
        spentSkillPoints: 0,
        spentAttributes: 60
    }

    return newCharacter;
}

const defaultAttributes = ATTRIBUTE_LIST.map<Attribute>(att => ({
    attribute: att,
    value: 10,
    modifier: 0
}));

const defaultSkills = SKILL_LIST.map<Skill>(skill => ({
    skill: skill.name,
    value: 0,
    modifierValue: 0,
    modifierPrefix: skill.attributeModifier.slice(0, 3)
}));

const defaultClasses = CLASS_NAMES.map<CharacterClass>(c => ({
    class: c,
    meetsRequirements: false
}));
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CharacterState, UpdateCharacterAttributePayload, UpdateCharacterSkillPayload } from './types'
import { CLASS_LIST, MAX_ATTRIBUTE_POINTS, SKILL_LIST } from '../../consts.js';
import { createNewCharacter } from './helper';

const initialState: CharacterState = {
  characters: [],
  nextCharacterId: 1,
  alertMessage: ""
}

function calculateModifier(attributeValue: number): number {
    const baseModifier = -5; 
    
    // Attribute value of 1 or below should be the base
    // which also accounts for negatives
    if (attributeValue <= 1)
        return baseModifier;

    // Calc multiples of 2, rounding down and add to base
    return baseModifier + Math.floor(attributeValue / 2);
}

function calculateSkillPoints(modifier: number): number {
  const basePoints = 10;
  const multiplier = 4;

  const skillPoints = basePoints + (multiplier * modifier);
  
  return skillPoints > 0 ? skillPoints : 0;
}

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    loadCharacters: (state, action: PayloadAction<CharacterState>) => {
        return action.payload;
    },
    addNewCharacter: (state) => {
        state.characters.push(createNewCharacter(state.nextCharacterId));
        state.nextCharacterId += 1;
    },
    deleteCharacters: (state) => {
        return initialState;
    },
    updateAtrribute: (state,  action: PayloadAction<UpdateCharacterAttributePayload>) => {
        const characterToUpdate = state.characters.find((character) => character.id === action.payload.characterId);
        if(characterToUpdate) {
            const attributeToUpdate = characterToUpdate.attributes.find((attribute) => attribute.attribute === action.payload.attribute);

            if(attributeToUpdate) {
                if(attributeToUpdate.value > action.payload.newValue || characterToUpdate.spentAttributes < MAX_ATTRIBUTE_POINTS) {
                    const modifier = calculateModifier(action.payload.newValue);

                    // Update value and modifier
                    attributeToUpdate.value = action.payload.newValue;
                    attributeToUpdate.modifier = modifier;
                    characterToUpdate.spentAttributes = characterToUpdate.attributes.reduce((total, currentValue) => total + currentValue.value, 0);
    
                    // Update skill points if it's Intelligence
                    if (attributeToUpdate.attribute === 'Intelligence') { // Todo: Remove magic strings
                        characterToUpdate.maxSkillPoints = calculateSkillPoints(modifier);
                    }
    
                    // Update the modifier on any skill that uses this attribute
                    const skillsToModify = SKILL_LIST.filter(s => s.attributeModifier === attributeToUpdate.attribute)
                    if(skillsToModify) {
                        for (const skillItem of skillsToModify) {
                            let skillToUpdate = characterToUpdate.skills.find((skill) => skill.skill === skillItem.name);
                            if(skillToUpdate) {
                                skillToUpdate.modifierValue = modifier;
                            }
                        }
                    }
    
                    // Update whether the list of classes meet requirements
                    for (const classItem of characterToUpdate.classes) {
                        // @ts-ignore   *** Need to either refactor or resolve the error.  Code works because JS isn't type safe
                        const meetsRequirements = characterToUpdate.attributes.every(attribute => attribute.value >= CLASS_LIST[classItem.class][attribute.attribute]);
                        classItem.meetsRequirements = meetsRequirements;
                    }
                } else {
                    state.alertMessage = `Maximumn attribute points of ${MAX_ATTRIBUTE_POINTS} have been allocated`;
                }
            }
        }
    },
    updateSkill: (state,  action: PayloadAction<UpdateCharacterSkillPayload>) => {
        const characterToUpdate = state.characters.find((character) => character.id === action.payload.characterId);
        if(characterToUpdate) {
            const skillToUpdate = characterToUpdate.skills.find((skill) => skill.skill === action.payload.skill);
            if(skillToUpdate) {
                if(skillToUpdate.value > action.payload.newValue || characterToUpdate.spentSkillPoints < characterToUpdate.maxSkillPoints) {
                    skillToUpdate.value = action.payload.newValue;
                    characterToUpdate.spentSkillPoints = characterToUpdate.skills.reduce((total, currentValue) => total + currentValue.value, 0);
                } else {
                    state.alertMessage = `Maximumn skill points of ${characterToUpdate.maxSkillPoints} have been allocated`;
                }
            }
        }
    },
    setAlertMessage: (state, action: PayloadAction<string>) => {
        state.alertMessage = action.payload;

    },
    clearAlertMessage: (state) => {
        state.alertMessage = '';
    }
  },
})

export const { updateAtrribute, updateSkill, addNewCharacter, deleteCharacters, clearAlertMessage, setAlertMessage, loadCharacters } = characterSlice.actions

export default characterSlice.reducer
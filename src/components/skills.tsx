import styled from 'styled-components';
import { Character, Skill, UpdateCharacterSkillPayload } from "../state/characters/types";
import { Box, InfoBox, RowText, RowTextRight, TitleBox, VerticalBox, VerticalSpacer } from "./styles";
import { Counter } from './counter';
import { useDispatch } from 'react-redux';
import { updateSkill } from '../state/characters/characterSlice';

const Row = styled(Box)`
  font-size: 1em;
`;

interface Props {
    character: Character;
}

interface SkillProps {
    skill: Skill;
    onValueChange(newValue: number): void;
}

const SkillItem: React.FunctionComponent<SkillProps> = props => {
    const handleValueChange = (newValue: number) => {
        props.onValueChange(newValue);
    };

    return (
        <Row $gap={10}>
            <RowText $width={120}>{props.skill.skill}</RowText>
            <Counter value={props.skill.value} onValueChange={handleValueChange} />
            <Box $width={110}>Modifier ({props.skill.modifierPrefix}):</Box>
            <RowTextRight $width={15} style={{ paddingRight: 5}}>{props.skill.modifierValue}</RowTextRight>
            <Box>Total:</Box>
            <RowTextRight $width={15}>{props.skill.value+props.skill.modifierValue}</RowTextRight>
        </Row>
      );
};

export const Skills: React.FunctionComponent<Props> = props => {
    const dispatch = useDispatch();

    const handleValueChange = (skill: string, newValue: number) => {
        const payload: UpdateCharacterSkillPayload = { characterId: props.character.id, skill: skill, newValue: newValue };
        dispatch(updateSkill(payload));
    };

    const skillList = props.character.skills.map(s => <SkillItem skill={s} key={s.skill} onValueChange={(newValue) => {
        handleValueChange(s.skill, newValue)
    }} />);

    return <VerticalBox>
        <TitleBox>Skills</TitleBox>
        <InfoBox>{`(Available: ${props.character.maxSkillPoints - props.character.spentSkillPoints} )`}</InfoBox>
        <VerticalSpacer />
        {skillList}
        <VerticalSpacer />
    </VerticalBox>
}

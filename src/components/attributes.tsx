import { Attribute, Character, UpdateCharacterAttributePayload } from '../state/characters/types';
import { Counter } from './counter';
import { Box, InfoBox, RowText, RowTextRight, TitleBox, VerticalBox, VerticalSpacer } from './styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateAtrribute } from '../state/characters/characterSlice';
import { MAX_ATTRIBUTE_POINTS } from '../consts';

interface Props {
    character: Character;
}

interface AttributeProps {
    attribute: Attribute;
    onValueChange(newValue: number): void;
}

const CharacterAttribute: React.FunctionComponent<AttributeProps> = props => {
    const handleValueChange = (newValue: number) => {
      props.onValueChange(newValue);
    };

    return (
        <Box $gap={10}>
            <RowText $width={85}>{props.attribute.attribute}:</RowText>
            <Counter value={props.attribute.value} onValueChange={handleValueChange} minValue={1} />
            <RowText>Modifier:</RowText>
            <RowTextRight $width={10}> {props.attribute.modifier}</RowTextRight>
        </Box>
      );
};

export const Attributes: React.FunctionComponent<Props> = props => {
    const dispatch = useDispatch();

    const handleValueChange = (attribute: string, newValue: number) => {
        const payload: UpdateCharacterAttributePayload = { characterId: props.character.id, attribute: attribute, newValue: newValue };
        dispatch(updateAtrribute(payload));
    };
    
    const attributeList = props.character.attributes.map(a => <CharacterAttribute attribute={a} key={a.attribute} onValueChange={(newValue) => {
        handleValueChange(a.attribute, newValue)
    }} />);

    return <VerticalBox>
        <TitleBox>Attributes</TitleBox>
        <InfoBox>{`(Available: ${MAX_ATTRIBUTE_POINTS - props.character.spentAttributes} )`}</InfoBox>
        <VerticalSpacer />
        {attributeList}
    </VerticalBox>
}

import { Character } from "../state/characters/types";
import { Attributes } from "./attributes";
import { Classes } from "./classes";
import { Skills } from "./skills";
import { Box, DisplayBox, TitleBox } from "./styles";

interface Props {
    character: Character;
}

export const CharacterSheet: React.FunctionComponent<Props> = props => {

return <DisplayBox $gap={10}>
    <TitleBox>Character {props.character.id}</TitleBox>
    <Box style={{ justifyContent: 'space-evenly'}}>
        <Attributes character={props.character}/>
        <Classes classes={props.character.classes} />
        <Skills character={props.character} />
    </Box>
</DisplayBox>
}

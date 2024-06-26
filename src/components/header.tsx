
import { useDispatch, useSelector } from "react-redux";
import { DisplayBox, TitleBox, CentredBox } from "./styles"
import { addNewCharacter, deleteCharacters, setAlertMessage } from "../state/characters/characterSlice";
import { characterApi } from "../state/characters/characterApi";
import { RootState } from '../store';

export const Header: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    const [saveCharacters] = characterApi.useSaveCharactersMutation();

    // A warning says don't do this.  Not sure if it will cause performance issues.
    // Need to dig into later, but I'll leave it for this exercise
    const { characters } = useSelector((state: RootState) => state);
    const handleSubmit = () => {

        saveCharacters(characters)
            .unwrap()
            .catch((error) => {
                dispatch(setAlertMessage(JSON.stringify(error)));
            })
            .then((response) => {
                dispatch(setAlertMessage('Characters saved successfully'))
            });
    };
    
    return <DisplayBox $gap={10}>
        <TitleBox>Character Sheets</TitleBox>
        <CentredBox style={{marginBottom: 10}}>
            <button onClick={() => dispatch(addNewCharacter())}>Add New Character</button>
            <button onClick={() => dispatch(deleteCharacters())}>Reset All Characters</button>
            <button onClick={() => handleSubmit()}>Save All Characters</button>
        </CentredBox>
    </DisplayBox>
    }
    
import styled from 'styled-components';
import { CharacterClass } from "../state/characters/types";
import { Box, DisplayBox, TitleBox, VerticalBox, VerticalSpacer } from "./styles";
import { useState } from 'react';
import { CLASS_LIST } from '../consts';

interface RowProps {
    $highlight: boolean;
}

const Row = styled(Box)<RowProps>`
  color: ${(props) => (props.$highlight ? 'green' : 'gray')};
  font-size: 1.1em;
  font-weight: ${(props) => (props.$highlight ? 'bold' : 'normal')};
`;

interface Props {
    classes: CharacterClass[];
}

interface ClassProps {
    class: CharacterClass;
    onClassClicked(className: string): void;
}

interface ClassRequirementsProps {
    class: string;
    onClickHide(): void;
}

const ClassItem: React.FunctionComponent<ClassProps> = props => {
    return (
        <Row $gap={10} $highlight={props.class.meetsRequirements} onClick={() => { props.onClassClicked(props.class.class); }}>
            {props.class.class}
        </Row>
      );
};

const ClassRequirements: React.FunctionComponent<ClassRequirementsProps> = props => {
    const value = Object.entries(CLASS_LIST).find(([key, val]) => key === props.class)?.[1];

    return (
      <VerticalBox>
        <Box>&nbsp;</Box>
        <DisplayBox $width={180}>
          <VerticalBox $width={180}>
            <Box>{props.class} Requirements</Box>
            <Box>Str {value?.Strength}</Box>
            <Box>Dex {value?.Dexterity}</Box>
            <Box>Con {value?.Constitution}</Box>
            <Box>Int {value?.Intelligence}</Box>
            <Box>Wis {value?.Wisdom}</Box>
            <Box>Cha {value?.Charisma}</Box>
            <Box style={{ height: 5 }}></Box>
            <button onClick={props.onClickHide}>Hide</button>
          </VerticalBox>
        </DisplayBox>
      </VerticalBox>
    );
};

export const Classes: React.FunctionComponent<Props> = props => {
    const [classRequirements, setClassRequirements] = useState(() => <Box></Box>);
    function hideRequirements() {
        setClassRequirements(() => <Box></Box>);
    }

    const classList = props.classes.map(a => <ClassItem class={a} key={a.class} onClassClicked={(className) => {
        setClassRequirements(() => className !== '' ? <ClassRequirements class={className} onClickHide={hideRequirements} /> : <Box></Box>);
    }} />);

    return <VerticalBox $width={200}>
        <TitleBox>Classes</TitleBox>
        <VerticalSpacer />
        <VerticalSpacer />
        {classList}
        {classRequirements}
    </VerticalBox>
}

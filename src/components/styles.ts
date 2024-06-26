import styled from 'styled-components';

interface BoxProps {
    $gap?: number;
    $width?: number;
    $backgroundColor?: string;
}

export const Box = styled.div<BoxProps>`
    display: flex;
    justify-content: left;
    align-items: normal;
    gap: ${(props) => (props.$gap ?? 0)}px;
    margin: 0;
    width: ${(props) => (props.$width+'px' ?? 'auto')};
    background-color:  ${(props) => (props.$backgroundColor ?? 'white')}
    `;


export const DisplayBox = styled(Box)`
    margin: 5px;
    padding: 5px;
    border: solid 1px black;
    flex-direction: column;
`;

export const CentredBox = styled(Box)`
    justify-content: center;
`;

export const TitleBox = styled(CentredBox)`
    font-size: 1.2em;
`;

export const InfoBox = styled(CentredBox)`
    font-size: 0.8em;
`;

export const VerticalSpacer = styled(Box)`
    padding-bottom: 10px;
`;

export const VerticalBox = styled(Box)`
    flex-direction: column;
`;

export const RowText = styled(Box)`
  justify-content: normal;
`;

export const RowTextRight = styled(Box)`
  justify-content: flex-end;
`;

export const BoldRowText = styled(RowText)`
  font-weight: bolder;
`;

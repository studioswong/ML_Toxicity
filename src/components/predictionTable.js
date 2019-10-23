import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    margin: 30px;
    border: 2px solid grey;
    width: 90%;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    // border-bottom: 1px solid #ddd;
    display: flex;
`

const TextHeader = styled.div`
    width: 10%;
`;

const Th = styled.th`
    font-size: 12px;
    font-weight: 200;
    // border-bottom: 1px solid #ddd;
`;

const Table = styled.table`
    width: 100%;
    border: 1px solid white;
`;

const PredictionTable = (props) => {
    console.log('prediction props', props);
    const {text, predictions} = props;
    return (
        <Box>
            <Row>
                <TextHeader width="30%">text</TextHeader>
                <TextHeader>identity attack</TextHeader>
                <TextHeader>Insult</TextHeader>
                <TextHeader>obscene</TextHeader>
                <TextHeader>severe toxicity</TextHeader>
                <TextHeader>sexual explicit</TextHeader>
                <TextHeader>threat</TextHeader>
                <TextHeader>toxicity</TextHeader>
            </Row>
            <Row>
                <TextHeader width="30%">{text}</TextHeader>
                {(predictions.length>0) && <TextHeader>{predictions[0].results[0].match}</TextHeader>}
            </Row>
        </Box>
    )
}

export default PredictionTable;
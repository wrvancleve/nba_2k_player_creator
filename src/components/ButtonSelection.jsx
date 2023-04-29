import React, { useState } from 'react';

import styled from 'styled-components'

import ButtonSelectionGroup from './ButtonSelectionGroup'

const ButtonSelectionDiv = styled.div`
    padding: 5px;
`

const ButtonSelectionLabel = styled.label`
    padding-right: 12px;
`

export default function ButtonSelection({label, possibleValues, selectedIndex, onChange, buttonWidth}) {
    return (
        <ButtonSelectionDiv>
            <ButtonSelectionLabel>{label}:</ButtonSelectionLabel>
            <ButtonSelectionGroup label={label} possibleValues={possibleValues} selectedIndex={selectedIndex} onChange={onChange} width={buttonWidth} />
        </ButtonSelectionDiv>
    )
}
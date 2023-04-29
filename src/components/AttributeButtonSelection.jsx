import React, { useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ToggleButton from '@mui/material/ToggleButton';
import styled from 'styled-components'

import ButtonSelectionGroup from './ButtonSelectionGroup'

const ButtonSelectionDiv = styled.div`
    padding: 5px;
`

const ButtonSelectionLabel = styled.label`
    padding-right: 12px;
    padding-left: 12px;
`

export default function AttributeButtonSelection({attributeKey, label, possibleValues, selectedIndex, onChange, isSpecialty, addSpecialty, clearSpecialty}) {
    return (
        <ButtonSelectionDiv>
            {isSpecialty
              ?
                <ToggleButton value="yes" onClick={() => clearSpecialty(attributeKey)}>
                    <StarIcon />
                </ToggleButton>
              : 
                <ToggleButton value="no" onClick={() => addSpecialty(attributeKey)}>
                    <StarBorderIcon />
                </ToggleButton>
            }
            <ButtonSelectionLabel>{label}:</ButtonSelectionLabel>
            <ButtonSelectionGroup label={label} possibleValues={possibleValues} selectedIndex={selectedIndex} onChange={onChange} />
        </ButtonSelectionDiv>
    )
}
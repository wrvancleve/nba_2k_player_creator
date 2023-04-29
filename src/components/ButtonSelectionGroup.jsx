import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ButtonSelectionGroup({label, possibleValues, selectedIndex, onChange, width}) {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      for (let i = 0; i < possibleValues.length; i++) {
        if (possibleValues[i] === newValue) {
          onChange(i);
        }
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={possibleValues[selectedIndex]}
      exclusive
      onChange={handleChange}
      aria-label={label}
    >
      {possibleValues.map(possibleValue => {
          return <ToggleButton key={possibleValue} value={possibleValue} sx={{ width: width || '48px' }}>{possibleValue}</ToggleButton>
      })}
    </ToggleButtonGroup>
  );
}
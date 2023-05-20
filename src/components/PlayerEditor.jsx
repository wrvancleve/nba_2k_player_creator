import React, { useState, useRef, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import hash from 'object-hash';
import styled from 'styled-components'

import ButtonSelection from './ButtonSelection'
import AttributeButtonSelection from './AttributeButtonSelection'
import '../styles/App.css';

const EditorHeader = styled.h2`
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`

const InvalidPointsP = styled.p`
  color: red;
`

import PLAYER_POSITIONS from '../models/position';

function getHeightValue(possibleHeights, heightIndex) {
  switch (possibleHeights[heightIndex]) {
    case "7'3":
      return 15;
    case "7'2":
      return 14;
    case "7'1":
      return 13;
    case "7'0":
      return 12;
    case "6'11":
      return 11;
    case "6'10":
      return 10;
    case "6'9":
      return 9;
    case "6'8":
      return 8;
    case "6'7":
      return 7;
    case "6'6":
      return 6;
    case "6'5":
      return 5;
    case "6'4":
      return 4;
    case "6'3":
      return 3;
    case "6'2":
      return 2;
    case "6'1":
      return 1;
    case "6'0":
    default:
      return 0;
  }
}
function getPossibleHeights(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [
        "6'7",
        "6'8",
        "6'9",
        "6'10",
        "6'11",
        "7'0",
        "7'1",
        "7'2",
        "7'3"
      ];
    case 3:
      return [
        "6'6",
        "6'7",
        "6'8",
        "6'9",
        "6'10",
        "6'11",
        "7'0"
      ];
    case 2:
      return [
        "6'3",
        "6'4",
        "6'5",
        "6'6",
        "6'7",
        "6'8",
        "6'9",
        "6'10",
        "6'11"
      ];
    case 1:
    case 0:
    default:
      return [
        "6'0",
        "6'1",
        "6'2",
        "6'3",
        "6'4",
        "6'5",
        "6'6",
        "6'7",
        "6'8",
        "6'9",
      ];
  }
}
function getDefaultHeightIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
      return 3;
    case 2:
      return 4;
    case 1:
      return 5;
    case 0:
    default:
      return 3;
  }
}

function getWeightValue(possibleWeights, weightIndex) {
  const NUMBER_REGEX = /\d+/gm;
  return Number(NUMBER_REGEX.exec(possibleWeights[weightIndex]));
}
function getPossibleWeights(positionIndex, heightIndex) {
  switch (positionIndex) {
    case 4:
      return getPossibleWeightsForC(heightIndex);
    case 3:
      return getPossibleWeightsForPF(heightIndex);
    case 2:
      return getPossibleWeightsForSF(heightIndex);
    case 1:
      return getPossibleWeightsForSG(heightIndex);
    case 0:
    default:
      return getPossibleWeightsForPG(heightIndex);
  }
}
function getPossibleWeightsForC(heightIndex) {
  switch (heightIndex) {
    case 8:
      return ["230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305-350"];
    case 7:
    case 6:
      return ["220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305-350"];
    case 5:
    case 4:
      return ["215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305-350"];
    case 3:
    case 2:
      return ["215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305-345"];
    case 1:
    case 0:
    default:
      return ["215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305-335"];
  }
}
function getPossibleWeightsForPF(heightIndex) {
  switch (heightIndex) {
    case 6:
      return ["215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305"];
    case 5:
    case 4:
    case 3:
      return ["210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295/300", "305"];
    case 2:
      return ["210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290", "295"];
    case 1:
      return ["210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285/290"];
    case 0:
    default:
      return ["210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270", "275/280", "285"];
  }
}
function getPossibleWeightsForSF(heightIndex) {
  switch (heightIndex) {
    case 8:
      return ["210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270"];
    case 7:
      return ["200", "205/210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270"];
    case 6:
      return ["185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270"];
    case 5:
    case 4:
    case 3:
      return ["180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270"];
    case 2:
      return ["175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255/260", "265/270"];
    case 1:
      return ["175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255"];
    case 0:
    default:
      return ["175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245"];
  }
}
function getPossibleWeightsForSG(heightIndex) {
  switch (heightIndex) {
    case 9:
      return ["185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255"];
    case 8:
    case 7:
    case 6:
      return ["180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255"];
    case 5:
    case 4:
      return ["175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250", "255"];
    case 3:
      return ["170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245"];
    case 2:
      return ["165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240"];
    case 1:
      return ["165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235"];
    case 0:
    default:
      return ["165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225"];
  }
}
function getPossibleWeightsForPG(heightIndex) {
  switch (heightIndex) {
    case 9:
      return ["185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250"];
    case 8:
    case 7:
    case 6:
      return ["180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250"];
    case 5:
    case 4:
      return ["175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245/250"];
    case 3:
      return ["170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240", "245"];
    case 2:
      return ["165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235/240"];
    case 1:
      return ["160", "165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225/230", "235"];
    case 0:
    default:
      return ["155/160", "165/170", "175/180", "185/190", "195/200", "205/210", "215/220", "225"];
  }
}
function getDefaultWeightIndex(positionIndex, heightIndex) {
  switch (positionIndex) {
    case 4:
      return getDefaultWeightIndexForC(heightIndex);
    case 3:
      return getDefaultWeightIndexForPF(heightIndex);
    case 2:
      return getDefaultWeightIndexForSF(heightIndex);
    case 1:
      return getDefaultWeightIndexForSG(heightIndex);
    case 0:
    default:
      return getDefaultWeightIndexForPG(heightIndex);
  }
}
function getDefaultWeightIndexForC(heightIndex) {
  switch (heightIndex) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 3;
  }
}
function getDefaultWeightIndexForPF(heightIndex) {
  switch (heightIndex) {
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      return 4;
    case 1:
    case 0:
    default:
      return 3;
  }
}
function getDefaultWeightIndexForSF(heightIndex) {
  switch (heightIndex) {
    case 8:
      return 2;
    case 7:
    case 6:
      return 3;
    case 5:
    case 4:
    case 3:
      return 4;
    case 2:
    case 1:
      return 3;
    case 0:
    default:
      return 2;
  }
}
function getDefaultWeightIndexForSG(heightIndex) {
  switch (heightIndex) {
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      return 3;
    case 1:
    case 0:
    default:
      return 2;
  }
}
function getDefaultWeightIndexForPG(heightIndex) {
  switch (heightIndex) {
    case 9:
      return 2;
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      return 3;
    case 0:
    default:
      return 2;
  }
}

function getPossibleDrivingLayups(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [60, 65, 70, 75, 80, 85];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultDrivingLayupIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
      return 5;
    case 2:
      return 5;
    case 1:
      return 5;
    case 0:
    default:
      return 5;
  }
}

function getAltheticValue(possibleHeights, heightIndex, possibleWeights, weightIndex) {
  const heightValue = getHeightValue(possibleHeights, heightIndex);
  const calculatedWeight = getWeightValue(possibleWeights, weightIndex);
  const weightValue = Math.floor((Math.min(calculatedWeight, 301) - 151) / 10);
  const athleticValue = heightValue + weightValue;
  return athleticValue;
}

function getPossibleStandingDunks(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return [70, 75, 80, 85, 90, 95];
    case 2:
      return [55, 60, 65, 70, 75, 80];
    case 1:
      return [50, 55, 60, 65, 70, 75];
    case 0:
    default:
      return [45, 50, 55, 60, 65, 70];
  }
}
function getDefaultStandingDunkIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
      return 5;
    case 2:
      return 4;
    case 1:
      return 4;
    case 0:
    default:
      return 4;
  }
}

function getPossibleDrivingDunks(positionIndex) {
  switch (positionIndex) {
    case 3:
    case 2:
    case 1:
      return [70, 75, 80, 85, 90, 95];
    case 4:
    case 0:
    default:
      return [65, 70, 75, 80, 85, 90];
  }
}
function getDefaultDrivingDunkIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
      return 5;
    case 2:
      return 5;
    case 1:
      return 5;
    case 0:
    default:
      return 5;
  }
}

function getPossibleShotCloses(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultShotCloseIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleMidRangeShots(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultMidRangeShotIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 4;
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleFreeThrows(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return [60, 65, 70, 75, 80, 85];
    case 2:
    case 1:
    case 0:
    default:
      return [65, 70, 75, 80, 85, 90];
  }
}
function getDefaultFreeThrowIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossibleThreePointShots(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [65, 70, 75, 80, 85, 90];
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultThreePointShotIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 4;
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossiblePostHooks(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [70, 75, 80, 85, 90, 95];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
      return [55, 60, 65, 70, 75, 80]
    case 1:
      return [50, 55, 60, 65, 70, 75];
    case 0:
    default:
      return [45, 50, 55, 60, 65, 70];
  }
}
function getDefaultPostHookIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 5;
    case 2:
    case 1:
    case 0:
    default:
      return 3;
  }
}

function getPossiblePostFades(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return [70, 75, 80, 85, 90, 95];
    case 2:
      return [65, 70, 75, 80, 85, 90];
    case 1:
      return [60, 65, 70, 75, 80, 85];
    case 0:
    default:
      return [55, 60, 65, 70, 75, 80];
  }
}
function getDefaultPostFadeIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossiblePostControls(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return [70, 75, 80, 85, 90, 95];
    case 2:
      return [65, 70, 75, 80, 85, 90];
    case 1:
      return [60, 65, 70, 75, 80, 85];
    case 0:
      return [55, 60, 65, 70, 75, 80];
    default:
      return [50, 55, 60, 65, 70, 75];
  }
}
function getDefaultPostControlIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 5;
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossiblePassingAccuracys(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [50, 55, 60, 65, 70, 75];
    case 3:
      return [55, 60, 65, 70, 75, 80];
    case 2:
      return [60, 65, 70, 75, 80, 85];
    case 1:
      return [65, 70, 75, 80, 85, 90];
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultPassingAccuracyIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleBallHandles(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [50, 55, 60, 65, 70, 75];
    case 3:
      return [55, 60, 65, 70, 75, 80];
    case 2:
      return [60, 65, 70, 75, 80, 85];
    case 1:
      return [65, 70, 75, 80, 85, 90];
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultBallHandleIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossiblePassIQs(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [50, 55, 60, 65, 70, 75];
    case 3:
      return [55, 60, 65, 70, 75, 80];
    case 2:
      return [60, 65, 70, 75, 80, 85];
    case 1:
      return [65, 70, 75, 80, 85, 90];
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultPassIQIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossiblePassVisions(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [50, 55, 60, 65, 70, 75];
    case 3:
      return [55, 60, 65, 70, 75, 80];
    case 2:
      return [60, 65, 70, 75, 80, 85];
    case 1:
      return [65, 70, 75, 80, 85, 90];
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultPassVisionIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleInteriorDefenses(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [70, 75, 80, 85, 90, 95];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
      return [60, 65, 70, 75, 80, 85];
    case 1:
      return [50, 55, 60, 65, 70, 75];
    case 0:
    default:
      return [45, 50, 55, 60, 65, 70];
  }
}
function getDefaultInteriorDefenseIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
      return 5;
    case 0:
    default:
      return 4;
  }
}

function getPossiblePerimeterDefenses(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [60, 65, 70, 75, 80, 85];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultPerimeterDefenseIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 4;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleSteals(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [60, 65, 70, 75, 80, 85];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultStealIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 4;
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleBlocks(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [70, 75, 80, 85, 90, 95];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
      return [55, 60, 65, 70, 75, 80];
    case 1:
      return [50, 55, 60, 65, 70, 75];
    case 0:
    default:
      return [45, 50, 55, 60, 65, 70];
  }
}
function getDefaultBlockIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossibleOffensiveRebounds(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [70, 75, 80, 85, 90, 95];
    case 3:
      return [60, 65, 70, 75, 80, 85];
    case 2:
      return [50, 55, 60, 65, 70, 75];
    case 1:
      return [45, 50, 55, 60, 65, 70];
    case 0:
    default:
      return [40, 45, 50, 55, 60, 65];
  }
}
function getDefaultOffensiveReboundIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossibleDefensiveRebounds(positionIndex) {
  switch (positionIndex) {
    case 4:
      return [70, 75, 80, 85, 90, 95];
    case 3:
      return [65, 70, 75, 80, 85, 90];
    case 2:
      return [55, 60, 65, 70, 75, 80];
    case 1:
      return [50, 55, 60, 65, 70, 75];
    case 0:
    default:
      return [45, 50, 55, 60, 65, 70];
  }
}
function getDefaultDefensiveReboundIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 5;
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossibleHelpDefenseIQs(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultHelpDefenseIQIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
      return 5;
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return 4;
  }
}

function getPossiblePassPerceptions(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
    case 2:
    case 1:
    case 0:
    default:
      return [70, 75, 80, 85, 90, 95];
  }
}
function getDefaultPassPerceptionIndex(positionIndex) {
  switch (positionIndex) {
    case 4:
    case 3:
      return 4;
    case 2:
    case 1:
    case 0:
    default:
      return 5;
  }
}

function getPossibleStrengths(possibleWeights, weightIndex) {
  const weight = getWeightValue(possibleWeights, weightIndex);
  if (weight > 280) {
    return [99];
  }
  else if (weight > 270) {
    return [95, 99];
  }
  else if (weight > 260) {
    return [90, 95, 99];
  }
  else if (weight > 250) {
    return [85, 90, 95];
  }
  else if (weight > 240) {
    return [80, 85, 90];
  }
  else if (weight > 230) {
    return [75, 80, 85];
  }
  else if (weight > 220) {
    return [70, 75, 80];
  }
  else if (weight > 210) {
    return [65, 70, 75];
  }
  else if (weight > 200) {
    return [60, 65, 70];
  }
  else if (weight > 190) {
    return [55, 60, 65];
  }
  else if (weight > 180) {
    return [50, 55, 60];
  }
  else if (weight > 170) {
    return [45, 50, 55];
  }
  else if (weight > 160) {
    return [40, 45, 50];
  }
  else {
    return [35, 40, 45];
  }
}
function getDefaultStrengthIndex(possibleWeights, weightIndex) {
  const weight = getWeightValue(possibleWeights, weightIndex);
  if (weight > 280) {
    return 0;
  } else {
    return 1;
  }
}

function getPossibleAthleticAttributes(athleticValue) {
  if (athleticValue < 11) {
    return [99];
  }
  else if (athleticValue < 14) {
    return [95, 99];
  }
  else if (athleticValue < 17) {
    return [90, 95, 99];
  }
  else if (athleticValue < 20) {
    return [85, 90, 95];
  }
  else if (athleticValue < 22) {
    return [80, 85, 90];
  }
  else if (athleticValue < 24) {
    return [75, 80, 85];
  }
  else if (athleticValue < 26) {
    return [70, 75, 80];
  }
  else if (athleticValue < 28) {
    return [65, 70, 75];
  }
  else {
    return [60, 65, 70];
  }
}
function getDefaultAthleticAttributeIndex(athleticValue) {
  if (athleticValue < 11) {
    return 0;
  } else {
    return 1;
  }
}

function specializeAttribute(possibleValues) {
  const indexesToRemove = [];

  let reachedMax = false;
  for (let i = 0; i < possibleValues.length; i++) {
    if (!reachedMax) {
      const newValue = possibleValues[i] + 5;
      possibleValues[i] = Math.min(newValue, 99);
      if (newValue >= 99) {
        reachedMax = true;
      }
    } else {
      indexesToRemove.push(i);
    }
  }

  for (let indexToRemove of indexesToRemove.reverse()) {
    possibleValues.splice(indexToRemove, 1);
  }
}

export default function PlayerEditor({playerData, savePlayer, clearSelectedPlayerId}) {
  const playerVitals = ((playerData || {}).vitals || {});
  const playerAttributes = ((playerData || {}).attributes || {});
  const [playerSpecialties, setPlayerSpecialties] = useState(((playerData || {}).specialties || []));

  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState(playerVitals.firstName || "");
  const [lastName, setLastName] = useState(playerVitals.lastName || "");
  const [positionIndex, setPositionIndex] = useState(playerVitals.position ?? 0);
  const [heightIndex, setHeightIndex] = useState(playerVitals.height ?? getDefaultHeightIndex(positionIndex));
  const [weightIndex, setWeightIndex] = useState(playerVitals.weight ?? getDefaultWeightIndex(positionIndex, heightIndex));

  const [drivingLayupIndex, setDrivingLayupIndex] = useState(playerAttributes.drivingLayup ?? getDefaultDrivingLayupIndex(positionIndex));
  const [standingDunkIndex, setStandingDunkIndex] = useState(playerAttributes.standingDunk ?? getDefaultStandingDunkIndex(positionIndex));
  const [drivingDunkIndex, setDrivingDunkIndex] = useState(playerAttributes.drivingDunk ?? getDefaultDrivingDunkIndex(positionIndex));
  const [shotCloseIndex, setShotCloseIndex] = useState(playerAttributes.shotClose ?? getDefaultShotCloseIndex(positionIndex));
  const [midRangeShotIndex, setMidRangeShotIndex] = useState(playerAttributes.midRangeShot ?? getDefaultMidRangeShotIndex(positionIndex));
  const [freeThrowIndex, setFreeThrowIndex] = useState(playerAttributes.freeThrow ?? getDefaultFreeThrowIndex(positionIndex));
  const [threePointShotIndex, setThreePointShotIndex] = useState(playerAttributes.threePointShot ?? getDefaultThreePointShotIndex(positionIndex));
  const [postHookIndex, setPostHookIndex] = useState(playerAttributes.postHook ?? getDefaultPostHookIndex(positionIndex));
  const [postFadeIndex, setPostFadeIndex] = useState(playerAttributes.postFade ?? getDefaultPostFadeIndex(positionIndex));
  const [postControlIndex, setPostControlIndex] = useState(playerAttributes.postControl ?? getDefaultPostControlIndex(positionIndex));
  const [passingAccuracyIndex, setPassingAccuracyIndex] = useState(playerAttributes.passingAccuracy ?? getDefaultPassingAccuracyIndex(positionIndex));
  const [ballHandleIndex, setBallHandleIndex] = useState(playerAttributes.ballHandle ?? getDefaultBallHandleIndex(positionIndex));
  const [passIQIndex, setPassIQIndex] = useState(playerAttributes.passIQ ?? getDefaultPassIQIndex(positionIndex));
  const [passVisionIndex, setPassVisionIndex] = useState(playerAttributes.passVision ?? getDefaultPassVisionIndex(positionIndex));
  const [interiorDefenseIndex, setInteriorDefenseIndex] = useState(playerAttributes.interiorDefense ?? getDefaultInteriorDefenseIndex(positionIndex));
  const [perimeterDefenseIndex, setPerimeterDefenseIndex] = useState(playerAttributes.perimeterDefense ?? getDefaultPerimeterDefenseIndex(positionIndex));
  const [stealIndex, setStealIndex] = useState(playerAttributes.steal ?? getDefaultStealIndex(positionIndex));
  const [blockIndex, setBlockIndex] = useState(playerAttributes.block ?? getDefaultBlockIndex(positionIndex));
  const [offensiveReboundIndex, setOffensiveReboundIndex] = useState(playerAttributes.offensiveRebound ?? getDefaultOffensiveReboundIndex(positionIndex));
  const [defensiveReboundIndex, setDefensiveReboundIndex] = useState(playerAttributes.defensiveRebound ?? getDefaultDefensiveReboundIndex(positionIndex));
  const [helpDefenseIQIndex, setHelpDefenseIQIndex] = useState(playerAttributes.helpDefenseIQ ?? getDefaultHelpDefenseIQIndex(positionIndex));
  const [passPerceptionIndex, setPassPerceptionIndex] = useState(playerAttributes.passPerception ?? getDefaultPassPerceptionIndex(positionIndex));
  
  const possibleHeights = getPossibleHeights(positionIndex);
  const possibleWeights = getPossibleWeights(positionIndex, heightIndex);
  const athleticValue = getAltheticValue(possibleHeights, heightIndex, possibleWeights, weightIndex);

  const [strengthIndex, setStrengthIndex] = useState(playerAttributes.strength ?? getDefaultStrengthIndex(possibleWeights, weightIndex));
  const [speedIndex, setSpeedIndex] = useState(playerAttributes.speed ?? getDefaultAthleticAttributeIndex(athleticValue));
  const [accelerationIndex, setAccelerationIndex] = useState(playerAttributes.acceleration ?? getDefaultAthleticAttributeIndex(athleticValue));
  const [speedWithBallIndex, setSpeedWithBallIndex] = useState(playerAttributes.speedWithBall ?? getDefaultAthleticAttributeIndex(athleticValue));
  const [lateralQuicknessIndex, setLateralQuicknessIndex] = useState(playerAttributes.lateralQuickness ?? getDefaultAthleticAttributeIndex(athleticValue));
  const [verticalIndex, setVerticalIndex] = useState(playerAttributes.vertical ?? getDefaultAthleticAttributeIndex(athleticValue));

  const pointsUsed = heightIndex + drivingLayupIndex + standingDunkIndex + drivingDunkIndex + shotCloseIndex
    + midRangeShotIndex + freeThrowIndex + threePointShotIndex + postHookIndex + postFadeIndex + postControlIndex
    + passingAccuracyIndex + ballHandleIndex + passIQIndex + passVisionIndex + interiorDefenseIndex + perimeterDefenseIndex
    + stealIndex + blockIndex + offensiveReboundIndex + defensiveReboundIndex + helpDefenseIQIndex + passPerceptionIndex
    + weightIndex + strengthIndex + speedIndex + accelerationIndex + speedWithBallIndex + lateralQuicknessIndex + verticalIndex;
  
  const possibleDrivingLayups = getPossibleDrivingLayups(positionIndex);
  const possibleStandingDunks = getPossibleStandingDunks(positionIndex);
  const possibleDrivingDunks = getPossibleDrivingDunks(positionIndex);
  const possibleShotCloses = getPossibleShotCloses(positionIndex);
  const possibleMidRangeShots = getPossibleMidRangeShots(positionIndex);
  const possibleFreeThrows = getPossibleFreeThrows(positionIndex);
  const possibleThreePointShots = getPossibleThreePointShots(positionIndex);
  const possiblePostHooks = getPossiblePostHooks(positionIndex);
  const possiblePostFades = getPossiblePostFades(positionIndex);
  const possiblePostControls = getPossiblePostControls(positionIndex);
  const possiblePassingAccuracys = getPossiblePassingAccuracys(positionIndex);
  const possibleBallHandles = getPossibleBallHandles(positionIndex);
  const possiblePassIQs = getPossiblePassIQs(positionIndex);
  const possiblePassVisions = getPossiblePassVisions(positionIndex);
  const possibleInteriorDefenses = getPossibleInteriorDefenses(positionIndex);
  const possiblePerimeterDefenses = getPossiblePerimeterDefenses(positionIndex);
  const possibleSteals = getPossibleSteals(positionIndex);
  const possibleBlocks = getPossibleBlocks(positionIndex);
  const possibleOffensiveRebounds = getPossibleOffensiveRebounds(positionIndex);
  const possibleDefensiveRebounds = getPossibleDefensiveRebounds(positionIndex);
  const possibleHelpDefenseIQs = getPossibleHelpDefenseIQs(positionIndex);
  const possiblePassPerceptions = getPossiblePassPerceptions(positionIndex);
  const possibleStrengths = getPossibleStrengths(possibleWeights, weightIndex);
  const possibleSpeeds = getPossibleAthleticAttributes(athleticValue);
  const possibleAccelerations = getPossibleAthleticAttributes(athleticValue);
  const possibleSpeedWithBalls = getPossibleAthleticAttributes(athleticValue);
  const possibleLateralQuicknesss = getPossibleAthleticAttributes(athleticValue);
  const possibleVerticals = getPossibleAthleticAttributes(athleticValue);

  for (let specialty of playerSpecialties) {
    switch (specialty) {
      case "drivingLayup":
        specializeAttribute(possibleDrivingLayups);
        break;
      case "standingDunk":
        specializeAttribute(possibleStandingDunks);
        break;
      case "drivingDunk":
        specializeAttribute(possibleDrivingDunks);
        break;
      case "shotClose":
        specializeAttribute(possibleShotCloses);
        break;
      case "midRangeShot":
        specializeAttribute(possibleMidRangeShots);
        break;
      case "freeThrow":
        specializeAttribute(possibleFreeThrows);
        break;
      case "threePointShot":
        specializeAttribute(possibleThreePointShots);
        break;
      case "postHook":
        specializeAttribute(possiblePostHooks);
        break;
      case "postFade":
        specializeAttribute(possiblePostFades);
        break;
      case "postControl":
        specializeAttribute(possiblePostControls);
        break;
      case "passingAccuracy":
        specializeAttribute(possiblePassingAccuracys);
        break;
      case "ballHandle":
        specializeAttribute(possibleBallHandles);
        break;
      case "passIQ":
        specializeAttribute(possiblePassIQs);
        break;
      case "passVision":
        specializeAttribute(possiblePassVisions);
        break;
      case "interiorDefense":
        specializeAttribute(possibleInteriorDefenses);
        break;
      case "perimeterDefense":
        specializeAttribute(possiblePerimeterDefenses);
        break;
      case "steal":
        specializeAttribute(possibleSteals);
        break;
      case "block":
        specializeAttribute(possibleBlocks);
        break;
      case "offensiveRebound":
        specializeAttribute(possibleOffensiveRebounds);
        break;
      case "defensiveRebound":
        specializeAttribute(possibleDefensiveRebounds);
        break;
      case "helpDefenseIQ":
        specializeAttribute(possibleHelpDefenseIQs);
        break;
      case "passPerception":
        specializeAttribute(possiblePassPerceptions);
        break;
      case "strength":
        specializeAttribute(possibleStrengths);
        const expectedStrengthIndex = Math.min(strengthIndex, possibleStrengths.length - 1)
        if (strengthIndex != expectedStrengthIndex) {
          setStrengthIndex(expectedStrengthIndex);
        }
        break;
      case "speed":
        specializeAttribute(possibleSpeeds);
        const expectedSpeedIndex = Math.min(speedIndex, possibleSpeeds.length - 1)
        if (speedIndex != expectedSpeedIndex) {
          setSpeedIndex(expectedSpeedIndex);
        }
        break;
      case "acceleration":
        specializeAttribute(possibleAccelerations);
        const expectedAccelerationIndex = Math.min(accelerationIndex, possibleAccelerations.length - 1);
        if (accelerationIndex != expectedAccelerationIndex) {
          setAccelerationIndex(expectedAccelerationIndex);
        }
        break;
      case "speedWithBall":
        specializeAttribute(possibleSpeedWithBalls);
        const expectedSpeedWithBallIndex = Math.min(speedWithBallIndex, possibleSpeedWithBalls.length - 1);
        if (speedWithBallIndex != expectedSpeedWithBallIndex) {
          setSpeedWithBallIndex(expectedSpeedWithBallIndex);
        }
        break;
      case "lateralQuickness":
        specializeAttribute(possibleLateralQuicknesss);
        const expectedLateralQuicknessIndex = Math.min(lateralQuicknessIndex, possibleLateralQuicknesss.length - 1);
        if (lateralQuicknessIndex != expectedLateralQuicknessIndex) {
          setLateralQuicknessIndex(expectedLateralQuicknessIndex);
        }
        break;
      case "vertical":
        specializeAttribute(possibleVerticals);
        const expectedVerticalIndex = Math.min(verticalIndex, possibleVerticals.length - 1)
        if (verticalIndex != expectedVerticalIndex) {
          setVerticalIndex(expectedVerticalIndex);
        }
        break;
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setHeightIndex(getDefaultHeightIndex(positionIndex));
      setDrivingLayupIndex(getDefaultDrivingLayupIndex(positionIndex));
      setStandingDunkIndex(getDefaultStandingDunkIndex(positionIndex));
      setDrivingDunkIndex(getDefaultDrivingDunkIndex(positionIndex));
      setShotCloseIndex(getDefaultShotCloseIndex(positionIndex));
      setMidRangeShotIndex(getDefaultMidRangeShotIndex(positionIndex));
      setFreeThrowIndex(getDefaultFreeThrowIndex(positionIndex));
      setThreePointShotIndex(getDefaultThreePointShotIndex(positionIndex));
      setPostHookIndex(getDefaultPostHookIndex(positionIndex));
      setPostFadeIndex(getDefaultPostFadeIndex(positionIndex));
      setPostControlIndex(getDefaultPostControlIndex(positionIndex));
      setPassingAccuracyIndex(getDefaultPassingAccuracyIndex(positionIndex));
      setBallHandleIndex(getDefaultBallHandleIndex(positionIndex));
      setPassIQIndex(getDefaultPassIQIndex(positionIndex));
      setPassVisionIndex(getDefaultPassVisionIndex(positionIndex));
      setInteriorDefenseIndex(getDefaultInteriorDefenseIndex(positionIndex));
      setPerimeterDefenseIndex(getDefaultPerimeterDefenseIndex(positionIndex));
      setStealIndex(getDefaultStealIndex(positionIndex));
      setBlockIndex(getDefaultBlockIndex(positionIndex));
      setOffensiveReboundIndex(getDefaultOffensiveReboundIndex(positionIndex));
      setDefensiveReboundIndex(getDefaultDefensiveReboundIndex(positionIndex));
      setHelpDefenseIQIndex(getDefaultHelpDefenseIQIndex(positionIndex));
      setPassPerceptionIndex(getDefaultPassPerceptionIndex(positionIndex));
    }
  }, [positionIndex]);

  useEffect(() => {
    if (!isLoading) {
      setWeightIndex(getDefaultWeightIndex(positionIndex, heightIndex));
    }    
  }, [heightIndex]);

  useEffect(() => {
    if (!isLoading) {
      setStrengthIndex(getDefaultStrengthIndex(possibleWeights, weightIndex));
      setSpeedIndex(getDefaultAthleticAttributeIndex(athleticValue));
      setAccelerationIndex(getDefaultAthleticAttributeIndex(athleticValue));
      setSpeedWithBallIndex(getDefaultAthleticAttributeIndex(athleticValue));
      setLateralQuicknessIndex(getDefaultAthleticAttributeIndex(athleticValue));
      setVerticalIndex(getDefaultAthleticAttributeIndex(athleticValue));
    }    
  }, [weightIndex]);

  function addSpecialty(attributeKey) {
    const currentPlayerSpecialties = [...playerSpecialties];
    if (!currentPlayerSpecialties.includes(attributeKey) && currentPlayerSpecialties.length !== 5) {
      currentPlayerSpecialties.push(attributeKey);
      setPlayerSpecialties(currentPlayerSpecialties);
    }
  }

  function clearSpecialty(attributeKey) {
    const currentPlayerSpecialties = [...playerSpecialties];
    const specialtyIndex = currentPlayerSpecialties.indexOf(attributeKey);
    if (specialtyIndex > -1) {
      currentPlayerSpecialties.splice(specialtyIndex, 1);
      setPlayerSpecialties(currentPlayerSpecialties);
    }
  }

  function saveCurrentPlayer() {
    const playerData = JSON.stringify({
      vitals: {
        firstName: firstName,
        lastName: lastName,
        position: positionIndex,
        height: heightIndex,
        weight: weightIndex
      },
      attributes: {
        drivingLayup: drivingLayupIndex,
        standingDunk: standingDunkIndex,
        drivingDunk: drivingDunkIndex,
        shotClose: shotCloseIndex,
        midRangeShot: midRangeShotIndex,
        freeThrow: freeThrowIndex,
        threePointShot: threePointShotIndex,
        postHook: postHookIndex,
        postFade: postFadeIndex,
        postControl: postControlIndex,
        passingAccuracy: passingAccuracyIndex,
        ballHandle: ballHandleIndex,
        passIQ: passIQIndex,
        passVision: passVisionIndex,
        interiorDefense: interiorDefenseIndex,
        perimeterDefense: perimeterDefenseIndex,
        steal: stealIndex,
        block: blockIndex,
        offensiveRebound: offensiveReboundIndex,
        defensiveRebound: defensiveReboundIndex,
        helpDefenseIQ: helpDefenseIQIndex,
        passPerception: passPerceptionIndex,
        strength: strengthIndex,
        speed: speedIndex,
        acceleration: accelerationIndex,
        speedWithBall: speedWithBallIndex,
        lateralQuickness: lateralQuicknessIndex,
        vertical: verticalIndex
      },
      specialties: playerSpecialties
    })
    const playerId = hash({firstName: firstName, lastName: lastName});

    savePlayer(playerId, playerData);
  }

  //, maxWidth: '600px'

  return (
    <Box sx={{ border: 1, borderColor: 'divider', padding: 2 }}>
      <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
        <Stack spacing={1} direction="column">
          <EditorHeader>Vitals</EditorHeader>
          <Stack spacing={1} direction="row">
            <TextField id="firstNameText" label="First Name" variant="outlined" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} />
            <TextField id="lastNameText" label="Last Name" variant="outlined" value={lastName} onChange={(event) => {setLastName(event.target.value)}} />
          </Stack>
          <ButtonSelection label="Position" possibleValues={PLAYER_POSITIONS} selectedIndex={positionIndex} onChange={setPositionIndex} />
          <ButtonSelection label="Height" possibleValues={possibleHeights} selectedIndex={heightIndex} onChange={setHeightIndex} />
          <ButtonSelection label="Weight" possibleValues={possibleWeights} selectedIndex={weightIndex} onChange={setWeightIndex} buttonWidth="80px" />
        </Stack>
        <Stack spacing={0} direction="column">
          <EditorHeader>Attributes</EditorHeader>
            <AttributeButtonSelection attributeKey="drivingLayup" label="Driving Layup" possibleValues={possibleDrivingLayups} selectedIndex={drivingLayupIndex} onChange={setDrivingLayupIndex} isSpecialty={playerSpecialties.includes("drivingLayup")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="standingDunk" label="Standing Dunk" possibleValues={possibleStandingDunks} selectedIndex={standingDunkIndex} onChange={setStandingDunkIndex} isSpecialty={playerSpecialties.includes("standingDunk")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="drivingDunk" label="Driving Dunk" possibleValues={possibleDrivingDunks} selectedIndex={drivingDunkIndex} onChange={setDrivingDunkIndex} isSpecialty={playerSpecialties.includes("drivingDunk")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="shotClose" label="Shot Close" possibleValues={possibleShotCloses} selectedIndex={shotCloseIndex} onChange={setShotCloseIndex} isSpecialty={playerSpecialties.includes("shotClose")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="midRangeShot" label="Mid Range Shot" possibleValues={possibleMidRangeShots} selectedIndex={midRangeShotIndex} onChange={setMidRangeShotIndex} isSpecialty={playerSpecialties.includes("midRangeShot")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="threePointShot" label="Three Point Shot" possibleValues={possibleThreePointShots} selectedIndex={threePointShotIndex} onChange={setThreePointShotIndex} isSpecialty={playerSpecialties.includes("threePointShot")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="freeThrow" label="Free Throw" possibleValues={possibleFreeThrows} selectedIndex={freeThrowIndex} onChange={setFreeThrowIndex} isSpecialty={playerSpecialties.includes("freeThrow")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="postHook" label="Post Hook" possibleValues={possiblePostHooks} selectedIndex={postHookIndex} onChange={setPostHookIndex} isSpecialty={playerSpecialties.includes("postHook")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="postFade" label="Post Fade" possibleValues={possiblePostFades} selectedIndex={postFadeIndex} onChange={setPostFadeIndex} isSpecialty={playerSpecialties.includes("postFade")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="postControl" label="Post Control" possibleValues={possiblePostControls} selectedIndex={postControlIndex} onChange={setPostControlIndex} isSpecialty={playerSpecialties.includes("postControl")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="ballHandle" label="Ball Handle" possibleValues={possibleBallHandles} selectedIndex={ballHandleIndex} onChange={setBallHandleIndex} isSpecialty={playerSpecialties.includes("ballHandle")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="speedWithBall" label="Speed With Ball" possibleValues={possibleSpeedWithBalls} selectedIndex={speedWithBallIndex} onChange={setSpeedWithBallIndex} isSpecialty={playerSpecialties.includes("speedWithBall")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="passingAccuracy" label="Passing Accuracy" possibleValues={possiblePassingAccuracys} selectedIndex={passingAccuracyIndex} onChange={setPassingAccuracyIndex} isSpecialty={playerSpecialties.includes("passingAccuracy")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="passIQ" label="Pass IQ" possibleValues={possiblePassIQs} selectedIndex={passIQIndex} onChange={setPassIQIndex} isSpecialty={playerSpecialties.includes("passIQ")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="passVision" label="Pass Vision" possibleValues={possiblePassVisions} selectedIndex={passVisionIndex} onChange={setPassVisionIndex} isSpecialty={playerSpecialties.includes("passVision")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="interiorDefense" label="Interior Defense" possibleValues={possibleInteriorDefenses} selectedIndex={interiorDefenseIndex} onChange={setInteriorDefenseIndex} isSpecialty={playerSpecialties.includes("interiorDefense")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="perimeterDefense" label="Perimeter Defense" possibleValues={possiblePerimeterDefenses} selectedIndex={perimeterDefenseIndex} onChange={setPerimeterDefenseIndex} isSpecialty={playerSpecialties.includes("perimeterDefense")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="steal" label="Steal" possibleValues={possibleSteals} selectedIndex={stealIndex} onChange={setStealIndex} isSpecialty={playerSpecialties.includes("steal")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="block" label="Block" possibleValues={possibleBlocks} selectedIndex={blockIndex} onChange={setBlockIndex} isSpecialty={playerSpecialties.includes("block")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="offensiveRebound" label="Offensive Rebound" possibleValues={possibleOffensiveRebounds} selectedIndex={offensiveReboundIndex} onChange={setOffensiveReboundIndex} isSpecialty={playerSpecialties.includes("offensiveRebound")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="defensiveRebound" label="Defensive Rebound" possibleValues={possibleDefensiveRebounds} selectedIndex={defensiveReboundIndex} onChange={setDefensiveReboundIndex} isSpecialty={playerSpecialties.includes("defensiveRebound")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="helpDefenseIQ" label="Help Defense IQ" possibleValues={possibleHelpDefenseIQs} selectedIndex={helpDefenseIQIndex} onChange={setHelpDefenseIQIndex} isSpecialty={playerSpecialties.includes("helpDefenseIQ")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="passPerception" label="Pass Perception" possibleValues={possiblePassPerceptions} selectedIndex={passPerceptionIndex} onChange={setPassPerceptionIndex} isSpecialty={playerSpecialties.includes("passPerception")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="lateralQuickness" label="Lateral Quickness" possibleValues={possibleLateralQuicknesss} selectedIndex={lateralQuicknessIndex} onChange={setLateralQuicknessIndex} isSpecialty={playerSpecialties.includes("lateralQuickness")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="speed" label="Speed" possibleValues={possibleSpeeds} selectedIndex={speedIndex} onChange={setSpeedIndex} isSpecialty={playerSpecialties.includes("speed")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="acceleration" label="Acceleration" possibleValues={possibleAccelerations} selectedIndex={accelerationIndex} onChange={setAccelerationIndex} isSpecialty={playerSpecialties.includes("acceleration")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="strength" label="Strength" possibleValues={possibleStrengths} selectedIndex={strengthIndex} onChange={setStrengthIndex} isSpecialty={playerSpecialties.includes("strength")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
            <AttributeButtonSelection attributeKey="vertical" label="Vertical" possibleValues={possibleVerticals} selectedIndex={verticalIndex} onChange={setVerticalIndex} isSpecialty={playerSpecialties.includes("vertical")} addSpecialty={addSpecialty} clearSpecialty={clearSpecialty} />
        </Stack>
        <Stack spacing={2} direction="row">
          <label>Points Used:</label>
          {pointsUsed !== 115
            ? <InvalidPointsP>{pointsUsed}/115</InvalidPointsP>
            : <p>{pointsUsed}/115</p>
          }
          <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={saveCurrentPlayer}>Save</Button>
          <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={clearSelectedPlayerId}>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

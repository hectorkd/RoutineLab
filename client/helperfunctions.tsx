import { IMove, IStartValue } from './interface';

function calculateRoutineStart(routine: IMove[]): IStartValue {
  // const eScoreDictionary: object = { '0': 0, '1': 2.0, '2': 2.0, '3': 4.0, '4': 4.0, '5': 6.0, '6': 6.0, '7': 10.0, '8': 10.0, '9': 10.0, '10': 10.0 }
  const length = routine.length;
  let eScore: number = 0;

  if (length === 0) {
    eScore = 0;
  } else if (length < 3) {
    eScore = 2.0
  } else if (length < 5) {
    eScore = 4.0
  } else if (length < 7) {
    eScore = 6.0
  } else {
    eScore = 10.0
  }

  const elementTotal = round(routine.reduce((acc: number, move: IMove) => { return acc + move.pointValue }, 0), 1);


  let requirmentsTotal: number = 0;

  if (routine.some(move => move.copGroup === '1')) requirmentsTotal += 0.5;
  if (routine.some(move => move.copGroup === '2')) requirmentsTotal += 0.5;
  if (routine.some(move => move.copGroup === '3')) requirmentsTotal += 0.5;
  if (routine[routine.length - 1].pointValue === 0.3) requirmentsTotal += 0.3;
  if (routine[routine.length - 1].pointValue > 0.3) requirmentsTotal += 0.3;
  if (routine[0].apparatus === 'Floor') {
    if (!routine.some(move => move.isDoubleRotation === true)) {
      requirmentsTotal -= 0.3;
    }
  }

  const totalStartValue = round((eScore + requirmentsTotal + elementTotal), 1);

  return { eScore: eScore.toFixed(1), requirmentsTotal: requirmentsTotal.toFixed(1), elementTotal: elementTotal.toFixed(1), totalStartValue: totalStartValue.toFixed(1) }
}

function calculateVaultStart(routine: IMove[]): IStartValue[] {
  if (routine.length === 1) {
    return [{ eScore: '10.0', requirmentsTotal: '0.0', elementTotal: `${routine[0].pointValue}`, totalStartValue: (routine[0].pointValue + 10).toFixed(1) }, { eScore: '10.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' }]
  }
  return [{ eScore: '10.0', requirmentsTotal: '0.0', elementTotal: `${routine[0].pointValue}`, totalStartValue: (routine[0].pointValue + 10).toFixed(1) }, { eScore: '10.0', requirmentsTotal: '0.0', elementTotal: `${routine[1].pointValue}`, totalStartValue: (routine[1].pointValue + 10).toFixed(1) }]
}

function round(value: number, precision: number): number {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default {
  calculateRoutineStart,
  calculateVaultStart
} 
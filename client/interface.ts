export interface IMove {
  _id: string,
  name: string,
  apparatus: string,
  pointValue: number,
  letterValue: string,
  copGroup: string,
  isDoubleRotation: boolean
}

export interface IMoveSection {
  title: string,
  data: IMove[]
}

export interface IIndividualMove {
  _id: string
}

export interface IRoutine {
  name: string,
  routine: IIndividualMove[]
}

export interface ITotal {
  total: [number, number, number, number]
}
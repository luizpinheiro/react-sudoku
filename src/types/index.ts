export type Coordinate = {
  x: number
  y: number
}
export type Annotation = number[]

export type NumbersMatrix = (number | null)[][]

export type AnnotationsMatrix = Annotation[][]

export type ErrorsMatrix = boolean[][]

export enum Actions {
  INPUT,
  ERASE,
  RESTART,
  CLOCK_TICK,
  SELECT,
  ANNOTATE,
}

export type Action = {
  type: Actions
  position?: Coordinate
  value?: number
}

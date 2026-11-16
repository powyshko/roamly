import type { Coordinate, RoutePoint } from '@/shared/types'

export type Emit = {
  undo: []
  redo: []
  saveRoute: []
  back: []
  mapClick: [value: Coordinate]
  pointMove: [uuid: string, coordinate: Coordinate]
  lineClick: [value: Coordinate]
  markerClick: [uuid: string]
  deletePoint: [uuid: string]
  pointDragStart: [uuid: string]
  pointDragEnd: [uuid: string]
}

export type Props = {
  undoDisabled?: boolean
  redoDisabled?: boolean
  points: RoutePoint[]
  selectedPoint?: RoutePoint
}

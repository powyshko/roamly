import type { Coordinate, RoutePoint } from '@/shared/types'

export type Emit = {
  undo: []
  mapClick: [value: Coordinate]
  pointMove: [uuid: string, coordinate: Coordinate]
  lineClick: [value: Coordinate]
  markerClick: [uuid: string]
  deletePoint: [uuid: string]
}

export type Props = {
  undoDisabled?: boolean
  points: RoutePoint[]
  selectedPoint?: RoutePoint
}

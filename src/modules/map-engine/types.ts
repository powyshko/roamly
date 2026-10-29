import type { Coordinate, RoutePoint } from '@/shared/types'

export type Emit = {
  mapClick: [value: Coordinate]
  pointMove: [uuid: string, coordinate: Coordinate]
  lineClick: [value: Coordinate]
  markerClick: [value: string]
}

export type Props = {
  points: RoutePoint[]
  selectedPoint?: RoutePoint;
}

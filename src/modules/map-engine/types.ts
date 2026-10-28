import type { Coordinate, RoutePoint } from '@/shared/types'

export type Emit = {
  mapClick: [value: Coordinate]
  pointMove: [uuid: string, coordinate: Coordinate]
}

export type Props = {
  points: RoutePoint[]
}

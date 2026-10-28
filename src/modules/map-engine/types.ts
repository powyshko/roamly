import type { Coordinate, RoutePoint } from '@/shared/types'

export type Emit = {
  mapClick: [value: Coordinate]
}

export type Props = {
  points: RoutePoint[]
}

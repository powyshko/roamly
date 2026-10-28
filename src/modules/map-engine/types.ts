import type { Coordinate } from '@/shared/types'

export type Emit = {
  mapClick: [value: Coordinate]
}

export type Props = {
  points: Coordinate[]
}

export type Coordinate = [
  longitude: number,
  latitude: number
];

export type RoutePoint = {
  uuid: string;
  coordinate: Coordinate;
}

export type MoveCoordinate = {
  lng: number;
  lat: number;
}

export const HistoryActionType = {
  AddPoint: 'ADD_POINT',
  DeletePoint: 'DELETE_POINT',
  MovePoint: 'MOVE_POINT'
} as const
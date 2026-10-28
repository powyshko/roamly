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
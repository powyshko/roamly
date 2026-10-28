export type Coordinate = [
  longitude: number,
  latitude: number
];

export interface RoutePoint {
  uuid: string;
  coordinate: Coordinate;
}